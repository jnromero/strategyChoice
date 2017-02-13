
mainDiv.style.width="1280px";
mainDiv.style.height="1024px";


//Constructor testing stuff.

function testConstructorComplete(constructor){
    specified=true;
    for(k=0;k<constructor.length;k++){
        for(j=0;j<constructor[k].length;j++){
            if(constructor[k][j]==-1){
                specified=false;
            }
        }
    }
    return specified
}

function testConstructor(){
  var error=0;
  if(testConstructorComplete(window.ruleConstructor)==false){
    var error=1;
  }
  else{


    if(window.state['ruleInfo']!=undefined){
        var M=window.state['ruleInfo'].length;
        for(j=0;j<M;j++){
          var rule1=window.ruleConstructor;
          var rule2=window.state['ruleInfo'][j][2];
          var thisError=compareRuleAndRule(rule1,rule2);
          if(thisError>0){error=thisError+1;}
        }
    }
  }
  return error;
}

function compareRuleAndRule(rule1,rule2){
    var error=1;//Same except output
    if(rule1.length!=rule2.length){
      error=0;//different
    }
    else{
      for(i=0;i<rule1.length-1;i++){
        if(rule1[i][0]!=rule2[i][0]){error=0;break;}
        if(rule1[i][1]!=rule2[i][1]){error=0;break;}
      }
      if(error==1 && rule1[rule1.length-1][0]==rule2[rule2.length-1][0]){
        error=2;//exactly the same
      }
    }
    return error;
}


//CONSTRUCTOR STUFF HERE

function drawInfo(){
    placeTextNew({"divid":"topInfo1","text":"Match #"+window.state["match"],"top":"0px","fontSize":"150%","color":"red","width":"400px","textAlign":"center","left":"0px","backgroundColor":"rgba(0,255,0,0)","height":"50px"})
    placeTextNew({"divid":"topInfo2","text":"Payoff this match: "+window.state["matchPayoff"],"top":"0px","fontSize":"150%","color":"black","width":"480px","textAlign":"center","left":"400px","backgroundColor":"rgba(0,255,0,0)","height":"50px"})
    placeTextNew({"divid":"topInfo3","text":"Total Earned Today: "+window.state["totalPayoff"],"top":"0px","fontSize":"150%","color":"green","width":"400px","textAlign":"center","left":"880px","backgroundColor":"rgba(0,255,0,0)","height":"50px"})
}

function drawGame(){
    //Create Game div
    var gameTable=createAndAddDiv("gameTable","mainDiv");
    if(window.state['payoffs']==undefined){
        window.state['payoffs']=[];
        window.state['payoffs'][0]=[1,2,0,4];
        window.state['payoffs'][1]=[1,2,0,4];
        window.state['payoffs'][2]=[1,2,0,4];
        window.state['payoffs'][3]=[1,2,0,4];
    }
    if (window.state['actionProfileFrequencies']==undefined){
        window.state['actionProfileFrequencies']=[0,0,0,0]
    }

    table=[['My Choice','wSquare','wSquare','ySquare','ySquare'],
        ['Other\'s Choice','wSquare','ySquare','wSquare','ySquare'],
        ['My Payoff',window.state['payoffs'][0][0],window.state['payoffs'][1][0],window.state['payoffs'][2][0],window.state['payoffs'][3][0]],
        ['Other\'s Payoff',window.state['payoffs'][0][1],window.state['payoffs'][1][1],window.state['payoffs'][2][1],window.state['payoffs'][3][1]],
        ['Occurrences',window.state['actionProfileFrequencies'][0],window.state['actionProfileFrequencies'][1],window.state['actionProfileFrequencies'][2],window.state['actionProfileFrequencies'][3]]
    ]
    for(row=0;row<table.length;row++){
        for(col=0;col<table[row].length;col++){
            var entryDiv=createAndAddDiv("gameTable_"+row+"_"+col,"gameTable")
            if(col==0){
                entryDiv.className="entry entryTitle"
                entryDiv.innerHTML=table[row][col];
                entryDiv.style.transform="translate3d(0px,"+(row*50)+"px,0px)";
            }
            else{
                entryDiv.style.transform="translate3d("+(100+col*50)+"px,"+(row*50)+"px,0px)";
                if(table[row][col]=="wSquare"){
                    entryDiv.className="wSquare square"                
                }
                else if(table[row][col]=="ySquare"){
                    entryDiv.className="ySquare square"
                }
                else{
                    entryDiv.className="entry"
                    entryDiv.innerHTML=table[row][col];
                }
            }
        }
    }
}


function deleteRule(args){
    var thisConstructor=args[0];
    var message={"type":"deleteRule","rule":thisConstructor};
    sock.send(JSON.stringify(message));
}

function switchRules(){
    var message={"type":"switchRuleOutput","thisRule":window.ruleConstructor};
    sock.send(JSON.stringify(message));
    window.ruleConstructor=[[-1,-1],[-1]];
    drawConstructor();
}

function addRule(){
    var message={"type":"addRule","thisRule":window.ruleConstructor};
    sock.send(JSON.stringify(message));
    window.ruleConstructor=[[-1,-1],[-1]];
    drawConstructor();
}


function setConstructor(args){
    thisConstructor=JSON.parse(JSON.stringify(args[0]));
    window.ruleConstructor=thisConstructor;
    drawConstructor();
}


function drawConstructor(){
    //Set constructor if not already set.
    if(window.ruleConstructor==undefined){
        window.ruleConstructor=[[-1,-1],[-1]];
    }

    //Create entire Div
    constructorDiv=createAndAddDiv("ruleConstructor","mainDiv");
    constructorDiv.className = "constructor";

    //Create ConstructorIn div (so that you can scroll on long slider)
    constructorIn2=createAndAddDiv("ruleConstructorIn2","ruleConstructor")
    constructorIn=createAndAddDiv("ruleConstructorIn","ruleConstructorIn2")
    constructorIn2.className = "constructorIn2";
    constructorIn.className = "constructorIn";

    if(window.ruleConstructor.length*50>525){  
        constructorIn.setAttribute("style","width:"+(window.ruleConstructor.length+3)*50+"px");
        constructorIn.style.left="0px";
    }
    else{
        constructorIn.setAttribute("style","width:"+(window.ruleConstructor.length+1)*50+"px");        
        constructorIn.style.left=((730-(window.ruleConstructor.length+1)*50)/2)+"px";
    }

    //plus button
    plusButton=createAndAddDiv("plusConstructorButton","ruleConstructorIn")
    plusButton.className="plusConstructorButton constructorButton";
    plusButton.style.transform="translate3d(0px,80px,0px)";
    clickButton("many","plusConstructorButton",constructorPlusMinus,"+",-1);


    for(col=0;col<window.ruleConstructor.length;col++){
        if(window.ruleConstructor.length-col>2 && window.ruleConstructor.length>2){
            var minusButton = createAndAddDiv("minusConstructorButton_"+col,"ruleConstructorIn");
            minusButton.className="minusConstructorButton constructorButton";
            clickButton("many","minusConstructorButton_"+col,constructorPlusMinus,"-",col);
            minusButton.style.transform="translate3d("+(col*50+60)+"px,0px,0px)";
        }
        for(row=0;row<window.ruleConstructor[col].length;row++){
            action=actionFromInteger(window.ruleConstructor[col][row]);
            var s = createAndAddDiv("square_"+col+"_"+row,"ruleConstructorIn")
            clickButton("many","square_"+col+"_"+row,changeConstructorEntry,s.id,row,col);
            s.className=action+"Square square";
            s.style.transform="translate3d("+(50+col*50)+"px,"+(50*row+50)+"px,0px)";
        }
    }

    drawConstructorSubmitButton();
}

function constructorPlusMinus(args){
    changeType=args[0];
    column=args[1];
    if(changeType=="+"){
        var additional=[[-1,-1]];
        var added=additional.concat(window.ruleConstructor);
        window.ruleConstructor=added;
    }    
    else if(changeType=="-"){
        window.ruleConstructor.splice(column,1);
    }
    drawConstructor();
}


thisStatus=[]

function drawDefault(){
    placeTextNew({"divid":"setDefaultDiv","text":"","top":"899px","fontSize":"100%","color":"black","width":"200px","textAlign":"center","left":"0px","backgroundColor":"rgba(255,255,255,1)","height":"125px"});
    placeTextNew({"divid":"setDefaultTitle","text":"Default Rule","top":"0px","fontSize":"100%","color":"black","width":"200px","textAlign":"center","left":"0px","backgroundColor":"rgba(0,255,0,0)","height":"50px","parentDiv":"setDefaultDiv"});

    var s = createAndAddDiv("chooseDefault0","setDefaultDiv");
    clickButton("many","chooseDefault0",setDefault,"setDefault",0);
    s.className = "wSquare square";
    s.style.transform="translate3d(-65px,50px,0px)";

    var s = createAndAddDiv("chooseDefault1","setDefaultDiv");
    clickButton("many","chooseDefault1",setDefault,"setDefault",1);
    s.className = "ySquare square";
    s.style.transform="translate3d(15px,50px,0px)";


    if(window.state['defaultRule']==0){
        var thisLeft="33px";
    }
    else if(window.state['defaultRule']==1){
        var thisLeft="113px";
    }

    if(thisLeft!=undefined){
        placeTextNew({"divid":"defaultRuleHighlight","border":"5px solid green","top":"48px","left":thisLeft,"parentDiv":"setDefaultDiv","width":"54px","height":"54px"});
    }
}

