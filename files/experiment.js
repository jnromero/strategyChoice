
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
    placeText({"divid":"topInfo1","text":window.state["subjectID"],"top":"0px","fontSize":"150%","color":"blue","width":"300px","textAlign":"center","left":"0px","backgroundColor":"rgba(0,255,0,0)","height":"50px"})
    placeText({"divid":"topInfo2","text":"Match #"+window.state["match"],"top":"0px","fontSize":"150%","color":"red","width":"300px","textAlign":"center","left":"300px","backgroundColor":"rgba(0,255,0,0)","height":"50px"})
    placeText({"divid":"topInfo3","text":"Payoff this match: "+window.state["matchPayoff"][0],"top":"0px","fontSize":"150%","color":"black","width":"340px","textAlign":"center","left":"600px","backgroundColor":"rgba(0,255,0,0)","height":"50px"})
    placeText({"divid":"topInfo4","text":"Total Earned Today: "+window.state["totalPayoff"],"top":"0px","fontSize":"150%","color":"green","width":"340px","textAlign":"center","left":"940px","backgroundColor":"rgba(0,255,0,0)","height":"50px"})
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
    highlightPayoffTableColumn();
}


function deleteRule(args){
    var thisConstructor=args[0];
    //List of pages where the button can be clicked
    var pages=["preMatch","gameNonBinding"];
    if(pages.indexOf(window.state['page'])>-1){
        var message={"type":"deleteRule","rule":thisConstructor};
        sock.send(JSON.stringify(message));
    }
    else if(window.state['page']=="instructionsEditRuleSet" && window.state['stage']==6 && window.state['answer']!="correct" && window.state['answer']!="incorrect"){
        var confirmationStatement="Are you sure you want to submit this as your answer?";
        submitQuizAnswer([{"question":"deleteRuleQuiz","constructor":thisConstructor},confirmationStatement]);
    }
    else{
        alert("During the experiment, that rule would be deleted from the set of rules.");
    }
}

function switchRules(){
    var message={"type":"switchRuleOutput","thisRule":window.ruleConstructor};
    sock.send(JSON.stringify(message));
    window.ruleConstructor=[[-1,-1],[-1]];
    drawConstructor();
}

function addRule(){
    //List of pages where the button can be clicked
    var pages=["preMatch","gameNonBinding"]
    if(pages.indexOf(window.state['page'])>-1){
        var message={"type":"addRule","thisRule":window.ruleConstructor};
        sock.send(JSON.stringify(message));        
    }
    else if(window.state['page']=="instructionsEditRuleSet" && window.state['stage']==5 && window.state['answer']!="correct" && window.state['answer']!="incorrect"){
        var confirmationStatement="Are you sure you want to submit this as your answer?";
        submitQuizAnswer([{"question":"addRuleQuiz","constructor":window.ruleConstructor},confirmationStatement]);
    }
    else{
        alert("During the experiment, that rule would be added to your set or rules.");
    }
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
    placeText({"divid":"setDefaultDiv","text":"","top":"899px","fontSize":"100%","color":"black","width":"200px","textAlign":"center","left":"0px","backgroundColor":"rgba(255,255,255,1)","height":"125px"});
    placeText({"divid":"setDefaultTitle","text":"Default Rule","top":"0px","fontSize":"100%","color":"black","width":"200px","textAlign":"center","left":"0px","backgroundColor":"rgba(0,255,0,0)","height":"50px","parentDiv":"setDefaultDiv"});

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
        placeText({"divid":"defaultRuleHighlight","border":"5px solid green","top":"48px","left":thisLeft,"parentDiv":"setDefaultDiv","width":"54px","height":"54px"});
    }
}

function drawFirstPeriod(){
    placeText({"divid":"setFirstPeriodDiv","text":"","top":"774px","fontSize":"100%","color":"black","width":"200px","textAlign":"center","left":"0px","backgroundColor":"rgba(255,255,255,1)","height":"125px"});
    placeText({"divid":"setFirstPeriodTitle","text":"First Period Rule","top":"0px","fontSize":"100%","color":"black","width":"200px","textAlign":"center","left":"0px","backgroundColor":"rgba(0,255,0,0)","height":"50px","parentDiv":"setFirstPeriodDiv"});

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
        placeText({"divid":"firstPeriodRuleHighlight","border":"5px solid green","top":"48px","left":thisLeft,"parentDiv":"setFirstPeriodDiv","width":"54px","height":"54px"});
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

    var listEntry = createAndAddDiv("listEntry_"+ruleNumber,"ruleListIn");
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
        // var listEntryCopyButton = createAndAddDiv("listEntryCopyButton_"+ruleNumber,"listEntry_"+ruleNumber);
        // listEntryCopyButton.className = "listEntryCopyButton listEntryButton";
        // listEntryCopyButton.style.transform="translate3d(15px,35px,0px)";
        // listEntryCopyButton.innerHTML=String.fromCharCode(parseInt('2398',16));
        // clickButton("many","listEntryCopyButton_"+ruleNumber,setConstructor,thisConstructor);


        var listEntryDeleteButton = createAndAddDiv("listEntryDeleteButton_"+ruleNumber,"listEntry_"+ruleNumber);
        listEntryDeleteButton.className = "listEntryDeleteButton listEntryButton";
        listEntryDeleteButton.style.transform="translate3d(15px,60px,0px)";
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

    // placeText({"divid":"listEntryStats_last_"+ruleNumber,"text":lastPlayed,"top":"123px","fontSize":"100%","color":"black","width":"40%","textAlign":"left","left":"5%","backgroundColor":"rgba(0,255,0,0)","height":"25px","parentDiv":"listEntry_"+ruleNumber});
    // placeText({"divid":"listEntryStats_total_"+ruleNumber,"text":totalPlayed,"top":"123px","fontSize":"100%","color":"black","width":"40%","textAlign":"right","left":"55%","backgroundColor":"rgba(0,255,0,0)","height":"25px","parentDiv":"listEntry_"+ruleNumber});

}


function drawRules(){
    // window.state['rules']
    var ruleList=createAndAddDiv("ruleList","mainDiv");
    var ruleListIn=createAndAddDiv("ruleListIn","ruleList");

    for(var k=0;k<window.state['ruleInfo'].length;k++){
        var thisInfo=window.state['ruleInfo'][k];
        drawListEntry(thisInfo);
    }
    //extra height for access to all the rules
    // var thisHeight=document.getElementById("ruleListIn").clientHeight;
    // console.log(thisHeight)
    // if(thisHeight>524){
    //     document.getElementById("ruleListIn").style.height=thisHeight+200+"px";
    // }
}


