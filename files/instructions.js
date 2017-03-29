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
    console.log("234234234");
    clearAll();
    drawBackAndForwardButtons();


        placeText({"text":"Experiment Overview",
            "top":"0px",
            "fontSize":"400%",
            "color":"blue",
            "height":"100px"});


    if(window.state['stage']>=1){
        placeText({"text":"You are about to participate in an <a style='color:red'>economics experiment</a>.",
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
        placeText({
            "text":"If you listen carefully, you could earn a large amount of money, that will be paid to you in cash, in private, at the end of the experiment.",
            "top":"200px",
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
            "top":"400px",
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
            "text":"During the experiment, do not talk, laugh or exclaim out loud and be sure to keep your eyes on your screen only",
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
        placeText({
            "text":"In addition, please <a style='color:black'>turn off your cell phones, etc.</a> and put them away during the experiment.",
            "top":"700px",
            "fontSize":"300%",
            "color":"black",
            "width":"1080px",
            "textAlign":"left",
            "left":"100px",
            "backgroundColor":"rgba(0,0,0,0)",
            "height":"50px"});
    }

    if(window.state['stage']>=6){
        placeText({
            "text":"Anybody that violates these rules will be asked to leave.",
            "top":"850px",
            "fontSize":"300%",
            "color":"black",
            "width":"1080px",
            "textAlign":"left",
            "left":"100px",
            "backgroundColor":"rgba(0,0,0,0)",
            "height":"50px"});
    }

    var buttonTops=[0,100,200,350,550,700,850,924];
    placeText({"divid":"continueButton","text":"Continue.","top":buttonTops[parseInt(window.state['stage'])+1]+"px","fontSize":"300%","color":"green","width":"680px","textAlign":"center","left":"300px","height":"100px","lineHeight":"100px","backgroundColor":"rgba(0,255,0,.1)"})
    if(window.state['stage']<=5){
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
        placeText({"text":"- Each question is worth $0.25.",
            "top":"175px",
            "fontSize":"200%",
            "color":"black",
            "width":"1280px",
            "textAlign":"left",
            "left":"200px",
            "backgroundColor":"rgba(0,0,0,0)",
            "height":"100px"});

        placeText({"text":"- You only get one chance to answer each question.",
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

        placeText({"text":"- The exchange rate today is: 1000 Francs = $1.00",
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
        placeText({"text":"The experiment today consists of <a style='color:red'>10 matches</a>.","top":"100px","fontSize":"300%","color":"black","width":"1280px","textAlign":"left","left":"100px","backgroundColor":"rgba(0,0,0,0)","height":"100px"});
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
        placeText({"text":"1. Each period a 100 sided dice containing each of the numbers 1 through 100 will be rolled.",
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

        placeText({"text":"4. Therefore, in every period, there is a 1 out of 100 chance that the match will end.",
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
        var thisNumber=Math.floor(Math.random()*100);
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
            document.getElementById("defaultOption").innerHTML="10";
            placeText({"parentDiv":"quizBackground",
                "text":"That is correct, the number of matches is 10.",
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
            document.getElementById("defaultOption").innerHTML="10";
            placeText({"parentDiv":"quizBackground",
                "text":"That is incorrect, the number of matches is 10.",
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
        var questionStatement="Suppose the match is in period 26, what is the chance that the match continues to a new period? (remember a 100 side dice is rolled every period)"
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
            document.getElementById("defaultOption").innerHTML="1 out of 100";
            placeText({"parentDiv":"quizBackground",
                "text":"That is correct, the chance of another period is 1 out of 100 in EVERY period.",
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
            document.getElementById("defaultOption").innerHTML="1 out of 100";
            placeText({"parentDiv":"quizBackground",
                "text":"That is incorrect, the chance of another period is 1 out of 100 in EVERY period.",
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
                document.getElementById("option"+k).innerHTML=k+" out of 100";
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
            document.getElementById('listRuleHighlight2').style.transform="translate3d("+(1900-ruleLength)+"px,25px,0px)";
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
        document.getElementById('instructionsHistoryHighlight').style.transform="translate3d("+(1900-ruleLength)+"px,25px,0px)";
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
        document.getElementById("testRule").style.transform="translate3d(225px,350px,0px) scale(2)";
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
        document.getElementById("testRule2").style.transform="translate3d(865px,350px,0px) scale(2)";
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
        document.getElementById("fits1").style.transform="translate3d(50px,350px,0px)";
        instructionsHighlightListener("fits1",100,correctColor);


        drawRule([[0,1],[1]],"fits2","mainDiv",0,0)
        document.getElementById("fits2").style.fontSize="100%";
        document.getElementById("fits2").style.transform="translate3d(200px,350px,0px)";
        instructionsHighlightListener("fits2",100,correctColor);

        drawRule([[0,0],[0,1],[0]],"fits3","mainDiv",0,0)
        document.getElementById("fits3").style.fontSize="100%";
        document.getElementById("fits3").style.transform="translate3d(350px,350px,0px)";
        instructionsHighlightListener("fits3",150,correctColor);


        drawRule([[0,0],[0,1],[1]],"fits4","mainDiv",0,0)
        document.getElementById("fits4").style.fontSize="100%";
        document.getElementById("fits4").style.transform="translate3d(50px,475px,0px)";
        instructionsHighlightListener("fits4",150,correctColor);

        drawRule([[1,1],[0,0],[0,1],[0]],"fits5","mainDiv",0,0)
        document.getElementById("fits5").style.fontSize="100%";
        document.getElementById("fits5").style.transform="translate3d(250px,475px,0px)";
        instructionsHighlightListener("fits5",200,correctColor);

        drawRule([[0,0],[0,1],[0,0],[1,0],[1,1],[0,0],[0,1],[1]],"fits6","mainDiv",0,0)
        document.getElementById("fits6").style.fontSize="100%";
        document.getElementById("fits6").style.transform="translate3d(50px,600px,0px)";
        instructionsHighlightListener("fits6",400,correctColor);


        placeText({"divid":"div312","text":"Some rules that DO NOT fit the history:","top":"400px","fontSize":"200%","color":"black","width":"640px","textAlign":"center","left":"640px","backgroundColor":"rgba(0,0,0,0)","height":"100px"})
        placeText({"divid":"div3121","text":"(Hover over rules for more info):","top":"450px","fontSize":"100%","color":"black","width":"640px","textAlign":"center","left":"640px","backgroundColor":"rgba(0,0,0,0)","height":"50px"})

        var incorrectColor="blue";


        drawRule([[0,0],[1]],"fits11","mainDiv",0,0)
        document.getElementById("fits11").style.fontSize="100%";
        document.getElementById("fits11").style.transform="translate3d(690px,350px,0px)";
        instructionsHighlightListener("fits11",100,incorrectColor);


        drawRule([[1,0],[0]],"fits12","mainDiv",0,0)
        document.getElementById("fits12").style.fontSize="100%";
        document.getElementById("fits12").style.transform="translate3d(840px,350px,0px)";
        instructionsHighlightListener("fits12",100,incorrectColor);

        drawRule([[0,0],[1,0],[1]],"fits13","mainDiv",0,0)
        document.getElementById("fits13").style.fontSize="100%";
        document.getElementById("fits13").style.transform="translate3d(990px,350px,0px)";
        instructionsHighlightListener("fits13",150,incorrectColor);

        drawRule([[1,0],[0,1],[0]],"fits14","mainDiv",0,0)
        document.getElementById("fits14").style.fontSize="100%";
        document.getElementById("fits14").style.transform="translate3d(690px,475px,0px)";
        instructionsHighlightListener("fits14",150,incorrectColor);

        drawRule([[1,0],[0,0],[0,1],[1]],"fits15","mainDiv",0,0)
        document.getElementById("fits15").style.fontSize="100%";
        document.getElementById("fits15").style.transform="translate3d(890px,475px,0px)";
        instructionsHighlightListener("fits15",200,incorrectColor);

        drawRule([[0,0],[1,1],[0,0],[1,0],[1,1],[0,0],[0,1],[0]],"fits16","mainDiv",0,0)
        document.getElementById("fits16").style.fontSize="100%";
        document.getElementById("fits16").style.transform="translate3d(690px,600px,0px)";
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
        document.getElementById("quizRule1").style.transform="translate3d(190px,475px,0px)";

        drawRule([[0,1],[0,1],[1,0],[0,1],[1]],"quizRule2","mainDiv",0,0)
        document.getElementById("quizRule2").style.fontSize="100%";
        document.getElementById("quizRule2").style.transform="translate3d(500px,475px,0px)";

        drawRule([[0,0],[1,0],[0,1],[0,1],[0]],"quizRule3","mainDiv",0,0)
        document.getElementById("quizRule3").style.fontSize="100%";
        document.getElementById("quizRule3").style.transform="translate3d(810px,475px,0px)";


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
            hoverDiv("quizNone","black");
            hoverDiv("quizMultiple","black");

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
        document.getElementById("quizRule1").style.transform="translate3d(290px,475px,0px)";

        drawRule([[0,0],[0,1],[0]],"quizRule2","mainDiv",0,0)
        document.getElementById("quizRule2").style.fontSize="100%";
        document.getElementById("quizRule2").style.transform="translate3d(600px,475px,0px)";

        drawRule([[0,0],[0,1],[1,1],[0,1],[0]],"quizRule3","mainDiv",0,0)
        document.getElementById("quizRule3").style.fontSize="100%";
        document.getElementById("quizRule3").style.transform="translate3d(810px,475px,0px)";



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
            hoverDiv("quizNone","black");
            hoverDiv("quizMultiple","black");

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
        document.getElementById("quizRule1").style.transform="translate3d(240px,475px,0px)";

        drawRule([[1,0],[1,0],[0,1],[0]],"quizRule2","mainDiv",0,0)
        document.getElementById("quizRule2").style.fontSize="100%";
        document.getElementById("quizRule2").style.transform="translate3d(550px,475px,0px)";

        drawRule([[0,1],[0,1],[0,0],[1,1],[0]],"quizRule3","mainDiv",0,0)
        document.getElementById("quizRule3").style.fontSize="100%";
        document.getElementById("quizRule3").style.transform="translate3d(810px,475px,0px)";



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
            hoverDiv("quizNone","black");
            hoverDiv("quizMultiple","black");

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

        window.state["payoffHistory"]=[[38,38],[25,25],[50,12],[25,25],[50,12],[25,25],[50,12],[25,25],[50,12],[25,25],[50,12],[25,25],[50,12],[25,25],[12,50],[38,38],[12,50],[25,25],[50,12],[50,12],[38,38],[50,12],[12,50],[50,12],[25,25],[38,38],[50,12],[50,12],[38,38],[38,38],[12,50],[25,25],[12,50],[50,12],[12,50]];
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

        window.state["payoffHistory"]=[[38,38],[25,25],[50,12],[12,50],[50,12],[38,38],[50,12],[25,25],[50,12]];//,[25,25],[50,12],[25,25],[50,12],[25,25],[12,50],[38,38],[12,50],[25,25],[50,12],[50,12],[38,38],[50,12],[12,50],[50,12],[25,25],[38,38],[50,12],[50,12],[38,38],[38,38],[12,50],[25,25],[12,50],[50,12],[12,50]];
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

        window.state["payoffHistory"]=[[38,38],[25,25],[50,12],[12,50],[50,12],[38,38],[50,12],[25,25],[50,12],[25,25],[50,12],[25,25],[50,12],[25,25],[12,50],[38,38],[12,50],[25,25],[50,12],[50,12],[38,38],[50,12],[12,50],[50,12],[25,25],[38,38],[50,12],[50,12],[38,38],[38,38],[12,50],[25,25],[12,50],[50,12],[12,50]];
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

        window.state["payoffHistory"]=[[38,38],[25,25],[50,12],[25,25],[50,12],[25,25],[50,12],[25,25],[50,12],[25,25],[50,12],[25,25],[50,12],[25,25],[12,50],[38,38],[12,50],[25,25],[50,12],[50,12],[38,38],[50,12],[12,50],[50,12],[25,25],[38,38],[50,12],[50,12],[38,38],[25,38],[12,50],[38,25],[50,50],[12,12],[50,12]];
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
            // hoverDiv("quizRuleFPR","black");
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


    }

    if(window.state['stage']==9){
        window.state['match']=3;
        window.state["matchPayoff"]="Instructions";
        window.state["totalPayoff"]="Instructions";
        window.state['period']=36;

        window.state["payoffHistory"]=[[38,38],[25,25],[50,12],[25,25],[50,12],[25,25],[50,12],[25,25],[50,12],[25,25],[50,12],[25,25],[50,12],[25,25],[12,50],[38,38],[12,50],[25,25],[50,12],[50,12],[38,38],[50,12],[12,50],[50,12],[25,25],[38,38],[50,12],[50,12],[38,38],[38,38],[12,50],[25,25],[38,50],[25,12],[38,50]];
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


    }

    if(window.state['stage']==10){
        window.state['match']=3;
        window.state["matchPayoff"]="Instructions";
        window.state["totalPayoff"]="Instructions";
        window.state['period']=36;

        window.state["payoffHistory"]=[[38,38],[25,25],[50,12],[25,25],[50,12],[25,25],[50,12],[25,25],[50,12],[25,25],[50,12],[25,25],[50,12],[25,25],[12,50],[38,38],[12,50],[25,25],[50,12],[50,12],[38,38],[50,12],[12,50],[50,12],[25,25],[38,38],[50,12],[50,12],[38,38],[38,38],[12,50],[25,25],[12,50],[50,12],[50,50]];
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

        createAndAddDiv("ruleList","mainDiv")
        document.getElementById("ruleList").style.backgroundColor="rgba(0,0,0,0)";
        drawListEntry(["rule3","Rule #3",[[1,0],[0,1],[0]],"",""]);
        document.getElementById("ruleList").style.left="1050px";
        document.getElementById("ruleList").style.top="650px";
        document.getElementById("ruleList").style.transform="scale(2)";
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

        drawQuizEarnings();
        document.getElementById("quizEarningsInfo").style.fontSize="300%";
        document.getElementById("quizEarningsInfo").style.transform="translate3d(0,-550px,0px)";

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

    window.state["payoffHistory"]=[[38,38],[25,25],[50,12],[25,25],[50,12],[25,25],[50,12],[25,25],[50,12],[25,25],[50,12],[25,25],[50,12],[25,25],[12,50],[38,38],[12,50],[25,25],[50,12],[50,12],[38,38],[50,12],[12,50],[50,12],[25,25],[38,38],[50,12],[50,12],[38,38],[38,38],[12,50],[25,25],[12,50],[50,12],[12,50]];
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
        placeText({"divid":"quizEarningsInfo","text":"Quiz Earnings: $0.00 (Answered 0 out of 0 correctly)","color":"black","top":"850px","fontSize":"150%","textAlign":"center","width":"1000px","left":"140px","height":"75px"});
    }
    else{
        placeText({"divid":"quizEarningsInfo","text":"Quiz Earnings: $"+window.state['quizInfo'][0]+" (Answered "+window.state['quizInfo'][1]+" out of "+window.state['quizInfo'][2]+" correctly)","color":"black","top":"850px","fontSize":"150%","textAlign":"center","width":"1000px","left":"140px","height":"75px"});            
    }
}



function hoverDiv(div1,color){
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