function drawFirstPeriod(){
    placeTextNew({"divid":"setFirstPeriodDiv","text":"","top":"774px","fontSize":"100%","color":"black","width":"200px","textAlign":"center","left":"0px","backgroundColor":"rgba(255,255,255,1)","height":"125px"});
    placeTextNew({"divid":"setFirstPeriodTitle","text":"First Period Rule","top":"0px","fontSize":"100%","color":"black","width":"200px","textAlign":"center","left":"0px","backgroundColor":"rgba(0,255,0,0)","height":"50px","parentDiv":"setFirstPeriodDiv"});

    var s = createAndAddDiv("chooseFirstPeriod0","setFirstPeriodDiv");
    clickButton("many","chooseFirstPeriod0",setDefault,"setFirstPeriod",0);
    s.className = "wSquare square";
    s.style.transform="translate3d(-65px,50px,0px)";

    var s = createAndAddDiv("chooseFirstPeriod1","setFirstPeriodDiv");
    clickButton("many","chooseFirstPeriod1",setDefault,"setFirstPeriod",1);
    s.className = "ySquare square";
    s.style.transform="translate3d(15px,50px,0px)";


    if(window.state['firstPeriodRule']==0){
        var thisLeft="33px";
    }
    else if(window.state['firstPeriodRule']==1){
        var thisLeft="113px";
    }

    if(thisLeft!=undefined){
        placeTextNew({"divid":"firstPeriodRuleHighlight","border":"5px solid green","top":"48px","left":thisLeft,"parentDiv":"setFirstPeriodDiv","width":"54px","height":"54px"});
    }
}


function actionFromInteger(actionIN){
    if(actionIN==0){action="w";}
    else if(actionIN==1){action="y";}
    else if(actionIN==-1){action="q";}
    return action
}

function drawRule(constructor,ruleDivName,addToDiv,clickable,highlight){
    //Create ConstructorIn div
    var ruleDiv = createAndAddDiv(ruleDivName,addToDiv)
    ruleDiv.className = "rule";
    ruleDiv.setAttribute("style","width:"+(constructor.length)*50+"px");        
    for(col=0;col<constructor.length;col++){
        for(row=0;row<constructor[col].length;row++){
            high=""
            action=actionFromInteger(constructor[col][row]);
            if(highlight==1){high=" highlight";}
            var thisSquareId=ruleDivName+"_col_"+col+"_row_"+row;
            var thisButton=createAndAddDiv(thisSquareId,ruleDivName);
            thisButton.className =action+"Square square"+high;
            if(clickable==1){
                clickButton("many",thisSquareId,changeSquareType,thisSquareId);
            }
            thisButton.style.transform="translate3d("+(col*50)+"px,"+(row*50)+"px,0px)";
        }
    }
    return ruleDivName
}

function changeSquareType(squareID){
    var thisClassName=document.getElementById(squareID).className;
    if(thisClassName[0]=="w"){
        document.getElementById(squareID).className="y"+thisClassName.substring(1);
    }
    else if(thisClassName[0]=="y"){
        document.getElementById(squareID).className="w"+thisClassName.substring(1);
    }
    else{
        document.getElementById(squareID).className="w"+thisClassName.substring(1);
    }

}


function drawListEntry(thisInfo){
    //#each entry in the list should be like: [number,title,constructor,lastPlayed,totalPlayed]
    var thisConstructor=thisInfo[2];
    var lastPlayed=thisInfo[3];
    var totalPlayed=thisInfo[4];
    var title=thisInfo[1];
    var ruleNumber=thisInfo[0];

    var listEntry = createAndAddDiv("listEntry_"+ruleNumber,"ruleList");
    listEntry.className = "listEntry";
    listEntry.setAttribute("style","width:"+(thisConstructor.length+1.5)*50+"px");        

    //draw Buttons if needed, or add spacing
    if(ruleNumber=="default0" || ruleNumber=="default1"){
        var listEntryNoButtons = createDiv("listEntryNoButtons_"+ruleNumber,"listEntry_"+ruleNumber);
        listEntryNoButtons.className = "listEntryNoButtons";
    }
    else if(ruleNumber=="firstPeriod0" || ruleNumber=="firstPeriod1"){
        var listEntryNoButtons = createDiv("listEntryNoButtons_"+ruleNumber,"listEntry_"+ruleNumber);
        listEntryNoButtons.className = "listEntryNoButtons";
    }
    else{
        var listEntryCopyButton = createAndAddDiv("listEntryCopyButton_"+ruleNumber,"listEntry_"+ruleNumber);
        listEntryCopyButton.className = "listEntryCopyButton listEntryButton";
        listEntryCopyButton.style.transform="translate3d(15px,35px,0px)";
        listEntryCopyButton.innerHTML=String.fromCharCode(parseInt('2398',16));
        clickButton("many","listEntryCopyButton_"+ruleNumber,setConstructor,thisConstructor);


        var listEntryDeleteButton = createAndAddDiv("listEntryDeleteButton_"+ruleNumber,"listEntry_"+ruleNumber);
        listEntryDeleteButton.className = "listEntryDeleteButton listEntryButton";
        listEntryDeleteButton.style.transform="translate3d(15px,85px,0px)";
        listEntryDeleteButton.innerHTML=String.fromCharCode(parseInt('2718',16));
        clickButton("many","listEntryDeleteButton_"+ruleNumber,deleteRule,thisConstructor);
    }



    //draw rule
    drawRule(thisConstructor,"rule_"+ruleNumber,"listEntry_"+ruleNumber,0,0);
    if(ruleNumber=="default0" || ruleNumber=="default1"){
        document.getElementById("rule_"+ruleNumber).style.transform="translate3d(37px,50px,0px)";
    }
    else if(ruleNumber=="firstPeriod0" || ruleNumber=="firstPeriod1"){
        document.getElementById("rule_"+ruleNumber).style.transform="translate3d(37px,50px,0px)";
    }
    else{
        document.getElementById("rule_"+ruleNumber).style.transform="translate3d(60px,25px,0px)";
    }


    var listEntryTitle = createAndAddDiv("listEntryTitle_"+ruleNumber,"listEntry_"+ruleNumber);
    listEntryTitle.className = "listEntryTitle";
    listEntryTitle.innerHTML = title;

    var listEntryStats = createAndAddDiv("listEntryStats_"+ruleNumber,"listEntry_"+ruleNumber);
    listEntryStats.className = "listEntryStats";
    listEntryStats.setAttribute("style","width:"+listEntry.width+"px");        
    listEntryStats.innerHTML = "Last: "+lastPlayed+"  Total: "+totalPlayed;
}


function drawRules(){
    // window.state['rules']
    var ruleList=createAndAddDiv("ruleList","mainDiv");
    var ruleListIn=createAndAddDiv("ruleListIn","ruleList");

    for(var k=0;k<window.state['ruleInfo'].length;k++){
        var thisInfo=window.state['ruleInfo'][k];
        drawListEntry(thisInfo);
    }
    if(window.state['nextChoiceInfo']!=undefined){
        highlightRule();        
    }
}


function highlightGame(){
    if(document.getElementById("gameHighlight")!=null){
        var element = document.getElementById("gameHighlight");
        element.parentNode.removeChild(element);
    }

    var gameHighlight = document.createElement("div");
    gameHighlight.className="gameHighlight";
    gameHighlight.id="gameHighlight";
    gameHighlight.style.left=200+"px"
    $('#gameTable').append(gameHighlight);
}


function drawRuleHighlight(ruleWidth,divName,parentDiv){
    console.log(ruleWidth,divName,parentDiv);
    var ruleHighlight = createAndAddDiv(divName,parentDiv);
    ruleHighlight.className="ruleHighlight";
    if(ruleWidth>50){
        var TL = createAndAddDiv(divName+"_tl",divName);
        var B = createAndAddDiv(divName+"_b",divName);
        var R = createAndAddDiv(divName+"_r",divName);
        TL.className="ruleHighlightTopleft";
        B.className="ruleHighlightBottom";
        R.className="ruleHighlightRight";

        borderWidth=4;
        ruleHighlight.style.width=ruleWidth+"px";
        TL.style.width=ruleWidth+"px";
        B.style.width=(ruleWidth-50)+"px";
        R.style.left=(ruleWidth-50-borderWidth)+"px";
    }
    else{
        var DH = createAndAddDiv(divName+"_dh",divName);
        DH.className="ruleHighlightDefault";
    }

}

function highlightRule(){
    var thisRuleDiv="listEntry_"+window.state['nextChoiceInfo']['number'];
    console.log(doesDivExist(thisRuleDiv));
    if(doesDivExist(thisRuleDiv)){
        document.getElementById(thisRuleDiv).style.backgroundColor="rgba(0,255,0,.1)";
        document.getElementById(thisRuleDiv).style.borderColor="rgba(0,255,0,1)";
        var ruleWidth=window.state['nextChoiceInfo']['length']*50+50;
        drawRuleHighlight(ruleWidth,"listRuleHighlight",thisRuleDiv);
        if(ruleWidth>50){
            document.getElementById("listRuleHighlight") .style.left="60px"
            document.getElementById("listRuleHighlight") .style.top="24px"
        }
        else{
            document.getElementById("listRuleHighlight") .style.left="37px"
            document.getElementById("listRuleHighlight") .style.top="49px"
        }   
    }
}


function highlightHistory(){
    var ruleWidth=window.state['nextChoiceInfo']['length']*50+50;
    drawRuleHighlight(ruleWidth,"historyRuleHighlight","historyIN");
    var translateAmount=(window.state['period']+2)*50-ruleWidth;
    document.getElementById("historyRuleHighlight").style.transform="translate3d("+translateAmount+"px,25px,0px)";
}



function setDefault(args){
    var defaultOrFirstPeriod=args[0];//setDefault or setFirstPeriod
    var thisChoice=args[1];
    var message={"type":"setDefault","thisRule":thisChoice,"defaultType":defaultOrFirstPeriod};
    sock.send(JSON.stringify(message));
}



function changeConstructorEntry(args){

    squareId=args[0];
    row=args[1];
    column=args[2];

    var thisSquare=document.getElementById(squareId);
    if(window.ruleConstructor[column][row]==0){
        window.ruleConstructor[column][row]=1;
    }
    else if(window.ruleConstructor[column][row]==1){
        window.ruleConstructor[column][row]=0;
    }
    else if(window.ruleConstructor[column][row]==-1){
        window.ruleConstructor[column][row]=Math.floor(Math.random()*2);
    }

    if(window.ruleConstructor[column][row]==0){
        thisSquare.className="wSquare square";        
    }
    else if(window.ruleConstructor[column][row]==1){
        thisSquare.className="ySquare square";
    }
    drawConstructorSubmitButton();
}