function highlightPayoffTableColumn(){
    // var gameTableHighlight=createAndAddDiv("gameTableHighlight","gameTable");
    if(window.state['previousPayoffIndex']!=undefined){
        placeText({"divid":"gameTableHighlight","parentDiv":"gameTable","border":"3px solid red","top":"0px","fontSize":"100%","color":"black","width":"50px","textAlign":"center","left":(150+window.state['previousPayoffIndex']*50)+"px","backgroundColor":"rgba(225,255,225,0)","height":"250px"});
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


function drawRuleHighlight(ruleWidth,divName,parentDiv,color){
    var ruleHighlight = createAndAddDiv(divName,parentDiv);
    ruleHighlight.className="ruleHighlight";
    if(ruleWidth>50){
        var TL = createAndAddDiv(divName+"_tl",divName);
        var B = createAndAddDiv(divName+"_b",divName);
        var R = createAndAddDiv(divName+"_r",divName);
        TL.className="ruleHighlightTopleft";
        B.className="ruleHighlightBottom";
        R.className="ruleHighlightRight";
        TL.style.borderColor=color;
        B.style.borderColor=color;
        R.style.borderColor=color;

        borderWidth=4;
        ruleHighlight.style.width=ruleWidth+"px";
        TL.style.width=ruleWidth+"px";
        B.style.width=(ruleWidth-50)+"px";
        R.style.left=(ruleWidth-50-borderWidth)+"px";
    }
    else{
        var DH = createAndAddDiv(divName+"_dh",divName);
        DH.className="ruleHighlightDefault";
        DH.style.borderColor=color;
    }

}

function highlightRule(thisRuleDiv,length){
    if(divExists(thisRuleDiv)){
        document.getElementById(thisRuleDiv).style.backgroundColor="rgba(0,255,0,.1)";
        document.getElementById(thisRuleDiv).style.borderColor="rgba(0,255,0,1)";
        var ruleWidth=length*50+50;
        drawRuleHighlight(ruleWidth,"listRuleHighlight",thisRuleDiv,"red");
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
    var drawH=false;
    if(window.state['confirmed']=="yes" && window.state['supergameInfo']['supergameType']=="directResponse"){
        var ruleWidth=50;
        drawH=true;
    }
    if(window.state['supergameInfo']['supergameType']!="directResponse"){
        var ruleWidth=window.state['nextChoiceInfo']['length']*50+50;
        drawH=true;
    }

    if(window.state['confirmed']=="yes" && window.state['nonBindingChoice']=="otherAction"){
        var ruleWidth=50;
    }


    if(drawH==true){
        drawRuleHighlight(ruleWidth,"historyRuleHighlight","historyIN","red");
        var translateAmount=-100+(window.state['period']+2)*50-ruleWidth;
        document.getElementById("historyRuleHighlight").style.transform="translate3d("+translateAmount+"px,25px,0px)";
    }
}

function setDefault(args){
    var defaultOrFirstPeriod=args[0];//setDefault or setFirstPeriod
    var thisChoice=args[1];
    //List of pages where the button can be clicked
    var pages=['setFirstPeriodRulePage',"setDefaultRulePage","preMatch","gameNonBinding"];
    if(pages.indexOf(window.state['page'])>-1){
        var message={"type":"setDefault","thisRule":thisChoice,"defaultType":defaultOrFirstPeriod};
        sock.send(JSON.stringify(message));        
    }
    else if(window.state['page']=="instructionsEditRuleSet" && window.state['stage']==7 && window.state['answer']!="correct" && window.state['answer']!="incorrect"){
        var confirmationStatement="Are you sure you want to submit this as your answer?";
        submitQuizAnswer([{"question":"firstPeriodRuleQuiz","thisRule":thisChoice,"defaultType":defaultOrFirstPeriod},confirmationStatement]);
    }
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
    deleteDiv('constructorSubmitButton');
    error=testConstructor();
    if(error==1){
        placeText({"parentDiv":"ruleConstructor","divid":"constructorSubmitButton","text":"Set an action in each box of the rule to add it to your set.","top":"200px","fontSize":"125%","color":"blue","width":"730px","textAlign":"center","left":"0px","backgroundColor":"rgba(225,255,225,0)","height":"50px"})
    }
    else if(error==2){
        var M=window.state['ruleInfo'].length;
        for(j=0;j<M;j++){
          var rule1=window.ruleConstructor;
          var rule2=window.state['ruleInfo'][j][2];
          var thisError=compareRuleAndRule(rule1,rule2);
          if(thisError==1){var thisRuleConflict=window.state['ruleInfo'][j][1].split("#")[1];}
        }
        placeText({"parentDiv":"ruleConstructor","divid":"constructorSubmitButton","text":"Proposed rule has same input at Rule #"+thisRuleConflict+". You can't have two rules in the set with same input.","top":"200px","fontSize":"125%","color":"red","width":"730px","textAlign":"center","left":"0px","backgroundColor":"rgba(225,255,225,0)","height":"50px"})
    }
    else if(error==3){
        placeText({"parentDiv":"ruleConstructor","divid":"constructorSubmitButton","text":"Proposed rule already in set.","top":"200px","fontSize":"125%","color":"red","width":"730px","textAlign":"center","left":"0px","backgroundColor":"rgba(225,255,225,0)","height":"50px"})
    }
    else{
        placeText({"parentDiv":"ruleConstructor","divid":"constructorSubmitButton","text":"Add Rule","top":"200px","fontSize":"125%","color":"black","width":"330px","textAlign":"center","left":"200px","backgroundColor":"rgba(0,255,0,.2)","height":"50px"})
        clickButton("once","constructorSubmitButton",addRule);
    }
}



function drawHistory(){
    placeText({"divid":"history","className":"history","top":"50px","fontSize":"100%","color":"black","width":"1280px","textAlign":"center","height":"150px","backgroundColor":"white"})
    placeText({"parentDiv":"history","divid":"historyIN","fontSize":"100%","color":"black","width":"900px","textAlign":"center","height":"150px"})
    drawHistoryLabels();
    for(var period=window.state['history'].length-30;period<window.state['history'].length;period++){
        if(period>-1){
            drawHistoryEntry(period+1,window.state['history'][period],window.state['payoffHistory'][period][0]);
        }
    }
    document.getElementById("historyIN").style.transform="translateX("+(1280-50-window.state['period']*50)+"px)";
}


function drawHighlights(){
    if(window.state['animate']=="yes"){
        document.getElementById("historyIN").style.transform="translateX("+(1280-50-window.state['period']*50+50)+"px)";
        setTimeout(function(){
            document.getElementById("historyIN").style.transform="translateX("+(1280-50-window.state['period']*50)+"px)";
            document.getElementById("historyIN").style.transition = "transform 0.25s ease";
            if(document.getElementById("historyPayoffLabel_"+(window.state['period']-1))!=null){
                document.getElementById("historyPayoffLabel_"+(window.state['period']-1)).style.fontSize="200%";
                document.getElementById("historyPayoffLabel_"+(window.state['period']-1)).style.color="green";
                document.getElementById("historyPayoffLabel_"+(window.state['period']-1)).style.transition = "all 0.25s ease";

                document.getElementById("gameTable_2_"+(window.state['previousPayoffIndex']+1)).style.fontSize="200%";
                document.getElementById("gameTable_2_"+(window.state['previousPayoffIndex']+1)).style.color="green";
                document.getElementById("gameTable_2_"+(window.state['previousPayoffIndex']+1)).style.transition = "all 0.25s ease";
            }

        },0);
        setTimeout(function(){
        highlightHistory();
        },250);
        drawNextAction();
    }
    else if(window.state['animate']=="no" || window.state['animate']==undefined){
        drawNextAction();
        highlightHistory();
        if(document.getElementById("historyPayoffLabel_"+(window.state['period']-1))!=null){
            document.getElementById("historyPayoffLabel_"+(window.state['period']-1)).style.fontSize="200%";
            document.getElementById("historyPayoffLabel_"+(window.state['period']-1)).style.color="green";
            document.getElementById("gameTable_2_"+(window.state['previousPayoffIndex']+1)).style.fontSize="200%";
            document.getElementById("gameTable_2_"+(window.state['previousPayoffIndex']+1)).style.color="green";
        }
    }
    var drawRuleHighlight=1;
    if(window.state['confirmed']=="yes" && window.state['nonBindingChoice']=="otherAction"){
        drawRuleHighlight=0;
    }
    else if(window.state['supergameInfo']['supergameType']=="directResponse"){
        drawRuleHighlight=0;
    }
    if(drawRuleHighlight==1){
        highlightRule("listEntry_"+window.state['nextChoiceInfo']['number'],window.state['nextChoiceInfo']['length']);                
    }
}

function drawNextAction(){
    var translateAmount=(window.state['period']-1)*50;
    var period=window.state['period'];
    //Draw period Label
    placeText({
        "parentDiv":"historyIN",
        "divid":"historyPeriodLabel_"+period,
        "width":"50px",
        "left":translateAmount+"px",
        "height":"25px",
        "text":period,
    });

    var divID='history_square_'+(period+1)+'_0';
    // s=createAndAddDiv(divID,"historyIN")
    var thisFormat={
        "parentDiv":"historyIN",
        "divid":divID,
        "width":"50px",
        "left":translateAmount+"px",
        "height":"50px",
        "top":"25px",
    }
    if(window.state['confirmed']=="no" && window.state['supergameInfo']['supergameType']!="directResponse"){
        thisFormat['className']=actionFromInteger(window.state['nextChoiceInfo']['action'])+"Square square";
        thisFormat['opacity']="0.3";
        placeText(thisFormat);
    }
    else if(window.state['confirmed']=="yes" && window.state['supergameInfo']['supergameType']=="instructions"){
        thisFormat['className']=actionFromInteger(window.state['nextChoiceInfo']['action'])+"Square square";
        placeText(thisFormat);
    }
    else if(window.state['confirmed']=="yes" && window.state['supergameInfo']['supergameType']!="directResponse"){
        thisFormat['className']=actionFromInteger(window.state['lastPlay'])+"Square square";
        placeText(thisFormat);
    }
    else if(window.state['confirmed']=="no" && window.state['supergameInfo']['supergameType']=="directResponse"){
        thisFormat['className']="qSquare square";
        placeText(thisFormat);
    }
    else if(window.state['confirmed']=="yes" && window.state['supergameInfo']['supergameType']=="directResponse"){
        thisFormat['className']=window.state['choice'].toLowerCase()+"Square square confirmed";
        placeText(thisFormat);
    }
}







function drawHistoryEntry(period,choices,payoff){
    var translateAmount=(period)*50-50;

    //Draw period Label
    placeText({
        "parentDiv":"historyIN",
        "divid":"historyPeriodLabel_"+period,
        "width":"50px",
        "left":translateAmount+"px",
        "height":"25px",
        "text":period,
    });

    placeText({
        "parentDiv":"historyIN",
        "divid":"history_square_"+period+"_0",
        "width":"50px",
        "left":translateAmount+"px",
        "height":"50px",
        "top":"25px",
        "className":actionFromInteger(choices[0])+"Square square",
    });

    placeText({
        "parentDiv":"historyIN",
        "divid":"history_square_"+period+"_1",
        "width":"50px",
        "left":translateAmount+"px",
        "height":"50px",
        "top":"75px",
        "className":actionFromInteger(choices[1])+"Square square",
    });

    //draw payoff label
    placeText({
        "parentDiv":"historyIN",
        "divid":"historyPayoffLabel_"+period,
        "width":"50px",
        "left":translateAmount+"px",
        "height":"25px",
        "text":payoff,
        "top":"125px"
    });
}



function drawHistoryEntryOLD(period,choices,payoff){
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
    placeText({"divid":"alreadySubmittedMessage","text":message,"border":"1px solid green","top":"125px","fontSize":"100%","color":"black","width":"150px","textAlign":"center","left":"1125px","backgroundColor":"rgba(225,255,225,1)","height":"50px"})
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







function payoffsOnly(){
    clearAll();
    placeText({"divid":"payoffsOnly1","text":"Please take this time to review the payoff table.","top":"25px","fontSize":"300%","color":"red","width":"1280px","textAlign":"center","left":"0px","backgroundColor":"rgba(255,0,0,0)","height":"100px"});
    placeText({"divid":"payoffsOnly2","text":"You will be able to make rules in <time id='all'>1:00</time>","top":"100px","fontSize":"300%","color":"red","width":"1280px","textAlign":"center","left":"0px","backgroundColor":"rgba(255,0,0,0)","height":"100px"});
    moveTimer("all");
    drawGame();
    document.getElementById("gameTable").style.transform="translate(-115px,-50px) scale(3)";
    document.getElementById("gameTable").style.transformOrigin="bottom right";
}


function genericMatchConfirmationPage(){
    clearAll();
    placeText({"divid":"firstSetOfMatches","text":window.state['supergameInfo']['supergameTypeConfirmation'],
        "top":"225px","fontSize":"300%","color":"red","width":"980px","textAlign":"left","left":"150px","backgroundColor":"rgba(255,0,0,0)","height":"150px","height":"75px"});
    placeText({"divid":"firstSetOfMatchesConfirm","text":"Click here to start match #"+window.state['match']+".","top":"804px","fontSize":"200%","color":"green","textAlign":"center","height":"100px","backgroundColor":"rgba(0,255,0,.1)","width":"600px","left":"340px"})
    clickButton("once","firstSetOfMatchesConfirm",confirmMatchType);
}

function confirmMatchType(){
    var message={"type":"confirmMatchType"};
    sock.send(JSON.stringify(message));
}


function setFirstPeriodRulePage(){
    clearAll();
    placeText({"divid":"setFirstPeriod2","text":"The match will start in <time id='"+window.state['group']+"'>1:00</time>.","top":"25px","fontSize":"300%","color":"red","width":"1280px","textAlign":"center","left":"0px","backgroundColor":"rgba(255,0,0,0)","height":"100px"});
    moveTimer(window.state['group']);
    drawGame();
    drawFirstPeriod();
    document.getElementById("setFirstPeriodDiv").style.transform="scale(4) translate3d(60px,-160px,0px)";
    document.getElementById("setFirstPeriodDiv").style.transformOrigin="top left";

    if(window.state['firstPeriodRule']==undefined){
        placeText({"divid":"mustSetFirstPeriod","text":"Before you can make rules, set your first period rule.","top":"650px","fontSize":"300%","color":"red","width":"1280px","textAlign":"center","left":"0px","backgroundColor":"rgba(255,0,0,0)","height":"100px"});
    }
    else{
        placeText({"divid":"mustSetFirstPeriod","text":"Click here to continue to set default rule.","top":"654px","fontSize":"200%","color":"green","textAlign":"center","height":"100px","backgroundColor":"rgba(0,255,0,.1)","width":"600px","left":"340px"})
        clickButton("once","mustSetFirstPeriod",makeSelection,[["page","setDefaultRulePage"]]);
    }
}



function setDefaultRulePage(){
    clearAll();
    // placeText({"divid":"setFirstPeriod1","text":"Next, set your default rule.","top":"25px","fontSize":"300%","color":"red","width":"1280px","textAlign":"center","left":"0px","backgroundColor":"rgba(255,0,0,0)","height":"100px"});
    placeText({"divid":"setFirstPeriod2","text":"The first match will start in <time id='"+window.state['group']+"'>1:00</time>.","top":"25px","fontSize":"300%","color":"red","width":"1280px","textAlign":"center","left":"0px","backgroundColor":"rgba(255,0,0,0)","height":"100px"});
    moveTimer(window.state['group']);
    drawGame();
    drawDefault();
    document.getElementById("setDefaultDiv").style.transform="scale(4) translate3d(60px,-192px,0px)";
    document.getElementById("setDefaultDiv").style.transformOrigin="top left";

    if(window.state['defaultRule']==undefined){
        placeText({"divid":"mustSetDefault","text":"Before you can make rules, set your default rule.","top":"650px","fontSize":"300%","color":"red","width":"1280px","textAlign":"center","left":"0px","backgroundColor":"rgba(255,0,0,0)","height":"100px"});
    }
    else{
        placeText({"divid":"mustSetDefault","text":"Click here to continue to construct more rules.","top":"654px","fontSize":"200%","color":"green","textAlign":"center","height":"100px","backgroundColor":"rgba(0,255,0,.1)","width":"600px","left":"340px"})
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
    document.getElementById("ruleList").style.width="930px";
    document.getElementById("ruleListIn").style.minWidth="930px";
    drawHighlights();
    drawInfo();
    drawPreMatchInfo();
    drawSupergameTypeReminder();
}


function drawPreMatchInfo(){
    var thisRule="sdf";
    placeText({
        "divid":"directChoiceInfoBack",
        "text":"",
        "width":"350px",
        "top":"225px",
        "textAlign":"center",
        "left":"930px",
        "backgroundColor":"rgba(255,255,255,1)",
        "border":"1px solid rgba(0,255,0,1)",
        "height":"524px"});

    placeText({
        "divid":"directChoiceInfo",
        "text":"",
        "width":"350px",
        "top":"225px",
        "textAlign":"center",
        "left":"930px",
        "backgroundColor":"rgba(0,255,0,.05)",
        "height":"524px"});

    placeText({"parentDiv":"directChoiceInfo","divid":"timerMessage","text":"The next match will start in <time id='"+window.state['group']+"'>1:00</time>.","top":"25px","fontSize":"35px","color":"red","textAlign":"center","left":"25px","backgroundColor":"rgba(0,255,0,0)","height":"150px","lineHeight":"50px","userSelect":"none","width":"300px"});
    moveTimer(window.state['group']);


    placeText({
        "parentDiv":"directChoiceInfo",
        "divid":"directChoiceInfo1",
        "text":"If you are ready to start the match, click the button below.",
        "width":"320px",
        "top":"155px",
        "fontSize":"25px",
        "textAlign":"center",
        "left":"15px",
        "height":"50px",
        "lineHeight":"35px",
    });


    if(window.state["startMatchConfirm"]!="yes"){
        placeText({
            "parentDiv":"directChoiceInfo",
            "divid":"startMatchButton",
            "text":"Start Match",
            "width":"280px",
            "top":"250px",
            "fontSize":"28px",
            "textAlign":"center",
            "left":"35px",
            "height":"75px",
            "backgroundColor":"rgba(0,255,0,.1)",
            "border":"3px solid rgba(0,255,0,.1)"
        });
        hoverDiv("startMatchButton",{'border':'3px solid green'});
        clickButton("once","startMatchButton",startMatchButton);
    }
    else{
        placeText({
            "parentDiv":"directChoiceInfo",
            "divid":"startMatchButton",
            "text":"Waiting for others to start match",
            "width":"280px",
            "top":"250px",
            "fontSize":"18px",
            "textAlign":"center",
            "left":"35px",
            "height":"75px",
            "backgroundColor":"rgba(0,255,0,.1)",
            "border":"3px solid rgba(0,255,0,.1)"
        });

    }

    placeText({
        "parentDiv":"directChoiceInfo",
        "divid":"directChoiceInfo2",
        "text":"After you click the button, you will still be able to continue editing your rules.  Once everyone has clicked the continue button (or the time has expired) the match will start.",
        "width":"320px",
        "top":"375px",
        "fontSize":"18px",
        "textAlign":"center",
        "left":"15px",
        "height":"50px",
        "lineHeight":"25px",
    });
}

function startMatchButton(){
    var message={"type":"startMatchButton"};
    sock.send(JSON.stringify(message));
}

function gameOLD(){
    clearAll();
    drawGame();
    drawFirstPeriod();
    drawDefault();
    drawConstructor();
    drawHistory();  
    drawRules();  
    drawHighlights();  
    drawInfo();  
}



function gameNonBinding(){
    clearAll();
    drawGame();
    drawFirstPeriod();
    drawDefault();
    drawConstructor();
    drawHistory();  
    drawRules();  
    document.getElementById("ruleList").style.width="930px";
    document.getElementById("ruleListIn").style.minWidth="930px";
    drawHighlights();  
    drawInfo();  
    drawChoiceOption();
    drawSupergameTypeReminder();
}

function drawSupergameTypeReminder(){
    placeText({
        "color":"rgba(200,0,0,1)",
        "fontSize":"20px",
        'left':"0px",
        "width":"930px",
        "text":window.state['supergameInfo']['supergameTypeMessage2'],
        "top":"675px",
        "textAlign":"left",
        "height":"75px",
        "lineHeight":"25px",
        "padding":"12px",
        "backgroundColor":"rgba(255,200,200,.8)",
    })
}

function gameNoChange(){
    clearAll();
    drawGame();
    drawHistory();  
    drawRules();  
    drawHighlights();  
    drawInfo();  
    gameNoChangeMessage();
}


function gameNoChangeMessage(){
    placeText({"divid":"directChoiceMessage2","width":"930px","text":"","top":"774px","textAlign":"center","left":"0px","backgroundColor":"rgba(255,255,255,1)","height":"250px"})
    placeText({"color":"red","parentDiv":"directChoiceMessage2","fontSize":"30px",'left':"200px","width":"530px","text":window.state['supergameInfo']['supergameTypeMessage'],"top":"50px","textAlign":"center","height":"150px","lineHeight":"50px"})
}

window.ruleColors=[]
window.ruleColors["Y"]="rgba(142,214,255,1)";
window.ruleColors["W"]="rgba(255,255,0,1)";

function drawChoiceOption(){
    var thisRule="sdf";
    placeText({
        "divid":"directChoiceInfoBack",
        "text":"",
        "width":"350px",
        "top":"225px",
        "textAlign":"center",
        "left":"930px",
        "backgroundColor":"rgba(255,255,255,1)",
        "border":"1px solid rgba(0,255,0,1)",
        "height":"524px"})


    if(window.state['nextChoiceInfo']['action']==0){
        var nextAction="W";
        var otherAction="Y";
    }
    else{
        var nextAction="Y";
        var otherAction="W";
    }

    if(window.state['period']==1){
        var text1="Since it is the first period, the";
        var text2="will be used to make your choice, so your rule set will select action "+nextAction+".  To select action "+nextAction+" click below:";
    }
    else{
        var text1="Given your current rule set,";
        var text2="is the longest rule that fits the history, so your rule set will select action "+nextAction+".  To select action "+nextAction+" click below:";
    }
    if(window.state['nextChoiceInfo']['info'][1]=="Default Rule"){
        text1+=" the";
    }

    placeText({
        "divid":"directChoiceInfo",
        "text":"",
        "width":"350px",
        "top":"225px",
        "textAlign":"center",
        "left":"930px",
        "backgroundColor":"rgba(0,255,0,.05)",
        "height":"524px"})

    placeText({
        "text":text1,
        "parentDiv":"directChoiceInfo",
        "width":"350px",
        "top":"-20px",
        "textAlign":"center",
        "left":"0px",
        "fontSize":"20px",
        "lineHeight":"30px",
        "height":"75px",
        "padding":"25px",
    });

    placeText({
        "text":window.state['nextChoiceInfo']['info'][1],
        "parentDiv":"directChoiceInfo",
        "width":"350px",
        "top":"15px",
        "textAlign":"center",
        "left":"0px",
        "fontSize":"28px",
        "lineHeight":"30px",
        "height":"75px",
        "padding":"25px",
        "color":"blue",
    });

    placeText({
        "text":text2,
        "parentDiv":"directChoiceInfo",
        "width":"350px",
        "top":"50px",
        "textAlign":"left",
        "left":"0px",
        "fontSize":"20px",
        "lineHeight":"30px",
        "height":"75px",
        "padding":"25px",
    });




    placeText({
        "divid":"makeRuleSetChoice",
        "text":"Play action "+nextAction+" as prescribed by your set of rules.",
        "parentDiv":"directChoiceInfo",
        "width":"310px",
        "top":"175px",
        "textAlign":"left",
        "left":"20px",
        "fontSize":"24px",
        "lineHeight":"25px",
        "height":"85px",
        "padding":"15px",
        "backgroundColor":window.ruleColors[nextAction],
        "border":"1px solid black"
    });

    placeText({
        "text":"You can instead choose action "+otherAction+" by clicking below:",
        "parentDiv":"directChoiceInfo",
        "width":"350px",
        "top":"250px",
        "textAlign":"left",
        "left":"0px",
        "fontSize":"20px",
        "lineHeight":"30px",
        "height":"75px",
        "padding":"25px",
    });




    placeText({
        "divid":"makeOtherChoice",
        "text":"Play action "+otherAction+" instead.",
        "parentDiv":"directChoiceInfo",
        "width":"310px",
        "top":"345px",
        "textAlign":"center",
        "left":"20px",
        "fontSize":"24px",
        "height":"85px",
        "lineHeight":"85px",
        "backgroundColor":window.ruleColors[otherAction],
        "border":"1px solid black"
    });


    // placeText({
    //     "text":"Can also select by clicking the DOWN arrow key on keyboard.",
    //     "parentDiv":"directChoiceInfo",
    //     "width":"350px",
    //     "top":"375px",
    //     "textAlign":"center",
    //     "left":"0px",
    //     "fontSize":"10px",
    //     "lineHeight":"30px",
    //     "height":"75px",
    //     "padding":"25px",
    // });

    placeText({
        "text":"Can also select by clicking the UP arrow key on keyboard.",
        "parentDiv":"directChoiceInfo",
        "width":"350px",
        "top":"210px",
        "textAlign":"center",
        "left":"0px",
        "fontSize":"10px",
        "lineHeight":"30px",
        "height":"75px",
        "padding":"25px",
    });

    placeText({
        "divid":"otherActionWarning",
        "text":window.state['supergameInfo']['supergameTypeMessage'],
        //This will not be an option starting in match 21.  Your rule set will play automatically.",
        "parentDiv":"directChoiceInfo",
        "width":"280px",
        "top":"450px",
        "textAlign":"left",
        "left":"40px",
        "fontSize":"18px",
        "lineHeight":"20px",
        "height":"75px",
        "padding":"0px",
        "color":"transparent"
    });


    if(window.state['confirmed']=="no"){
        placeText({
            "divid":"makeOtherChoiceButton",
            "text":"",
            "parentDiv":"directChoiceInfo",
            "width":"310px",
            "top":"345px",
            "textAlign":"center",
            "left":"20px",
            "fontSize":"24px",
            "height":"85px",
            "lineHeight":"50px",
            "border":"1px solid black"
        });

        placeText({
            "divid":"makeRuleSetChoiceButton",
            "parentDiv":"directChoiceInfo",
            "width":"310px",
            "top":"175px",
            "textAlign":"left",
            "left":"20px",
            "height":"85px",
            "border":"1px solid black"
        });


        hoverDiv("makeOtherChoiceButton",{'border':'3px solid red'});
        hoverDiv("makeRuleSetChoiceButton",{'border':'3px solid red'});
        clickButton("once","makeRuleSetChoiceButton",confirmChoiceNonBinding,"ruleSet");        
        pressKey("once","up",confirmChoiceNonBinding,"ruleSet")
        // pressKey("once","down",confirmChoiceNonBinding,"otherAction")
        clickButton("once","makeOtherChoiceButton",confirmChoiceNonBinding,"otherActionConfirmNeeded");
        hoverDivChangeOtherDiv("makeOtherChoiceButton","otherActionWarning",{'color':'red'});
    }
    else{
        if(window.state['nonBindingChoice']=="otherAction"){
            placeText({
                "divid":"makeOtherChoice2",
                "text":"",
                "parentDiv":"directChoiceInfo",
                "width":"310px",
                "top":"345px",
                "textAlign":"center",
                "left":"20px",
                "fontSize":"24px",
                "height":"85px",
                "border":"3px solid red"
            });
            document.getElementById("otherActionWarning").style.color="red";
        }
        else if(window.state['nonBindingChoice']=="ruleSet"){
            placeText({
                "divid":"makeRuleSetChoice2",
                "parentDiv":"directChoiceInfo",
                "width":"310px",
                "top":"175px",
                "textAlign":"left",
                "left":"20px",
                "fontSize":"24px",
                "lineHeight":"30px",
                "height":"85px",
                "padding":"15px",
                "border":"3px solid red"
            });
        }
    }
    if(window.state['otherActionConfirmation']=="true"){
        removePressKeyListener("up");
        drawOtherActionConfirmation();
    }
}

function confirmChoiceNonBinding(args){
    removePressKeyListener("up");
    removePressKeyListener("down");
    removeListeners("makeOtherChoice");
    removeListeners("makeRuleSetChoice");
    var message={"type":"confirmChoiceNonBinding","choiceType":args[0]};
    sock.send(JSON.stringify(message));
}


function drawOtherActionConfirmation(){
    placeText({"zIndex":"99999","divid":"alertBackground","width":"100%","height":"100%","backgroundColor":"rgba(100,100,100,.7)"});
    placeText({"parentDiv":"alertBackground","divid":"alertForeground","left":"200px","width":"880px","height":"824px","top":"100px","backgroundColor":"rgba(255,255,255,1)"});
    placeText({"parentDiv":"alertForeground","text":window.state['supergameInfo']['supergameTypeMessage2'],"left":"20px","width":"840px","height":"384px","top":"20px","fontSize":"28px","lineHeight":"50px","color":"blue"});


    if(window.state['nextChoiceInfo']['action']==0){
        var nextAction="w";
        var otherAction="y";
        var otherActionUpper="Y";
    }
    else{
        var nextAction="y";
        var otherAction="w";
        var otherActionUpper="W";
    }

    placeText({"divid":"otherActionContinue","parentDiv":"alertForeground","text":"Continue and play action "+otherActionUpper+" right now.","left":"150px","width":"240px","height":"100px","top":"675px","fontSize":"20px","padding":"20px","lineHeight":"30px","border":"1px solid black","backgroundColor":window.ruleColors[otherActionUpper]});
    placeText({"divid":"otherActionCancel","parentDiv":"alertForeground","text":"Cancel, and go back to change rule set.","left":"490px","width":"240px","height":"100px","top":"675px","fontSize":"20px","padding":"20px","lineHeight":"30px","border":"1px solid black","backgroundColor":"rgba(255,0,0,.1)"});


    placeText({"parentDiv":"alertForeground","text":"After the current history your rule set will play:","left":"100px","width":"580px","textAlign":"right","height":"100px","top":"225px","fontSize":"28px","lineHeight":"100px"});
    placeText({"parentDiv":"alertForeground","className":nextAction+"Square square","left":"700px","width":"50px","height":"50px","top":"250px"});

    placeText({"parentDiv":"alertForeground","text":"You are currently trying to play:","left":"100px","width":"580px","textAlign":"right","height":"100px","top":"325px","fontSize":"28px","lineHeight":"100px"});
    placeText({"parentDiv":"alertForeground","className":otherAction+"Square square","left":"700px","width":"50px","height":"50px","top":"350px"});


    placeText({"parentDiv":"alertForeground","text":"Since your rule set will play automatically for you in the future, you should consider changing your rule set so that it plays the action you want it to after every history.","left":"50px","width":"780px","textAlign":"left","height":"100px","top":"450px","fontSize":"28px","lineHeight":"50px","color":"red"});


    clickButton("once","otherActionCancel",cancelOtherActionConfirm);   
    clickButton("once","otherActionContinue",confirmChoiceOtherAction,"continue");        

}

function confirmChoiceOtherAction(args){
    removeListeners("otherActionContinue");
    removeListeners("otherActionCancel");
    var message={"type":"confirmChoiceNonBinding","choiceType":"otherAction"};
    sock.send(JSON.stringify(message));
}

function cancelOtherActionConfirm(args){
    var message={"type":"cancelOtherActionConfirm"};
    sock.send(JSON.stringify(message));
}




function drawDirectResponse(){

    placeText({"divid":"directChoiceMessage2","width":"930px","text":"","top":"774px","textAlign":"center","left":"0px","backgroundColor":"rgba(255,255,255,1)","height":"250px"})
    placeText({"color":"red","parentDiv":"directChoiceMessage2","fontSize":"30px",'left':"200px","width":"530px","text":window.state['supergameInfo']['supergameTypeMessage'],"top":"75px","textAlign":"center","height":"100px","lineHeight":"50px"})


    placeText({"divid":"directChoice","text":"","top":"250px","textAlign":"center","left":"0px","backgroundColor":"rgba(255,255,255,.75)","height":"475px"})
    placeText({"divid":"directChoiceMessage","text":"","top":"250px","textAlign":"center","left":"0px","backgroundColor":"rgba(255,255,255,.75)","height":"475px"})
    if(window.state['confirmed']=="no" && window.state['page']=="gameDirectResponse"){
        placeText({"text":"Select your choice for period "+(window.state['period'])+" by clicking one of the buttons below:","top":"250px","textAlign":"center","left":"0px","height":"100px","fontSize":"300%"})
        placeText({"text":"You will not be able to see the choice of the other subject until after you make your choice.","top":"650px","textAlign":"center","left":"0px","height":"50px","fontSize":"200%"})

        var directChoiceW=createAndAddDiv("directChoiceW","mainDiv");
        directChoiceW.className="wSquare square";
        directChoiceW['style']['transform']="scale(5)";
        directChoiceW['style']['transformOrigin']="top left";
        directChoiceW['style']['top']="350px";
        directChoiceW['style']['left']="325px";

        var directChoiceY=createAndAddDiv("directChoiceY","mainDiv");
        directChoiceY.className="ySquare square";
        directChoiceY['style']['transform']="scale(5)";
        directChoiceY['style']['transformOrigin']="top left";
        directChoiceY['style']['top']="350px";
        directChoiceY['style']['left']="705px";


        clickButton("once","directChoiceW",confirmChoiceDirectResponse,0);
        pressKey("once","left",confirmChoiceDirectResponse,0)
        clickButton("once","directChoiceY",confirmChoiceDirectResponse,1);
        pressKey("once","right",confirmChoiceDirectResponse,1)
        hoverDiv("directChoiceW",{'border':'2px solid rgba(0,255,0,1)'})
        hoverDiv("directChoiceY",{'border':'2px solid rgba(0,255,0,1)'})
    }
    else{
        if(window.state['page']=="gameDirectResponse"){var thisPeriod=window.state['period'];}
        else{var thisPeriod=window.state['period']-1;}
        placeText({"text":"You selected "+window.state['choice']+" as your choice for period "+(thisPeriod)+".","top":"250px","textAlign":"center","left":"0px","height":"100px","fontSize":"300%"})
        placeText({"text":"Please wait for the other subject to make their choice.","top":"650px","textAlign":"center","left":"0px","height":"50px","fontSize":"200%"})

        if(window.state['choice']=="W"){
            var directChoiceW=createAndAddDiv("directChoiceW","mainDiv");
            directChoiceW.className="wSquare square";
            directChoiceW['style']['transform']="scale(5)";
            directChoiceW['style']['transformOrigin']="top left";
            directChoiceW['style']['left']="325px";
            directChoiceW['style']['top']="350px";            
            directChoiceW['style']['border']="2px solid red";            
        }
        if(window.state['choice']=="Y"){
            var directChoiceY=createAndAddDiv("directChoiceY","mainDiv");
            directChoiceY.className="ySquare square";
            directChoiceY['style']['transform']="scale(5)";
            directChoiceY['style']['transformOrigin']="top left";
            directChoiceY['style']['top']="350px";
            directChoiceY['style']['left']="705px";
            directChoiceY['style']['border']="2px solid red";            
        }
        // highlightHistory();
    }


    if(divExists("directChoiceW")){
        placeText({
            "text":"Can also select by clicking the LEFT arrow key on keyboard.",
            "top":"550px",
            "textAlign":"center",
            "left":"340px",
            "height":"15px",
            'width':'220px',
            "lineHeight":"20px",
            "fontSize":"15px"})
    }

    if(divExists("directChoiceY")){
        placeText({
            "text":"Can also select by clicking the RIGHT arrow key on keyboard.",
            "top":"550px",
            "textAlign":"center",
            "left":"720px",
            "height":"15px",
            'width':'220px',
            "lineHeight":"20px",
            "fontSize":"15px"})
    }


}


function gameDirectResponse(){
    clearAll();
    drawGame();
    drawInfo();  
    drawHistory();  
    // drawHighlights();
    drawDirectResponse()
    drawHighlights();
}


function confirmChoiceDirectResponse(args){
    removePressKeyListener("left");
    removePressKeyListener("right");
    deleteDiv("directChoiceW");
    deleteDiv("directChoiceY");
    var message={"type":"confirmChoiceDirectResponse","choice":args[0]};
    sock.send(JSON.stringify(message));
}


function postMatch(){
    clearAll();
    drawGame();
    drawInfo();
    drawHistory();

    if(window.state['supergameInfo']['supergameType']=="nonBinding"){
        drawFirstPeriod();
        drawDefault();
        drawConstructor();
        drawRules();    
        drawInfo();
        if(window.state['stage']=="wait"){
            placeText({"divid":"matchOverMessage","text":"Match Finished.","top":"50px","fontSize":"250%","color":"red","textAlign":"center","left":"0px","backgroundColor":"rgba(255,255,255,.75)","height":"150px"})
            placeText({"divid":"matchOverMessage2","text":"Please wait for other subjects to finish their matches.","top":"135px","fontSize":"100%","color":"red","textAlign":"center","left":"0px","backgroundColor":"rgba(255,255,255,0)","height":"50px"})
        }
        else if(window.state['stage']=="timer"){
            placeText({"divid":"matchOverMessage","text":"Match Finished.","top":"50px","fontSize":"250%","color":"red","textAlign":"center","left":"0px","backgroundColor":"rgba(255,255,255,.75)","height":"150px"})
            placeText({"divid":"matchOverMessage2","text":"The next match will start in  <time id='"+window.state['group']+"'>1:00</time>.","top":"135px","fontSize":"100%","color":"red","textAlign":"center","left":"0px","backgroundColor":"rgba(255,255,255,0)","height":"50px"})
            moveTimer(window.state['group']);
        }
    }
    if(window.state['supergameInfo']['supergameType']=="noChange"){
        drawRules();    
        drawInfo();
        gameNoChangeMessage();
        if(window.state['stage']=="wait"){
            placeText({"divid":"matchOverMessage","text":"Match Finished.","top":"50px","fontSize":"250%","color":"red","textAlign":"center","left":"0px","backgroundColor":"rgba(255,255,255,.75)","height":"150px"})
            placeText({"divid":"matchOverMessage2","text":"Please wait for other subjects to finish their matches.","top":"135px","fontSize":"100%","color":"red","textAlign":"center","left":"0px","backgroundColor":"rgba(255,255,255,0)","height":"50px"})
        }
        else if(window.state['stage']=="timer"){
            placeText({"divid":"matchOverMessage","text":"Match Finished.","top":"50px","fontSize":"250%","color":"red","textAlign":"center","left":"0px","backgroundColor":"rgba(255,255,255,.75)","height":"150px"})
            placeText({"divid":"matchOverMessage2","text":"The next match will start in  <time id='"+window.state['group']+"'>1:00</time>.","top":"135px","fontSize":"100%","color":"red","textAlign":"center","left":"0px","backgroundColor":"rgba(255,255,255,0)","height":"50px"})
            moveTimer(window.state['group']);
        }
    }
    if(window.state['supergameInfo']['supergameType']=="directResponse"){
        if(window.state['stage']=="wait"){
            placeText({"divid":"matchOverMessage","text":"Match Finished.","top":"50px","fontSize":"250%","color":"red","textAlign":"center","left":"0px","backgroundColor":"rgba(255,255,255,.75)","height":"150px"})
            placeText({"divid":"matchOverMessage2","text":"Please wait for other subjects to finish their matches.","top":"135px","fontSize":"100%","color":"red","textAlign":"center","left":"0px","backgroundColor":"rgba(255,255,255,0)","height":"50px"})
        }
        else if(window.state['stage']=="timer"){
            placeText({"divid":"matchOverMessage","text":"Match Finished.","top":"50px","fontSize":"250%","color":"red","textAlign":"center","left":"0px","backgroundColor":"rgba(255,255,255,.75)","height":"150px"})
            placeText({"divid":"matchOverMessage2","text":"This match will end in  <time id='"+window.state['group']+"'>1:00</time>.","top":"135px","fontSize":"100%","color":"red","textAlign":"center","left":"0px","backgroundColor":"rgba(255,255,255,0)","height":"50px"})
            moveTimer(window.state['group']);
        }
        drawDirectResponse();
    }
}

function statusManager(){
  thisStatus=window.state;
  if(runFunctionFromString(thisStatus["page"])==false){
      if(thisStatus[0]==-1){
        message="Loading...";
        genericScreen(message);
      }
      else if(thisStatus["page"]=="generic"){
        clearAll();
        genericScreen(thisStatus["message"]);
      }
  }
}







































///////////////////////////////NEW PAGE//////////////////////////////////////////////
///////////////////////////////NEW PAGE//////////////////////////////////////////////
///////////////////////////////NEW PAGE//////////////////////////////////////////////



///////////////////////////////NEW PAGE//////////////////////////////////////////////
///////////////////////////////NEW PAGE//////////////////////////////////////////////
///////////////////////////////NEW PAGE//////////////////////////////////////////////



///////////////////////////////NEW PAGE//////////////////////////////////////////////
///////////////////////////////NEW PAGE//////////////////////////////////////////////
///////////////////////////////NEW PAGE//////////////////////////////////////////////



///////////////////////////////NEW PAGE//////////////////////////////////////////////
///////////////////////////////NEW PAGE//////////////////////////////////////////////
///////////////////////////////NEW PAGE//////////////////////////////////////////////



///////////////////////////////NEW PAGE//////////////////////////////////////////////
///////////////////////////////NEW PAGE//////////////////////////////////////////////
///////////////////////////////NEW PAGE//////////////////////////////////////////////



///////////////////////////////NEW PAGE//////////////////////////////////////////////
///////////////////////////////NEW PAGE//////////////////////////////////////////////
///////////////////////////////NEW PAGE//////////////////////////////////////////////



///////////////////////////////NEW PAGE//////////////////////////////////////////////
///////////////////////////////NEW PAGE//////////////////////////////////////////////
///////////////////////////////NEW PAGE//////////////////////////////////////////////



///////////////////////////////NEW PAGE//////////////////////////////////////////////
///////////////////////////////NEW PAGE//////////////////////////////////////////////
///////////////////////////////NEW PAGE//////////////////////////////////////////////


function overviewScreen(){
    clearAll();
    drawBackAndForwardButtons();


        placeText({"text":"Experiment Overview",
            "top":"0px",
            "fontSize":"400%",
            "color":"blue",
            "height":"100px"});


    if(window.state['stage']>=1){
        placeText({"text":"You are about to participate in an <a style='color:red'>economics experiment</a>.",
            "top":"150px",
            "fontSize":"300%",
            "color":"black",
            "width":"1280px",
            "textAlign":"left",
            "left":"100px",
            "backgroundColor":"rgba(0,0,0,0)",
            "height":"100px"});
    }


    if(window.state['stage']>=2){
        placeText({
            "text":"If you listen carefully, you could earn a large amount of money, that will be paid to you in cash, in private, at the end of the experiment.",
            "top":"400px",
            "fontSize":"300%",
            "color":"black",
            "width":"1080px",
            "textAlign":"left",
            "left":"100px",
            "backgroundColor":"rgba(0,0,0,0)",
            "height":"50px"});
    }

    if(window.state['stage']>=3){
        placeText({
            "text":"If you have any questions, or need any assistance of any kind, please raise your hand and an experimenter will help you out. ",
            "top":"700px",
            "fontSize":"300%",
            "color":"black",
            "width":"1080px",
            "textAlign":"left",
            "left":"100px",
            "backgroundColor":"rgba(0,0,0,0)",
            "height":"50px"});
    }


    var buttonTops=[0,150,400,700,900];
    placeText({"divid":"continueButton","text":"Continue.","top":buttonTops[parseInt(window.state['stage'])+1]+"px","fontSize":"300%","color":"green","width":"680px","textAlign":"center","left":"300px","height":"100px","lineHeight":"100px","backgroundColor":"rgba(0,255,0,.1)"})
    if(window.state['stage']<=2){
        clickButton("once","continueButton",makeSelection,[["stage",parseInt(window.state['stage'])+1]]);
    }
    else{
        clickButton("once","continueButton",makeSelection,[["page","overviewScreen2"],["stage",1]]);
    }
}

///////////////////////////////NEW PAGE//////////////////////////////////////////////
///////////////////////////////NEW PAGE//////////////////////////////////////////////
///////////////////////////////NEW PAGE//////////////////////////////////////////////



function overviewScreen2(){
    clearAll();
    drawBackAndForwardButtons();


        placeText({"text":"Experiment Overview",
            "top":"0px",
            "fontSize":"400%",
            "color":"blue",
            "height":"100px"});



    if(window.state['stage']>=1){
        placeText({
            "text":"During the experiment, do not talk, laugh or exclaim out loud and be sure to keep your eyes on your screen only",
            "top":"150px",
            "fontSize":"300%",
            "color":"black",
            "width":"1080px",
            "textAlign":"left",
            "left":"100px",
            "backgroundColor":"rgba(0,0,0,0)",
            "height":"50px"});
    }

    if(window.state['stage']>=2){
        placeText({
            "text":"In addition, please <a style='color:black'>turn off your cell phones, etc.</a> and put them away during the experiment.",
            "top":"350px",
            "fontSize":"300%",
            "color":"black",
            "width":"1080px",
            "textAlign":"left",
            "left":"100px",
            "backgroundColor":"rgba(0,0,0,0)",
            "height":"50px"});
    }

    if(window.state['stage']>=3){
        placeText({
            "text":"Anybody that violates these rules will be asked to leave.",
            "top":"550px",
            "fontSize":"300%",
            "color":"black",
            "width":"1080px",
            "textAlign":"left",
            "left":"100px",
            "backgroundColor":"rgba(0,0,0,0)",
            "height":"50px"});
    }

    if(window.state['stage']>=4){
        placeText({
            "text":"We appreciate your cooperation.",
            "top":"750px",
            "fontSize":"300%",
            "color":"black",
            "width":"1080px",
            "textAlign":"left",
            "left":"100px",
            "backgroundColor":"rgba(0,0,0,0)",
            "height":"50px"});
    }

    var buttonTops=[0,150,350,550,750,900];
    placeText({"divid":"continueButton","text":"Continue.","top":buttonTops[parseInt(window.state['stage'])+1]+"px","fontSize":"300%","color":"green","width":"680px","textAlign":"center","left":"300px","height":"100px","lineHeight":"100px","backgroundColor":"rgba(0,255,0,.1)"})
    if(window.state['stage']<=3){
        clickButton("once","continueButton",makeSelection,[["stage",parseInt(window.state['stage'])+1]]);
    }
    else{
        clickButton("once","continueButton",makeSelection,[["page","agendaScreen"],["stage",1]]);
    }
}

///////////////////////////////NEW PAGE//////////////////////////////////////////////
///////////////////////////////NEW PAGE//////////////////////////////////////////////
///////////////////////////////NEW PAGE//////////////////////////////////////////////



function agendaScreen(){
    clearAll();
    drawBackAndForwardButtons();


    placeText({"text":"Agenda",
        "top":"0px",
        "fontSize":"400%",
        "color":"blue",
        "height":"100px"});


    if(window.state['stage']>=1){
        placeText({"text":"1.  Instructions with 20 quiz questions",
            "top":"100px",
            "fontSize":"300%",
            "color":"black",
            "width":"1280px",
            "textAlign":"left",
            "left":"100px",
            "backgroundColor":"rgba(0,0,0,0)",
            "height":"100px"});
    }
    if(window.state['stage']>=2){
        placeText({"text":"- You can earn \$5 if you answer the quiz questions correctly.",
            "top":"175px",
            "fontSize":"200%",
            "color":"black",
            "width":"1280px",
            "textAlign":"left",
            "left":"200px",
            "backgroundColor":"rgba(0,0,0,0)",
            "height":"100px"});

        placeText({"text":"- If you incorrectly answer 3 or more questions, then you will earn \$0.",
            "top":"225px",
            "fontSize":"200%",
            "color":"black",
            "width":"1280px",
            "textAlign":"left",
            "left":"200px",
            "backgroundColor":"rgba(0,0,0,0)",
            "height":"100px"});
    }
    if(window.state['stage']>=3){
        placeText({"text":"2.  After everyone has finished the instructions/quiz, the experiment will start.",
            "top":"350px",
            "fontSize":"300%",
            "color":"black",
            "width":"1080px",
            "textAlign":"left",
            "left":"100px",
            "backgroundColor":"rgba(0,0,0,0)",
            "height":"50px"});
    }
    if(window.state['stage']>=4){
        placeText({"text":"3.  After the experiment has finished, you will be paid in cash in private.",
            "top":"550px",
            "fontSize":"300%",
            "color":"black",
            "width":"1080px",
            "textAlign":"left",
            "left":"100px",
            "backgroundColor":"rgba(0,0,0,0)",
            "height":"50px"});
    }
    if(window.state['stage']>=5){
        placeText({"text":"- In the experiment you will be working with a fictitious currency called Francs.",
            "top":"625px",
            "fontSize":"200%",
            "color":"black",
            "width":"1280px",
            "textAlign":"left",
            "left":"200px",
            "backgroundColor":"rgba(0,0,0,0)",
            "height":"100px"});

        placeText({"text":"- You will be paid in US Dollars at the end of the experiment.",
            "top":"675px",
            "fontSize":"200%",
            "color":"black",
            "width":"1280px",
            "textAlign":"left",
            "left":"200px",
            "backgroundColor":"rgba(0,0,0,0)",
            "height":"100px"});

        placeText({"text":"- The exchange rate today is: 2500 Francs = $1.00",
            "top":"725px",
            "fontSize":"200%",
            "color":"black",
            "width":"1280px",
            "textAlign":"left",
            "left":"200px",
            "backgroundColor":"rgba(0,0,0,0)",
            "height":"100px"});
    }

    var buttonTops=[0,100,200,350,550,700,850,924];
    placeText({"divid":"continueButton","text":"Continue.","top":buttonTops[parseInt(window.state['stage'])+1]+"px","fontSize":"300%","color":"green","width":"680px","textAlign":"center","left":"300px","height":"100px","lineHeight":"100px","backgroundColor":"rgba(0,255,0,.1)"})
    if(window.state['stage']<=4){
        clickButton("once","continueButton",makeSelection,[["stage",parseInt(window.state['stage'])+1]]);
    }
    else{
        clickButton("once","continueButton",makeSelection,[["page","instructionsMatches"],["stage",1]]);
    }

}

///////////////////////////////NEW PAGE//////////////////////////////////////////////
///////////////////////////////NEW PAGE//////////////////////////////////////////////
///////////////////////////////NEW PAGE//////////////////////////////////////////////

function instructionsMatches(){
    clearAll();
    drawBackAndForwardButtons();

    placeText({"text":"Experiment Details: Matches",
        "top":"0px",
        "fontSize":"400%",
        "color":"blue",
        "height":"100px"});



    if(window.state['stage']>=1){
        placeText({"text":"The experiment today consists of <a style='color:red'>60 matches</a>.","top":"100px","fontSize":"300%","color":"black","width":"1280px","textAlign":"left","left":"100px","backgroundColor":"rgba(0,0,0,0)","height":"100px"});
    }

    if(window.state['stage']==1){
        placeText({"divid":"continueButton","text":"Continue.","top":"275px","fontSize":"300%","color":"green","width":"680px","textAlign":"center","left":"300px","height":"100px","lineHeight":"100px","backgroundColor":"rgba(0,255,0,.1)"})
        clickButton("once","continueButton",makeSelection,[["stage",2]]);
    }

    if(window.state['stage']>=2){
        placeText({"text":"Each match you will be matched with one other subject.","top":"275px","fontSize":"300%","color":"black","width":"1280px","textAlign":"left","left":"100px","backgroundColor":"rgba(0,0,0,0)","height":"100px"})
    }

    if(window.state['stage']==2){
        placeText({"divid":"continueButton","text":"Continue.","top":"450px","fontSize":"300%","color":"green","width":"680px","textAlign":"center","left":"300px","height":"100px","lineHeight":"100px","backgroundColor":"rgba(0,255,0,.1)"})
        clickButton("once","continueButton",makeSelection,[["stage",3]]);
    }

    if(window.state['stage']>=3){
        placeText({"text":"Your payoffs in the match will only depend on the choices you make and the choices that the subject that you are matched with make in the match.","top":"450px","fontSize":"300%","color":"black","width":"1080px","textAlign":"left","left":"100px","backgroundColor":"rgba(0,0,0,0)","height":"100px","lineHeight":"50px"});
    }

    if(window.state['stage']==3){
        placeText({"divid":"continueButton","text":"Continue.","top":"700px","fontSize":"300%","color":"green","width":"680px","textAlign":"center","left":"300px","height":"100px","lineHeight":"100px","backgroundColor":"rgba(0,255,0,.1)"})
        clickButton("once","continueButton",makeSelection,[["stage",4]]);
    }

    if(window.state['stage']>=4){
        placeText({"text":"After the match has finished, you will be rematched with a randomly selected subject for the following match.","top":"700px","fontSize":"300%","color":"black","width":"1080px","textAlign":"left","left":"100px","backgroundColor":"rgba(0,0,0,0)","height":"100px","lineHeight":"50px"})
    }
    
    if(window.state['stage']==4){
        placeText({"divid":"continueButton","text":"Continue.","top":"875px","fontSize":"300%","color":"green","width":"680px","textAlign":"center","left":"300px","height":"100px","lineHeight":"100px","backgroundColor":"rgba(0,255,0,.1)"})
        clickButton("once","continueButton",makeSelection,[["stage",1],["page","instructionsPeriods"]]);
    }

}


///////////////////////////////NEW PAGE//////////////////////////////////////////////
///////////////////////////////NEW PAGE//////////////////////////////////////////////
///////////////////////////////NEW PAGE//////////////////////////////////////////////



function instructionsPeriods(){
    clearAll();
    drawBackAndForwardButtons();

    placeText({"text":"Experiment Details: Periods per Match",
        "top":"0px",
        "fontSize":"300%",
        "color":"blue",
        "height":"100px"});


    if(window.state['stage']>=1){
        placeText({"text":"Each match may contain a different number of <a style='color:red'>periods</a>.",
            "top":"100px","fontSize":"300%","color":"black","width":"1280px","textAlign":"left","left":"100px","backgroundColor":"rgba(0,0,0,0)","height":"100px"});
    }

    if(window.state['stage']==1){
        placeText({"divid":"continueButton","text":"Continue.","top":"275px","fontSize":"300%","color":"green","width":"680px","textAlign":"center","left":"300px","height":"100px","lineHeight":"100px","backgroundColor":"rgba(0,255,0,.1)"})
        clickButton("once","continueButton",makeSelection,[["stage",2]]);
    }

    if(window.state['stage']>=2){
        placeText({"text":"The number of periods each match will be determined <a style='color:blue'>randomly</a> using the following procedure:",
            "top":"275px",
            "fontSize":"300%",
            "color":"black",
            "width":"1080px",
            "textAlign":"left",
            "left":"100px",
            "backgroundColor":"rgba(0,0,0,0)",
            "height":"50px"})
    }

    if(window.state['stage']==2){
        placeText({"divid":"continueButton","text":"Continue.","top":"450px","fontSize":"300%","color":"green","width":"680px","textAlign":"center","left":"300px","height":"100px","lineHeight":"100px","backgroundColor":"rgba(0,255,0,.1)"})
        clickButton("once","continueButton",makeSelection,[["stage",3]]);
    }

    if(window.state['stage']>=3){
        placeText({"text":"1. Each period a 20 sided dice containing each of the numbers 1 through 20 will be rolled.",
            "top":"400px",
            "fontSize":"200%",
            "color":"black",
            "width":"1080px",
            "textAlign":"left",
            "left":"150px",
            "backgroundColor":"rgba(0,0,0,0)",
            "height":"100px",
            "lineHeight":"50px"});

        placeText({"text":"2. If the number 1 is rolled, then the match will end.",
            "top":"450px",
            "fontSize":"200%",
            "color":"black",
            "width":"980px",
            "textAlign":"left",
            "left":"150px",
            "backgroundColor":"rgba(0,0,0,0)",
            "height":"100px",
            "lineHeight":"50px"});

        placeText({"text":"3. If the number 1 is NOT rolled, then the match will continue.",
            "top":"500px",
            "fontSize":"200%",
            "color":"black",
            "width":"980px",
            "textAlign":"left",
            "left":"150px",
            "backgroundColor":"rgba(0,0,0,0)",
            "height":"100px",
            "lineHeight":"50px"});

        placeText({"text":"4. Therefore, in every period, there is a 1 out of 20 chance that the match will end.",
            "top":"550px",
            "fontSize":"200%",
            "color":"black",
            "width":"980px",
            "textAlign":"left",
            "left":"150px",
            "backgroundColor":"rgba(0,0,0,0)",
            "height":"100px",
            "lineHeight":"50px"});

    }

    if(window.state['stage']==3){
        placeText({"divid":"continueButton","text":"Continue.","top":"700px","fontSize":"300%","color":"green","width":"680px","textAlign":"center","left":"300px","height":"100px","lineHeight":"100px","backgroundColor":"rgba(0,255,0,.1)"})
        clickButton("once","continueButton",makeSelection,[["stage",4]]);
    }

    if(window.state['stage']>=4){
        placeText({"text":"Since the number of periods is determined randomly, it is likely that each match will have a different number of periods.",
            "top":"650px","fontSize":"300%","color":"black","width":"1080px","textAlign":"left","left":"100px","backgroundColor":"rgba(0,0,0,0)","height":"100px","lineHeight":"50px"})
    }
    
    if(window.state['stage']==4){
        placeText({"divid":"continueButton","text":"Continue to see an example.","top":"875px","fontSize":"300%","color":"green","width":"680px","textAlign":"center","left":"300px","height":"100px","lineHeight":"100px","backgroundColor":"rgba(0,255,0,.1)"})
        clickButton("once","continueButton",makeSelection,[["stage",1],["page","instructionsPeriodsSimulationPage"]]);
    }

}



///////////////////////////////NEW PAGE//////////////////////////////////////////////
///////////////////////////////NEW PAGE//////////////////////////////////////////////
///////////////////////////////NEW PAGE//////////////////////////////////////////////


function instructionsPeriodsSimulationPage(){
    clearAll();
    drawBackAndForwardButtons();

    placeText({"text":"Periods per Match Example",
        "top":"0px",
        "fontSize":"200%",
        "color":"blue",
        "height":"50px"});


    if(window.state['stage']>=1){
        placeText({"text":"To get an idea of how many periods a match might have, try an example which will show the outcome of the dice every period by clicking the button below:",
            "top":"50px",
            "fontSize":"200%",
            "color":"black",
            "width":"1080px",
            "textAlign":"left",
            "left":"100px",
            "backgroundColor":"rgba(0,0,0,0)",
            "height":"50px"});
    }
    drawPeriodSimulationButton();
}


function drawPeriodSimulationButton(){
    placeText({
        "divid":"periodSimulationButton",
        "text":"Try an example",
        "top":"350px",
        "fontSize":"300%",
        "color":"green",
        "width":"400px",
        "textAlign":"center",
        "left":"120px",
        "backgroundColor":"rgba(0,255,0,.1)",
        "height":"100px"});
    clickButton("once","periodSimulationButton",instructionsPeriodsSimulation);    
}

function drawPeriodSimulationButton2(){
    placeText({
        "divid":"periodSimulationButton",
        "text":"Try another example",
        "top":"350px",
        "fontSize":"300%",
        "color":"green",
        "width":"400px",
        "textAlign":"center",
        "left":"120px",
        "backgroundColor":"rgba(0,255,0,.1)",
        "height":"100px"});
    clickButton("once","periodSimulationButton",instructionsPeriodsSimulation);    


    placeText({
        "divid":"periodSimulationButton2",
        "text":"Continue",
        "top":"350px",
        "fontSize":"300%",
        "color":"green",
        "width":"400px",
        "textAlign":"center",
        "left":"760px",
        "backgroundColor":"rgba(0,255,0,.1)",
        "height":"100px"});
        continueFunctions=[["stage","1"],["page","periodWriteOnBoard"]]
        clickButton("once","periodSimulationButton2",makeSelection,continueFunctions);

}


function drawPeriodSimulationSummary(){
        placeText({
            "divid":"periodSimulationSummary1",
            "text":"In the example below, there were <a id='periodNumber' style='color:red'>0</a> rolls before the first 1 was rolled.",
            "top":"200px",
            "fontSize":"200%",
            "color":"black",
            "width":"1080px",
            "textAlign":"center",
            "left":"100px",
            "backgroundColor":"rgba(0,0,0,0)",
            "height":"50px"});
}


function drawPeriodSimulationSummary2(period){
        placeText({
            "divid":"periodSimulationSummary2",
            "text":"Therefore, the number of periods in this example match would be <a id='periodNumber2' style='color:red'>"+period+"</a>.",
            "top":"250px",
            "fontSize":"200%",
            "color":"black",
            "width":"1080px",
            "textAlign":"center",
            "left":"100px",
            "backgroundColor":"rgba(0,0,0,0)",
            "height":"50px"});
    }

function instructionsPeriodsSimulation(){
    deleteDiv("periodSimulationButton");
    deleteDiv("periodSimulationButton2");
    deleteDiv("periodSimulationSummary1");
    deleteDiv("periodSimulationSummary2");
    deleteDiv("clickStatusBackButton");
    deleteDiv("clickStatusForwardButton");


    drawPeriodSimulationSummary();
    

    placeText({"divid":"periodNumbers","top":"500px","fontSize":"300%","color":"black","width":"1000px","textAlign":"left","left":"140px","backgroundColor":"rgba(255,0,0,0)","height":"400px"});
    var j=-1;
    var k=-1;
    var top=0;
    while(3<4){
        var thisNumber=Math.floor(Math.random()*20);
        k=k+1;
        j=j+1;

        var timeDelta=10;


        var pf=partial(setPeriod,j+1);
        setTimeout(pf,timeDelta*j);

        var boxWidth=40;
        var incoming={"divid":"period_"+j,
        "parentDiv":"periodNumbers",
        "text":thisNumber+1,
        "top":top+"px",
        "left":(boxWidth*k)+"px",
        "fontSize":"50%",
        "color":"black",
        "width":boxWidth+"px",
        "textAlign":"center",
        "backgroundColor":"rgba(0,255,0,.05)",
        "height":boxWidth+"px"};
        if(j%5==4 && j%25!=24){incoming['borderRight']="1px solid red";}
        if(top%160==120){incoming['borderBottom']="1px solid red";}


        var pf=partial(placeText,incoming);
        setTimeout(pf,timeDelta*j);
        if(k>23){
            k=-1;
            top+=boxWidth;
        }
        if(thisNumber<1){
            incoming['color']="red";
            // incoming['fontSize']="100%";
            incoming['width']="40px";
            incoming['height']="40px";
            incoming['borderRight']=undefined;
            incoming['borderBottom']=undefined;
            incoming['borderLeft']=undefined;
            incoming['borderTop']=undefined;
            incoming['border']="2px solid red";
            incoming['backgroundColor']="rgba(255,0,0,.1)";
            var pf=partial(placeText,incoming);
            setTimeout(pf,timeDelta*j);
            setTimeout(drawPeriodSimulationButton2,timeDelta*j);
            var pf=partial(drawPeriodSimulationSummary2,j+1);
            setTimeout(pf,timeDelta*j);
            setTimeout(drawBackAndForwardButtons,timeDelta*j);
            break
        }


    }

}

function setPeriod(j){
    document.getElementById("periodNumber").innerHTML=j-1;
}




///////////////////////////////NEW PAGE//////////////////////////////////////////////
///////////////////////////////NEW PAGE//////////////////////////////////////////////
///////////////////////////////NEW PAGE//////////////////////////////////////////////


function periodWriteOnBoard(){
    clearAll();
    drawBackAndForwardButtons();
    placeText({"text":"Experiment Details: Periods per Match",
        "top":"0px",
        "fontSize":"300%",
        "color":"blue",
        "height":"100px"});


    if(window.state['stage']>=1){
        placeText({"text":"Rather than physically rolling a dice every period, the random process has been performed on the computer before the experiment.",
            "top":"150px","fontSize":"300%","color":"black","width":"1080px","textAlign":"left","left":"100px","backgroundColor":"rgba(0,0,0,0)","height":"50px"});
    }

    if(window.state['stage']==1){
        placeText({"divid":"continueButton","text":"Continue.","top":"425px","fontSize":"300%","color":"green","width":"680px","textAlign":"center","left":"300px","height":"100px","lineHeight":"100px","backgroundColor":"rgba(0,255,0,.1)"})
        clickButton("once","continueButton",makeSelection,[["stage",2]]);
    }

    if(window.state['stage']>=2){
        placeText({"text":"To ensure that the number of periods does not depend on your play, the number of period for each match has been written on the board before the experiment, and will be uncovered at the end of the experiment.",
            "top":"375px",
            "fontSize":"300%",
            "color":"black",
            "width":"1080px",
            "textAlign":"left",
            "left":"100px",
            "backgroundColor":"rgba(0,0,0,0)",
            "height":"50px"})
    }

    if(window.state['stage']==2){
        placeText({"divid":"continueButton","text":"Continue To Quiz Questions.","top":"750px","fontSize":"300%","color":"red","width":"680px","textAlign":"center","left":"300px","height":"100px","lineHeight":"100px","backgroundColor":"rgba(255,0,0,.1)"})
        clickButton("once","continueButton",makeSelection,[["page","matchesAndPeriodsQuiz1"],["question","quizMatchesAndPeriods1"]]);
    }


}





///////////////////////////////NEW PAGE//////////////////////////////////////////////
///////////////////////////////NEW PAGE//////////////////////////////////////////////
///////////////////////////////NEW PAGE//////////////////////////////////////////////


function matchesAndPeriodsQuiz1(){
    clearAll();
    drawBackAndForwardButtons();


        var questionTitle="Quiz Question #1:"
        var questionStatement="How many matches are there in the experiment?"
        var nextStep=[["stage","1"],["page","fitTheHistoryInstructions"]];
        placeText({"divid":"quizBackground","textAlign":"left","top":"50px","height":"900px","backgroundColor":"rgba(255,0,0,.1)","width":"1180px","left":"50px"});

        placeText({"parentDiv":"quizBackground","divid":"dropdownHolder","top":"350px","height":"100px","backgroundColor":"rgba(255,0,0,0)"});

        drawQuizEarnings();
        document.getElementById("quizEarningsInfo").style.top="850px";

        placeText({"parentDiv":"quizBackground","text":questionTitle,"color":"red","top":"25px","fontSize":"300%","height":"100px"});
        placeText({"parentDiv":"quizBackground","text":questionStatement,"top":"125px","fontSize":"300%","height":"100px"});

        createAndAddElement("select","dropdownQuiz1","dropdownHolder");
        document.getElementById("dropdownQuiz1").style.width="400px";
        document.getElementById("dropdownQuiz1").style.height="100px";
        document.getElementById("dropdownQuiz1").style.fontSize="75px";



        var questionName="quizMatchesAndPeriods1";
        var nextStep=[["page","matchesAndPeriodsQuiz2"],["question","quizMatchesAndPeriods2"]];

        if(window.state['answer']=="correct"){
            createAndAddElement("option","defaultOption","dropdownQuiz1");
            document.getElementById("defaultOption").innerHTML="60";
            placeText({"parentDiv":"quizBackground",
                "text":"That is correct, the number of matches is 60.",
                "color":"green",
                "top":"550px",
                "fontSize":"300%",
                "height":"75px"});

            placeText({
                "divid":"continueButton",
                "parentDiv":"quizBackground",
                "text":"Click here to continue.",
                "color":"black",
                "top":"650px",
                "fontSize":"300%",
                "height":"75px",
                "backgroundColor":"rgba(0,255,0,.2)"
            });


            clickButton("once","continueButton",makeSelection,nextStep);
        }
        else if(window.state['answer']=="incorrect"){
            createAndAddElement("option","defaultOption","dropdownQuiz1");
            document.getElementById("defaultOption").innerHTML="60";
            placeText({"parentDiv":"quizBackground",
                "text":"That is incorrect, the number of matches is 60.",
                "color":"red",
                "top":"550px",
                "fontSize":"300%",
                "height":"75px"});

            placeText({
                "divid":"continueButton",
                "parentDiv":"quizBackground",
                "text":"Click here to continue.",
                "color":"black",
                "top":"650px",
                "fontSize":"300%",
                "height":"75px",
                "backgroundColor":"rgba(0,255,0,.2)"
            });


            clickButton("once","continueButton",makeSelection,nextStep);
        }
        else{


            createAndAddElement("option","defaultOption","dropdownQuiz1");
            for(var k=0;k<150;k++){
                createAndAddElement("option","option"+k,"dropdownQuiz1");
                document.getElementById("option"+k).innerHTML=k;
                document.getElementById("option"+k).fontSize="400%";
            }

            placeText({
                "text":"Submit",
                "fontSize":"400%",
                "parentDiv":"quizBackground",
                "divid":"question1Submit",
                "left":"340px",
                "width":"500px",
                "top":"550px",
                "height":"100px",
                "backgroundColor":"rgba(0,255,0,.2)"});
            clickButton("many","question1Submit",submitFromDropdown,"dropdownQuiz1",questionName);
        }
}

///////////////////////////////NEW PAGE//////////////////////////////////////////////
///////////////////////////////NEW PAGE//////////////////////////////////////////////
///////////////////////////////NEW PAGE//////////////////////////////////////////////



function matchesAndPeriodsQuiz2(){
    clearAll();
    drawBackAndForwardButtons();


        var questionTitle="Quiz Question #2:"
        var questionStatement="Suppose the match is in period 26, what is the chance that the match does NOT continue to a new period? (remember a 20 side dice is rolled every period)"
        var nextStep=[["stage","1"],["page","fitTheHistoryInstructions"]];
        placeText({"divid":"quizBackground","textAlign":"left","top":"50px","height":"900px","backgroundColor":"rgba(255,0,0,.1)","width":"1180px","left":"50px"});

        placeText({"parentDiv":"quizBackground","divid":"dropdownHolder","top":"350px","height":"100px","backgroundColor":"rgba(255,0,0,0)"});

        drawQuizEarnings();
        document.getElementById("quizEarningsInfo").style.top="850px";

        placeText({"parentDiv":"quizBackground","text":questionTitle,"color":"red","top":"25px","fontSize":"300%","height":"100px"});
        placeText({"parentDiv":"quizBackground","text":questionStatement,"top":"125px","fontSize":"300%","height":"50px","textAlign":"left","width":"1000px","left":"90px"});

        createAndAddElement("select","dropdownQuiz1","dropdownHolder");
        document.getElementById("dropdownQuiz1").style.width="600px";
        document.getElementById("dropdownQuiz1").style.height="100px";
        document.getElementById("dropdownQuiz1").style.fontSize="75px";



        var questionName="quizMatchesAndPeriods2";
        var nextStep=[["page","instructionsPayoffTable"],["stage",1]];

        if(window.state['answer']=="correct"){
            createAndAddElement("option","defaultOption","dropdownQuiz1");
            document.getElementById("defaultOption").innerHTML="1 out of 20";
            placeText({"parentDiv":"quizBackground",
                "text":"That is correct, the chance that the match ends is 1 out of 20 in EVERY period.",
                "width":"1000px",
                "left":"90px",
                "textAlign":"left",
                "color":"green",
                "top":"550px",
                "fontSize":"300%",
                "height":"50px"});

            placeText({
                "divid":"continueButton",
                "parentDiv":"quizBackground",
                "text":"Click here to continue.",
                "color":"black",
                "top":"700px",
                "fontSize":"300%",
                "height":"75px",
                "backgroundColor":"rgba(0,255,0,.2)"
            });


            clickButton("once","continueButton",makeSelection,nextStep);
        }
        else if(window.state['answer']=="incorrect"){
            createAndAddElement("option","defaultOption","dropdownQuiz1");
            document.getElementById("defaultOption").innerHTML="1 out of 20";
            placeText({"parentDiv":"quizBackground",
                "text":"That is incorrect, the chance that the match ends is 1 out of 20 in EVERY period.",
                "width":"1000px",
                "left":"90px",
                "textAlign":"left",
                "color":"red",
                "top":"550px",
                "fontSize":"300%",
                "height":"50px"});

            placeText({
                "divid":"continueButton",
                "parentDiv":"quizBackground",
                "text":"Click here to continue.",
                "color":"black",
                "top":"700px",
                "fontSize":"300%",
                "height":"75px",
                "backgroundColor":"rgba(0,255,0,.2)"
            });


            clickButton("once","continueButton",makeSelection,nextStep);
        }
        else{


            createAndAddElement("option","defaultOption","dropdownQuiz1");
            for(var k=0;k<150;k++){
                createAndAddElement("option","option"+k,"dropdownQuiz1");
                document.getElementById("option"+k).innerHTML=k+" out of 20";
                document.getElementById("option"+k).fontSize="400%";
            }

            placeText({
                "text":"Submit",
                "fontSize":"400%",
                "parentDiv":"quizBackground",
                "divid":"question1Submit",
                "left":"340px",
                "width":"500px",
                "top":"550px",
                "height":"100px",
                "backgroundColor":"rgba(0,255,0,.2)"});
            clickButton("many","question1Submit",submitFromDropdown,"dropdownQuiz1",questionName);
        }
}





function submitFromDropdown(args,dropdownID){
    var dropdownID=args[0];
    var questionName=args[1];
    var e = document.getElementById(args[0]);
    var strUser = e.options[e.selectedIndex].text;
    var confirmation="Are you sure you want to submit "+strUser+" as your answer?";
    submitQuizAnswer([{"question":questionName,"answer":strUser},confirmation]);

}




///////////////////////////////NEW PAGE//////////////////////////////////////////////
///////////////////////////////NEW PAGE//////////////////////////////////////////////
///////////////////////////////NEW PAGE//////////////////////////////////////////////


function instructionsPayoffTable(){
    clearAll();
    drawBackAndForwardButtons();
    //placeText("gameTableTitle","Game Table",50,200,"red",1);
    placeText({"text":"Payoff Table:","top":"25px","fontSize":"300%","color":"red","width":"300px","textAlign":"right","left":"0px"})
    placeText({"text":"a display of the possible payoffs in each period.","top":"25px","fontSize":"300%","color":"black","width":"860px","textAlign":"left","left":"320px"})
    placeText({"top":"0px","backgroundColor":"rgba(255,0,0,.1)","height":"100px"})


    var x=280;
    var y=100;



    if(window.state['stage']=="1"){
        placeText({"divid":"continueButton","text":"Click Here to Show Payoff Table","top":"225px","fontSize":"300%","color":"green","width":"600px","textAlign":"center","left":"340px","backgroundColor":"rgba(0,255,0,.1)","height":"100px"})
        clickButton("once","continueButton",makeSelection,[["stage","2"]]);
    }   
    else if(window.state['stage']=="2"){
        drawGame();        
        document.getElementById("gameTable").style.transform="translate3d("+(x-755)+"px,"+(-599+y)+"px,0px) scale(2)";
        placeText({"divid":"continueButton","text":"Click Here to Explain Payoff Table","top":"725px","fontSize":"300%","color":"green","width":"600px","textAlign":"center","left":"340px","backgroundColor":"rgba(0,255,0,.1)","height":"100px"})
        clickButton("once","continueButton",makeSelection,[["stage","3"],['clickedRows',[0,0,0,0,0]],['currentRow',-1],['allRowClicked','False']]);
    }
    else if(window.state['stage']=="3"){
        drawGame();        
        document.getElementById("gameTable").style.transform="translate3d("+(x-755)+"px,"+(-599+y)+"px,0px) scale(2)";

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
            placeText({"text":"The Payoff Table has 5 rows.","top":"675px","fontSize":"300%","textAlign":"center","height":"100px"});
            placeText({"text":"Click Each one of the rows above to get an explanation.","top":"775px","fontSize":"300%","textAlign":"center","height":"100px"});
        }
        else if(window.state['currentRow']==0){
            placeText({"text":"My Choice","top":"675px","fontSize":"400%","textAlign":"center","height":"100px"});
            placeText({"text":"Your choice (either W or Y) in a given period.","top":"775px","fontSize":"300%","textAlign":"center","width":"1000px","left":"140px","height":"50px"});
        }
        else if(window.state['currentRow']==1){
            placeText({"text":"Other's Choice","top":"675px","fontSize":"400%","textAlign":"center","height":"100px"});
            placeText({"text":"The choice (either W or Y) of the subject you are matched with in a given period.","top":"775px","fontSize":"300%","textAlign":"left","width":"1000px","left":"140px","height":"50px"});
        }
        else if(window.state['currentRow']==2){
            placeText({"text":"My Payoff","top":"675px","fontSize":"400%","textAlign":"center","height":"100px"});
            placeText({"text":"The payoff you receive in a given period when you and the subject you are matched with play the corresponding actions from the same column.","top":"775px","fontSize":"300%","textAlign":"left","width":"1000px","left":"140px","height":"50px"});
        }
        else if(window.state['currentRow']==3){
            placeText({"text":"Other's Payoff","top":"675px","fontSize":"400%","textAlign":"center","height":"100px"});
            placeText({"text":"The payoff the subject you are matched with receives in a given period when you and the subject you are matched with play the corresponding actions from the same column.","top":"775px","fontSize":"300%","textAlign":"left","width":"1000px","left":"140px","height":"50px"});
        }
        else if(window.state['currentRow']==4){
            placeText({"text":"Occurrences","top":"675px","fontSize":"400%","textAlign":"center","height":"100px"});
            placeText({"text":"The number of times that the corresponding actions from the same column have been played in the current match.","top":"775px","fontSize":"300%","textAlign":"left","width":"1000px","left":"140px","height":"50px"});
        }

        if(window.state['allRowClicked']=="False"){
            placeText({"text":"Must click all 5 rows to continue.","top":"974px","fontSize":"200%","color":"red","textAlign":"center","height":"50px","left":"100px","width":"1080px"})
        }
        else if(window.state['allRowClicked']=="True"){
            placeText({"divid":"continueButton","text":"Click to continue to example.","top":"924px","fontSize":"200%","color":"green","textAlign":"center","height":"50px","backgroundColor":"rgba(0,255,0,.1)","width":"400px","left":"440px"})
            clickButton("once","continueButton",makeSelection,[["stage","4"]]);

        }
    }
    else if(window.state['stage']=="4"){
        var x=280;
        var y=0;
        drawGame();        
        document.getElementById("gameTable").style.transform="translate3d("+(x-755)+"px,"+(-649+y)+"px,0px) scale(1)";
        placeText({"text":"Example","top":"400px","fontSize":"400%","textAlign":"center","height":"100px"});
        placeText({"text":"In a given period, if you choose <div id='ex1' class='wSquare square' style='margin-left:25px;font-size:50%'></div>","top":"525px","fontSize":"300%","textAlign":"right","width":"1000px","left":"0px","height":"50px"});
        placeText({"text":"and the subject you are matched with chooses <div id='ex2' class='ySquare square' style='margin-left:25px;font-size:50%'></div>","top":"600px","fontSize":"300%","textAlign":"right","width":"1000px","left":"0px","height":"50px"});
        placeText({"text":"then you receive a payoff of <div id='ex3' class='square' style='margin-left:25px;font-size:50%;background-color:white;'>"+document.getElementById("gameTable_2_2").innerHTML+"</div>","top":"675px","fontSize":"300%","textAlign":"right","width":"1000px","left":"0px","height":"50px"});
        placeText({"text":"and the subject you are matched with receives a payoff of <div id='ex4' class='square' style='margin-left:25px;font-size:50%;background-color:white;'>"+document.getElementById("gameTable_3_2").innerHTML+"</div>","top":"750px","fontSize":"300%","textAlign":"right","width":"1000px","left":"0px","height":"50px"});
        placeText({"text":"# of periods this outcome has occurred so far this match <div id='ex5' class='square' style='margin-left:25px;font-size:50%;background-color:white;'>"+document.getElementById("gameTable_4_2").innerHTML+"</div>","top":"825px","fontSize":"300%","textAlign":"right","width":"1000px","left":"0px","height":"50px"});
        hoverPair("ex1","gameTable_0_2");
        hoverPair("ex2","gameTable_1_2");
        hoverPair("ex3","gameTable_2_2");
        hoverPair("ex4","gameTable_3_2");
        hoverPair("ex5","gameTable_4_2");

        placeText({"divid":"continueButton","text":"Click to continue to quiz question.","top":"924px","fontSize":"200%","color":"red","textAlign":"center","height":"50px","backgroundColor":"rgba(255,0,0,.1)","width":"400px","left":"440px"})
        clickButton("once","continueButton",makeSelection,[["stage","5"],["question","quiz1"]]);
    }
    else if(window.state['stage']=="5"){
        var x=280;
        var y=0;
        drawGame();        
        document.getElementById("gameTable").style.transform="translate3d("+(x-755)+"px,"+(-649+y)+"px,0px) scale(1)";
        placeText({"text":"","color":"red","top":"400px","height":"525px","fontSize":"400%","textAlign":"center","backgroundColor":"rgba(255,0,0,.1)","width":"1080px","left":"100px"});
        placeText({"text":"Quiz Question #3","color":"red","top":"400px","fontSize":"400%","textAlign":"center","height":"100px"});
        placeText({"text":"In a given period, suppose that you choose <div class='ySquare square' style='margin-left:25px;font-size:50%'></div>","top":"525px","fontSize":"300%","textAlign":"right","width":"1000px","left":"0px","height":"50px"});
        placeText({"text":"and the subject you are matched with chooses <div class='wSquare square' style='margin-left:25px;font-size:50%'></div>","top":"600px","fontSize":"300%","textAlign":"right","width":"1000px","left":"0px","height":"50px"});

        var continueFunction=[["stage","6"],["question","quiz2"]];
        var correctDiv="gameTable_2_3";
        if(window.state['answer']=="correct"){
            placeText({"text":"That is correct, you will get a payoff of 50.  Click on the correct box again to continue.","color":"green","top":"700px","fontSize":"300%","textAlign":"left","width":"1000px","left":"140px","height":"75px"});
            clickButton("once",correctDiv,makeSelection,continueFunction);
            document.getElementById(correctDiv).style.backgroundColor="rgba(0,255,0,.1)";
        }
        else if(window.state['answer']=="incorrect"){
            placeText({"text":"That is incorrect, you will get a payoff of 50. Click on the correct box to continue.","color":"red","top":"700px","fontSize":"300%","textAlign":"left","width":"1000px","left":"140px","height":"75px"});
            clickButton("once",correctDiv,makeSelection,continueFunction);
            document.getElementById(correctDiv).style.backgroundColor="rgba(0,255,0,.1)";
        }
        else{
            placeText({"text":"Click on the box containing the payoff that you will receive in the payoff table.","color":"black","top":"700px","fontSize":"300%","textAlign":"left","width":"1000px","left":"140px","height":"75px"});
            for(row=0;row<5;row++){
                for(col=0;col<5;col++){
                    var thisText=document.getElementById("gameTable_"+row+"_"+col).innerHTML;
                    var confirmationStatement="Are you sure you want to submit this as your answer?";
                    clickButton("once","gameTable_"+row+"_"+col,submitQuizAnswer,{"question":"quiz1","row":row,"col":col},confirmationStatement);
                }
            }            
        }
        drawQuizEarnings();
    }
    else if(window.state['stage']=="6"){
        var x=280;
        var y=0;
        drawGame();        
        document.getElementById("gameTable").style.transform="translate3d("+(x-755)+"px,"+(-649+y)+"px,0px) scale(1)";
        placeText({"text":"","color":"red","top":"400px","height":"525px","fontSize":"400%","textAlign":"center","backgroundColor":"rgba(255,0,0,.1)","width":"1080px","left":"100px"});
        placeText({"text":"Quiz Question #4","color":"red","top":"400px","fontSize":"400%","textAlign":"center","height":"100px"});
        placeText({"text":"In a given period, suppose that you choose <div class='ySquare square' style='margin-left:25px;font-size:50%'></div>","top":"525px","fontSize":"300%","textAlign":"right","width":"1000px","left":"0px","height":"50px"});
        placeText({"text":"and the subject you are matched with chooses <div class='ySquare square' style='margin-left:25px;font-size:50%'></div>","top":"600px","fontSize":"300%","textAlign":"right","width":"1000px","left":"0px","height":"50px"});


        var continueFunction=[["stage","7"],["question","quiz3"]];
        var correctDiv="gameTable_3_4";
        if(window.state['answer']=="correct"){
            placeText({"text":"That is correct, they will get a payoff of 25.  Click on the correct box again to continue.","color":"green","top":"700px","fontSize":"300%","textAlign":"left","width":"1000px","left":"140px","height":"75px"});
            clickButton("once",correctDiv,makeSelection,continueFunction);
            document.getElementById(correctDiv).style.backgroundColor="rgba(0,255,0,.1)";
        }
        else if(window.state['answer']=="incorrect"){
            placeText({"text":"That is incorrect, they will get a payoff of 25. Click on the correct box to continue.","color":"red","top":"700px","fontSize":"300%","textAlign":"left","width":"1000px","left":"140px","height":"75px"});
            clickButton("once",correctDiv,makeSelection,continueFunction);
            document.getElementById(correctDiv).style.backgroundColor="rgba(0,255,0,.1)";
        }
        else{
            placeText({"text":"Click on the box containing the payoff that the subject that you are matched with will receive in the payoff table.","color":"black","top":"700px","fontSize":"300%","textAlign":"left","width":"1000px","left":"140px","height":"75px"});
            for(row=0;row<5;row++){
                for(col=0;col<5;col++){
                    var thisText=document.getElementById("gameTable_"+row+"_"+col).innerHTML;
                    var confirmationStatement="Are you sure you want to submit this as your answer?";
                    clickButton("many","gameTable_"+row+"_"+col,submitQuizAnswer,{"question":"quiz2","row":row,"col":col},confirmationStatement);
                }
            }            
        }
        drawQuizEarnings();

    }
    else if(window.state['stage']=="7"){
        var x=280;
        var y=0;
        drawGame();        
        document.getElementById("gameTable").style.transform="translate3d("+(x-755)+"px,"+(-649+y)+"px,0px) scale(1)";
        placeText({"text":"","color":"red","top":"400px","height":"525px","fontSize":"400%","textAlign":"center","backgroundColor":"rgba(255,0,0,.1)","width":"1080px","left":"100px"});
        placeText({"text":"Quiz Question #5","color":"red","top":"400px","fontSize":"400%","textAlign":"center","height":"100px"});
        placeText({"text":"In a given period, suppose that you choose <div class='wSquare square' style='margin-left:25px;font-size:50%'></div>","top":"525px","fontSize":"300%","textAlign":"right","width":"1000px","left":"0px","height":"50px"});
        placeText({"text":"and the subject you are matched with chooses <div class='wSquare square' style='margin-left:25px;font-size:50%'></div>","top":"600px","fontSize":"300%","textAlign":"right","width":"1000px","left":"0px","height":"50px"});




        var continueFunction=[["page","instructionsHistory"],["stage","1"]];
        var correctDiv="gameTable_4_1";
        if(window.state['answer']=="correct"){
            placeText({"text":"That is correct, this outcome has occurred 6 times.  Click on the correct box again to continue.","color":"green","top":"700px","fontSize":"300%","textAlign":"left","width":"1000px","left":"140px","height":"75px"});
            clickButton("once",correctDiv,makeSelection,continueFunction);
            document.getElementById(correctDiv).style.backgroundColor="rgba(0,255,0,.1)";
        }
        else if(window.state['answer']=="incorrect"){
            placeText({"text":"That is incorrect, this outcome has occurred 6 times. Click on the correct box to continue.","color":"red","top":"700px","fontSize":"300%","textAlign":"left","width":"1000px","left":"140px","height":"75px"});
            clickButton("once",correctDiv,makeSelection,continueFunction);
            document.getElementById(correctDiv).style.backgroundColor="rgba(0,255,0,.1)";
        }
        else{
            placeText({"text":"Click on the box that displays the number of times that W,W has occurred in the payoff table.","color":"black","top":"700px","fontSize":"300%","textAlign":"left","width":"1000px","left":"140px","height":"75px"});
            for(row=0;row<5;row++){
                for(col=0;col<5;col++){
                    var thisText=document.getElementById("gameTable_"+row+"_"+col).innerHTML;
                    var confirmationStatement="Are you sure you want to submit this as your answer?";
                    clickButton("many","gameTable_"+row+"_"+col,submitQuizAnswer,{"question":"quiz3","row":row,"col":col},confirmationStatement);
                }
            }            
        }
        drawQuizEarnings();
    }
}







///////////////////////////////NEW PAGE//////////////////////////////////////////////
///////////////////////////////NEW PAGE//////////////////////////////////////////////
///////////////////////////////NEW PAGE//////////////////////////////////////////////


function instructionsHistory(){
    clearAll();
    drawBackAndForwardButtons();
    //placeText("gameTableTitle","Game Table",50,200,"red",1);
    placeText({"text":"History:","top":"25px","fontSize":"300%","color":"red","width":"200px","textAlign":"right","left":"0px"})
    placeText({"text":"a display of the choices and payoffs from every period.","top":"25px","fontSize":"300%","color":"black","width":"960px","textAlign":"left","left":"220px"})
    placeText({"top":"0px","backgroundColor":"rgba(255,0,0,.1)","height":"100px"})


    if(window.state['stage']=="1"){
        placeText({"divid":"continueButton","text":"Click Here to Show History","top":"225px","fontSize":"300%","color":"green","width":"600px","textAlign":"center","left":"340px","backgroundColor":"rgba(0,255,0,.1)","height":"100px"})
        clickButton("once","continueButton",makeSelection,[["stage","2"]]);
    }   
    else if(window.state['stage']=="2"){
        drawHistory();        
        document.getElementById("history").style.transform="translate3d(0px,100px,0px) scale(1)";
        placeText({"divid":"continueButton","text":"Click Here to Explain History","top":"425px","fontSize":"300%","color":"green","width":"600px","textAlign":"center","left":"340px","backgroundColor":"rgba(0,255,0,.1)","height":"100px"})
        clickButton("once","continueButton",makeSelection,[["stage","3"],['clickedRows',[0,0,0,0,1]],['currentRow',-1],['allRowClicked','False']]);
    }
    else if(window.state['stage']=="3"){
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
            placeText({"text":"The history display has 4 rows.","top":"325px","fontSize":"300%","textAlign":"center","height":"100px"});
            placeText({"text":"Click each one of the rows above to get an explanation.","top":"425px","fontSize":"300%","textAlign":"center","height":"100px"});
        }
        else if(window.state['currentRow']==0){
            placeText({"text":"Period","top":"325px","fontSize":"400%","textAlign":"center","height":"100px"});
            placeText({"text":"The period number of the current match.","top":"450px","fontSize":"300%","textAlign":"center","width":"1000px","left":"140px","height":"50px"});
        }
        else if(window.state['currentRow']==1){
            placeText({"text":"My Choice","top":"325px","fontSize":"400%","textAlign":"center","height":"100px"});
            placeText({"text":"Your choice (either W or Y) in the corresponding period.","top":"450px","fontSize":"300%","textAlign":"left","width":"1000px","left":"140px","height":"50px"});
        }
        else if(window.state['currentRow']==2){
            placeText({"text":"Other's Choice","top":"325px","fontSize":"400%","textAlign":"center","height":"100px"});
            placeText({"text":"The choice (either W or Y) of the subject that you are matched with in the corresponding period.","top":"450px","fontSize":"300%","textAlign":"left","width":"1000px","left":"140px","height":"50px"});
        }
        else if(window.state['currentRow']==3){
            placeText({"text":"My Payoff","top":"325px","fontSize":"400%","textAlign":"center","height":"100px"});
            placeText({"text":"The number of points received given your choice and the choice of the subject that you are matched with in the corresponding period.","top":"450px","fontSize":"300%","textAlign":"left","width":"1000px","left":"140px","height":"50px"});
        }
        if(window.state['allRowClicked']=="False"){
            placeText({"text":"Must click all 4 rows to continue.","top":"774px","fontSize":"200%","color":"red","textAlign":"center","height":"50px","left":"100px","width":"1080px"})
        }
        else if(window.state['allRowClicked']=="True"){
            placeText({"divid":"continueButton","text":"Click to continue to example.","top":"724px","fontSize":"200%","color":"green","textAlign":"center","height":"50px","backgroundColor":"rgba(0,255,0,.1)","width":"400px","left":"440px"})
            clickButton("once","continueButton",makeSelection,[["stage","4"]]);

        }
    }
    else if(window.state['stage']=="4"){
        drawHistory();        
        document.getElementById("history").style.transform="translate3d(0px,100px,0px) scale(1)";
        placeText({"text":"Example","top":"300px","fontSize":"400%","textAlign":"center","height":"100px"});
        placeText({"text":"In period <div id='ex1' class='square' style='margin-left:25px;font-size:50%;background-color:white;'>32</div>","top":"450px","fontSize":"300%","textAlign":"right","width":"1000px","left":"0px","height":"50px"});
        placeText({"text":"you chose action <div id='ex2' class='ySquare square' style='margin-left:25px;font-size:50%'></div>","top":"525px","fontSize":"300%","textAlign":"right","width":"1000px","left":"0px","height":"50px"});
        placeText({"text":"and the subject you are matched with choose action <div id='ex3' class='ySquare square' style='margin-left:25px;font-size:50%'></div>","top":"600px","fontSize":"300%","textAlign":"right","width":"1000px","left":"0px","height":"50px"});
        placeText({"text":"Therefore, you received a payoff of <div id='ex4' class='square' style='margin-left:25px;font-size:50%;background-color:white;'>25</div>","top":"675px","fontSize":"300%","textAlign":"right","width":"1000px","left":"0px","height":"50px"});
        placeText({"divid":"continueButton","text":"Click to continue to quiz question.","top":"824px","fontSize":"200%","color":"red","textAlign":"center","height":"50px","backgroundColor":"rgba(255,0,0,.1)","width":"400px","left":"440px"})
        
        hoverPair("ex1","historyPeriodLabel_32");
        hoverPair("ex2","history_square_32_0");
        hoverPair("ex3","history_square_32_1");
        hoverPair("ex4","historyPayoffLabel_32");


        clickButton("once","continueButton",makeSelection,[["stage","5"],["question","quiz4"]]);

    }
    else if(window.state['stage']=="5"){
        drawHistory();        
        document.getElementById("history").style.transform="translate3d(0px,100px,0px) scale(1)";

        placeText({"text":"","color":"red","top":"400px","height":"525px","fontSize":"400%","textAlign":"center","backgroundColor":"rgba(255,0,0,.1)","width":"1080px","left":"100px"});
        placeText({"text":"Quiz Question #6","color":"red","top":"400px","fontSize":"400%","textAlign":"center","height":"100px"});
        placeText({"text":"In the history display, click on the box displaying the action that you chose in period 34.","color":"black","top":"500px","fontSize":"300%","textAlign":"left","width":"1000px","left":"140px","height":"75px"});

        var nextStep=[["stage","6"],["question","quiz5"]];
        var correctDiv="history_square_34_0";
        if(window.state['answer']=="correct"){
            placeText({"text":"That is correct, you chose action W in period 34.  Click on the correct box again to continue.","color":"green","top":"675px","fontSize":"300%","textAlign":"left","width":"1000px","left":"140px","height":"75px"});
            document.getElementById(correctDiv).style.backgroundColor="rgba(0,255,0,1)";
            clickButton("once",correctDiv,makeSelection,nextStep);
        }
        else if(window.state['answer']=="incorrect"){
            placeText({"text":"That is incorrect, you chose action W in period 34. Click on the correct box to continue.","color":"red","top":"675px","fontSize":"300%","textAlign":"left","width":"1000px","left":"140px","height":"75px"});
            document.getElementById(correctDiv).style.backgroundColor="rgba(0,255,0,.5)";
            clickButton("once",correctDiv,makeSelection,nextStep);
        }
        else{
            for(var period=12;period<36;period++){
                confirmation="Are you sure you want to submit this as your answer?";
                var thisDiv="historyPeriodLabel_"+period;
                clickButton("many",thisDiv,submitQuizAnswer,{"question":"quiz4","div":thisDiv},confirmation);
                var thisDiv="history_square_"+period+"_0";
                clickButton("many",thisDiv,submitQuizAnswer,{"question":"quiz4","div":thisDiv},confirmation);
                var thisDiv="history_square_"+period+"_1";
                clickButton("many",thisDiv,submitQuizAnswer,{"question":"quiz4","div":thisDiv},confirmation);
                var thisDiv="historyPayoffLabel_"+period;
                clickButton("many",thisDiv,submitQuizAnswer,{"question":"quiz4","div":thisDiv},confirmation);
            }            
        }
        drawQuizEarnings();

    }
    else if(window.state['stage']=="6"){
        drawHistory();        
        document.getElementById("history").style.transform="translate3d(0px,100px,0px) scale(1)";

        placeText({"text":"","color":"red","top":"400px","height":"525px","fontSize":"400%","textAlign":"center","backgroundColor":"rgba(255,0,0,.1)","width":"1080px","left":"100px"});
        placeText({"text":"Quiz Question #7","color":"red","top":"400px","fontSize":"400%","textAlign":"center","height":"100px"});
        placeText({"text":"In the history display, click on the box displaying the payoff that you received in period 18.","color":"black","top":"500px","fontSize":"300%","textAlign":"left","width":"1000px","left":"140px","height":"75px"});

        var nextStep=[["stage","7"],["question","quiz6"]];
        var correctDiv="historyPayoffLabel_18";
        if(window.state['answer']=="correct"){
            placeText({"text":"That is correct, you got a payoff of 25 in period 18.  Click on the correct box again to continue.","color":"green","top":"675px","fontSize":"300%","textAlign":"left","width":"1000px","left":"140px","height":"75px"});
            document.getElementById(correctDiv).style.backgroundColor="rgba(0,255,0,1)";
            clickButton("once",correctDiv,makeSelection,nextStep);
        }
        else if(window.state['answer']=="incorrect"){
            placeText({"text":"That is incorrect, you got a payoff of 25 in period 18.  Click on the correct box to continue.","color":"red","top":"675px","fontSize":"300%","textAlign":"left","width":"1000px","left":"140px","height":"75px"});
            document.getElementById(correctDiv).style.backgroundColor="rgba(0,255,0,.5)";
            clickButton("once",correctDiv,makeSelection,nextStep);
        }
        else{
            for(var period=12;period<36;period++){
                confirmation="Are you sure you want to submit this as your answer?";
                var thisDiv="historyPeriodLabel_"+period;
                clickButton("many",thisDiv,submitQuizAnswer,{"question":"quiz5","div":thisDiv},confirmation);
                var thisDiv="history_square_"+period+"_0";
                clickButton("many",thisDiv,submitQuizAnswer,{"question":"quiz5","div":thisDiv},confirmation);
                var thisDiv="history_square_"+period+"_1";
                clickButton("many",thisDiv,submitQuizAnswer,{"question":"quiz5","div":thisDiv},confirmation);
                var thisDiv="historyPayoffLabel_"+period;
                clickButton("many",thisDiv,submitQuizAnswer,{"question":"quiz5","div":thisDiv},confirmation);
            }            
        }
        drawQuizEarnings();
    }
    else if(window.state['stage']=="7"){
        drawHistory();        
        document.getElementById("history").style.transform="translate3d(0px,100px,0px) scale(1)";

        placeText({"text":"","color":"red","top":"400px","height":"525px","fontSize":"400%","textAlign":"center","backgroundColor":"rgba(255,0,0,.1)","width":"1080px","left":"100px"});
        placeText({"text":"Quiz Question #8","color":"red","top":"400px","fontSize":"400%","textAlign":"center","height":"100px"});
        placeText({"text":"In the history display, click on the box displaying the action that the subject that you are matched with chose in period 21.","color":"black","top":"500px","fontSize":"250%","textAlign":"left","width":"1000px","left":"140px","height":"75px"});

        var nextStep=[["stage","1"],["page","instructionsRulesFirst"]];
        var correctDiv="history_square_21_1";
        if(window.state['answer']=="correct"){
            placeText({"text":"That is correct, the subject you are matched with played W in period 21.  Click on the correct box again to continue.","color":"green","top":"675px","fontSize":"300%","textAlign":"left","width":"1000px","left":"140px","height":"75px"});
            document.getElementById(correctDiv).style.backgroundColor="rgba(0,255,0,1)";
            clickButton("once",correctDiv,makeSelection,nextStep);
        }
        else if(window.state['answer']=="incorrect"){
            placeText({"text":"That is incorrect, the subject you are matched with played W in period 21.  Click on the correct box to continue.","color":"red","top":"675px","fontSize":"300%","textAlign":"left","width":"1000px","left":"140px","height":"75px"});
            document.getElementById(correctDiv).style.backgroundColor="rgba(0,255,0,.5)";
            clickButton("once",correctDiv,makeSelection,nextStep);
        }
        else{
            for(var period=12;period<36;period++){
                confirmation="Are you sure you want to submit this as your answer?";
                var thisDiv="historyPeriodLabel_"+period;
                clickButton("many",thisDiv,submitQuizAnswer,{"question":"quiz6","div":thisDiv},confirmation);
                var thisDiv="history_square_"+period+"_0";
                clickButton("many",thisDiv,submitQuizAnswer,{"question":"quiz6","div":thisDiv},confirmation);
                var thisDiv="history_square_"+period+"_1";
                clickButton("many",thisDiv,submitQuizAnswer,{"question":"quiz6","div":thisDiv},confirmation);
                var thisDiv="historyPayoffLabel_"+period;
                clickButton("many",thisDiv,submitQuizAnswer,{"question":"quiz6","div":thisDiv},confirmation);
            }            
        }
        drawQuizEarnings();
    }
}




///////////////////////////////NEW PAGE//////////////////////////////////////////////
///////////////////////////////NEW PAGE//////////////////////////////////////////////
///////////////////////////////NEW PAGE//////////////////////////////////////////////


function instructionsRulesFirst(){
    clearAll();
    drawBackAndForwardButtons();

    placeText({"text":"Experiment Details: Making choices",
        "top":"0px",
        "fontSize":"300%",
        "color":"blue",
        "height":"100px"});


    if(window.state['stage']>=1){
        placeText({"top":"100px","text":"Each period, you and the subject that you are matched with will make a choice of either <div class='wSquare square' style='margin-top:15px;margin-left:25px;font-size:50%;transform:scale(1.25);'></div> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; or <div class='ySquare square' style='margin-top:15px;margin-left:25px;font-size:50%;transform:scale(1.25);'></div> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; and get the corresponding payoff from the payoff table.","fontSize":"300%","color":"black","width":"1105px","left":"75px","textAlign":"left","height":"75px"})
    }
    if(window.state['stage']>=2){
        placeText({"top":"400px","text":"Rather than directly making choices each period, you will develop a set of rules that can make choices for you automatically.","fontSize":"300%","color":"black","width":"1105px","left":"75px","textAlign":"left","height":"75px"})
    }
    if(window.state['stage']>=3){
        placeText({"text":"","top":"675px","fontSize":"300%","backgroundColor":"rgba(255,0,0,.1)","height":"150px"})
        placeText({"text":"Rule:","top":"700px","fontSize":"300%","color":"red","width":"200px","textAlign":"right","left":"0px"})
        placeText({"text":"a program that can automatically make a choice for you after certain actions have been played.","top":"700px","fontSize":"300%","color":"black","width":"960px","textAlign":"left","left":"220px"})
    }


    if(window.state['stage']==1){
        placeText({"top":"400px","divid":"continueButton","text":"Click Here to Continue","fontSize":"300%","color":"green","width":"600px","textAlign":"center","left":"340px","backgroundColor":"rgba(0,255,0,.1)","height":"100px"})
        clickButton("once","continueButton",makeSelection,[["stage",2]]);
    }   
    else if(window.state['stage']==2){
        placeText({"top":"700px","divid":"continueButton","text":"Click here to get the definition of a rule.","fontSize":"300%","color":"green","width":"800px","textAlign":"center","left":"240px","backgroundColor":"rgba(0,255,0,.1)","height":"100px"})
        clickButton("once","continueButton",makeSelection,[["stage",3]]);
    }   
    else if(window.state['stage']==3){
        placeText({"top":"875px","divid":"continueButton","text":"Click here to learn more about rules.","fontSize":"300%","color":"green","width":"800px","textAlign":"center","left":"240px","backgroundColor":"rgba(0,255,0,.1)","height":"100px"})
        clickButton("once","continueButton",makeSelection,[["page","instructionsRules"],["stage",1]]);
    }   


}

///////////////////////////////NEW PAGE//////////////////////////////////////////////
///////////////////////////////NEW PAGE//////////////////////////////////////////////
///////////////////////////////NEW PAGE//////////////////////////////////////////////



function instructionsRules(){
    clearAll();
    drawBackAndForwardButtons();
    //placeText("gameTableTitle","Game Table",50,200,"red",1);
    //function drawRule(constructor,ruleDivName,addToDiv,clickable,highlight){

    if(window.state['stage']>=1){
        placeText({"text":"","top":"0px","fontSize":"300%","backgroundColor":"rgba(255,0,0,.1)","height":"150px"})
        placeText({"text":"Rule:","top":"25px","fontSize":"300%","color":"red","width":"200px","textAlign":"right","left":"0px"})
        placeText({"text":"a program that can automatically make a choice for you after certain actions have been played.","top":"25px","fontSize":"300%","color":"black","width":"960px","textAlign":"left","left":"220px"})
    }

    if(window.state['stage']>=2){
        drawRule([[0,1],[1,1],[0]],"testRule","mainDiv",0,0)
        document.getElementById("testRule").style.transform="translate3d(565px,225px,0px) scale(2)";
    }

    if(window.state['stage']>=3){
        placeText({"divid":"ruleHasTwoParts","text":"A rule consists of two parts: the input sequence and the output action. ","top":"400px","fontSize":"300%","color":"black","width":"1280px","textAlign":"center","left":"0px","backgroundColor":"rgba(0,0,0,0)","height":"100px"})
        placeText({"divid":"inputSequenceText","text":"Input Sequence","top":"725px","fontSize":"300%","color":"black","width":"400px","textAlign":"center","left":"290px","backgroundColor":"rgba(0,0,0,0)","height":"100px"})
        drawRule([[0,1],[1,1]],"testRuleInput","mainDiv",1,0)
        document.getElementById("testRuleInput").style.transform="translate3d(440px,575px,0px) scale(2)";

        placeText({"divid":"outputSequenceText","text":"Output Action","top":"725px","fontSize":"300%","color":"black","width":"400px","textAlign":"center","left":"660px","backgroundColor":"rgba(0,0,0,0)","height":"100px"})
        drawRule([[0]],"testRuleOutput","mainDiv",0,0)
        document.getElementById("testRuleOutput").style.transform="translate3d(840px,575px,0px) scale(2)";
    }

    if(window.state['stage']>=4){
        placeText({"divid":"inputOutputExplaination","text":"The rule will play the output action after the input sequence has occurred.","top":"825px","fontSize":"300%","color":"black","width":"1280px","textAlign":"center","left":"0px","backgroundColor":"rgba(0,0,0,0)","height":"100px"})
    }


    if(window.state['stage']==1){
        placeText({"divid":"continueButton","text":"Click Here to See A Rule","top":"225px","fontSize":"300%","color":"green","width":"600px","textAlign":"center","left":"340px","backgroundColor":"rgba(0,255,0,.1)","height":"100px"})
        clickButton("once","continueButton",makeSelection,[["stage",2]]);
    }   
    else if(window.state['stage']==2){
        placeText({"divid":"continueButton","text":"Click Here to Explain The Rule","top":"475px","fontSize":"300%","color":"green","width":"600px","textAlign":"center","left":"340px","backgroundColor":"rgba(0,255,0,.1)","height":"100px"})
        clickButton("once","continueButton",makeSelection,[["stage",3]]);
    }
    else if(window.state['stage']==3){
        placeText({"divid":"continueButton","text":"Click Here to Explain The Input and Output","top":"875px","fontSize":"300%","color":"green","width":"800px","textAlign":"center","left":"240px","backgroundColor":"rgba(0,255,0,.1)","height":"100px"})
        clickButton("once","continueButton",makeSelection,[["stage",4]]);
    }
    else if(window.state['stage']==4){
        placeText({"divid":"continueButton","text":"Click Here to Continue","top":"925px","fontSize":"300%","color":"green","width":"600px","textAlign":"center","left":"340px","backgroundColor":"rgba(0,255,0,.1)","height":"100px"})
        clickButton("once","continueButton",makeSelection,[["page","instructionsRuleLength"],["stage",1]]);
    }

}

///////////////////////////////NEW PAGE//////////////////////////////////////////////
///////////////////////////////NEW PAGE//////////////////////////////////////////////
///////////////////////////////NEW PAGE//////////////////////////////////////////////



function instructionsRuleLength(){
    clearAll();
    drawBackAndForwardButtons();
        if(window.state['stage']>=1){
        placeText({"text":"","top":"0px","fontSize":"300%","backgroundColor":"rgba(255,0,0,.1)","height":"100px"})
        placeText({"text":"Length of Rule:","top":"25px","fontSize":"300%","color":"red","width":"300px","textAlign":"right","left":"000px"})
        placeText({"text":"The number of boxes that make up the width of the rule.","top":"25px","fontSize":"300%","color":"black","width":"960px","textAlign":"left","left":"310px"})
    }

    if(window.state['stage']==1){
        placeText({"divid":"continueButton","text":"Click to see examples","top":"225px","fontSize":"300%","color":"green","width":"500px","textAlign":"center","left":"340px","backgroundColor":"rgba(0,255,0,.1)","height":"100px"})
        clickButton("once","continueButton",makeSelection,[["stage","2"]]);    
    }


    if(window.state['stage']==2){

        placeText({"divid":"length1","text":"Rules of Length 1","top":"150px","fontSize":"200%","color":"black","width":"300px","textAlign":"center","left":"100px","backgroundColor":"rgba(0,255,0,0)","height":"50px"})
        placeText({"divid":"length2","text":"Rules of Length 2","top":"150px","fontSize":"200%","color":"black","width":"300px","textAlign":"center","left":"490px","backgroundColor":"rgba(0,255,0,0)","height":"50px"})
        placeText({"divid":"length3","text":"Rules of Length 3","top":"150px","fontSize":"200%","color":"black","width":"300px","textAlign":"center","left":"880px","backgroundColor":"rgba(0,255,0,0)","height":"50px"})
        placeText({"divid":"length4","text":"Rules of Length 4","top":"525px","fontSize":"200%","color":"black","width":"300px","textAlign":"center","left":"100px","backgroundColor":"rgba(0,255,0,0)","height":"50px"})
        placeText({"divid":"length5","text":"Rules of Length 5 or more","top":"525px","fontSize":"200%","color":"black","width":"300px","textAlign":"center","left":"685px","backgroundColor":"rgba(0,255,0,0)","height":"50px"})


        drawRule([[0]],"length0rule1","mainDiv",0,0)
        document.getElementById("length0rule1").style.transform="translate3d(225px,225px,0px)";
        drawRule([[1]],"length0rule2","mainDiv",0,0)
        document.getElementById("length0rule2").style.transform="translate3d(225px,375px,0px)";


        drawRule([[1,0],[0]],"length1rule1","mainDiv",0,0)
        document.getElementById("length1rule1").style.transform="translate3d(575px,225px,0px)";
        drawRule([[0,0],[1]],"length1rule2","mainDiv",0,0)
        document.getElementById("length1rule2").style.transform="translate3d(575px,375px,0px)";

        drawRule([[1,0],[1,0],[0]],"length2rule1","mainDiv",0,0)
        document.getElementById("length2rule1").style.transform="translate3d(950px,225px,0px)";
        drawRule([[0,0],[0,1],[1]],"length2rule2","mainDiv",0,0)
        document.getElementById("length2rule2").style.transform="translate3d(950px,375px,0px)";



        drawRule([[0,1],[1,1],[1,0],[0]],"length4rule1","mainDiv",0,0)
        document.getElementById("length4rule1").style.transform="translate3d(150px,600px,0px)";
        drawRule([[1,0],[0,0],[1,0],[1]],"length4rule2","mainDiv",0,0)
        document.getElementById("length4rule2").style.transform="translate3d(150px,750px,0px)";


        drawRule([[0,1],[1,0],[1,1],[1,0],[0]],"length5rule1","mainDiv",0,0)
        document.getElementById("length5rule1").style.transform="translate3d(700px,600px,0px)";
        drawRule([[1,0],[0,1],[1,0],[0,0],[1,0],[1,1],[1]],"length5rule2","mainDiv",0,0)
        document.getElementById("length5rule2").style.transform="translate3d(650px,750px,0px)";


        placeText({"divid":"continueButton","text":"Click here for quiz questions","top":"925px","fontSize":"250%","color":"red","width":"500px","textAlign":"center","left":"340px","backgroundColor":"rgba(255,0,0,.1)","height":"100px"})
        clickButton("once","continueButton",makeSelection,[["stage","3"],["question","quizRuleLength1"]]);    
    }


    if(window.state['stage']==3){
        var questionName="quizRuleLength1";
        var questionTitle="Quiz Question #9"
        var questionStatement="Click on the longest rule."
        var nextStep=[["stage","4"],["question","quizRuleLength2"]];
        var correctDiv="quizRule2";
        var correctRuleLength=400;
    }
    if(window.state['stage']==4){
        var questionName="quizRuleLength2";
        var questionTitle="Quiz Question #10"
        var questionStatement="Click on the shortest rule."
        var nextStep=[["stage","5"],["question","quizRuleLength3"]];
        var correctDiv="quizRule7";
        var correctRuleLength=50;
    }
    if(window.state['stage']==5){
        var questionName="quizRuleLength3";
        var questionTitle="Quiz Question #11"
        var questionStatement="Click on the rule with length 4."
        var nextStep=[["stage","1"],["page","fitTheHistoryInstructions"]];
        var correctDiv="quizRule5";
        var correctRuleLength=200;
    }


    if(window.state['stage']>=3){
        placeText({"divid":"quizBackground","textAlign":"left","top":"200px","height":"725px","backgroundColor":"rgba(255,0,0,.1)","width":"1080px","left":"100px"});

        var confirmationStatement="Are you sure you want to submit this as your answer?";
        var thisDiv="quizRule1"
        drawRule([[0,1],[1,0],[1,1],[1,0],[0]],thisDiv,"quizBackground",0,0);
        document.getElementById(thisDiv).style.transform="translate3d(50px,125px,0px)";

        var thisDiv="quizRule2"
        drawRule([[0,1],[1,0],[0,1],[0,1],[1,0],[1,1],[1,0],[1]],thisDiv,"quizBackground",0,0);
        document.getElementById(thisDiv).style.transform="translate3d(350px,125px,0px)";


        var thisDiv="quizRule3"
        drawRule([[0,1],[1,0],[0]],thisDiv,"quizBackground",0,0);
        document.getElementById(thisDiv).style.transform="translate3d(800px,125px,0px)";



        var thisDiv="quizRule4"
        drawRule([[0,0],[1]],thisDiv,"quizBackground",0,0);
        document.getElementById(thisDiv).style.transform="translate3d(50px,275px,0px)";


        var thisDiv="quizRule5"
        drawRule([[0,1],[1,1],[1,0],[1]],thisDiv,"quizBackground",0,0);
        document.getElementById(thisDiv).style.transform="translate3d(200px,275px,0px)";

        var thisDiv="quizRule6"
        drawRule([[0,1],[0,0],[1,0],[0,1],[1,1],[1,0],[0]],thisDiv,"quizBackground",0,0);
        document.getElementById(thisDiv).style.transform="translate3d(450px,275px,0px)";

        var thisDiv="quizRule7"
        drawRule([[1]],thisDiv,"quizBackground",0,0);
        document.getElementById(thisDiv).style.transform="translate3d(850px,275px,0px)";
        drawQuizEarnings();

        placeText({"parentDiv":"quizBackground","text":questionTitle,"color":"red","top":"00px","fontSize":"400%","textAlign":"center","height":"100px"});
        placeText({"parentDiv":"quizBackground","text":questionStatement,"top":"425px","fontSize":"300%","textAlign":"center","width":"1080px","left":"0px","height":"50px"});

        if(window.state['answer']=="correct"){
            placeText({"parentDiv":"quizBackground","text":"That is correct, click on the correct box again to continue.","color":"green","top":"525px","fontSize":"300%","textAlign":"center","width":"1080px","left":"00px","height":"75px"});
            clickButton("once",correctDiv,makeSelection,nextStep);
            drawRuleHighlight(correctRuleLength,"correctAnswer",correctDiv,"rgba(0,255,0,1)");
        }
        else if(window.state['answer']=="incorrect"){
            placeText({"parentDiv":"quizBackground","text":"That is incorrect, click on the correct box to continue.","color":"red","top":"525px","fontSize":"300%","textAlign":"center","width":"1080px","left":"00px","height":"75px"});
            clickButton("once",correctDiv,makeSelection,nextStep);
            drawRuleHighlight(correctRuleLength,"correctAnswer",correctDiv,"rgba(0,255,0,1)");
        }
        else{
            var thisDiv="quizRule1"
            instructionsHighlightListener(thisDiv,250,"black");
            clickButton("many",thisDiv,submitQuizAnswer,{"question":questionName,"div":thisDiv},confirmationStatement);

            var thisDiv="quizRule2"
            instructionsHighlightListener(thisDiv,400,"black");
            clickButton("many",thisDiv,submitQuizAnswer,{"question":questionName,"div":thisDiv},confirmationStatement);

            var thisDiv="quizRule3"
            instructionsHighlightListener(thisDiv,150,"black");
            clickButton("many",thisDiv,submitQuizAnswer,{"question":questionName,"div":thisDiv},confirmationStatement);

            var thisDiv="quizRule4"
            instructionsHighlightListener(thisDiv,100,"black");
            clickButton("many",thisDiv,submitQuizAnswer,{"question":questionName,"div":thisDiv},confirmationStatement);

            var thisDiv="quizRule5"
            instructionsHighlightListener(thisDiv,200,"black");
            clickButton("many",thisDiv,submitQuizAnswer,{"question":questionName,"div":thisDiv},confirmationStatement);

            var thisDiv="quizRule6"
            instructionsHighlightListener(thisDiv,350,"black");
            clickButton("many",thisDiv,submitQuizAnswer,{"question":questionName,"div":thisDiv},confirmationStatement);

            var thisDiv="quizRule7"
            instructionsHighlightListener(thisDiv,50,"black");
            clickButton("many",thisDiv,submitQuizAnswer,{"question":questionName,"div":thisDiv},confirmationStatement);

        }
    }

}


function instructionsHighlightListener(divID,ruleLength,color){
    document.getElementById(divID).addEventListener("mouseover", function(){
        drawRuleHighlight(ruleLength,"listRuleHighlight",divID,color);
        if(document.getElementById("historyIN")!=null){
            drawRuleHighlight(ruleLength,"listRuleHighlight2","historyIN",color);
            document.getElementById('listRuleHighlight2').style.transform="translate3d("+(1800-ruleLength)+"px,25px,0px)";
        }
    })

    document.getElementById(divID).addEventListener("mouseout", function(){
        deleteDiv("listRuleHighlight");
        deleteDiv("listRuleHighlight2");
    })

}


function instructionsHighlightListEntry(listEntryDiv,ruleDiv,ruleLength,color){
    document.getElementById(listEntryDiv).addEventListener("mouseover", function(){
        document.getElementById(listEntryDiv).style.border="2px solid "+color;
        drawRuleHighlight(ruleLength,"instructionsRuleHighlight",ruleDiv,color);
        drawRuleHighlight(ruleLength,"instructionsHistoryHighlight","historyIN",color);
        document.getElementById('instructionsHistoryHighlight').style.transform="translate3d("+(1800-ruleLength)+"px,25px,0px)";
    })

    document.getElementById(listEntryDiv).addEventListener("mouseout", function(){
        document.getElementById(listEntryDiv).style.border="";
        deleteDiv("instructionsRuleHighlight");
        deleteDiv("instructionsHistoryHighlight");
    })

}


///////////////////////////////NEW PAGE//////////////////////////////////////////////
///////////////////////////////NEW PAGE//////////////////////////////////////////////
///////////////////////////////NEW PAGE//////////////////////////////////////////////


function fitTheHistoryInstructions(){
    clearAll();
    drawBackAndForwardButtons();
    console.log(window.state)
    //placeText("gameTableTitle","Game Table",50,200,"red",1);

    if(window.state['stage']>=1){
        placeText({"text":"","top":"0px","fontSize":"300%","backgroundColor":"rgba(255,0,0,.1)","height":"150px"})
        placeText({"text":"","top":"0px","fontSize":"300%","backgroundColor":"rgba(255,0,0,.1)","height":"150px"})
        placeText({"text":"Fit the History:","top":"25px","fontSize":"300%","color":"red","width":"280px","textAlign":"right","left":"000px"})
        placeText({"text":"a rule is said to fit the history if the input sequence for the rule is the same as the end of the history.","top":"25px","fontSize":"300%","color":"black","width":"960px","textAlign":"left","left":"300px"})
    }
    if(window.state['stage']>=2){
        placeText({"divid":"div1","text":"Suppose the history looks like this:","top":"150px","fontSize":"300%","color":"black","width":"1280px","textAlign":"center","left":"0px","backgroundColor":"rgba(0,0,0,0)","height":"100px"})
        drawHistory();        
        document.getElementById("history").style.transform="translate3d(0px,200px,0px) scale(1)";
    }
    if(window.state['stage']>=3 && window.state['stage']<=4){

        var statement="The above rule DOES fit the history, because the rule's input sequence:"
        var statement2="is the same as the actions played at the end of the history (periods 34 and 35):"
        placeText({"divid":"fitRuleText","text":statement,"top":"675px","fontSize":"200%","color":"black","width":"540px","textAlign":"left","left":"40px","backgroundColor":"rgba(0,0,0,0)","height":"35px"})
        placeText({"divid":"fitRuleText2","text":statement2,"top":"800px","fontSize":"200%","color":"black","width":"540px","textAlign":"left","left":"40px","backgroundColor":"rgba(0,0,0,0)","height":"35px"})
        drawRule([[0,0],[0,1]],"fitruleinput","fitRuleText",0,0)
        document.getElementById("fitruleinput").style.fontSize="50%";
        document.getElementById("fitruleinput").style.transform="translate3d(370px,-50px,0px) scale(.5)";

        drawRule([[0,0],[0,1]],"fitrulehistory","fitRuleText2",0,0)
        document.getElementById("fitrulehistory").style.fontSize="50%";
        document.getElementById("fitrulehistory").style.transform="translate3d(370px,-50px,0px) scale(.5)";



        drawRule([[0,0],[0,1],[1]],"testRule","mainDiv",0,0)
        document.getElementById("testRule").style.transform="translate3d(225px,500px,0px) scale(2)";
        instructionsHighlightListener("testRule",150,"red");

        placeText({"divid":"continueButton","text":"Click here to see rule that DOES NOT fit the history","top":"550px","fontSize":"300%","color":"green","width":"500px","textAlign":"center","left":"670px","height":"150px","lineHeight":"75px","backgroundColor":"rgba(0,255,0,.1)"})
        clickButton("once","continueButton",makeSelection,[["stage",4]]);

    }
    if(window.state['stage']==4){
        var statement="The above rule DOES NOT fit the history, because the rule's input sequence:"
        var statement2="is different than the actions played at the end of the history (periods 34 and 35):"
        placeText({"divid":"div222","text":statement,"top":"675px","fontSize":"200%","color":"black","width":"540px","textAlign":"left","left":"690px","backgroundColor":"rgba(0,0,0,0)","height":"35px"})

        placeText({"divid":"div2222","text":statement2,"top":"800px","fontSize":"200%","color":"black","width":"540px","textAlign":"left","left":"690px","backgroundColor":"rgba(0,0,0,0)","height":"35px"})
        drawRule([[0,1],[1,1]],"testRule22","div222",0,0)
        document.getElementById("testRule22").style.fontSize="50%";
        document.getElementById("testRule22").style.transform="translate3d(370px,-50px,0px) scale(.5)";

        drawRule([[0,0],[0,1]],"testRule223","div222",0,0)
        document.getElementById("testRule223").style.fontSize="50%";
        document.getElementById("testRule223").style.transform="translate3d(370px,75px,0px) scale(.5)";



        drawRule([[0,1],[1,1],[1]],"testRule2","mainDiv",0,0)
        document.getElementById("testRule2").style.transform="translate3d(865px,500px,0px) scale(2)";
        instructionsHighlightListener("testRule2",150,"blue");

        placeText({"divid":"continueButton","text":"Click here to see more examples","top":"925px","fontSize":"300%","color":"green","width":"600px","textAlign":"center","left":"340px","backgroundColor":"rgba(0,255,0,.1)","height":"100px"})
        clickButton("once","continueButton",makeSelection,[["stage",5]]);
    }


    if(window.state['stage']==5){
        placeText({"divid":"div32","text":"Some rules that DO fit the history:","top":"400px","fontSize":"200%","color":"black","width":"640px","textAlign":"center","left":"0px","backgroundColor":"rgba(0,0,0,0)","height":"100px"})
        placeText({"divid":"div321","text":"(Hover over rules for more info):","top":"450px","fontSize":"100%","color":"black","width":"640px","textAlign":"center","left":"0px","backgroundColor":"rgba(0,0,0,0)","height":"50px"})

        var correctColor="red";

        drawRule([[0,1],[0]],"fits1","mainDiv",0,0);
        document.getElementById("fits1").style.fontSize="100%";
        document.getElementById("fits1").style.transform="translate3d(50px,500px,0px)";
        instructionsHighlightListener("fits1",100,correctColor);


        drawRule([[0,1],[1]],"fits2","mainDiv",0,0)
        document.getElementById("fits2").style.fontSize="100%";
        document.getElementById("fits2").style.transform="translate3d(200px,500px,0px)";
        instructionsHighlightListener("fits2",100,correctColor);

        drawRule([[0,0],[0,1],[0]],"fits3","mainDiv",0,0)
        document.getElementById("fits3").style.fontSize="100%";
        document.getElementById("fits3").style.transform="translate3d(350px,500px,0px)";
        instructionsHighlightListener("fits3",150,correctColor);


        drawRule([[0,0],[0,1],[1]],"fits4","mainDiv",0,0)
        document.getElementById("fits4").style.fontSize="100%";
        document.getElementById("fits4").style.transform="translate3d(50px,625px,0px)";
        instructionsHighlightListener("fits4",150,correctColor);

        drawRule([[0,1],[0,0],[0,1],[0]],"fits5","mainDiv",0,0)
        document.getElementById("fits5").style.fontSize="100%";
        document.getElementById("fits5").style.transform="translate3d(250px,625px,0px)";
        instructionsHighlightListener("fits5",200,correctColor);

        drawRule([[0,0],[0,0],[0,1],[1,1],[0,1],[0,0],[0,1],[1]],"fits6","mainDiv",0,0)
        document.getElementById("fits6").style.fontSize="100%";
        document.getElementById("fits6").style.transform="translate3d(50px,750px,0px)";
        instructionsHighlightListener("fits6",400,correctColor);


        placeText({"divid":"div312","text":"Some rules that DO NOT fit the history:","top":"400px","fontSize":"200%","color":"black","width":"640px","textAlign":"center","left":"640px","backgroundColor":"rgba(0,0,0,0)","height":"100px"})
        placeText({"divid":"div3121","text":"(Hover over rules for more info):","top":"450px","fontSize":"100%","color":"black","width":"640px","textAlign":"center","left":"640px","backgroundColor":"rgba(0,0,0,0)","height":"50px"})

        var incorrectColor="blue";


        drawRule([[0,0],[1]],"fits11","mainDiv",0,0)
        document.getElementById("fits11").style.fontSize="100%";
        document.getElementById("fits11").style.transform="translate3d(690px,500px,0px)";
        instructionsHighlightListener("fits11",100,incorrectColor);


        drawRule([[1,0],[0]],"fits12","mainDiv",0,0)
        document.getElementById("fits12").style.fontSize="100%";
        document.getElementById("fits12").style.transform="translate3d(840px,500px,0px)";
        instructionsHighlightListener("fits12",100,incorrectColor);

        drawRule([[0,0],[1,0],[1]],"fits13","mainDiv",0,0)
        document.getElementById("fits13").style.fontSize="100%";
        document.getElementById("fits13").style.transform="translate3d(990px,500px,0px)";
        instructionsHighlightListener("fits13",150,incorrectColor);

        drawRule([[1,0],[0,1],[0]],"fits14","mainDiv",0,0)
        document.getElementById("fits14").style.fontSize="100%";
        document.getElementById("fits14").style.transform="translate3d(690px,625px,0px)";
        instructionsHighlightListener("fits14",150,incorrectColor);

        drawRule([[1,0],[0,0],[0,1],[1]],"fits15","mainDiv",0,0)
        document.getElementById("fits15").style.fontSize="100%";
        document.getElementById("fits15").style.transform="translate3d(890px,625px,0px)";
        instructionsHighlightListener("fits15",200,incorrectColor);

        drawRule([[0,0],[1,1],[0,0],[1,0],[1,1],[0,0],[0,1],[0]],"fits16","mainDiv",0,0)
        document.getElementById("fits16").style.fontSize="100%";
        document.getElementById("fits16").style.transform="translate3d(690px,750px,0px)";
        instructionsHighlightListener("fits16",400,incorrectColor);

        placeText({"divid":"continueButton","text":"Click here for quiz questions","top":"925px","fontSize":"300%","color":"red","width":"600px","textAlign":"center","left":"340px","backgroundColor":"rgba(255,0,0,.1)","height":"100px"})
        clickButton("once","continueButton",makeSelection,[["stage",6],["question","quizFitHistory1"]]);


    }

    if(window.state['stage']==6){
        placeText({"text":"","color":"red","top":"450px","height":"525px","fontSize":"400%","textAlign":"center","backgroundColor":"rgba(255,0,0,.1)","width":"1080px","left":"100px"});
        placeText({"text":"Quiz Question #12","color":"red","top":"450px","fontSize":"400%","textAlign":"center","height":"100px"});
        placeText({"text":"Click on the rule that fits the history, or the correct box:","top":"550px","fontSize":"300%","textAlign":"center","width":"1000px","left":"120px","height":"50px"});
        drawQuizEarnings();
        document.getElementById("quizEarningsInfo").style.transform="translate3d(0,50px,0px)";

        drawRule([[0,1],[1,0],[1,1],[0,1],[0]],"quizRule1","mainDiv",0,0)
        document.getElementById("quizRule1").style.fontSize="100%";
        document.getElementById("quizRule1").style.transform="translate3d(190px,625px,0px)";

        drawRule([[0,1],[0,1],[1,0],[0,1],[1]],"quizRule2","mainDiv",0,0)
        document.getElementById("quizRule2").style.fontSize="100%";
        document.getElementById("quizRule2").style.transform="translate3d(500px,625px,0px)";

        drawRule([[0,0],[1,0],[0,1],[0,1],[0]],"quizRule3","mainDiv",0,0)
        document.getElementById("quizRule3").style.fontSize="100%";
        document.getElementById("quizRule3").style.transform="translate3d(810px,625px,0px)";


        placeText({"divid":"quizNone","text":"None of the above rules fit the history.","top":"750px","fontSize":"150%","color":"blue","width":"300px","textAlign":"center","left":"300px","backgroundColor":"rgba(0,0,255,.1)","height":"100px","lineHeight":"35px","padding":"15px"})
        placeText({"divid":"quizMultiple","text":"More than one of the above rules fits the history.","top":"750px","fontSize":"150%","color":"blue","width":"300px","textAlign":"center","left":"680px","backgroundColor":"rgba(0,0,255,.1)","height":"100px","lineHeight":"35px","padding":"15px"})


        var nextStep=[["stage","7"],["question","quiz11"]];
        var correctDiv="quizNone";

        if(window.state['answer']=="correct"){
            placeText({"text":"That is correct, click on the correct box again to continue.","color":"green","top":"850px","fontSize":"300%","textAlign":"left","width":"1000px","left":"140px","height":"75px"});
            clickButton("once",correctDiv,makeSelection,nextStep);
            document.getElementById(correctDiv).style.border="5px solid rgba(0,255,0,1)";
        }
        else if(window.state['answer']=="incorrect"){
            placeText({"text":"That is incorrect, click on the correct box to continue.","color":"red","top":"850px","fontSize":"300%","textAlign":"center","width":"1000px","left":"140px","height":"75px"});
            clickButton("once",correctDiv,makeSelection,nextStep);
            document.getElementById(correctDiv).style.border="5px solid rgba(0,255,0,1)";
        }
        else{
            instructionsHighlightListener("quizRule1",250,"black");
            instructionsHighlightListener("quizRule2",250,"black");
            instructionsHighlightListener("quizRule3",250,"black");
            hoverDiv2("quizNone","black");
            hoverDiv2("quizMultiple","black");

            confirmation="Are you sure you want to submit this as your answer?";
            var thisDiv="quizRule1";
            clickButton("many",thisDiv,submitQuizAnswer,{"question":"quizFitHistory1","div":thisDiv},confirmation);
            var thisDiv="quizRule2";
            clickButton("many",thisDiv,submitQuizAnswer,{"question":"quizFitHistory1","div":thisDiv},confirmation);
            var thisDiv="quizRule3";
            clickButton("many",thisDiv,submitQuizAnswer,{"question":"quizFitHistory1","div":thisDiv},confirmation);
            var thisDiv="quizNone";
            clickButton("many",thisDiv,submitQuizAnswer,{"question":"quizFitHistory1","div":thisDiv},confirmation);
            var thisDiv="quizMultiple";
            clickButton("many",thisDiv,submitQuizAnswer,{"question":"quizFitHistory1","div":thisDiv},confirmation);
        }            
    }


    if(window.state['stage']==7){
        placeText({"text":"","color":"red","top":"450px","height":"525px","fontSize":"400%","textAlign":"center","backgroundColor":"rgba(255,0,0,.1)","width":"1080px","left":"100px"});
        placeText({"text":"Quiz Question #13","color":"red","top":"450px","fontSize":"400%","textAlign":"center","height":"100px"});
        placeText({"text":"Click on the rule that fits the history, or the correct box:","top":"550px","fontSize":"300%","textAlign":"center","width":"1000px","left":"120px","height":"50px"});
        drawQuizEarnings();
        document.getElementById("quizEarningsInfo").style.transform="translate3d(0,50px,0px)";

        drawRule([[1,0],[0,1],[1,0],[0,0],[0]],"quizRule1","mainDiv",0,0)
        document.getElementById("quizRule1").style.fontSize="100%";
        document.getElementById("quizRule1").style.transform="translate3d(290px,625px,0px)";

        drawRule([[0,0],[0,1],[0]],"quizRule2","mainDiv",0,0)
        document.getElementById("quizRule2").style.fontSize="100%";
        document.getElementById("quizRule2").style.transform="translate3d(600px,625px,0px)";

        drawRule([[0,0],[0,1],[1,1],[0,1],[0]],"quizRule3","mainDiv",0,0)
        document.getElementById("quizRule3").style.fontSize="100%";
        document.getElementById("quizRule3").style.transform="translate3d(810px,625px,0px)";



        placeText({"divid":"quizNone","text":"None of the above rules fit the history.","top":"750px","fontSize":"150%","color":"blue","width":"300px","textAlign":"center","left":"300px","backgroundColor":"rgba(0,0,255,.1)","height":"100px","lineHeight":"35px","padding":"15px"})
        placeText({"divid":"quizMultiple","text":"More than one of the above rules fits the history.","top":"750px","fontSize":"150%","color":"blue","width":"300px","textAlign":"center","left":"680px","backgroundColor":"rgba(0,0,255,.1)","height":"100px","lineHeight":"35px","padding":"15px"})

        var nextStep=[["stage","8"],["question","quizFitHistory3"]];
        var correctDiv="quizRule2";

        if(window.state['answer']=="correct"){
            placeText({"text":"That is correct, click on the correct box again to continue.","color":"green","top":"850px","fontSize":"300%","textAlign":"left","width":"1000px","left":"140px","height":"75px"});
            clickButton("once",correctDiv,makeSelection,nextStep);
            drawRuleHighlight(150,"correctAnswer",correctDiv,"rgba(0,255,0,1)");
        }
        else if(window.state['answer']=="incorrect"){
            placeText({"text":"That is incorrect, click on the correct box to continue.","color":"red","top":"850px","fontSize":"300%","textAlign":"center","width":"1000px","left":"140px","height":"75px"});
            clickButton("once",correctDiv,makeSelection,nextStep);
            drawRuleHighlight(150,"correctAnswer",correctDiv,"rgba(0,255,0,1)");
        }
        else{
            instructionsHighlightListener("quizRule1",250,"black");
            instructionsHighlightListener("quizRule2",150,"black");
            instructionsHighlightListener("quizRule3",250,"black");
            hoverDiv2("quizNone","black");
            hoverDiv2("quizMultiple","black");

            confirmation="Are you sure you want to submit this as your answer?";
            var thisDiv="quizRule1";
            clickButton("many",thisDiv,submitQuizAnswer,{"question":"quizFitHistory2","div":thisDiv},confirmation);
            var thisDiv="quizRule2";
            clickButton("many",thisDiv,submitQuizAnswer,{"question":"quizFitHistory2","div":thisDiv},confirmation);
            var thisDiv="quizRule3";
            clickButton("many",thisDiv,submitQuizAnswer,{"question":"quizFitHistory2","div":thisDiv},confirmation);
            var thisDiv="quizNone";
            clickButton("many",thisDiv,submitQuizAnswer,{"question":"quizFitHistory2","div":thisDiv},confirmation);
            var thisDiv="quizMultiple";
            clickButton("many",thisDiv,submitQuizAnswer,{"question":"quizFitHistory2","div":thisDiv},confirmation);
        }            
    }

    if(window.state['stage']==8){
        placeText({"text":"","color":"red","top":"450px","height":"525px","fontSize":"400%","textAlign":"center","backgroundColor":"rgba(255,0,0,.1)","width":"1080px","left":"100px"});
        placeText({"text":"Quiz Question #14","color":"red","top":"450px","fontSize":"400%","textAlign":"center","height":"100px"});
        placeText({"text":"Click on the rule that fits the history, or the correct box:","top":"550px","fontSize":"300%","textAlign":"center","width":"1000px","left":"120px","height":"50px"});
        drawQuizEarnings();
        document.getElementById("quizEarningsInfo").style.transform="translate3d(0,50px,0px)";

        drawRule([[1,1],[0,1],[0,0],[0,1],[0]],"quizRule1","mainDiv",0,0)
        document.getElementById("quizRule1").style.fontSize="100%";
        document.getElementById("quizRule1").style.transform="translate3d(240px,625px,0px)";

        drawRule([[1,0],[1,0],[0,1],[0]],"quizRule2","mainDiv",0,0)
        document.getElementById("quizRule2").style.fontSize="100%";
        document.getElementById("quizRule2").style.transform="translate3d(550px,625px,0px)";

        drawRule([[0,1],[0,1],[0,0],[1,1],[0]],"quizRule3","mainDiv",0,0)
        document.getElementById("quizRule3").style.fontSize="100%";
        document.getElementById("quizRule3").style.transform="translate3d(810px,625px,0px)";



        placeText({"divid":"quizNone","text":"None of the above rules fit the history.","top":"750px","fontSize":"150%","color":"blue","width":"300px","textAlign":"center","left":"300px","backgroundColor":"rgba(0,0,255,.1)","height":"100px","lineHeight":"35px","padding":"15px"})
        placeText({"divid":"quizMultiple","text":"More than one of the above rules fits the history.","top":"750px","fontSize":"150%","color":"blue","width":"300px","textAlign":"center","left":"680px","backgroundColor":"rgba(0,0,255,.1)","height":"100px","lineHeight":"35px","padding":"15px"})

        var nextStep=[["stage","1"],["page","instructionsDefaultFirstPeriod"]];
        var correctDiv="quizRule1";

        if(window.state['answer']=="correct"){
            placeText({"text":"That is correct, click on the correct box again to continue.","color":"green","top":"850px","fontSize":"300%","textAlign":"left","width":"1000px","left":"140px","height":"75px"});
            clickButton("once",correctDiv,makeSelection,nextStep);
            drawRuleHighlight(250,"correctAnswer",correctDiv,"rgba(0,255,0,1)");
        }
        else if(window.state['answer']=="incorrect"){
            placeText({"text":"That is incorrect, click on the correct box to continue.","color":"red","top":"850px","fontSize":"300%","textAlign":"center","width":"1000px","left":"140px","height":"75px"});
            clickButton("once",correctDiv,makeSelection,nextStep);
            drawRuleHighlight(250,"correctAnswer",correctDiv,"rgba(0,255,0,1)");
        }
        else{
            instructionsHighlightListener("quizRule1",250,"black");
            instructionsHighlightListener("quizRule2",200,"black");
            instructionsHighlightListener("quizRule3",250,"black");
            hoverDiv2("quizNone","black");
            hoverDiv2("quizMultiple","black");

            confirmation="Are you sure you want to submit this as your answer?";
            var thisDiv="quizRule1";
            clickButton("many",thisDiv,submitQuizAnswer,{"question":"quizFitHistory3","div":thisDiv},confirmation);
            var thisDiv="quizRule2";
            clickButton("many",thisDiv,submitQuizAnswer,{"question":"quizFitHistory3","div":thisDiv},confirmation);
            var thisDiv="quizRule3";
            clickButton("many",thisDiv,submitQuizAnswer,{"question":"quizFitHistory3","div":thisDiv},confirmation);
            var thisDiv="quizNone";
            clickButton("many",thisDiv,submitQuizAnswer,{"question":"quizFitHistory3","div":thisDiv},confirmation);
            var thisDiv="quizMultiple";
            clickButton("many",thisDiv,submitQuizAnswer,{"question":"quizFitHistory3","div":thisDiv},confirmation);
        }            
    }



    if(window.state['stage']==1){
        placeText({"divid":"continueButton","text":"Click here to see example","top":"250px","fontSize":"300%","color":"green","width":"600px","textAlign":"center","left":"340px","backgroundColor":"rgba(0,255,0,.1)","height":"100px"})
        clickButton("once","continueButton",makeSelection,[["stage",2]]);
    }
    else if(window.state['stage']==2){
        placeText({"divid":"continueButton","text":"Click here to see a rule that DOES fit the history","top":"450px","fontSize":"300%","color":"green","width":"900px","textAlign":"center","left":"190px","backgroundColor":"rgba(0,255,0,.1)","height":"100px"})
        clickButton("once","continueButton",makeSelection,[["stage",3]]);
    }
    else if(window.state['stage']==3){
        placeText({"divid":"continueButton","text":"Click here to see rule that DOES NOT fit the history","top":"550px","fontSize":"300%","color":"green","width":"500px","textAlign":"center","left":"670px","height":"150px","lineHeight":"75px","backgroundColor":"rgba(0,255,0,.1)"})
        clickButton("once","continueButton",makeSelection,[["stage",4]]);
    }

}






///////////////////////////////NEW PAGE//////////////////////////////////////////////
///////////////////////////////NEW PAGE//////////////////////////////////////////////
///////////////////////////////NEW PAGE//////////////////////////////////////////////



function instructionsDefaultFirstPeriod(){
    clearAll();
    drawBackAndForwardButtons();
    //These rules must always be set, and therefore esure that the rule set makes a unique choice in any period.  

    placeText({"text":"Rules of Length 1",
        "top":"0px",
        "fontSize":"300%",
        "color":"blue",
        "height":"100px"});



        placeText({"text":"There are two types of rules with a length of 1:","top":"75px","fontSize":"300%","color":"black","width":"1280px","textAlign":"center","left":"0px","backgroundColor":"rgba(0,0,0,0)","height":"100px"})

    if(window.state['stage']==1){
        placeText({"divid":"continueButton","text":"Click here to learn about these rules.","top":"250px","fontSize":"300%","color":"green","width":"680px","textAlign":"center","left":"300px","height":"100px","lineHeight":"100px","backgroundColor":"rgba(0,255,0,.1)"})
        clickButton("once","continueButton",makeSelection,[["stage",2]]);
    }
    
    if(window.state['stage']>=2){
        placeText({"text":"First Period Rule:","top":"150px","fontSize":"300%","color":"red","width":"640px","textAlign":"center","left":"0px","backgroundColor":"rgba(0,0,0,0)","height":"100px"})
        placeText({"text":"The first period rule only specifies the action to be played in the first period of each match.","top":"250px","fontSize":"200%","color":"black","width":"540px","textAlign":"left","left":"50px","backgroundColor":"rgba(0,0,0,0)","height":"50px"})
    }
    if(window.state['stage']==2){
        placeText({"divid":"continueButton","text":"Continue.","top":"450px","fontSize":"300%","color":"green","width":"680px","textAlign":"center","left":"300px","height":"100px","lineHeight":"100px","backgroundColor":"rgba(0,255,0,.1)"})
        clickButton("once","continueButton",makeSelection,[["stage",3]]);
    }
    if(window.state['stage']>=3){
        placeText({"text":"The first period rule is selected by clicking either the W box or the Y box in the panel labeled \"First Period Rule\" that looks like this:","top":"425px","fontSize":"200%","color":"black","width":"540px","textAlign":"left","left":"50px","backgroundColor":"rgba(0,0,0,0)","height":"50px"})
        window.state['firstPeriodRule']=undefined;
        drawFirstPeriod();
        document.getElementById("setFirstPeriodDiv").style.transform="translate3d(220px,-160px,0px)";
        document.getElementById("setFirstPeriodDiv").style.transformOrigin="top left";
        //esnure no clicks on first period rule
        placeText({"top":"610px","fontSize":"200%","color":"black","width":"200px","textAlign":"left","left":"220px","backgroundColor":"rgba(0,0,0,0)","height":"125px"})

    }

    if(window.state['stage']==3){
        placeText({"divid":"continueButton","text":"Continue","top":"250px","fontSize":"300%","color":"green","width":"400px","textAlign":"center","left":"760px","height":"100px","lineHeight":"100px","backgroundColor":"rgba(0,255,0,.1)"})
        clickButton("once","continueButton",makeSelection,[["stage",4]]);
    }

    if(window.state['stage']>=4){
        placeText({"text":"Default Rule:","top":"150px","fontSize":"300%","color":"red","width":"640px","textAlign":"center","left":"640px","backgroundColor":"rgba(0,0,0,0)","height":"100px"})
        placeText({"text":"The default rule has a length of 1, and therefore it always fits the history.","top":"250px","fontSize":"200%","color":"black","width":"540px","textAlign":"left","left":"690px","backgroundColor":"rgba(0,0,0,0)","height":"50px"})
    }

    if(window.state['stage']==4){
        placeText({"divid":"continueButton","text":"Continue","top":"450px","fontSize":"300%","color":"green","width":"400px","textAlign":"center","left":"760px","height":"100px","lineHeight":"100px","backgroundColor":"rgba(0,255,0,.1)"})
        clickButton("once","continueButton",makeSelection,[["stage",5]]);
    }

    if(window.state['stage']>=5){
        placeText({"text":"The default rule is selected by clicking either the W box or the Y box in the panel labeled \"Default Rule\" that looks like this:","top":"425px","fontSize":"200%","color":"black","width":"540px","textAlign":"left","left":"690px","backgroundColor":"rgba(0,0,0,0)","height":"50px"})
        window.state['defaultRule']=undefined;
        drawDefault();
        document.getElementById("setDefaultDiv").style.transform="translate3d(860px,-285px,0px)";
        document.getElementById("setDefaultDiv").style.transformOrigin="top left";
        //esnure no clicks on first period rule
        placeText({"top":"610px","fontSize":"200%","color":"black","width":"200px","textAlign":"left","left":"860px","backgroundColor":"rgba(0,0,0,0)","height":"125px"})
    }

    if(window.state['stage']==5){
        placeText({"divid":"continueButton","text":"Continue.","top":"800px","fontSize":"300%","color":"green","width":"680px","textAlign":"center","left":"300px","height":"100px","lineHeight":"100px","backgroundColor":"rgba(0,255,0,.1)"})
        clickButton("once","continueButton",makeSelection,[["stage",6]]);
    }


    if(window.state['stage']>=6){
        placeText({"text":"You will always have a first period rule and a default rule in your rule set during the experiment.  This ensures that in any period, your rule set will have at least one rule that fits the history. ","top":"800px","fontSize":"200%","color":"black","width":"1080px","textAlign":"left","left":"100px","backgroundColor":"rgba(0,0,0,0)","height":"50px"})
    }

    if(window.state['stage']==6){
        placeText({"divid":"continueButton","text":"Continue.","top":"950px","fontSize":"200%","color":"green","width":"380px","textAlign":"center","left":"450px","height":"50px","lineHeight":"50px","backgroundColor":"rgba(0,255,0,.1)"})
        clickButton("once","continueButton",makeSelection,[["page","instructionMultipleRulesFitTheHistory"],["stage",1]]);
    }



}




///////////////////////////////NEW PAGE//////////////////////////////////////////////
///////////////////////////////NEW PAGE//////////////////////////////////////////////
///////////////////////////////NEW PAGE//////////////////////////////////////////////

function instructionMultipleRulesFitTheHistory(){
    clearAll();
    drawBackAndForwardButtons();
//    Each period your set of rules will select a single action to be played in the next period.
// Since the default rule always fits the history, there will always be at least one rule that fits the history. 
// If there are multiple rules that fit the history, then the longest rule that fits the history will be used to select the action in the next period.

    placeText({"text":"Which Rule Will Be Selected?",
        "top":"0px",
        "fontSize":"300%",
        "color":"blue",
        "height":"150px"});


    if(window.state['stage']>=1 && window.state['stage']<=3){ 
        var thisText="Each period your set of rules will select a single action to be played in the next period.";       
        placeText({"text":thisText,"top":"200px","fontSize":"300%","color":"black","width":"1080px","textAlign":"left","left":"100px","backgroundColor":"rgba(0,0,0,0)","height":"50px"}) 
    }

    if(window.state['stage']==1){ 
        placeText({"divid":"continueButton","text":"Continue.","top":"450px","fontSize":"200%","color":"green","width":"380px","textAlign":"center","left":"450px","height":"50px","lineHeight":"50px","backgroundColor":"rgba(0,255,0,.1)"})
        clickButton("once","continueButton",makeSelection,[["stage",2]]);
    }


    if(window.state['stage']>=2 && window.state['stage']<=3){ 
        var thisText="Since the default rule always fits the history, and you will always have a default rule in your set, there will always be at least one rule that fits the history."
        placeText({"text":thisText,"top":"400px","fontSize":"300%","color":"black","width":"1080px","textAlign":"left","left":"100px","backgroundColor":"rgba(0,0,0,0)","height":"50px"}) 
    }


    if(window.state['stage']==2){ 
        placeText({"divid":"continueButton","text":"Continue.","top":"700px","fontSize":"200%","color":"green","width":"380px","textAlign":"center","left":"450px","height":"50px","lineHeight":"50px","backgroundColor":"rgba(0,255,0,.1)"})
        clickButton("once","continueButton",makeSelection,[["stage",3]]);
    }

    if(window.state['stage']>=3 && window.state['stage']<=3){ 
        var thisText="If there are multiple rules that fit the history, then the <a style='color:red'>longest</a> rule that fits the history will be used to select the action in the next period."
        placeText({"text":thisText,"top":"650px","fontSize":"300%","color":"black","width":"1080px","textAlign":"left","left":"100px","backgroundColor":"rgba(0,0,0,0)","height":"50px"}) 
    }

    if(window.state['stage']==3){ 
        placeText({"divid":"continueButton","text":"Continue to see some examples.","top":"850px","fontSize":"300%","color":"green","width":"680px","textAlign":"center","left":"300px","height":"100px","backgroundColor":"rgba(0,255,0,.1)"})
        clickButton("once","continueButton",makeSelection,[["stage",4]]);
    }


        // hoverPair("listEntry_default0","insDefRule");
        // hoverPair("listEntry_rule1","insRule1");
        // hoverPair("listEntry_rule3","insRule3");
        // placeText({"divid":"continueButton","text":"Continue.","top":"950px","fontSize":"200%","color":"green","width":"380px","textAlign":"center","left":"450px","height":"50px","lineHeight":"50px","backgroundColor":"rgba(0,255,0,.1)"})
        // clickButton("once","continueButton",makeSelection,[["stage","2"]]);




//first period example
//default example
// 2 multiple example
    if(window.state['stage']==4){
        window.state['match']=3;
        window.state["matchPayoff"]="Instructions";
        window.state["totalPayoff"]="Instructions";
        window.state['period']=36;

        window.state["payoffHistory"]=[[32,32],[25,25],[50,12],[25,25],[50,12],[25,25],[50,12],[25,25],[50,12],[25,25],[50,12],[25,25],[50,12],[25,25],[12,50],[32,32],[12,50],[25,25],[50,12],[50,12],[32,32],[50,12],[12,50],[50,12],[25,25],[32,32],[50,12],[50,12],[32,32],[32,32],[12,50],[25,25],[12,50],[50,12],[12,50]];
        window.state["history"]=[[0,0],[1,1],[1,0],[1,1],[1,0],[1,1],[1,0],[1,1],[1,0],[1,1],[1,0],[1,1],[1,0],[1,1],[0,1],[0,0],[0,1],[1,1],[1,0],[1,0],[0,0],[1,0],[0,1],[1,0],[1,1],[0,0],[1,0],[1,0],[0,0],[0,0],[0,1],[1,1],[0,1],[1,0],[0,1]];

        window.state['ruleInfo']=[
            ["firstPeriod1","First Period Rule",[[1]],"",""],
            ["default0","Default Rule",[[0]],"",""],
            ["rule1","Rule #1",[[0,1],[1]],"",""],
            ["rule2","Rule #2",[[1,0],[0]],"",""],
            ["rule3","Rule #3",[[1,0],[0,1],[0]],"",""],
        ]
        window.state['nextChoiceInfo']['number']="rule3";
        window.state['nextChoiceInfo']['length']=2;      
        window.state['nextChoiceInfo']['action']=0;  
        window.state['previousPayoffIndex']=0;

        drawHistory();  
        drawRules();
        drawNextAction();
        drawGame();
        drawHighlights();
        deleteDiv("gameTable");
        drawInfo();
        placeText({"top":"00px","fontSize":"300%","color":"black","width":"100%","textAlign":"left","left":"0px","backgroundColor":"rgba(0,0,0,0)","height":"750px"}) ;


        placeText({"text":"In the above example, there are three rules that fit the history:  the <a id='insDefRule'>Default Rule</a>, <a id='insRule1'>Rule #1</a> and <a id='insRule3'>Rule #3</a>.  Since Rule #3 is the longest rule that fits the history, it will be used to select the action W in period 36.","top":"800px","fontSize":"200%","color":"black","width":"1080px","textAlign":"left","left":"100px","backgroundColor":"rgba(0,0,0,0)","height":"50px"}) 
        hoverPair("listEntry_default0","insDefRule");
        hoverPair("listEntry_rule1","insRule1");
        hoverPair("listEntry_rule3","insRule3");
        placeText({"divid":"continueButton","text":"Continue.","top":"950px","fontSize":"200%","color":"green","width":"380px","textAlign":"center","left":"450px","height":"50px","lineHeight":"50px","backgroundColor":"rgba(0,255,0,.1)"})
        clickButton("once","continueButton",makeSelection,[["stage",5]]);
    }
    if(window.state['stage']==5){
        window.state['match']=3;
        window.state["matchPayoff"]="Instructions";
        window.state["totalPayoff"]="Instructions";
        window.state['period']=10;

        window.state["payoffHistory"]=[[32,32],[25,25],[50,12],[12,50],[50,12],[32,32],[50,12],[25,25],[50,12]];//,[25,25],[50,12],[25,25],[50,12],[25,25],[12,50],[32,32],[12,50],[25,25],[50,12],[50,12],[32,32],[50,12],[12,50],[50,12],[25,25],[32,32],[50,12],[50,12],[32,32],[32,32],[12,50],[25,25],[12,50],[50,12],[12,50]];
        window.state["history"]=[[0,0],[1,1],[1,0],[0,1],[1,0],[0,0],[1,0],[1,1],[1,0]]//,[1,1],[1,0],[1,1],[1,0],[1,1],[0,1],[0,0],[0,1],[1,1],[1,0],[1,0],[0,0],[1,0],[0,1],[1,0],[1,1],[0,0],[1,0],[1,0],[0,0],[0,0],[0,1],[1,1],[0,1],[1,0],[0,1]];

        window.state['ruleInfo']=[
            ["firstPeriod1","First Period Rule",[[0]],"",""],
            ["default0","Default Rule",[[1]],"",""],
            ["rule1","Rule #1",[[0,1],[1]],"",""],
            ["rule2","Rule #2",[[1,0],[0]],"",""],
            ["rule3","Rule #3",[[1,0],[0,1],[0]],"",""],
            ["rule6","Rule #6",[[1,0],[1,1],[1,0],[1]],"",""],
        ]
        window.state['nextChoiceInfo']['number']="rule6";
        window.state['nextChoiceInfo']['length']=3;      
        window.state['nextChoiceInfo']['action']=1;  
        window.state['previousPayoffIndex']=0;

        drawHistory();  
        drawRules();
        drawNextAction();
        drawGame();
        drawHighlights();
        deleteDiv("gameTable");
        drawInfo();
        placeText({"top":"00px","fontSize":"300%","color":"black","width":"100%","textAlign":"left","left":"0px","backgroundColor":"rgba(0,0,0,0)","height":"750px"}) ;


        placeText({"text":"In the above example, there are three rules that fit the history:  the <a id='insDefRule'>Default Rule</a>, <a id='insRule2'>Rule #2</a> and <a id='insRule6'>Rule #6</a>.  Since Rule #6 is the longest rule that fits the history, it will be used to select the action Y in period 10.","top":"800px","fontSize":"200%","color":"black","width":"1080px","textAlign":"left","left":"100px","backgroundColor":"rgba(0,0,0,0)","height":"50px"}) 
        hoverPair("listEntry_default0","insDefRule")
        hoverPair("listEntry_rule2","insRule2");
        hoverPair("listEntry_rule6","insRule6");
        placeText({"divid":"continueButton","text":"Continue.","top":"950px","fontSize":"200%","color":"green","width":"380px","textAlign":"center","left":"450px","height":"50px","lineHeight":"50px","backgroundColor":"rgba(0,255,0,.1)"})
        clickButton("once","continueButton",makeSelection,[["stage",6]]);
    }
    if(window.state['stage']==6){
        window.state['match']=3;
        window.state["matchPayoff"]="Instructions";
        window.state["totalPayoff"]="Instructions";
        window.state['period']=18;

        window.state["payoffHistory"]=[[32,32],[25,25],[50,12],[12,50],[50,12],[32,32],[50,12],[25,25],[50,12],[25,25],[50,12],[25,25],[50,12],[25,25],[12,50],[32,32],[12,50],[25,25],[50,12],[50,12],[32,32],[50,12],[12,50],[50,12],[25,25],[32,32],[50,12],[50,12],[32,32],[32,32],[12,50],[25,25],[12,50],[50,12],[12,50]];
        window.state["history"]=[[0,0],[1,1],[1,0],[0,1],[1,0],[0,0],[1,0],[1,1],[1,0],[1,1],[1,0],[1,1],[1,0],[1,1],[0,1],[0,0],[0,1]];//,,[1,1],[1,0],[1,0],[0,0],[1,0],[0,1],[1,0],[1,1],[0,0],[1,0],[1,0],[0,0],[0,0],[0,1],[1,1],[0,1],[1,0],[0,1]];

        window.state['ruleInfo']=[
            ["firstPeriod1","First Period Rule",[[1]],"",""],
            ["default0","Default Rule",[[0]],"",""],
            ["rule1","Rule #1",[[0,0],[1]],"",""],
            ["rule2","Rule #2",[[1,0],[0]],"",""],
            ["rule3","Rule #3",[[1,0],[0,1],[0]],"",""],
            ["rule6","Rule #6",[[1,0],[1,1],[1,0],[1]],"",""],
        ]
        window.state['nextChoiceInfo']['number']="default0";
        window.state['nextChoiceInfo']['length']=0;      
        window.state['nextChoiceInfo']['action']=0;  
        window.state['previousPayoffIndex']=0;

        drawHistory();  
        drawRules();
        drawNextAction();
        drawGame();
        drawHighlights();
        deleteDiv("gameTable");
        drawInfo();
        placeText({"top":"00px","fontSize":"300%","color":"black","width":"100%","textAlign":"left","left":"0px","backgroundColor":"rgba(0,0,0,0)","height":"750px"}) ;


        placeText({"text":"In the above example, there is only one rule that fit the history:  the <a id='insDefRule'>Default Rule</a>. Since the Default Rule is the longest rule that fits the history, it will be used to select the action W in period 18.","top":"800px","fontSize":"200%","color":"black","width":"1080px","textAlign":"left","left":"100px","backgroundColor":"rgba(0,0,0,0)","height":"50px"}) 
        hoverPair("listEntry_default0","insDefRule")
        placeText({"divid":"continueButton","text":"Continue.","top":"950px","fontSize":"200%","color":"green","width":"380px","textAlign":"center","left":"450px","height":"50px","lineHeight":"50px","backgroundColor":"rgba(0,255,0,.1)"})
        clickButton("once","continueButton",makeSelection,[["stage",7]]);
    }    
    if(window.state['stage']==7){
        window.state['match']=3;
        window.state["matchPayoff"]="Instructions";
        window.state["totalPayoff"]="Instructions";
        window.state['period']=1;
        window.state['history']=[]
        window.state['ruleInfo']=[
            ["firstPeriod1","First Period Rule",[[1]],"",""],
            ["default0","Default Rule",[[0]],"",""],
            ["rule1","Rule #1",[[0,1],[1]],"",""],
            ["rule2","Rule #2",[[1,0],[0]],"",""],
            ["rule3","Rule #3",[[0,1],[0,1],[0]],"",""],
        ]
        window.state['nextChoiceInfo']['number']="firstPeriod1";
        window.state['nextChoiceInfo']['length']=0;      
        window.state['nextChoiceInfo']['action']=1;  
        window.state['previousPayoffIndex']=0;

        drawHistory();  
        drawRules();
        drawNextAction();
        drawGame();
        drawHighlights();
        deleteDiv("gameTable");
        drawInfo();
        placeText({"top":"00px","fontSize":"300%","color":"black","width":"100%","textAlign":"left","left":"0px","backgroundColor":"rgba(0,0,0,0)","height":"750px"}) ;

        // placeText({"text":"The above situation is period 1 of the match, and therefore the first period rule is used to select the action Y in the first period of the match.","top":"800px","fontSize":"200%","color":"black","width":"1080px","textAlign":"left","left":"100px","backgroundColor":"rgba(0,0,0,0)","height":"50px"}) 
        placeText({"text":"In the above example, the current period is period 1 of the match so there is no history. Since it is the first period of the match, the <a id='insFPR'>First Period Rule</a> will be used to select the action Y in period 1.","top":"800px","fontSize":"200%","color":"black","width":"1100px","textAlign":"left","left":"90px","backgroundColor":"rgba(0,0,0,0)","height":"50px"}) 
        hoverPair("listEntry_firstPeriod1","insFPR")
        placeText({"divid":"continueButton","text":"Click to Continue to Quiz.","top":"950px","fontSize":"200%","color":"red","width":"380px","textAlign":"center","left":"450px","height":"50px","lineHeight":"50px","backgroundColor":"rgba(255,0,0,.1)"})
        clickButton("once","continueButton",makeSelection,[["stage",8],["question","quizSelectRuleFromSet1"]]);

    }

    if(window.state['stage']==8){
        window.state['match']=3;
        window.state["matchPayoff"]="Instructions";
        window.state["totalPayoff"]="Instructions";
        window.state['period']=36;

        window.state["payoffHistory"]=[[32,32],[25,25],[50,12],[25,25],[50,12],[25,25],[50,12],[25,25],[50,12],[25,25],[50,12],[25,25],[50,12],[25,25],[12,50],[32,32],[12,50],[25,25],[50,12],[50,12],[32,32],[50,12],[12,50],[50,12],[25,25],[32,32],[50,12],[50,12],[32,32],[25,32],[12,50],[32,25],[50,50],[12,12],[50,12]];
        window.state["history"]=[[0,0],[1,1],[1,0],[1,1],[1,0],[1,1],[1,0],[1,1],[1,0],[1,1],[1,0],[1,1],[1,0],[1,1],[0,1],[0,0],[0,1],[1,1],[1,0],[1,0],[0,0],[1,0],[0,1],[1,0],[1,1],[0,0],[1,0],[1,0],[0,0],[1,1],[0,1],[0,0],[1,0],[0,1],[1,0]];

        window.state['ruleInfo']=[
            ["firstPeriod1","First Period Rule",[[1]],"",""],
            ["default0","Default Rule",[[0]],"",""],
            ["rule1","Rule #1",[[0,1],[1]],"",""],
            ["rule2","Rule #2",[[1,0],[0]],"",""],
            ["rule3","Rule #3",[[1,0],[0,1],[0]],"",""],
            ["rule4","Rule #4",[[1,1],[0,0],[1]],"",""],
        ]
        window.state['nextChoiceInfo']['number']="rule3";
        window.state['nextChoiceInfo']['length']=2;      
        window.state['nextChoiceInfo']['action']=0;  
        window.state['previousPayoffIndex']=0;

        drawHistory();  
        drawRules();
        // drawNextAction();
        drawGame();
        // drawHighlights();
        deleteDiv("gameTable");
        drawInfo();
        placeText({"top":"00px","fontSize":"300%","color":"black","width":"100%","textAlign":"left","left":"0px","backgroundColor":"rgba(0,0,0,0)","height":"750px"}) ;


        // placeText({"text":"In the above example, there are three rules that fit the history:  the <a id='insDefRule'>Default Rule</a>, <a id='insRule1'>Rule #1</a> and <a id='insRule3'>Rule #3</a>.  Since Rule #3 is the longest rule that fits the history, it will be used to select the action W in period 36.","top":"800px","fontSize":"200%","color":"black","width":"1080px","textAlign":"left","left":"100px","backgroundColor":"rgba(0,0,0,0)","height":"50px"}) 
        // hoverPair("listEntry_default0","insDefRule");
        // hoverPair("listEntry_rule1","insRule1");
        // hoverPair("listEntry_rule3","insRule3");
        // placeText({"divid":"continueButton","text":"Continue.","top":"950px","fontSize":"200%","color":"green","width":"380px","textAlign":"center","left":"450px","height":"50px","lineHeight":"50px","backgroundColor":"rgba(0,255,0,.1)"})
        // clickButton("once","continueButton",makeSelection,[["stage",5]]);

        var questionName="quizRuleLength3";
        var questionTitle="Quiz Question #15"
        var questionStatement="Given the above history, click on the rule that will be used to select the action in period 36."
        var nextStep=[["stage",9],["question","quizSelectRuleFromSet2"]];
        var correctDiv="quizRuleR2";
        placeText({"divid":"quizBackground","textAlign":"left","top":"500px","height":"425px","backgroundColor":"rgba(255,0,0,.1)","width":"1080px","left":"100px"});
        placeText({"parentDiv":"quizBackground","text":questionTitle,"color":"red","top":"00px","fontSize":"400%","textAlign":"center","height":"100px"});
        placeText({"parentDiv":"quizBackground","text":questionStatement,"top":"105px","fontSize":"300%","textAlign":"left","width":"880px","left":"50px","height":"55px"});
        drawQuizEarnings();


        placeText({"divid":"quizRuleFPR","top":"225px","width":"125px","left":"0px","height":"150px","backgroundColor":"rgba(255,0,0,0)"});
        placeText({"divid":"quizRuleDR","top":"225px","width":"125px","left":"125px","height":"150px","backgroundColor":"rgba(255,0,0,0)"});
        placeText({"divid":"quizRuleR1","top":"225px","width":"175px","left":"250px","height":"150px","backgroundColor":"rgba(255,0,0,0)"});
        placeText({"divid":"quizRuleR2","top":"225px","width":"175px","left":"425px","height":"150px","backgroundColor":"rgba(255,0,0,0)"});
        placeText({"divid":"quizRuleR3","top":"225px","width":"225px","left":"600px","height":"150px","backgroundColor":"rgba(255,0,0,0)"});
        placeText({"divid":"quizRuleR4","top":"225px","width":"225px","left":"825px","height":"150px","backgroundColor":"rgba(255,0,0,0)"});

        if(window.state['answer']=="correct"){
            placeText({"parentDiv":"quizBackground","text":"That is correct, click on the correct box again to continue.","color":"green","top":"250px","fontSize":"300%","textAlign":"left","width":"880px","left":"100px","height":"75px"});
            clickButton("once",correctDiv,makeSelection,nextStep);
            document.getElementById(correctDiv).style.border="5px solid rgba(0,255,0,1)";
        }
        else if(window.state['answer']=="incorrect"){
            placeText({"parentDiv":"quizBackground","text":"That is incorrect, click on the correct box to continue.","color":"red","top":"250px","fontSize":"300%","textAlign":"left","width":"880px","left":"100px","height":"75px"});
            clickButton("once",correctDiv,makeSelection,nextStep);
            document.getElementById(correctDiv).style.border="5px solid rgba(0,255,0,1)";
        }
        else{
            // hoverDiv2("quizRuleFPR","black");
            var thisColor="rgba(255,0,0,1)"
            instructionsHighlightListEntry("quizRuleFPR","rule_firstPeriod1",50,thisColor);
            instructionsHighlightListEntry("quizRuleDR","rule_default0",50,thisColor);
            instructionsHighlightListEntry("quizRuleR1","rule_rule1",100,thisColor);
            instructionsHighlightListEntry("quizRuleR2","rule_rule2",100,thisColor);
            instructionsHighlightListEntry("quizRuleR3","rule_rule3",150,thisColor);
            instructionsHighlightListEntry("quizRuleR4","rule_rule4",150,thisColor);


            var confirmation="Are you sure you want to submit this as your answer?";
            var thisDiv="quizRuleFPR";
            clickButton("many",thisDiv,submitQuizAnswer,{"question":"quizSelectRuleFromSet1","div":thisDiv},confirmation);
            var thisDiv="quizRuleDR";
            clickButton("many",thisDiv,submitQuizAnswer,{"question":"quizSelectRuleFromSet1","div":thisDiv},confirmation);
            var thisDiv="quizRuleR1";
            clickButton("many",thisDiv,submitQuizAnswer,{"question":"quizSelectRuleFromSet1","div":thisDiv},confirmation);
            var thisDiv="quizRuleR2";
            clickButton("many",thisDiv,submitQuizAnswer,{"question":"quizSelectRuleFromSet1","div":thisDiv},confirmation);
            var thisDiv="quizRuleR3";
            clickButton("many",thisDiv,submitQuizAnswer,{"question":"quizSelectRuleFromSet1","div":thisDiv},confirmation);
            var thisDiv="quizRuleR4";
            clickButton("many",thisDiv,submitQuizAnswer,{"question":"quizSelectRuleFromSet1","div":thisDiv},confirmation);
        }

        drawQuizEarnings();

    }

    if(window.state['stage']==9){
        window.state['match']=3;
        window.state["matchPayoff"]="Instructions";
        window.state["totalPayoff"]="Instructions";
        window.state['period']=36;

        window.state["payoffHistory"]=[[32,32],[25,25],[50,12],[25,25],[50,12],[25,25],[50,12],[25,25],[50,12],[25,25],[50,12],[25,25],[50,12],[25,25],[12,50],[32,32],[12,50],[25,25],[50,12],[50,12],[32,32],[50,12],[12,50],[50,12],[25,25],[32,32],[50,12],[50,12],[32,32],[32,32],[12,50],[25,25],[32,50],[25,12],[32,50]];
        window.state["history"]=[[0,0],[1,1],[1,0],[1,1],[1,0],[1,1],[1,0],[1,1],[1,0],[1,1],[1,0],[1,1],[1,0],[1,1],[0,1],[0,0],[0,1],[1,1],[1,0],[1,0],[0,0],[1,0],[0,1],[1,0],[1,1],[0,0],[1,0],[1,0],[0,0],[0,0],[0,1],[1,1],[0,0],[1,1],[0,0]];

        window.state['ruleInfo']=[
            ["firstPeriod1","First Period Rule",[[1]],"",""],
            ["default0","Default Rule",[[0]],"",""],
            ["rule1","Rule #1",[[0,1],[1]],"",""],
            ["rule2","Rule #2",[[1,0],[0]],"",""],
            ["rule3","Rule #3",[[1,0],[0,1],[1]],"",""],
            ["rule4","Rule #4",[[0,0],[1,1],[0]],"",""],
        ]
        window.state['nextChoiceInfo']['number']="rule3";
        window.state['nextChoiceInfo']['length']=2;      
        window.state['nextChoiceInfo']['action']=0;  
        window.state['previousPayoffIndex']=0;

        drawHistory();  
        drawRules();
        // drawNextAction();
        drawGame();
        // drawHighlights();
        deleteDiv("gameTable");
        drawInfo();
        placeText({"top":"00px","fontSize":"300%","color":"black","width":"100%","textAlign":"left","left":"0px","backgroundColor":"rgba(0,0,0,0)","height":"750px"}) ;


        // placeText({"text":"In the above example, there are three rules that fit the history:  the <a id='insDefRule'>Default Rule</a>, <a id='insRule1'>Rule #1</a> and <a id='insRule3'>Rule #3</a>.  Since Rule #3 is the longest rule that fits the history, it will be used to select the action W in period 36.","top":"800px","fontSize":"200%","color":"black","width":"1080px","textAlign":"left","left":"100px","backgroundColor":"rgba(0,0,0,0)","height":"50px"}) 
        // hoverPair("listEntry_default0","insDefRule");
        // hoverPair("listEntry_rule1","insRule1");
        // hoverPair("listEntry_rule3","insRule3");
        // placeText({"divid":"continueButton","text":"Continue.","top":"950px","fontSize":"200%","color":"green","width":"380px","textAlign":"center","left":"450px","height":"50px","lineHeight":"50px","backgroundColor":"rgba(0,255,0,.1)"})
        // clickButton("once","continueButton",makeSelection,[["stage",5]]);

        var questionTitle="Quiz Question #16"
        var questionStatement="Given the above history, click on the rule that will be used to select the action in period 36."
        var nextStep=[["stage",10],["question","quizSelectRuleFromSet3"]];
        var correctDiv="quizRuleDR";
        placeText({"divid":"quizBackground","textAlign":"left","top":"500px","height":"425px","backgroundColor":"rgba(255,0,0,.1)","width":"1080px","left":"100px"});
        placeText({"parentDiv":"quizBackground","text":questionTitle,"color":"red","top":"00px","fontSize":"400%","textAlign":"center","height":"100px"});
        placeText({"parentDiv":"quizBackground","text":questionStatement,"top":"105px","fontSize":"300%","textAlign":"left","width":"880px","left":"50px","height":"55px"});

        placeText({"divid":"quizRuleFPR","top":"225px","width":"125px","left":"0px","height":"150px","backgroundColor":"rgba(255,0,0,0)"});
        placeText({"divid":"quizRuleDR","top":"225px","width":"125px","left":"125px","height":"150px","backgroundColor":"rgba(255,0,0,0)"});
        placeText({"divid":"quizRuleR1","top":"225px","width":"175px","left":"250px","height":"150px","backgroundColor":"rgba(255,0,0,0)"});
        placeText({"divid":"quizRuleR2","top":"225px","width":"175px","left":"425px","height":"150px","backgroundColor":"rgba(255,0,0,0)"});
        placeText({"divid":"quizRuleR3","top":"225px","width":"225px","left":"600px","height":"150px","backgroundColor":"rgba(255,0,0,0)"});
        placeText({"divid":"quizRuleR4","top":"225px","width":"225px","left":"825px","height":"150px","backgroundColor":"rgba(255,0,0,0)"});

        if(window.state['answer']=="correct"){
            placeText({"parentDiv":"quizBackground","text":"That is correct, click on the correct box again to continue.","color":"green","top":"250px","fontSize":"300%","textAlign":"left","width":"880px","left":"100px","height":"75px"});
            clickButton("once",correctDiv,makeSelection,nextStep);
            document.getElementById(correctDiv).style.border="5px solid rgba(0,255,0,1)";
        }
        else if(window.state['answer']=="incorrect"){
            placeText({"parentDiv":"quizBackground","text":"That is incorrect, click on the correct box to continue.","color":"red","top":"250px","fontSize":"300%","textAlign":"left","width":"880px","left":"100px","height":"75px"});
            clickButton("once",correctDiv,makeSelection,nextStep);
            document.getElementById(correctDiv).style.border="5px solid rgba(0,255,0,1)";
        }
        else{
            var qName="quizSelectRuleFromSet2"
            var thisColor="rgba(255,0,0,1)"
            instructionsHighlightListEntry("quizRuleFPR","rule_firstPeriod1",50,thisColor);
            instructionsHighlightListEntry("quizRuleDR","rule_default0",50,thisColor);
            instructionsHighlightListEntry("quizRuleR1","rule_rule1",100,thisColor);
            instructionsHighlightListEntry("quizRuleR2","rule_rule2",100,thisColor);
            instructionsHighlightListEntry("quizRuleR3","rule_rule3",150,thisColor);
            instructionsHighlightListEntry("quizRuleR4","rule_rule4",150,thisColor);
            var thisDiv="quizRuleFPR";
            clickButton("many",thisDiv,submitQuizAnswer,{"question":qName,"div":thisDiv},confirmation);
            var thisDiv="quizRuleDR";
            clickButton("many",thisDiv,submitQuizAnswer,{"question":qName,"div":thisDiv},confirmation);
            var thisDiv="quizRuleR1";
            clickButton("many",thisDiv,submitQuizAnswer,{"question":qName,"div":thisDiv},confirmation);
            var thisDiv="quizRuleR2";
            clickButton("many",thisDiv,submitQuizAnswer,{"question":qName,"div":thisDiv},confirmation);
            var thisDiv="quizRuleR3";
            clickButton("many",thisDiv,submitQuizAnswer,{"question":qName,"div":thisDiv},confirmation);
            var thisDiv="quizRuleR4";
            clickButton("many",thisDiv,submitQuizAnswer,{"question":qName,"div":thisDiv},confirmation);
        }

        drawQuizEarnings();

    }

    if(window.state['stage']==10){
        window.state['match']=3;
        window.state["matchPayoff"]="Instructions";
        window.state["totalPayoff"]="Instructions";
        window.state['period']=36;

        window.state["payoffHistory"]=[[32,32],[25,25],[50,12],[25,25],[50,12],[25,25],[50,12],[25,25],[50,12],[25,25],[50,12],[25,25],[50,12],[25,25],[12,50],[32,32],[12,50],[25,25],[50,12],[50,12],[32,32],[50,12],[12,50],[50,12],[25,25],[32,32],[50,12],[50,12],[32,32],[32,32],[12,50],[25,25],[12,50],[50,12],[50,50]];
        window.state["history"]=[[0,0],[1,1],[1,0],[1,1],[1,0],[1,1],[1,0],[1,1],[1,0],[1,1],[1,0],[1,1],[1,0],[1,1],[0,1],[0,0],[0,1],[1,1],[1,0],[1,0],[0,0],[1,0],[0,1],[1,0],[1,1],[0,0],[1,0],[1,0],[0,0],[0,0],[0,1],[1,1],[0,1],[1,0],[1,0]];

        window.state['ruleInfo']=[
            ["firstPeriod1","First Period Rule",[[1]],"",""],
            ["default0","Default Rule",[[0]],"",""],
            ["rule1","Rule #1",[[0,0],[1]],"",""],
            ["rule2","Rule #2",[[1,0],[0]],"",""],
            ["rule3","Rule #3",[[1,0],[0,1],[0]],"",""],
            ["rule4","Rule #4",[[1,0],[1,0],[0]],"",""]
        ]
        window.state['nextChoiceInfo']['number']="rule3";
        window.state['nextChoiceInfo']['length']=2;      
        window.state['nextChoiceInfo']['action']=0;  
        window.state['previousPayoffIndex']=0;

        drawHistory();  
        drawRules();
        // drawNextAction();
        drawGame();
        // drawHighlights();
        deleteDiv("gameTable");
        drawInfo();
        placeText({"top":"00px","fontSize":"300%","color":"black","width":"100%","textAlign":"left","left":"0px","backgroundColor":"rgba(0,0,0,0)","height":"750px"}) ;


        // placeText({"text":"In the above example, there are three rules that fit the history:  the <a id='insDefRule'>Default Rule</a>, <a id='insRule1'>Rule #1</a> and <a id='insRule3'>Rule #3</a>.  Since Rule #3 is the longest rule that fits the history, it will be used to select the action W in period 36.","top":"800px","fontSize":"200%","color":"black","width":"1080px","textAlign":"left","left":"100px","backgroundColor":"rgba(0,0,0,0)","height":"50px"}) 
        // hoverPair("listEntry_default0","insDefRule");
        // hoverPair("listEntry_rule1","insRule1");
        // hoverPair("listEntry_rule3","insRule3");
        // placeText({"divid":"continueButton","text":"Continue.","top":"950px","fontSize":"200%","color":"green","width":"380px","textAlign":"center","left":"450px","height":"50px","lineHeight":"50px","backgroundColor":"rgba(0,255,0,.1)"})
        // clickButton("once","continueButton",makeSelection,[["stage",5]]);

        var questionTitle="Quiz Question #17"
        var questionStatement="Given the above history, click on the rule that will be used to select the action in period 36."
        var nextStep=[["stage",1],["page","instructionsEditRuleSet"]];
        var correctDiv="quizRuleR4";
        placeText({"divid":"quizBackground","textAlign":"left","top":"500px","height":"425px","backgroundColor":"rgba(255,0,0,.1)","width":"1080px","left":"100px"});
        placeText({"parentDiv":"quizBackground","text":questionTitle,"color":"red","top":"00px","fontSize":"400%","textAlign":"center","height":"100px"});
        placeText({"parentDiv":"quizBackground","text":questionStatement,"top":"105px","fontSize":"300%","textAlign":"left","width":"880px","left":"50px","height":"55px"});

        placeText({"divid":"quizRuleFPR","top":"225px","width":"125px","left":"0px","height":"150px","backgroundColor":"rgba(255,0,0,0)"});
        placeText({"divid":"quizRuleDR","top":"225px","width":"125px","left":"125px","height":"150px","backgroundColor":"rgba(255,0,0,0)"});
        placeText({"divid":"quizRuleR1","top":"225px","width":"175px","left":"250px","height":"150px","backgroundColor":"rgba(255,0,0,0)"});
        placeText({"divid":"quizRuleR2","top":"225px","width":"175px","left":"425px","height":"150px","backgroundColor":"rgba(255,0,0,0)"});
        placeText({"divid":"quizRuleR3","top":"225px","width":"225px","left":"600px","height":"150px","backgroundColor":"rgba(255,0,0,0)"});
        placeText({"divid":"quizRuleR4","top":"225px","width":"225px","left":"825px","height":"150px","backgroundColor":"rgba(255,0,0,0)"});

        if(window.state['answer']=="correct"){
            placeText({"parentDiv":"quizBackground","text":"That is correct, click on the correct box again to continue.","color":"green","top":"250px","fontSize":"250%","textAlign":"left","width":"880px","left":"100px","height":"75px"});
            clickButton("once",correctDiv,makeSelection,nextStep);
            document.getElementById(correctDiv).style.border="5px solid rgba(0,255,0,1)";
        }
        else if(window.state['answer']=="incorrect"){
            placeText({"parentDiv":"quizBackground","text":"That is incorrect, click on the correct box to continue.","color":"red","top":"250px","fontSize":"300%","textAlign":"left","width":"880px","left":"100px","height":"75px"});
            clickButton("once",correctDiv,makeSelection,nextStep);
            document.getElementById(correctDiv).style.border="5px solid rgba(0,255,0,1)";
        }
        else{
            var qName="quizSelectRuleFromSet3"
            var thisColor="rgba(255,0,0,1)"
            instructionsHighlightListEntry("quizRuleFPR","rule_firstPeriod1",50,thisColor);
            instructionsHighlightListEntry("quizRuleDR","rule_default0",50,thisColor);
            instructionsHighlightListEntry("quizRuleR1","rule_rule1",100,thisColor);
            instructionsHighlightListEntry("quizRuleR2","rule_rule2",100,thisColor);
            instructionsHighlightListEntry("quizRuleR3","rule_rule3",150,thisColor);
            instructionsHighlightListEntry("quizRuleR4","rule_rule4",150,thisColor);
            var thisDiv="quizRuleFPR";
            clickButton("many",thisDiv,submitQuizAnswer,{"question":qName,"div":thisDiv},confirmation);
            var thisDiv="quizRuleDR";
            clickButton("many",thisDiv,submitQuizAnswer,{"question":qName,"div":thisDiv},confirmation);
            var thisDiv="quizRuleR1";
            clickButton("many",thisDiv,submitQuizAnswer,{"question":qName,"div":thisDiv},confirmation);
            var thisDiv="quizRuleR2";
            clickButton("many",thisDiv,submitQuizAnswer,{"question":qName,"div":thisDiv},confirmation);
            var thisDiv="quizRuleR3";
            clickButton("many",thisDiv,submitQuizAnswer,{"question":qName,"div":thisDiv},confirmation);
            var thisDiv="quizRuleR4";
            clickButton("many",thisDiv,submitQuizAnswer,{"question":qName,"div":thisDiv},confirmation);
        }

        drawQuizEarnings();

    }

}



///////////////////////////////NEW PAGE//////////////////////////////////////////////
///////////////////////////////NEW PAGE//////////////////////////////////////////////
///////////////////////////////NEW PAGE//////////////////////////////////////////////

function instructionsEditRuleSet(){
    clearAll();


    if(window.state['stage']>=1 && window.state['stage']<=4){ 

    placeText({"text":"Changing Set of Rules",
        "top":"0px",
        "fontSize":"300%",
        "color":"blue",
        "height":"100px"});

        var thisText="There are two ways to edit your rule set:";       
        placeText({"text":thisText,"top":"100px","fontSize":"300%","color":"black","width":"1080px","textAlign":"left","left":"50px","backgroundColor":"rgba(0,0,0,0)","height":"50px"}) 
    }

    if(window.state['stage']==1){ 
        placeText({"divid":"continueButton","text":"Continue.","top":"450px","fontSize":"200%","color":"green","width":"380px","textAlign":"center","left":"450px","height":"50px","lineHeight":"50px","backgroundColor":"rgba(0,255,0,.1)"})
        clickButton("once","continueButton",makeSelection,[["stage",2]]);
    }


    if(window.state['stage']>=2 && window.state['stage']<=4){ 
        var thisText="1. Add Rule"
        placeText({"divid":"addRuleDiv","text":thisText,"top":"175px","fontSize":"300%","color":"black","width":"450px","textAlign":"center","left":"190px","backgroundColor":"rgba(0,0,0,0)","height":"50px"}) 
        var thisText="2. Delete Rule"
        placeText({"divid":"deleteRuleDiv","text":thisText,"top":"175px","fontSize":"300%","color":"black","width":"450px","textAlign":"center","left":"640px","backgroundColor":"rgba(0,0,0,0)","height":"50px"}) 
    }


    if(window.state['stage']==2){ 
        placeText({"divid":"continueButton","text":"Continue.","top":"700px","fontSize":"200%","color":"green","width":"380px","textAlign":"center","left":"450px","height":"50px","lineHeight":"50px","backgroundColor":"rgba(0,255,0,.1)"})
        clickButton("once","continueButton",makeSelection,[["stage",3]]);
    }

    if(window.state['stage']==3){ 
        placeText({"top":"250px","width":"1180px","left":"50px","backgroundColor":"rgba(255,0,0,.1)","height":"475px"}) 

        document.getElementById("addRuleDiv").style.color="red";
        var thisText="To add a rule, you use the <a style='color:red'>rule constructor</a> (displayed below)."
        placeText({"text":thisText,"top":"275px","fontSize":"300%","color":"black","width":"1080px","textAlign":"left","left":"100px","backgroundColor":"rgba(0,0,0,0)","height":"50px"}) 

        var thisText="1. Click the + buttons to add more columns and the - button to subtract columns."
        placeText({"text":thisText,"top":"375px","fontSize":"200%","color":"black","width":"980px","textAlign":"left","left":"150px","backgroundColor":"rgba(0,0,0,0)","height":"50px"}) 

        var thisText="2. Click the boxes with a ?, W or Y to switch that action."
        placeText({"text":thisText,"top":"425px","fontSize":"200%","color":"black","width":"880px","textAlign":"left","left":"150px","backgroundColor":"rgba(0,0,0,0)","height":"50px"}) 

        var thisText="3. Once you have contructed a complete rule (with no ?s), an \"Add Rule\" button will appear."
        placeText({"text":thisText,"top":"475px","fontSize":"200%","color":"black","width":"1080px","textAlign":"left","left":"150px","backgroundColor":"rgba(0,0,0,0)","height":"50px"}) 

        var thisText="4. Click that button to add the rule to your rule set. (The button won't work right now though)"
        placeText({"text":thisText,"top":"525px","fontSize":"200%","color":"black","width":"1080px","textAlign":"left","left":"150px","backgroundColor":"rgba(0,0,0,0)","height":"50px"}) 

        var thisText="You can try it below for yourself:"
        placeText({"text":thisText,"top":"625px","fontSize":"300%","color":"black","width":"1080px","textAlign":"center","left":"100px","backgroundColor":"rgba(0,0,0,0)","height":"50px"}) 

        drawConstructor();
    }

    if(window.state['stage']==3){ 
        placeText({"divid":"continueButton","text":"Continue to see how to delete a rule.","top":"800px","fontSize":"200%","color":"green","width":"280px","textAlign":"center","left":"975px","padding":"25px","height":"150px","lineHeight":"50px","backgroundColor":"rgba(0,255,0,.1)"})
        clickButton("once","continueButton",makeSelection,[["stage",4]]);
    }


    if(window.state['stage']==4){ 
        placeText({"top":"250px","width":"1180px","left":"50px","backgroundColor":"rgba(255,0,0,.1)","height":"475px"}) 

        document.getElementById("addRuleDiv").style.color="black";
        document.getElementById("deleteRuleDiv").style.color="red";

        var thisText="To delete a rule, you can click the delete button next to the rule in the rule set. (try it below)"
        placeText({"text":thisText,"top":"275px","fontSize":"300%","color":"black","width":"1080px","textAlign":"left","left":"100px","backgroundColor":"rgba(0,0,0,0)","height":"50px"}) 

        createAndAddDiv("ruleListIn","mainDiv")
        document.getElementById("ruleListIn").style.backgroundColor="rgba(0,0,0,0)";
        drawListEntry(["rule3","Rule #3",[[1,0],[0,1],[0]],"",""]);
        document.getElementById("ruleListIn").style.left="1050px";
        document.getElementById("ruleListIn").style.top="650px";
        document.getElementById("ruleListIn").style.transform="scale(2)";
    }

    if(window.state['stage']==4){ 
        placeText({"divid":"continueButton","text":"Continue to Quiz Questions.","top":"800px","fontSize":"300%","color":"red","width":"680px","textAlign":"center","left":"300px","padding":"0px","height":"100px","lineHeight":"100px","backgroundColor":"rgba(255,0,0,.1)"})
        clickButton("once","continueButton",makeSelection,[["stage",5],["question","addRuleQuiz"],['answer',undefined]]);
    }


    if(window.state['stage']==5){ 
        window.state['match']=3;
        window.state["matchPayoff"]="Instructions";
        window.state["totalPayoff"]="Instructions";
        window.state['period']=1;
        window.state['history']=[]
        window.state['ruleInfo']=[
            ["firstPeriod1","First Period Rule",[[1]],"",""],
            ["default0","Default Rule",[[0]],"",""],
            ["rule1","Rule #1",[[0,1],[1]],"",""],
            ["rule2","Rule #2",[[1,0],[0]],"",""],
            ["rule3","Rule #3",[[0,1],[0,1],[0]],"",""],
        ]
        window.state['nextChoiceInfo']['number']="firstPeriod1";
        window.state['nextChoiceInfo']['length']=0;      
        window.state['nextChoiceInfo']['action']=1;  
        window.state['previousPayoffIndex']=0;

        drawRules();
        drawGame();
        drawConstructor();
        drawDefault();
        drawFirstPeriod();

        var questionName="quizRuleLength3";
        var questionTitle="Quiz Question #18:"
        var questionStatement="Add the following rule to the rule set:"
        var nextStep=[["stage","6"],["question","deleteRuleQuiz"],['answer',undefined]];
        placeText({"divid":"quizBackground","textAlign":"left","top":"0px","height":"225px","backgroundColor":"rgba(255,0,0,.1)","width":"1280px","left":"0px"});
        drawQuizEarnings();
        document.getElementById("quizEarningsInfo").style.top="150px";

        placeText({"parentDiv":"quizBackground","text":questionTitle,"color":"red","top":"25px","fontSize":"300%","textAlign":"left","height":"100px","left":"50px"});
        placeText({"parentDiv":"quizBackground","text":questionStatement,"top":"25px","fontSize":"300%","textAlign":"left","width":"1280px","left":"400px","height":"100px"});
        drawRule([[0,1],[1,1],[0,1],[0]],"quizRule1","quizBackground",0,0)
        document.getElementById("quizRule1").style.transform="translate3d(1050px,25px,0px) scale(1)";


        // placeText({"text":"Submit Rule As Answer","top":"974px","fontSize":"200%","textAlign":"center","width":"730px","left":"200px","height":"50px","backgroundColor":"white","border":"1px solid red"});

        var correctDiv="listEntry_rule4";

        if(window.state['answer']=="correct"){
            window.state['ruleInfo'].push(["rule4","Rule #4",[[0,1],[1,1],[0,1],[0]],"",""]);
            drawRules();
            document.getElementById(correctDiv).style.border="5px solid rgba(0,255,0,1)";
            placeText({"parentDiv":"quizBackground","text":"That is correct, click on the new rule to continue.","color":"green","top":"100px","fontSize":"300%","textAlign":"center","width":"1080px","left":"00px","height":"75px"});
            clickButton("once",correctDiv,makeSelection,nextStep);
        }
        else if(window.state['answer']=="incorrect"){
            window.state['ruleInfo'].push(["rule4","Rule #4",[[0,1],[1,1],[0,1],[0]],"",""]);
            drawRules();
            document.getElementById(correctDiv).style.border="5px solid rgba(0,255,0,1)";
            placeText({"parentDiv":"quizBackground","text":"That is incorrect, click on the new rule to continue.","color":"red","top":"100px","fontSize":"300%","textAlign":"center","width":"1080px","left":"00px","height":"75px"});
            clickButton("once",correctDiv,makeSelection,nextStep);
        }
    }



    if(window.state['stage']==6){ 
        window.state['match']=3;
        window.state["matchPayoff"]="Instructions";
        window.state["totalPayoff"]="Instructions";
        window.state['period']=1;
        window.state['history']=[]
        window.state['ruleInfo']=[
            ["firstPeriod1","First Period Rule",[[1]],"",""],
            ["default0","Default Rule",[[0]],"",""],
            ["rule1","Rule #1",[[0,1],[1]],"",""],
            ["rule2","Rule #2",[[1,0],[0]],"",""],
            ["rule3","Rule #3",[[0,1],[0,1],[0]],"",""],
        ]
        window.state['nextChoiceInfo']['number']="firstPeriod1";
        window.state['nextChoiceInfo']['length']=0;      
        window.state['nextChoiceInfo']['action']=1;  
        window.state['previousPayoffIndex']=0;

        drawRules();
        drawGame();
        drawConstructor();
        drawDefault();
        drawFirstPeriod();

        var questionName="quizRuleLength3";
        var questionTitle="Quiz Question #19:"
        var questionStatement="Delete the following rule from your set:"
        var nextStep=[["stage","7"],["question","firstPeriodRuleQuiz"],['answer',undefined]];
        placeText({"divid":"quizBackground","textAlign":"left","top":"0px","height":"225px","backgroundColor":"rgba(255,0,0,.1)","width":"1280px","left":"0px"});
        drawQuizEarnings();
        document.getElementById("quizEarningsInfo").style.top="150px";

        placeText({"parentDiv":"quizBackground","text":questionTitle,"color":"red","top":"25px","fontSize":"300%","textAlign":"left","height":"100px","left":"50px"});
        placeText({"parentDiv":"quizBackground","text":questionStatement,"top":"25px","fontSize":"300%","textAlign":"left","width":"1280px","left":"400px","height":"100px"});
        drawRule([[0,1],[1]],"quizRule1","quizBackground",0,0)
        document.getElementById("quizRule1").style.transform="translate3d(1100px,25px,0px) scale(1)";


        // placeText({"text":"Submit Rule As Answer","top":"974px","fontSize":"200%","textAlign":"center","width":"730px","left":"200px","height":"50px","backgroundColor":"white","border":"1px solid red"});

        var nextStep=[["stage",7],["question","setFirstPeriodQuiz"]];
        var correctDiv="listEntry_rule1";

        if(window.state['answer']=="correct"){
            document.getElementById(correctDiv).style.border="5px solid rgba(0,255,0,1)";
            placeText({"parentDiv":"quizBackground","text":"That is correct, click on the rule to continue.","color":"green","top":"100px","fontSize":"300%","textAlign":"center","width":"1080px","left":"00px","height":"75px"});
            clickButton("once",correctDiv,makeSelection,nextStep);
        }
        else if(window.state['answer']=="incorrect"){
            document.getElementById(correctDiv).style.border="5px solid rgba(0,255,0,1)";
            placeText({"parentDiv":"quizBackground","text":"That is incorrect, click on the rule to continue.","color":"red","top":"100px","fontSize":"300%","textAlign":"center","width":"1080px","left":"00px","height":"75px"});
            clickButton("once",correctDiv,makeSelection,nextStep);
        }
    }

    if(window.state['stage']==7){ 
        window.state['match']=3;
        window.state["matchPayoff"]="Instructions";
        window.state["totalPayoff"]="Instructions";
        window.state['period']=1;
        window.state['history']=[]
        window.state['ruleInfo']=[
            ["firstPeriod1","First Period Rule",[[1]],"",""],
            ["default0","Default Rule",[[0]],"",""],
            ["rule1","Rule #1",[[0,1],[1]],"",""],
            ["rule2","Rule #2",[[1,0],[0]],"",""],
            ["rule3","Rule #3",[[0,1],[0,1],[0]],"",""],
        ]
        window.state['nextChoiceInfo']['number']="firstPeriod1";
        window.state['nextChoiceInfo']['length']=0;      
        window.state['nextChoiceInfo']['action']=1;  
        window.state['previousPayoffIndex']=0;

        drawRules();
        drawGame();
        drawConstructor();
        drawDefault();
        drawFirstPeriod();

        var questionName="firstPeriodRuleQuiz";
        var questionTitle="Quiz Question #20:"
        var questionStatement="Set the first period rule to Y."
        placeText({"divid":"quizBackground","textAlign":"left","top":"0px","height":"225px","backgroundColor":"rgba(255,0,0,.1)","width":"1280px","left":"0px"});
        drawQuizEarnings();
        document.getElementById("quizEarningsInfo").style.top="150px";

        placeText({"parentDiv":"quizBackground","text":questionTitle,"color":"red","top":"25px","fontSize":"300%","textAlign":"left","height":"100px","left":"50px"});
        placeText({"parentDiv":"quizBackground","text":questionStatement,"top":"25px","fontSize":"300%","textAlign":"left","width":"1280px","left":"400px","height":"100px"});

        // placeText({"text":"Submit Rule As Answer","top":"974px","fontSize":"200%","textAlign":"center","width":"730px","left":"200px","height":"50px","backgroundColor":"white","border":"1px solid red"});

        var nextStep=[["page","finishQuiz"]];
        var correctDiv="chooseFirstPeriod1";

        if(window.state['answer']=="correct"){
            document.getElementById(correctDiv).style.border="5px solid rgba(0,255,0,1)";
            placeText({"parentDiv":"quizBackground","text":"That is correct, click on the correct box again to continue.","color":"green","top":"100px","fontSize":"300%","textAlign":"center","width":"1080px","left":"00px","height":"75px"});
            clickButton("once",correctDiv,makeSelection,nextStep);
        }
        else if(window.state['answer']=="incorrect"){
            document.getElementById(correctDiv).style.border="5px solid rgba(0,255,0,1)";
            placeText({"parentDiv":"quizBackground","text":"That is incorrect, click on the correct box to continue.","color":"red","top":"100px","fontSize":"300%","textAlign":"center","width":"1080px","left":"00px","height":"75px"});
            clickButton("once",correctDiv,makeSelection,nextStep);
        }
    }



    drawBackAndForwardButtons();




}


///////////////////////////////NEW PAGE//////////////////////////////////////////////
///////////////////////////////NEW PAGE//////////////////////////////////////////////
///////////////////////////////NEW PAGE//////////////////////////////////////////////

function finishQuiz(){
    clearAll();
    drawBackAndForwardButtons();
    placeText({"text":"You have finished the instructions and quiz.",
        "top":"100px",
        "fontSize":"300%",
        "color":"black",
        "width":"1280px",
        "backgroundColor":"rgba(0,0,0,0)",
        "height":"100px"});

    placeText({"text":"You earned \$5 on the quiz.",
        "top":"300px",
        "fontSize":"300%",
        "color":"green",
        "width":"1280px",
        "backgroundColor":"rgba(0,0,0,0)",
        "height":"100px"});

        // drawQuizEarnings();
        // // document.getElementById("quizEarningsInfo").style.fontSize="100%";
        // document.getElementById("quizEarningsInfo").style.transform="translate3d(0,-550px,0px)";

    placeText({"text":"While you wait for other subjects, you can do the following:",
        "top":"500px",
        "fontSize":"300%",
        "color":"black",
        "left":"100px",
        "width":"1080px",
        "textAlign":"left",
        "backgroundColor":"rgba(0,0,0,0)",
        "height":"50px"});

    placeText({"text":"1.  Press the back button and continue to review the instructions.",
        "top":"600px",
        "fontSize":"200%",
        "color":"black",
        "left":"200px",
        "width":"1080px",
        "textAlign":"left",
        "backgroundColor":"rgba(0,0,0,0)",
        "height":"50px"});

    placeText({"text":"2.  Press the continue button to test the experimental interface (you can still press the back button to see the instructions after this).",
        "top":"700px",
        "fontSize":"200%",
        "color":"black",
        "left":"200px",
        "width":"1080px",
        "textAlign":"left",
        "backgroundColor":"rgba(0,0,0,0)",
        "height":"50px"});

        placeText({"divid":"continueButton","text":"Test interface","top":"850px","fontSize":"300%","color":"green","width":"500px","textAlign":"center","left":"390px","height":"100px","lineHeight":"100px","backgroundColor":"rgba(0,255,0,.1)"})
        clickButton("once","continueButton",makeSelection,[["page","testInterface"]]);

}


///////////////////////////////NEW PAGE//////////////////////////////////////////////
///////////////////////////////NEW PAGE//////////////////////////////////////////////
///////////////////////////////NEW PAGE//////////////////////////////////////////////


function testInterface(){
    clearAll();
    window.state['match']=3;
    window.state["matchPayoff"]="Instructions";
    window.state["totalPayoff"]="Instructions";
    window.state['period']=36;

    window.state["payoffHistory"]=[[32,32],[25,25],[50,12],[25,25],[50,12],[25,25],[50,12],[25,25],[50,12],[25,25],[50,12],[25,25],[50,12],[25,25],[12,50],[32,32],[12,50],[25,25],[50,12],[50,12],[32,32],[50,12],[12,50],[50,12],[25,25],[32,32],[50,12],[50,12],[32,32],[32,32],[12,50],[25,25],[12,50],[50,12],[12,50]];
    window.state["history"]=[[0,0],[1,1],[1,0],[1,1],[1,0],[1,1],[1,0],[1,1],[1,0],[1,1],[1,0],[1,1],[1,0],[1,1],[0,1],[0,0],[0,1],[1,1],[1,0],[1,0],[0,0],[1,0],[0,1],[1,0],[1,1],[0,0],[1,0],[1,0],[0,0],[0,0],[0,1],[1,1],[0,1],[1,0],[0,1]];

    window.state['ruleInfo']=[
        ["firstPeriod1","First Period Rule",[[1]],"",""],
        ["default0","Default Rule",[[0]],"",""],
        ["rule1","Rule #1",[[0,1],[1]],"",""],
        ["rule2","Rule #2",[[1,0],[0]],"",""],
        ["rule3","Rule #3",[[1,0],[0,1],[0]],"",""],
    ]
    window.state['nextChoiceInfo']['number']="rule3";
    window.state['nextChoiceInfo']['length']=2;      
    window.state['nextChoiceInfo']['action']=0;  
    window.state['previousPayoffIndex']=0;

    drawHistory();  
    drawRules();
    drawNextAction();
    drawGame();
    drawHighlights();
    drawInfo();
    drawConstructor();
    drawFirstPeriod();
    drawDefault();
    drawBackAndForwardButtons();

}



///////////////////////////////NEW PAGE//////////////////////////////////////////////
///////////////////////////////NEW PAGE//////////////////////////////////////////////
///////////////////////////////NEW PAGE//////////////////////////////////////////////




function clickStatusBackButton(){
    var message={"type":"clickStatusBackButton"};
    sock.send(JSON.stringify(message));
}

function clickStatusForwardButton(){
    var message={"type":"clickStatusForwardButton"};
    sock.send(JSON.stringify(message));
}


function drawBackAndForwardButtons(){
    if(window.state['backButton']=="yes" || window.state['backButton']==undefined){
        placeText({"divid":"clickStatusBackButton","text":"Back","top":"974px","fontSize":"200%","color":"green","width":"100px","textAlign":"center","left":"0px","backgroundColor":"rgba(0,255,0,.1)","height":"50px"})
        clickButton("once","clickStatusBackButton",clickStatusBackButton);        
    }
    if(window.state['forwardButton']=="yes" || window.state['forwardButton']==undefined){
        placeText({"divid":"clickStatusForwardButton","text":"Forward","top":"974px","fontSize":"200%","color":"green","width":"100px","textAlign":"center","left":"1180px","backgroundColor":"rgba(0,255,0,.1)","height":"50px"})
        clickButton("once","clickStatusForwardButton",clickStatusForwardButton);
    }
}



function drawQuizEarnings(){
    if(window.state['quizInfo']==undefined){
        placeText({"divid":"quizEarningsInfo","text":"You have answered 0 questions incorrectly.  You can still miss 2 questions and receive the \$5 for the quiz.","color":"black","top":"850px","fontSize":"150%","textAlign":"center","width":"1000px","left":"140px","height":"75px"});
    }
    else{
        var correct=window.state['quizInfo'][1]+"/"+window.state['quizInfo'][2];
        var incorrect=window.state['quizInfo'][2]-window.state['quizInfo'][1];
        if(incorrect==0){
            placeText({"divid":"quizEarningsInfo",
                "backgroundColor":"rgba(220,255,220,1)",
                "text":"You have answered "+correct+" correctly.  You can still answer 2 questions incorrectly and receive the \$5 for the quiz.",
                "color":"green","top":"850px","fontSize":"150%","textAlign":"center","width":"1200px","left":"40px","height":"75px"});
        }
        else if(incorrect==1){
            placeText({"divid":"quizEarningsInfo",
                "backgroundColor":"rgba(220,255,220,1)",
                "text":"You have answered "+correct+" correctly.  To receive the \$5, you can only answer ONE MORE QUESTION INCORRECTLY.",
                "color":"red","top":"850px","fontSize":"150%","textAlign":"center","width":"1200px","left":"40px","height":"75px"});
        }
        else if(incorrect==2){
            placeText({"divid":"quizEarningsInfo",
                "backgroundColor":"rgba(255,220,220,1)",
                "text":"You have answered "+correct+" correctly.  YOU WILL NOT RECEIVE THE \$5 IF YOU INCORRECTLY ANSWER ANOTHER QUESTION.",
                "color":"red","top":"850px","fontSize":"150%","textAlign":"center","width":"1200px","left":"40px","height":"75px"});
        }
        else if(incorrect>2){
            placeText({"divid":"quizEarningsInfo",
                "backgroundColor":"rgba(255,220,220,1)",
                "text":"You have missed more than two questions so you earn \$0. The experiment will start automatically when everyone else has finished their quiz.",
                "color":"red","top":"850px","fontSize":"150%","textAlign":"center","width":"1200px","left":"40px","height":"75px"});
        }
    }
}



function hoverDiv2(div1,color){
    document.getElementById(div1).addEventListener("mouseover", function(){
        document.getElementById(div1).style.border="2px solid "+color;
        document.getElementById(div1).style.boxSizing = "border-box";
    });
    document.getElementById(div1).addEventListener("mouseout", function(){
        document.getElementById(div1).style.border="";
        document.getElementById(div1).style.boxSizing = "";
    });
}

function hoverPair(div1,div2){
        document.getElementById(div1).addEventListener("mouseover", function(){
            document.getElementById(div1).style.border="2px solid red";
            document.getElementById(div2).style.border="2px solid red";
        })
        document.getElementById(div1).addEventListener("mouseout", function(){
            document.getElementById(div1).style.border="";
            document.getElementById(div2).style.border="";
        })

        document.getElementById(div2).addEventListener("mouseover", function(){
            document.getElementById(div1).style.border="2px solid red";
            document.getElementById(div2).style.border="2px solid red";
        })

        document.getElementById(div2).addEventListener("mouseout", function(){
            document.getElementById(div1).style.border="";
            document.getElementById(div2).style.border="";
        })

}






















function highlightGameTableInstructionsQuiz(rowIN,colIN,continueFunctions){
    var thisStatus=window.state['answer'];
    if(thisStatus=="incorrect" || thisStatus=="correct"){
        for(row=0;row<5;row++){
            for(col=0;col<5;col++){
                document.getElementById("gameTable_"+row+"_"+col).style.backgroundColor="rgba(255,0,0,.1)";     
            }
        }            
        //continueFunctions=[["stage","6"],["question","quiz2"]]
        clickButton("once","gameTable_"+rowIN+"_"+colIN,makeSelection,continueFunctions);
        document.getElementById("gameTable_"+rowIN+"_"+colIN).style.backgroundColor="rgba(0,255,0,.1)";
    }
    else{
        for(row=0;row<5;row++){
            for(col=0;col<5;col++){
                var thisText=document.getElementById("gameTable_"+row+"_"+col).innerHTML;
                // document.getElementById("gameTable_"+row+"_"+col).style.backgroundColor="rgba(0,255,0,.1)";
                var confirmationStatement="Are you sure you want to submit '"+thisText+"' as your answer?";
                //continueFuctin="quiz3"
                clickButton("many","gameTable_"+row+"_"+col,submitQuizAnswer,{"question":continueFunctions,"row":row,"col":col},confirmationStatement);
            }
        }            
    }
}


function confirmAction(m){
  var confirmed = confirm(m);
  return confirmed;
}


function submitQuizAnswer(args){
    confirmationStatement=args[1];
    var confirmation=confirmAction(confirmationStatement);
    if(confirmation){
        var message={"type":"submitQuizAnswer","answer":args[0]};
        sock.send(JSON.stringify(message));
    }
}

function makeSelection(args){
    var message={"type":"setStatusElements","pairs":args[0]};
    sock.send(JSON.stringify(message));
}

function clickPayoffTableRow(args){
    var message={"type":"clickPayoffTableRow","row":args[0]};
    sock.send(JSON.stringify(message));
}


///////////////////////////////NEW PAGE//////////////////////////////////////////////
///////////////////////////////NEW PAGE//////////////////////////////////////////////
///////////////////////////////NEW PAGE//////////////////////////////////////////////



///////////////////////////////NEW PAGE//////////////////////////////////////////////
///////////////////////////////NEW PAGE//////////////////////////////////////////////
///////////////////////////////NEW PAGE//////////////////////////////////////////////



///////////////////////////////NEW PAGE//////////////////////////////////////////////
///////////////////////////////NEW PAGE//////////////////////////////////////////////
///////////////////////////////NEW PAGE//////////////////////////////////////////////



///////////////////////////////NEW PAGE//////////////////////////////////////////////
///////////////////////////////NEW PAGE//////////////////////////////////////////////
///////////////////////////////NEW PAGE//////////////////////////////////////////////



///////////////////////////////NEW PAGE//////////////////////////////////////////////
///////////////////////////////NEW PAGE//////////////////////////////////////////////
///////////////////////////////NEW PAGE//////////////////////////////////////////////



///////////////////////////////NEW PAGE//////////////////////////////////////////////
///////////////////////////////NEW PAGE//////////////////////////////////////////////
///////////////////////////////NEW PAGE//////////////////////////////////////////////



///////////////////////////////NEW PAGE//////////////////////////////////////////////
///////////////////////////////NEW PAGE//////////////////////////////////////////////
///////////////////////////////NEW PAGE//////////////////////////////////////////////



///////////////////////////////NEW PAGE//////////////////////////////////////////////
///////////////////////////////NEW PAGE//////////////////////////////////////////////
///////////////////////////////NEW PAGE//////////////////////////////////////////////