function drawConstructorSubmitButton(){
    deleteDiv('constructorSwitchButton');
    deleteDiv('constructorSubmitButton');

    error=testConstructor();
    constructorSubmitButton=createAndAddDiv("constructorSubmitButton","ruleConstructor");
    constructorSubmitButton.className="constructorSubmitButton";
    if(error==1){
        constructorSubmitButton.innerHTML="You must set an action in each box of the rule.";
        constructorSubmitButton.style.backgroundColor="rgba(255,0,0,.2)";
    }
    else if(error==2){
        constructorSubmitButton.innerHTML="Conflicting rule in set.";
        constructorSubmitButton.style.backgroundColor="rgba(255,0,0,.2)";
    
        switchRulesButton=createAndAddDiv("constructorSwitchButton","ruleConstructor")
        switchRulesButton.className="constructorSwitchButton";
        switchRulesButton.innerHTML="Switch Rules";
        switchRulesButton.style.backgroundColor="rgba(0,255,0,.2)";
        clickButton("once","constructorSwitchButton",switchRules);
    }
    else if(error==3){
        constructorSubmitButton.innerHTML="Rule already in set.";
        constructorSubmitButton.style.backgroundColor="rgba(255,0,0,.2)";
    }
    else{
        constructorSubmitButton.innerHTML="Add Rule";
        constructorSubmitButton.style.backgroundColor="rgba(0,255,0,.2)";
        clickButton("once","constructorSubmitButton",addRule);
    }
    constructorSubmitButton.style.fontSize="125%";
}



function drawHistory(){
    historyDiv=createAndAddDiv("history","mainDiv");
    historyIN=createAndAddDiv("historyIN","history");
    historyDiv.className="history";
    drawHistoryLabels();
    for(var period=window.state['history'].length-30;period<window.state['history'].length;period++){
        if(period>-1){
            drawHistoryEntry(period+1,window.state['history'][period],window.state['payoffHistory'][period][0]);
        }
    }
    document.getElementById("historyIN").style.transform="translateX("+(1150-window.state['period']*50)+"px)";

    if(window.state['animate']=="yes"){
        document.getElementById("historyIN").style.transform="translateX("+(1150-window.state['period']*50+50)+"px)";
        setTimeout(function(){
            document.getElementById("historyIN").style.transform="translateX("+(1150-window.state['period']*50)+"px)";
            document.getElementById("historyIN").style.transition = "transform 0.25s ease";
        },0);
        setTimeout(function(){
        highlightHistory();
        },250);
        drawNextAction();
    }
    else if(window.state['animate']=="no" || window.state['animate']==undefined){
        drawNextAction();
        highlightHistory();
    }

}


function drawNextAction(){
    var translateAmount=(window.state['period']+1)*50;
    historyLabel=createAndAddDiv("historyPeriodLabel_"+(window.state['period']+1),"historyIN")
    historyLabel.style.transform="translateX("+translateAmount+"px)";
    historyLabel.innerHTML=Math.max(window.state['period'],1);//ensure that period 0 will never be displayed
    historyLabel.className="historyPeriodLabel";


    var divID='history_square_'+(window.state['period']+1)+'_0';
    s=createAndAddDiv(divID,"historyIN")
    if(window.state['confirmed']=="no"){
        s.className =actionFromInteger(window.state['nextChoiceInfo']['action'])+"Square square proposed";
        s.style.transform="translate3d("+translateAmount+"px,25px,0px)";
        clickButton("once",divID,confirmChoice);
    }
    else if(window.state['confirmed']=="yes"){
        s.className =actionFromInteger(window.state['nextChoiceInfo']['action'])+"Square square confirmed";
        s.style.transform="translate3d("+translateAmount+"px,25px,0px)";
        clickButton("many",divID,alreadySubmitted,"Already made choice");
    }
}



function drawHistoryEntry(period,choices,payoff){
    var translateAmount=(period)*50+50;
    historyLabel=createAndAddDiv("historyPeriodLabel_"+period,"historyIN")
    historyLabel.style.transform="translateX("+translateAmount+"px)";
    historyLabel.innerHTML=period;
    historyLabel.className="historyPeriodLabel";

    s=createAndAddDiv("history_square_"+period+"_0","historyIN")
    s.className =actionFromInteger(choices[0])+"Square square";
    s.style.transform="translate3d("+translateAmount+"px,25px,0px)";

    s=createAndAddDiv("history_square_"+period+"_1","historyIN")
    s.className =actionFromInteger(choices[1])+"Square square";
    s.style.transform="translate3d("+translateAmount+"px,75px,0px)";


    payoffLabel=createAndAddDiv("historyPayoffLabel_"+period,"historyIN")
    payoffLabel.style.transform="translate3d("+translateAmount+"px,125px,0px)";
    payoffLabel.className="historyPayoffLabel";
    payoffLabel.innerHTML=payoff;
}


function drawHistoryLabels(type){
    var historyLabelPeriod=createAndAddDiv("historyLabelPeriod","history");
    historyLabelPeriod.className="historyLabels short";
    historyLabelPeriod.innerHTML="Period";

    var historyLabelMyChoice=createAndAddDiv("historyLabelMyChoice","history");
    historyLabelMyChoice.className="historyLabels tall";
    historyLabelMyChoice.innerHTML="My Choice";

    var historyLabelOtherChoice=createAndAddDiv("historyLabelOtherChoice","history");
    historyLabelOtherChoice.className="historyLabels tall";
    historyLabelOtherChoice.innerHTML="Other's Choice";

    var historyLabelPayoff=createAndAddDiv("historyLabelPayoff","history");
    historyLabelPayoff.className="historyLabels short";
    historyLabelPayoff.innerHTML="My Payoff";
}


function alreadySubmitted(message){
    placeTextNew({"divid":"alreadySubmittedMessage","text":message,"border":"1px solid green","top":"125px","fontSize":"100%","color":"black","width":"150px","textAlign":"center","left":"1125px","backgroundColor":"rgba(225,255,225,1)","height":"50px"})
    setTimeout(function(){
        document.getElementById('alreadySubmittedMessage').style.transform="translateX(300px)";
        document.getElementById("alreadySubmittedMessage").style.transition="transform 1s linear";
        document.getElementById("alreadySubmittedMessage").style.transitionDelay=".0015s";
    },1000);
}


function confirmChoice(){
    deleteWarning();
    var message={"type":"confirmChoice"};
    sock.send(JSON.stringify(message));
}

function drawWarningMessage(){
    if(window.state['warning']=="yes"){
        var thisDiv=createAndAddDiv("makeChoiceWarning","mainDiv");
        thisDiv.className = "arrow_box arrow_box_right";
        thisDiv.innerHTML = "Choice will be made automatically in <br> <time id='selfTimer'>1:00</time>";
        thisDiv.style.left="975px";
        thisDiv.style.top="50px";
        thisDiv.style.opacity="0.85";
        thisDiv.style.backgroundColor="white";
        moveTimer("selfTimer");
    }
}

function deleteWarning(){
    deleteDiv("makeChoiceWarning");
}





function placeTextNew(incoming){
    if(incoming['divid']==undefined){
        incoming['divid']="randomDiv"+parseInt(Math.random()*10000000000);
    }
    if(incoming['top']==undefined){
        incoming['top']="0px";
    }
    if(incoming['fontSize']==undefined){
        incoming['fontSize']="100%";
    }
    if(incoming['width']==undefined){
        incoming['width']="100%";
    }
    if(incoming['textAlign']==undefined){
        incoming['textAlign']="center";
    }
    if(incoming['color']==undefined){
        incoming['color']="black";
    }
    if(incoming['fadeTime']==undefined){
        incoming['fadeTime']=".01";
    }
    if(incoming['height']==undefined){
        incoming['height']="50px";
    }
    if(incoming['lineHeight']==undefined){
        incoming['lineHeight']=incoming['height'];
    }
    if(incoming['backgroundColor']==undefined){
        incoming['backgroundColor']="transparent";
    }
    if(incoming['border']==undefined){
        incoming['border']="0px solid black";
    }
    if(incoming['parentDiv']==undefined){
        incoming['parentDiv']="mainDiv";
    }
    if(incoming['text']==undefined){
        incoming['text']="";
    }


    var textDiv=createAndAddDiv(incoming["divid"],incoming['parentDiv']);
    textDiv.innerHTML=incoming['text'];
    textDiv.style.opacity="1";
    textDiv.style.top=incoming['top'];
    textDiv.style.width=incoming['width'];
    textDiv.style.height=incoming['height'];
    textDiv.style.lineHeight=incoming['lineHeight'];
    textDiv.style.fontSize=incoming['fontSize'];
    textDiv.style.left=incoming['left'];
    textDiv.style.textAlign=incoming["textAlign"];
    textDiv.style.color=incoming["color"];
    textDiv.style.position="absolute";
    textDiv.style.border=incoming['border'];
    textDiv.style.backgroundColor=incoming['backgroundColor'];
    // setTimeout(function(){
    //     document.getElementById(incoming["divid"]).style.opacity = "1";
    //     document.getElementById(incoming["divid"]).style.transition = "opacity "+incoming["fadeTime"]+"s ease";
    // },50);
}

function clickStatusBackButton(){
    var message={"type":"clickStatusBackButton"};
    sock.send(JSON.stringify(message));
}

function clickStatusForwardButton(){
    var message={"type":"clickStatusForwardButton"};
    sock.send(JSON.stringify(message));
}


function drawBackAndForwardButtons(){
    placeTextNew({"divid":"clickStatusBackButton","text":"Back","top":"974px","fontSize":"200%","color":"green","width":"100px","textAlign":"center","left":"0px","backgroundColor":"rgba(0,255,0,.1)","height":"50px"})
    clickButton("once","clickStatusBackButton",clickStatusBackButton);
    placeTextNew({"divid":"clickStatusForwardButton","text":"Forward","top":"974px","fontSize":"200%","color":"green","width":"100px","textAlign":"center","left":"1180px","backgroundColor":"rgba(0,255,0,.1)","height":"50px"})
    clickButton("once","clickStatusForwardButton",clickStatusForwardButton);
}


function instructionsRulesFirst(){
    clearAll();
    drawBackAndForwardButtons();


    if(window.state['stage']>=1){
        placeTextNew({"top":"100px","text":"Each period, you and the subject that you are matched with will make a choice of either <div class='wSquare square' style='margin-top:15px;margin-left:25px;font-size:50%;transform:scale(1.25);'></div> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; or <div class='ySquare square' style='margin-top:15px;margin-left:25px;font-size:50%;transform:scale(1.25);'></div> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; and get the corresponding payoff from the payoff table.","fontSize":"300%","color":"black","width":"1105px","left":"75px","textAlign":"left","height":"75px"})
    }
    if(window.state['stage']>=2){
        placeTextNew({"top":"400px","text":"Rather than directly making choices each period, you will develop a set of rules that can make choices for you automatically.","fontSize":"300%","color":"black","width":"1105px","left":"75px","textAlign":"left","height":"75px"})
    }
    if(window.state['stage']>=3){
        placeTextNew({"text":"","top":"675px","fontSize":"300%","backgroundColor":"rgba(255,0,0,.1)","height":"150px"})
        placeTextNew({"text":"Rule:","top":"700px","fontSize":"300%","color":"red","width":"200px","textAlign":"right","left":"0px"})
        placeTextNew({"text":"a program that can automatically make a choice for you after certain actions have been played.","top":"700px","fontSize":"300%","color":"black","width":"960px","textAlign":"left","left":"220px"})
    }


    if(window.state['stage']==1){
        placeTextNew({"top":"400px","divid":"continueButton","text":"Click Here to Continue","fontSize":"300%","color":"green","width":"600px","textAlign":"center","left":"340px","backgroundColor":"rgba(0,255,0,.1)","height":"100px"})
        clickButton("once","continueButton",makeSelection,[["stage",2]]);
    }   
    else if(window.state['stage']==2){
        placeTextNew({"top":"700px","divid":"continueButton","text":"Click here to get the definition of a rule.","fontSize":"300%","color":"green","width":"800px","textAlign":"center","left":"240px","backgroundColor":"rgba(0,255,0,.1)","height":"100px"})
        clickButton("once","continueButton",makeSelection,[["stage",3]]);
    }   
    else if(window.state['stage']==3){
        placeTextNew({"top":"875px","divid":"continueButton","text":"Click here to learn more about rules.","fontSize":"300%","color":"green","width":"800px","textAlign":"center","left":"240px","backgroundColor":"rgba(0,255,0,.1)","height":"100px"})
        clickButton("once","continueButton",makeSelection,[["page","instructionsRules"],["stage",1]]);
    }   


}

function instructionsRules(){
    clearAll();
    drawBackAndForwardButtons();
    //placeText("gameTableTitle","Game Table",50,200,"red",1);
    //function drawRule(constructor,ruleDivName,addToDiv,clickable,highlight){

    if(window.state['stage']>=1){
        placeTextNew({"text":"","top":"0px","fontSize":"300%","backgroundColor":"rgba(255,0,0,.1)","height":"150px"})
        placeTextNew({"text":"Rule:","top":"25px","fontSize":"300%","color":"red","width":"200px","textAlign":"right","left":"0px"})
        placeTextNew({"text":"a program that can automatically make a choice for you after certain actions have been played.","top":"25px","fontSize":"300%","color":"black","width":"960px","textAlign":"left","left":"220px"})
    }

    if(window.state['stage']>=2){
        drawRule([[0,1],[1,1],[0]],"testRule","mainDiv",0,0)
        document.getElementById("testRule").style.transform="translate3d(565px,225px,0px) scale(2)";
    }

    if(window.state['stage']>=3){
        placeTextNew({"divid":"ruleHasTwoParts","text":"A rule consists of two parts: the input sequence and the output action. ","top":"400px","fontSize":"300%","color":"black","width":"1280px","textAlign":"center","left":"0px","backgroundColor":"rgba(0,0,0,0)","height":"100px"})
        placeTextNew({"divid":"inputSequenceText","text":"Input Sequence","top":"725px","fontSize":"300%","color":"black","width":"400px","textAlign":"center","left":"290px","backgroundColor":"rgba(0,0,0,0)","height":"100px"})
        drawRule([[0,1],[1,1]],"testRuleInput","mainDiv",1,0)
        document.getElementById("testRuleInput").style.transform="translate3d(440px,475px,0px) scale(2)";

        placeTextNew({"divid":"outputSequenceText","text":"Output Action","top":"725px","fontSize":"300%","color":"black","width":"400px","textAlign":"center","left":"660px","backgroundColor":"rgba(0,0,0,0)","height":"100px"})
        drawRule([[0]],"testRuleOutput","mainDiv",0,0)
        document.getElementById("testRuleOutput").style.transform="translate3d(840px,375px,0px) scale(2)";
    }

    if(window.state['stage']>=4){
        placeTextNew({"divid":"inputOutputExplaination","text":"The rule will play the output action after the input sequence has occurred.","top":"825px","fontSize":"300%","color":"black","width":"1280px","textAlign":"center","left":"0px","backgroundColor":"rgba(0,0,0,0)","height":"100px"})
    }


    if(window.state['stage']==1){
        placeTextNew({"divid":"continueButton","text":"Click Here to See A Rule","top":"225px","fontSize":"300%","color":"green","width":"600px","textAlign":"center","left":"340px","backgroundColor":"rgba(0,255,0,.1)","height":"100px"})
        clickButton("once","continueButton",makeSelection,[["stage",2]]);
    }   
    else if(window.state['stage']==2){
        placeTextNew({"divid":"continueButton","text":"Click Here to Explain The Rule","top":"475px","fontSize":"300%","color":"green","width":"600px","textAlign":"center","left":"340px","backgroundColor":"rgba(0,255,0,.1)","height":"100px"})
        clickButton("once","continueButton",makeSelection,[["stage",3]]);
    }
    else if(window.state['stage']==3){
        placeTextNew({"divid":"continueButton","text":"Click Here to Explain The Input and Output","top":"875px","fontSize":"300%","color":"green","width":"800px","textAlign":"center","left":"240px","backgroundColor":"rgba(0,255,0,.1)","height":"100px"})
        clickButton("once","continueButton",makeSelection,[["stage",4]]);
    }
    else if(window.state['stage']==4){
        placeTextNew({"divid":"continueButton","text":"Click Here to Continue","top":"925px","fontSize":"300%","color":"green","width":"600px","textAlign":"center","left":"340px","backgroundColor":"rgba(0,255,0,.1)","height":"100px"})
        clickButton("once","continueButton",makeSelection,[["page","fitTheHistoryInstructions"],["stage",1]]);
    }

}


function fitTheHistoryInstructions(){
    clearAll();
    drawBackAndForwardButtons();
    //placeText("gameTableTitle","Game Table",50,200,"red",1);

    if(window.state['stage']>=1){
        placeTextNew({"text":"","top":"0px","fontSize":"300%","backgroundColor":"rgba(255,0,0,.1)","height":"150px"})
        placeTextNew({"text":"Fit the history:","top":"25px","fontSize":"300%","color":"red","width":"275px","textAlign":"right","left":"0px"})
        placeTextNew({"text":"a rule is said to fit the history if the input sequence for the rule is the same as the end of the history.","top":"25px","fontSize":"300%","color":"black","width":"960px","textAlign":"left","left":"300px"})
    }
    if(window.state['stage']>=2){
        placeTextNew({"divid":"div1","text":"Suppose the history looks like this:","top":"150px","fontSize":"300%","color":"black","width":"1280px","textAlign":"center","left":"0px","backgroundColor":"rgba(0,0,0,0)","height":"100px"})
        drawHistory();        
        document.getElementById("history").style.transform="translate3d(0px,250px,0px) scale(1)";
    }
    if(window.state['stage']>=3 && window.state['stage']<=4){

        var statement="The above rule DOES fit the history, because the rule's input sequence:"
        var statement2="is the same as the actions played at the end of the history (periods 48 and 49):"
        placeTextNew({"divid":"fitRuleText","text":statement,"top":"675px","fontSize":"200%","color":"black","width":"540px","textAlign":"left","left":"40px","backgroundColor":"rgba(0,0,0,0)","height":"35px"})
        placeTextNew({"divid":"fitRuleText2","text":statement2,"top":"800px","fontSize":"200%","color":"black","width":"540px","textAlign":"left","left":"40px","backgroundColor":"rgba(0,0,0,0)","height":"35px"})
        drawRule([[0,0],[0,1]],"fitruleinput","fitRuleText",0,0)
        document.getElementById("fitruleinput").style.fontSize="50%";
        document.getElementById("fitruleinput").style.transform="translate3d(370px,-50px,0px) scale(.5)";

        drawRule([[0,0],[0,1]],"fitrulehistory","fitRuleText2",0,0)
        document.getElementById("fitrulehistory").style.fontSize="50%";
        document.getElementById("fitrulehistory").style.transform="translate3d(370px,-50px,0px) scale(.5)";



        drawRule([[0,0],[0,1],[1]],"testRule","mainDiv",0,0)
        document.getElementById("testRule").style.transform="translate3d(225px,350px,0px) scale(2)";




    }
    if(window.state['stage']==4){
        var statement="The above rule DOES NOT fit the history, because the rule's input sequence:"
        var statement2="is different than the actions played at the end of the history (periods 48 and 49):"
        placeTextNew({"divid":"div222","text":statement,"top":"675px","fontSize":"200%","color":"black","width":"540px","textAlign":"left","left":"690px","backgroundColor":"rgba(0,0,0,0)","height":"35px"})

        placeTextNew({"divid":"div2222","text":statement2,"top":"800px","fontSize":"200%","color":"black","width":"540px","textAlign":"left","left":"690px","backgroundColor":"rgba(0,0,0,0)","height":"35px"})
        drawRule([[0,1],[1,1]],"testRule22","div222",0,0)
        document.getElementById("testRule22").style.fontSize="50%";
        document.getElementById("testRule22").style.transform="translate3d(370px,-50px,0px) scale(.5)";

        drawRule([[0,0],[0,1]],"testRule223","div222",0,0)
        document.getElementById("testRule223").style.fontSize="50%";
        document.getElementById("testRule223").style.transform="translate3d(370px,-25px,0px) scale(.5)";



        drawRule([[0,1],[1,1],[1]],"testRule2","mainDiv",0,0)
        document.getElementById("testRule2").style.transform="translate3d(865px,250px,0px) scale(2)";
    }


    if(window.state['stage']==5){
        placeTextNew({"divid":"div32","text":"Some rules that DO fit the history:","top":"400px","fontSize":"200%","color":"black","width":"640px","textAlign":"center","left":"0px","backgroundColor":"rgba(0,0,0,0)","height":"100px"})
        drawRule([[0,1],[0]],"fits1","mainDiv",0,0)
        document.getElementById("fits1").style.fontSize="100%";
        document.getElementById("fits1").style.transform="translate3d(50px,350px,0px)";
        drawRule([[0,1],[1]],"fits2","mainDiv",0,0)
        document.getElementById("fits2").style.fontSize="100%";
        document.getElementById("fits2").style.transform="translate3d(200px,250px,0px)";

        drawRule([[0,0],[0,1],[0]],"fits3","mainDiv",0,0)
        document.getElementById("fits3").style.fontSize="100%";
        document.getElementById("fits3").style.transform="translate3d(350px,150px,0px)";
        drawRule([[0,0],[0,1],[1]],"fits4","mainDiv",0,0)
        document.getElementById("fits4").style.fontSize="100%";
        document.getElementById("fits4").style.transform="translate3d(50px,175px,0px)";

        drawRule([[1,1],[0,0],[0,1],[0]],"fits5","mainDiv",0,0)
        document.getElementById("fits5").style.fontSize="100%";
        document.getElementById("fits5").style.transform="translate3d(250px,75px,0px)";

        drawRule([[0,0],[0,1],[0,0],[1,0],[1,1],[0,0],[0,1],[1]],"fits6","mainDiv",0,0)
        document.getElementById("fits6").style.fontSize="100%";
        document.getElementById("fits6").style.transform="translate3d(50px,100px,0px)";


        placeTextNew({"divid":"div312","text":"Some rules that DO NOT fit the history:","top":"400px","fontSize":"200%","color":"black","width":"640px","textAlign":"center","left":"640px","backgroundColor":"rgba(0,0,0,0)","height":"100px"})


        drawRule([[0,0],[1]],"fits11","mainDiv",0,0)
        document.getElementById("fits11").style.fontSize="100%";
        document.getElementById("fits11").style.transform="translate3d(690px,-250px,0px)";
        drawRule([[1,0],[0]],"fits12","mainDiv",0,0)
        document.getElementById("fits12").style.fontSize="100%";
        document.getElementById("fits12").style.transform="translate3d(840px,-350px,0px)";

        drawRule([[0,0],[1,0],[1]],"fits13","mainDiv",0,0)
        document.getElementById("fits13").style.fontSize="100%";
        document.getElementById("fits13").style.transform="translate3d(990px,-450px,0px)";
        drawRule([[1,0],[0,1],[0]],"fits14","mainDiv",0,0)
        document.getElementById("fits14").style.fontSize="100%";
        document.getElementById("fits14").style.transform="translate3d(690px,-425px,0px)";

        drawRule([[1,0],[0,0],[0,1],[1]],"fits15","mainDiv",0,0)
        document.getElementById("fits15").style.fontSize="100%";
        document.getElementById("fits15").style.transform="translate3d(890px,-525px,0px)";

        drawRule([[0,0],[1,1],[0,0],[1,0],[1,1],[0,0],[0,1],[0]],"fits16","mainDiv",0,0)
        document.getElementById("fits16").style.fontSize="100%";
        document.getElementById("fits16").style.transform="translate3d(690px,-500px,0px)";


    }

    if(window.state['stage']==6){
        drawConstructor();
    }



    if(window.state['stage']==1){
        placeTextNew({"divid":"continueButton","text":"Click here to see example","top":"250px","fontSize":"300%","color":"green","width":"600px","textAlign":"center","left":"340px","backgroundColor":"rgba(0,255,0,.1)","height":"100px"})
        clickButton("once","continueButton",makeSelection,[["stage",2]]);
    }
    else if(window.state['stage']==2){
        placeTextNew({"divid":"continueButton","text":"Click here to see a rule that DOES fit the history","top":"450px","fontSize":"300%","color":"green","width":"900px","textAlign":"center","left":"190px","backgroundColor":"rgba(0,255,0,.1)","height":"100px"})
        clickButton("once","continueButton",makeSelection,[["stage",3]]);
    }
    else if(window.state['stage']==3){
        placeTextNew({"divid":"continueButton","text":"Click here to see rule that DOES NOT fit the history","top":"550px","fontSize":"300%","color":"green","width":"500px","textAlign":"center","left":"670px","height":"150px","lineHeight":"75px","backgroundColor":"rgba(0,255,0,.1)"})
        clickButton("once","continueButton",makeSelection,[["stage",4]]);
    }
    else if(window.state['stage']==4){
        placeTextNew({"divid":"continueButton","text":"Click here to see more examples","top":"925px","fontSize":"300%","color":"green","width":"600px","textAlign":"center","left":"340px","backgroundColor":"rgba(0,255,0,.1)","height":"100px"})
        clickButton("once","continueButton",makeSelection,[["stage",5]]);
    }
    else if(window.state['stage']==5){
        placeTextNew({"divid":"continueButton","text":"Click here for quiz questions","top":"925px","fontSize":"300%","color":"red","width":"600px","textAlign":"center","left":"340px","backgroundColor":"rgba(255,0,0,.1)","height":"100px"})
        clickButton("once","continueButton",makeSelection,[["stage",6]]);
    }



}



function fitTheHistoryExamplesInstructions(){

}


function instructionsHistory(){
    clearAll();
    drawBackAndForwardButtons();
    //placeText("gameTableTitle","Game Table",50,200,"red",1);
    placeTextNew({"text":"History:","top":"25px","fontSize":"300%","color":"red","width":"200px","textAlign":"right","left":"0px"})
    placeTextNew({"text":"a display of the choices and payoffs from every period.","top":"25px","fontSize":"300%","color":"black","width":"960px","textAlign":"left","left":"220px"})


    if(window.state['stage']=="begin"){
        placeTextNew({"divid":"continueButton","text":"Click Here to Show History","top":"225px","fontSize":"300%","color":"green","width":"600px","textAlign":"center","left":"340px","backgroundColor":"rgba(0,255,0,.1)","height":"100px"})
        clickButton("once","continueButton",makeSelection,[["stage","showHistory"]]);
    }   
    else if(window.state['stage']=="showHistory"){
        drawHistory();        
        document.getElementById("history").style.transform="translate3d(0px,100px,0px) scale(1)";
        placeTextNew({"divid":"continueButton","text":"Click Here to Explain History","top":"425px","fontSize":"300%","color":"green","width":"600px","textAlign":"center","left":"340px","backgroundColor":"rgba(0,255,0,.1)","height":"100px"})
        clickButton("once","continueButton",makeSelection,[["stage","explainHistory"],['clickedRows',[0,0,0,0,1]],['currentRow',-1],['allRowClicked','False']]);
    }
    else if(window.state['stage']=="explainHistory"){
        drawHistory();        
        document.getElementById("history").style.transform="translate3d(0px,100px,0px) scale(1)";

        var rows=["historyLabelPeriod","historyLabelMyChoice","historyLabelOtherChoice","historyLabelPayoff"];
        for(var k=0;k<rows.length;k++){
            clickButton("many",rows[k],clickPayoffTableRow,k);
            if(window.state['clickedRows'][k]==0){
                document.getElementById(rows[k]).style.backgroundColor="rgba(225,255,225,.95)";
                document.getElementById(rows[k]).style.color="green";
            }   
        }
        if(window.state['currentRow']==-1){
            placeTextNew({"text":"The history display has 4 rows.","top":"325px","fontSize":"300%","textAlign":"center","height":"100px"});
            placeTextNew({"text":"Click each one of the rows above to get an explanation.","top":"425px","fontSize":"300%","textAlign":"center","height":"100px"});
        }
        else if(window.state['currentRow']==0){
            placeTextNew({"text":"Period","top":"325px","fontSize":"400%","textAlign":"center","height":"100px"});
            placeTextNew({"text":"The period number of the current match.","top":"450px","fontSize":"300%","textAlign":"center","width":"1000px","left":"140px","height":"50px"});
        }
        else if(window.state['currentRow']==1){
            placeTextNew({"text":"My Choice","top":"325px","fontSize":"400%","textAlign":"center","height":"100px"});
            placeTextNew({"text":"Your choice (either W or Y) in the corresponding period.","top":"450px","fontSize":"300%","textAlign":"left","width":"1000px","left":"140px","height":"50px"});
        }
        else if(window.state['currentRow']==2){
            placeTextNew({"text":"Other's Choice","top":"325px","fontSize":"400%","textAlign":"center","height":"100px"});
            placeTextNew({"text":"The choice (either W or Y) of the subject that you are matched with in the corresponding period.","top":"450px","fontSize":"300%","textAlign":"left","width":"1000px","left":"140px","height":"50px"});
        }
        else if(window.state['currentRow']==3){
            placeTextNew({"text":"My Payoff","top":"325px","fontSize":"400%","textAlign":"center","height":"100px"});
            placeTextNew({"text":"The number of points received given your choice and the choice of the subject that you are matched with in the corresponding period.","top":"450px","fontSize":"300%","textAlign":"left","width":"1000px","left":"140px","height":"50px"});
        }
        if(window.state['allRowClicked']=="False"){
            placeTextNew({"text":"Must click all 4 rows to continue.","top":"774px","fontSize":"200%","color":"red","textAlign":"center","height":"50px","left":"100px","width":"1080px"})
        }
        else if(window.state['allRowClicked']=="True"){
            placeTextNew({"divid":"continueButton","text":"Click to continue to example.","top":"724px","fontSize":"200%","color":"green","textAlign":"center","height":"50px","backgroundColor":"rgba(0,255,0,.1)","width":"400px","left":"440px"})
            clickButton("once","continueButton",makeSelection,[["stage","showHistoryExample"]]);

        }
    }
    else if(window.state['stage']=="showHistoryExample"){
        drawHistory();        
        document.getElementById("history").style.transform="translate3d(0px,100px,0px) scale(1)";
        placeTextNew({"text":"Example","top":"300px","fontSize":"400%","textAlign":"center","height":"100px"});
        placeTextNew({"text":"In period <div class='square' style='margin-left:25px;font-size:50%;background-color:white;'>36</div>","top":"450px","fontSize":"300%","textAlign":"right","width":"1000px","left":"0px","height":"50px"});
        placeTextNew({"text":"you chose action <div class='wSquare square' style='margin-left:25px;font-size:50%'></div>","top":"525px","fontSize":"300%","textAlign":"right","width":"1000px","left":"0px","height":"50px"});
        placeTextNew({"text":"and the subject you are matched with choose action <div class='ySquare square' style='margin-left:25px;font-size:50%'></div>","top":"600px","fontSize":"300%","textAlign":"right","width":"1000px","left":"0px","height":"50px"});
        placeTextNew({"text":"Therefore, you received a payoff of <div class='square' style='margin-left:25px;font-size:50%;background-color:white;'>26</div>","top":"675px","fontSize":"300%","textAlign":"right","width":"1000px","left":"0px","height":"50px"});
        placeTextNew({"divid":"continueButton","text":"Click to continue to quiz question.","top":"824px","fontSize":"200%","color":"red","textAlign":"center","height":"50px","backgroundColor":"rgba(255,0,0,.1)","width":"400px","left":"440px"})
        clickButton("once","continueButton",makeSelection,[["stage","showHistoryQuiz4"]]);


    }
    else if(window.state['stage']=="showHistoryQuiz4"){
        drawHistory();        
        document.getElementById("history").style.transform="translate3d(0px,100px,0px) scale(1)";

        placeTextNew({"text":"","color":"red","top":"300px","fontSize":"400%","textAlign":"center","height":"100px","backgroundColor":"rgba(255,0,0,.1)","width":"1080px","left":"100px","height":"400px"});


        placeTextNew({"text":"Quiz Question #4","color":"black","top":"300px","fontSize":"400%","textAlign":"center","height":"100px"});

        if(window.state['answer']=="correct"){
            placeTextNew({"text":"That is correct, you chose action W in period 34.  Click on the correct box again to continue.","color":"green","top":"450px","fontSize":"300%","textAlign":"left","width":"1000px","left":"140px","height":"75px"});
            document.getElementById("history_square_34_0").style.backgroundColor="rgba(0,255,0,1)";
            clickButton("once","history_square_34_0",makeSelection,[["stage","showHistoryQuiz5"],["answer","none"]]);
        }
        else if(window.state['answer']=="incorrect"){
            placeTextNew({"text":"That is incorrect, you chose action W in period 34. Click on the correct box to continue.","color":"red","top":"450px","fontSize":"300%","textAlign":"left","width":"1000px","left":"140px","height":"75px"});
            document.getElementById("history_square_34_0").style.backgroundColor="rgba(0,255,0,.5)";
            clickButton("once","history_square_34_0",makeSelection,[["stage","showHistoryQuiz5"],["answer","none"]]);
        }
        else{
            placeTextNew({"text":"In the history display, click on the box displaying the action that you chose in period 34.","color":"black","top":"450px","fontSize":"300%","textAlign":"left","width":"1000px","left":"140px","height":"75px"});
            for(var period=27;period<50;period++){
                confirmation="Are you sure you want to submit the period label from period "+period+" as your answer?";
                clickButton("once","historyPeriodLabel_"+period,submitQuizAnswer,"quiz4",period,0,confirmation);
                confirmation="Are you sure you want to submit the top action W from period "+period+" as your answer?";
                clickButton("once","history_square_"+period+"_0",submitQuizAnswer,"quiz4",period,1,confirmation);
                confirmation="Are you sure you want to submit the bottom action W from period "+period+" as your answer?";
                clickButton("once","history_square_"+period+"_1",submitQuizAnswer,"quiz4",period,2,confirmation);
                confirmation="Are you sure you want to submit the payoff 23 from period "+period+" as your answer?";
                clickButton("once","historyPayoffLabel_"+period,submitQuizAnswer,"quiz4",period,3,confirmation);
            }            
        }
    }
    else if(window.state['stage']=="showHistoryQuiz5"){
        drawHistory();        
        document.getElementById("history").style.transform="translate3d(0px,100px,0px) scale(1)";

        placeTextNew({"text":"","color":"red","top":"300px","fontSize":"400%","textAlign":"center","height":"100px","backgroundColor":"rgba(255,0,0,.1)","width":"1080px","left":"100px","height":"400px"});


        placeTextNew({"text":"Quiz Question #5","color":"black","top":"300px","fontSize":"400%","textAlign":"center","height":"100px"});

        if(window.state['answer']=="correct"){
            placeTextNew({"text":"That is correct, you got a payoff of 2 in period 46.  Click on the correct box again to continue.","color":"green","top":"450px","fontSize":"300%","textAlign":"left","width":"1000px","left":"140px","height":"75px"});
            document.getElementById("historyPayoffLabel_46").style.backgroundColor="rgba(0,255,0,1)";
            clickButton("once","historyPayoffLabel_46",makeSelection,[["stage","showHistoryQuiz5"],["answer","none"]]);
        }
        else if(window.state['answer']=="incorrect"){
            placeTextNew({"text":"That is incorrect, you got a payoff of 2 in period 46. Click on the correct box to continue.","color":"red","top":"450px","fontSize":"300%","textAlign":"left","width":"1000px","left":"140px","height":"75px"});
            document.getElementById("historyPayoffLabel_46").style.backgroundColor="rgba(0,255,0,.5)";
            clickButton("once","historyPayoffLabel_46",makeSelection,[["stage","showHistoryQuiz5"],["answer","none"]]);
        }
        else{
            placeTextNew({"text":"In the history display, click on the box displaying the payoff that you received in period 46.","color":"black","top":"450px","fontSize":"300%","textAlign":"left","width":"1000px","left":"140px","height":"75px"});
            for(var period=27;period<50;period++){
                confirmation="Are you sure you want to submit the period label from period "+period+" as your answer?";
                clickButton("once","historyPeriodLabel_"+period,submitQuizAnswer,"quiz5",period,0,confirmation);
                confirmation="Are you sure you want to submit the top action W from period "+period+" as your answer?";
                clickButton("once","history_square_"+period+"_0",submitQuizAnswer,"quiz5",period,1,confirmation);
                confirmation="Are you sure you want to submit the bottom action W from period "+period+" as your answer?";
                clickButton("once","history_square_"+period+"_1",submitQuizAnswer,"quiz5",period,2,confirmation);
                confirmation="Are you sure you want to submit the payoff 23 from period "+period+" as your answer?";
                clickButton("once","historyPayoffLabel_"+period,submitQuizAnswer,"quiz5",period,3,confirmation);
            }            
        }
    }
}



function instructionsPayoffTable(){
    clearAll();
    drawBackAndForwardButtons();
    //placeText("gameTableTitle","Game Table",50,200,"red",1);
    placeTextNew({"text":"Payoff Table:","top":"25px","fontSize":"300%","color":"red","width":"300px","textAlign":"right","left":"0px"})
    placeTextNew({"text":"a display of the possible payoffs in each period.","top":"25px","fontSize":"300%","color":"black","width":"860px","textAlign":"left","left":"320px"})



    var x=280;
    var y=100;


    if(window.state['stage']=="begin"){
        placeTextNew({"divid":"continueButton","text":"Click Here to Show Payoff Table","top":"225px","fontSize":"300%","color":"green","width":"600px","textAlign":"center","left":"340px","backgroundColor":"rgba(0,255,0,.1)","height":"100px"})
        clickButton("once","continueButton",makeSelection,[["stage","showTable"]]);
    }   
    else if(window.state['stage']=="showTable"){
        drawGame();        
        document.getElementById("gameTable").style.transform="translate3d("+(x-755)+"px,"+(-649+y)+"px,0px) scale(2)";
        placeTextNew({"divid":"continueButton","text":"Click Here to Explain Payoff Table","top":"725px","fontSize":"300%","color":"green","width":"600px","textAlign":"center","left":"340px","backgroundColor":"rgba(0,255,0,.1)","height":"100px"})
        clickButton("once","continueButton",makeSelection,[["stage","explainPayoffTable"],['clickedRows',[0,0,0,0,0]],['currentRow',-1],['allRowClicked','False']]);
    }
    else if(window.state['stage']=="explainPayoffTable"){
        drawGame();        
        document.getElementById("gameTable").style.transform="translate3d("+(x-755)+"px,"+(-649+y)+"px,0px) scale(2)";

        clickButton("many","gameTable_0_0",clickPayoffTableRow,0);
        clickButton("many","gameTable_1_0",clickPayoffTableRow,1);
        clickButton("many","gameTable_2_0",clickPayoffTableRow,2);
        clickButton("many","gameTable_3_0",clickPayoffTableRow,3);
        clickButton("many","gameTable_4_0",clickPayoffTableRow,4);

        for(var k=0;k<5;k++){
            if(window.state['clickedRows'][k]==0){
                document.getElementById("gameTable_"+k+"_0").style.backgroundColor="rgba(0,255,0,.1)";
                document.getElementById("gameTable_"+k+"_0").style.color="green";
            }   
        }
        if(window.state['currentRow']==-1){
            placeTextNew({"text":"The Payoff Table has 5 rows.","top":"675px","fontSize":"300%","textAlign":"center","height":"100px"});
            placeTextNew({"text":"Click Each one of the rows above to get an explanation.","top":"775px","fontSize":"300%","textAlign":"center","height":"100px"});
        }
        else if(window.state['currentRow']==0){
            placeTextNew({"text":"My Choice","top":"625px","fontSize":"400%","textAlign":"center","height":"100px"});
            placeTextNew({"text":"Your choice (either W or Y) in a given period.","top":"725px","fontSize":"300%","textAlign":"center","width":"1000px","left":"140px","height":"50px"});
        }
        else if(window.state['currentRow']==1){
            placeTextNew({"text":"Other's Choice","top":"625px","fontSize":"400%","textAlign":"center","height":"100px"});
            placeTextNew({"text":"The choice (either W or Y) of the subject you are matched with in a given period.","top":"725px","fontSize":"300%","textAlign":"left","width":"1000px","left":"140px","height":"50px"});
        }
        else if(window.state['currentRow']==2){
            placeTextNew({"text":"My Payoff","top":"625px","fontSize":"400%","textAlign":"center","height":"100px"});
            placeTextNew({"text":"The payoff you receive in a given period when you and the subject you are matched with play the corresponding actions from the same column.","top":"725px","fontSize":"300%","textAlign":"left","width":"1000px","left":"140px","height":"50px"});
        }
        else if(window.state['currentRow']==3){
            placeTextNew({"text":"Other's Payoff","top":"625px","fontSize":"400%","textAlign":"center","height":"100px"});
            placeTextNew({"text":"The payoff the subject you are matched with receives in a given period when you and the subject you are matched with play the corresponding actions from the same column.","top":"725px","fontSize":"300%","textAlign":"left","width":"1000px","left":"140px","height":"50px"});
        }
        else if(window.state['currentRow']==4){
            placeTextNew({"text":"Occurrences","top":"625px","fontSize":"400%","textAlign":"center","height":"100px"});
            placeTextNew({"text":"The number of times that the corresponding actions from the same column have been played in the current match.","top":"725px","fontSize":"300%","textAlign":"left","width":"1000px","left":"140px","height":"50px"});
        }

        if(window.state['allRowClicked']=="False"){
            placeTextNew({"text":"Must click all 5 rows to continue.","top":"974px","fontSize":"200%","color":"red","textAlign":"center","height":"50px","left":"100px","width":"1080px"})
        }
        else if(window.state['allRowClicked']=="True"){
            placeTextNew({"divid":"continueButton","text":"Click to continue to example.","top":"924px","fontSize":"200%","color":"green","textAlign":"center","height":"50px","backgroundColor":"rgba(0,255,0,.1)","width":"400px","left":"440px"})
            clickButton("once","continueButton",makeSelection,[["stage","showPayoffTableExample"]]);

        }
    }
    else if(window.state['stage']=="showPayoffTableExample"){
        var x=280;
        var y=0;
        drawGame();        
        document.getElementById("gameTable").style.transform="translate3d("+(x-755)+"px,"+(-649+y)+"px,0px) scale(1)";
        placeTextNew({"text":"Example","top":"400px","fontSize":"400%","textAlign":"center","height":"100px"});
        placeTextNew({"text":"In a given period, if you choose <div class='wSquare square' style='margin-left:25px;font-size:50%'></div>","top":"525px","fontSize":"300%","textAlign":"right","width":"1000px","left":"0px","height":"50px"});
        placeTextNew({"text":"and the subject you are matched with chooses <div class='ySquare square' style='margin-left:25px;font-size:50%'></div>","top":"600px","fontSize":"300%","textAlign":"right","width":"1000px","left":"0px","height":"50px"});
        placeTextNew({"text":"then you receive a payoff of <div class='square' style='margin-left:25px;font-size:50%;background-color:white;'>"+document.getElementById("gameTable_2_2").innerHTML+"</div>","top":"675px","fontSize":"300%","textAlign":"right","width":"1000px","left":"0px","height":"50px"});
        placeTextNew({"text":"and the subject you are matched with receives a payoff of <div class='square' style='margin-left:25px;font-size:50%;background-color:white;'>"+document.getElementById("gameTable_3_2").innerHTML+"</div>","top":"750px","fontSize":"300%","textAlign":"right","width":"1000px","left":"0px","height":"50px"});
        placeTextNew({"text":"# of periods this outcome has occurred so far this match <div class='square' style='margin-left:25px;font-size:50%;background-color:white;'>"+document.getElementById("gameTable_4_2").innerHTML+"</div>","top":"825px","fontSize":"300%","textAlign":"right","width":"1000px","left":"0px","height":"50px"});

        placeTextNew({"divid":"continueButton","text":"Click to continue to quiz question.","top":"924px","fontSize":"200%","color":"red","textAlign":"center","height":"50px","backgroundColor":"rgba(255,0,0,.1)","width":"400px","left":"440px"})
        clickButton("once","continueButton",makeSelection,[["stage","showPayoffTableQuiz1"]]);


    }
    else if(window.state['stage']=="showPayoffTableQuiz1"){
        var x=280;
        var y=0;
        drawGame();        
        document.getElementById("gameTable").style.transform="translate3d("+(x-755)+"px,"+(-649+y)+"px,0px) scale(1)";
        placeTextNew({"text":"","color":"red","top":"400px","height":"525px","fontSize":"400%","textAlign":"center","backgroundColor":"rgba(255,0,0,.1)","width":"1080px","left":"100px"});
        placeTextNew({"text":"Quiz Question #1","color":"red","top":"400px","fontSize":"400%","textAlign":"center","height":"100px"});
        placeTextNew({"text":"In a given period, suppose that you choose <div class='ySquare square' style='margin-left:25px;font-size:50%'></div>","top":"525px","fontSize":"300%","textAlign":"right","width":"1000px","left":"0px","height":"50px"});
        placeTextNew({"text":"and the subject you are matched with chooses <div class='wSquare square' style='margin-left:25px;font-size:50%'></div>","top":"600px","fontSize":"300%","textAlign":"right","width":"1000px","left":"0px","height":"50px"});


        if(window.state['answer']=="correct"){
            placeTextNew({"text":"That is correct, you will get a payoff of 2.  Click on the correct box again to continue.","color":"green","top":"750px","fontSize":"300%","textAlign":"left","width":"1000px","left":"140px","height":"75px"});
            clickButton("once","gameTable_2_3",makeSelection,[["stage","showPayoffTableQuiz2"],["answer","none"]]);
            document.getElementById("gameTable_2_3").style.backgroundColor="rgba(0,255,0,.1)";
        }
        else if(window.state['answer']=="incorrect"){
            placeTextNew({"text":"That is incorrect, you will get a payoff of 2. Click on the correct box again to continue.","color":"red","top":"750px","fontSize":"300%","textAlign":"left","width":"1000px","left":"140px","height":"75px"});
            clickButton("once","gameTable_2_3",makeSelection,[["stage","showPayoffTableQuiz2"],["answer","none"]]);
            document.getElementById("gameTable_2_3").style.backgroundColor="rgba(0,255,0,.1)";
        }
        else{
            placeTextNew({"text":"Click on the box containing the payoff that you will receive in the payoff table.","color":"black","top":"750px","fontSize":"300%","textAlign":"left","width":"1000px","left":"140px","height":"75px"});
            for(row=0;row<5;row++){
                for(col=0;col<5;col++){
                    var thisText=document.getElementById("gameTable_"+row+"_"+col).innerHTML;
                    var confirmationStatement="Are you sure you want to submit '"+thisText+"' as your answer?";
                    clickButton("once","gameTable_"+row+"_"+col,submitQuizAnswer,"quiz1",row,col,confirmationStatement);
                }
            }            
        }
    }
    else if(window.state['stage']=="showPayoffTableQuiz2"){
        var x=280;
        var y=0;
        drawGame();        
        document.getElementById("gameTable").style.transform="translate3d("+(x-755)+"px,"+(-649+y)+"px,0px) scale(1)";
        placeTextNew({"text":"","color":"red","top":"400px","height":"525px","fontSize":"400%","textAlign":"center","backgroundColor":"rgba(255,0,0,.1)","width":"1080px","left":"100px"});
        placeTextNew({"text":"Quiz Question #2","color":"red","top":"400px","fontSize":"400%","textAlign":"center","height":"100px"});
        placeTextNew({"text":"In a given period, suppose that you choose <div class='ySquare square' style='margin-left:25px;font-size:50%'></div>","top":"525px","fontSize":"300%","textAlign":"right","width":"1000px","left":"0px","height":"50px"});
        placeTextNew({"text":"and the subject you are matched with chooses <div class='ySquare square' style='margin-left:25px;font-size:50%'></div>","top":"600px","fontSize":"300%","textAlign":"right","width":"1000px","left":"0px","height":"50px"});


        if(window.state['answer']=="correct"){
            placeTextNew({"text":"That is correct, you will get a payoff of 2.  Click on the correct box again to continue.","color":"green","top":"750px","fontSize":"300%","textAlign":"left","width":"1000px","left":"140px","height":"75px"});
            clickButton("once","gameTable_3_4",makeSelection,[["stage","showPayoffTableQuiz3"],["answer","none"]]);
            document.getElementById("gameTable_3_4").style.backgroundColor="rgba(0,255,0,.1)";
        }
        else if(window.state['answer']=="incorrect"){
            placeTextNew({"text":"That is incorrect, you will get a payoff of 2. Click on the correct box again to continue.","color":"red","top":"750px","fontSize":"300%","textAlign":"left","width":"1000px","left":"140px","height":"75px"});
            clickButton("once","gameTable_3_4",makeSelection,[["stage","showPayoffTableQuiz3"],["answer","none"]]);
            document.getElementById("gameTable_3_4").style.backgroundColor="rgba(0,255,0,.1)";
        }
        else{
            placeTextNew({"text":"Click on the payoff that the subject that you are matched with will receive in the payoff table.","color":"black","top":"750px","fontSize":"300%","textAlign":"left","width":"1000px","left":"140px","height":"75px"});
            for(row=0;row<5;row++){
                for(col=0;col<5;col++){
                    var thisText=document.getElementById("gameTable_"+row+"_"+col).innerHTML;
                    var confirmationStatement="Are you sure you want to submit '"+thisText+"' as your answer?";
                    clickButton("once","gameTable_"+row+"_"+col,submitQuizAnswer,"quiz2",row,col,confirmationStatement);
                }
            }            
        }
    }
    else if(window.state['stage']=="showPayoffTableQuiz3"){
        var x=280;
        var y=0;
        drawGame();        
        document.getElementById("gameTable").style.transform="translate3d("+(x-755)+"px,"+(-649+y)+"px,0px) scale(1)";
        placeTextNew({"text":"","color":"red","top":"400px","height":"525px","fontSize":"400%","textAlign":"center","backgroundColor":"rgba(255,0,0,.1)","width":"1080px","left":"100px"});
        placeTextNew({"text":"Quiz Question #3","color":"red","top":"400px","fontSize":"400%","textAlign":"center","height":"100px"});
        placeTextNew({"text":"In a given period, suppose that you choose <div class='wSquare square' style='margin-left:25px;font-size:50%'></div>","top":"525px","fontSize":"300%","textAlign":"right","width":"1000px","left":"0px","height":"50px"});
        placeTextNew({"text":"and the subject you are matched with chooses <div class='wSquare square' style='margin-left:25px;font-size:50%'></div>","top":"600px","fontSize":"300%","textAlign":"right","width":"1000px","left":"0px","height":"50px"});


        if(window.state['answer']=="correct"){
            placeTextNew({"text":"That is correct, you will get a payoff of 2.  Click on the correct box again to continue.","color":"green","top":"750px","fontSize":"300%","textAlign":"left","width":"1000px","left":"140px","height":"75px"});
            clickButton("once","gameTable_4_1",makeSelection,[["page","instructionsHistory"],["stage","begin"]]);
            document.getElementById("gameTable_4_1").style.backgroundColor="rgba(0,255,0,.1)";
        }
        else if(window.state['answer']=="incorrect"){
            placeTextNew({"text":"That is incorrect, you will get a payoff of 2. Click on the correct box again to continue.","color":"red","top":"750px","fontSize":"300%","textAlign":"left","width":"1000px","left":"140px","height":"75px"});
            clickButton("once","gameTable_4_1",makeSelection,[["page","instructionsHistory"],["stage","begin"]]);
            document.getElementById("gameTable_4_1").style.backgroundColor="rgba(0,255,0,.1)";
        }
        else{
            placeTextNew({"text":"Click on the box that displays the number of times that W,W has occurred in the payoff table.","color":"black","top":"750px","fontSize":"300%","textAlign":"left","width":"1000px","left":"140px","height":"75px"});
            for(row=0;row<5;row++){
                for(col=0;col<5;col++){
                    var thisText=document.getElementById("gameTable_"+row+"_"+col).innerHTML;
                    var confirmationStatement="Are you sure you want to submit '"+thisText+"' as your answer?";
                    clickButton("once","gameTable_"+row+"_"+col,submitQuizAnswer,"quiz3",row,col,confirmationStatement);
                }
            }            
        }
    }
}

function submitQuizAnswer(args){
    confirmationStatement=args[3];
    var confirmation=confirmAction(confirmationStatement);
    if(confirmation){
        var message={"type":"submitQuizAnswer","question":args[0],"row":args[1],"col":args[2]};
        sock.send(JSON.stringify(message));
    }
}

function testClick2(){
    alert("Are you sure2")
}

function makeSelection(args){
    var message={"type":"setStatusElements","pairs":args[0]};
    sock.send(JSON.stringify(message));
}

function clickPayoffTableRow(args){
    var message={"type":"clickPayoffTableRow","row":args[0]};
    sock.send(JSON.stringify(message));
}



function payoffsOnly(){
    clearAll();
    placeTextNew({"divid":"payoffsOnly1","text":"Please take this time to review the payoff table.","top":"25px","fontSize":"300%","color":"red","width":"1280px","textAlign":"center","left":"0px","backgroundColor":"rgba(255,0,0,0)","height":"100px"});
    placeTextNew({"divid":"payoffsOnly2","text":"You will be able to make rules in <time id='timer'>1:00</time>","top":"100px","fontSize":"300%","color":"red","width":"1280px","textAlign":"center","left":"0px","backgroundColor":"rgba(255,0,0,0)","height":"100px"});
    moveTimer("timer");
    drawGame();
    document.getElementById("gameTable").style.transform="translate(-115px,-50px) scale(3)";
    document.getElementById("gameTable").style.transformOrigin="bottom right";
}


function setFirstPeriodRulePage(){
    clearAll();
    placeTextNew({"divid":"setFirstPeriod2","text":"The match will start in <time id='timer'>1:00</time>.","top":"25px","fontSize":"300%","color":"red","width":"1280px","textAlign":"center","left":"0px","backgroundColor":"rgba(255,0,0,0)","height":"100px"});
    moveTimer("timer");
    drawGame();
    drawFirstPeriod();
    document.getElementById("setFirstPeriodDiv").style.transform="scale(4) translate3d(60px,-160px,0px)";
    document.getElementById("setFirstPeriodDiv").style.transformOrigin="top left";

    if(window.state['firstPeriodRule']==undefined){
        placeTextNew({"divid":"mustSetFirstPeriod","text":"Before you can make rules, set your first period rule.","top":"650px","fontSize":"300%","color":"red","width":"1280px","textAlign":"center","left":"0px","backgroundColor":"rgba(255,0,0,0)","height":"100px"});
    }
    else{
        placeTextNew({"divid":"mustSetFirstPeriod","text":"Click here to continue to set default rule.","top":"654px","fontSize":"200%","color":"green","textAlign":"center","height":"100px","backgroundColor":"rgba(0,255,0,.1)","width":"600px","left":"340px"})
        clickButton("once","mustSetFirstPeriod",makeSelection,[["page","setDefaultRulePage"]]);
    }
}



function setDefaultRulePage(){
    clearAll();
    // placeTextNew({"divid":"setFirstPeriod1","text":"Next, set your default rule.","top":"25px","fontSize":"300%","color":"red","width":"1280px","textAlign":"center","left":"0px","backgroundColor":"rgba(255,0,0,0)","height":"100px"});
    placeTextNew({"divid":"setFirstPeriod2","text":"The first match will start in <time id='timer'>1:00</time>.","top":"25px","fontSize":"300%","color":"red","width":"1280px","textAlign":"center","left":"0px","backgroundColor":"rgba(255,0,0,0)","height":"100px"});
    moveTimer("timer");
    drawGame();
    drawDefault();
    document.getElementById("setDefaultDiv").style.transform="scale(4) translate3d(60px,-192px,0px)";
    document.getElementById("setDefaultDiv").style.transformOrigin="top left";

    if(window.state['defaultRule']==undefined){
        placeTextNew({"divid":"mustSetDefault","text":"Before you can make rules, set your default rule.","top":"650px","fontSize":"300%","color":"red","width":"1280px","textAlign":"center","left":"0px","backgroundColor":"rgba(255,0,0,0)","height":"100px"});
    }
    else{
        placeTextNew({"divid":"mustSetDefault","text":"Click here to continue to construct more rules.","top":"654px","fontSize":"200%","color":"green","textAlign":"center","height":"100px","backgroundColor":"rgba(0,255,0,.1)","width":"600px","left":"340px"})
        clickButton("once","mustSetDefault",makeSelection,[["page","preMatch"]]);
    }

    drawFirstPeriod();
}


function preMatch(){
    clearAll();
    //deleteHypothetical();
    drawGame();
    drawFirstPeriod();
    drawDefault();
    drawConstructor();
    drawHistory();
    drawRules();    
    drawInfo();
    placeTextNew({"divid":"timerMessage","text":"The next match will start in <time id='timer'>1:00</time>.","top":"50px","fontSize":"250%","color":"red","textAlign":"center","left":"0px","backgroundColor":"rgba(0,255,0,0)","height":"150px"})
    moveTimer("timer");
}


function postMatch(){
    clearAll();
    drawGame();
    drawFirstPeriod();
    drawDefault();
    drawConstructor();
    drawHistory();
    drawRules();    
    drawInfo();
    if(window.state['stage']=="wait"){
        placeTextNew({"divid":"matchOverMessage","text":"Match Finished.","top":"50px","fontSize":"250%","color":"red","textAlign":"center","left":"0px","backgroundColor":"rgba(255,255,255,.75)","height":"150px"})
        placeTextNew({"divid":"matchOverMessage2","text":"Please wait for other subjects to finish their matches.","top":"135px","fontSize":"100%","color":"red","textAlign":"center","left":"0px","backgroundColor":"rgba(255,255,255,0)","height":"50px"})
    }
    else if(window.state['stage']=="timer"){
        placeTextNew({"divid":"matchOverMessage","text":"Match Finished.","top":"50px","fontSize":"250%","color":"red","textAlign":"center","left":"0px","backgroundColor":"rgba(255,255,255,.75)","height":"150px"})
        placeTextNew({"divid":"matchOverMessage2","text":"This match will end in  <time id='timer'>1:00</time>.","top":"135px","fontSize":"100%","color":"red","textAlign":"center","left":"0px","backgroundColor":"rgba(255,255,255,0)","height":"50px"})
        moveTimer("timer");
    }
}


function statusManager(){
  thisStatus=window.state;
  console.log(thisStatus);
  if(runFunctionFromString(thisStatus["page"])==false){
      if(thisStatus[0]==-1){
        message="Loading...";
        genericScreen(message);
      }
      else if(thisStatus["page"]=="generic"){
        clearAll();
        genericScreen(thisStatus["message"]);
      }
      else if(thisStatus["page"]=="game"){
        clearAll();
        drawGame();
        drawFirstPeriod();
        drawDefault();
        drawConstructor();
        drawHistory();    
        drawRules();  
        drawInfo();  
        drawWarningMessage();
      }
  }
}


