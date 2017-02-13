from __future__ import print_function
import sys
import time
import json
import random
import math
from operator import itemgetter
import copy 

from twisted.internet import reactor
from twisted.internet import task
import pickle


class fakeClient():
   def __init__(self,sid):
      self.peer="1.1.1.1"
      self.subjectID=sid

class experimentClass():
   def __init__(self):
      self.setParameters()
      self.data['matchType']="regular"
      self.monitorTaskList=['loadInstructions','startQuiz','startExperiment']

   # - store data in self.data[subjectID] which is a Subject object (defined below)
   # - send messages like self.customMessage(subjectID,msg)
   # - list of all subjects at self.data['subjectIDs']
  

   def setParameters(self):
      self.nonPickleData={}
      print("setPreliminaries")
      self.data['defaultOnlyMatches']=-10

      self.data['totalMatches']=5
      self.data['exchangeRate']=float(1)/1250
      self.data['showPayoffTime']=60
      self.data['postMatchTime']=10


      self.data['preStageLengths']=[60,60,120,120,120,120,120,120,120,120,120]
      self.data['periodsPerMatch']=[20,22, 6, 6, 45, 16, 3, 24, 18, 12, 48]

      #testing
      self.data['showPayoffTime']=3
      self.data['totalMatches']=10#not including practice
      self.data['preStageLengths']=[20,10,60,60,60,60,60,60,60,60,60,60]
      self.data['periodsPerMatch']=[30]+[46, 36, 52, 85, 60, 7, 68, 41, 44, 42]
      self.data['periodsPerMatch']=[30]+[4, 36, 52, 85, 60, 7, 68, 41, 44, 42]


      self.data['currentMatch']=0

      #payoffs
      self.data['matchType']="regular"
      self.data['choices']=["W","Y"]
      # self.data['payoffs']=[[3,3],[1,5],[4,1],[2,2]]
      # self.data['payoffs']=[[1,5],[2,6],[3,7],[4,8]]
      # self.data['payoffs']=[[48,48],[12,50],[50,12],[25,25]]
      self.data['payoffs']=[[38,38],[12,50],[50,12],[25,25]]



   def reversePays(self,p):
      paysOut=[[p[0][1],p[0][0]],[p[2][1],p[2][0]],[p[1][1],p[1][0]],[p[3][1],p[3][0]]]
      return paysOut

   def endTrial(self,message,client):
      self.taskDone(message)
      for sid in self.data['subjectIDs']:
         self.data[sid].lastRule=-1
         self.data[sid].lockCosts=0
         self.data[sid].resetAllRules()
         self.data[sid].status={"page":"generic","message":["Next there will be a quiz.<br>  You will get $10 if you answer all questions correctly.<br> You will earn $0 if you answer one question incorrectly."],"stage":"initializing"}
         #self.data[sid].status[0]=0
         self.updateStatus(sid)


   def setPairs(self,theseSubjects):
      random.shuffle(theseSubjects)
      for k in range(len(theseSubjects)/2):
         sub1=theseSubjects[2*k+0]
         sub2=theseSubjects[2*k+1]

         self.data[sub1].partners[self.data['currentMatch']]=sub2
         self.data[sub1].roles[self.data['currentMatch']]=0
         self.data[sub1].gameTable[self.data['currentMatch']]=self.data['payoffs']

         self.data[sub2].partners[self.data['currentMatch']]=sub1
         self.data[sub2].roles[self.data['currentMatch']]=1
         self.data[sub2].gameTable[self.data['currentMatch']]=self.reversePays(self.data['payoffs'])


   def notAcceptingClientsAnymore(self):
      for sid in self.data['subjectIDs']:
         self.data[sid].status['payoffs']=self.data['payoffs']
         self.data[sid].status['choices']=self.data['choices']
      self.setMatchingsByQuiz()
   def setMatchingsByQuiz(self):
      goodQuiz=[]
      badQuiz=[]
      for sid in self.data['subjectIDs']:
         if self.data[sid].quizEarnings>-100:
            goodQuiz.append(sid)
         else:
            badQuiz.append(sid)

      if len(badQuiz)%2==0:#Even number of bad quiz folks
         "do nothing"
      else:
         random.shuffle(goodQuiz)
         thisSID=goodQuiz.pop()
         badQuiz.append(thisSID)

      self.data['groups']={}
      self.data['groups'][0]=goodQuiz
      self.data['groups'][1]=badQuiz


      for sid in self.data['groups'][0]:
         self.data[sid].group="high"
         self.data[sid].timePerQuestion=60
         self.data[sid].timeUntilWarning=5
      for sid in self.data['groups'][1]:
         self.data[sid].group="low"
         self.data[sid].timePerQuestion=4
         self.data[sid].timeUntilWarning=1
      print("matching set!!!!!!!")


   def makeMatching(self):
      print("makeMatching")
      if self.data['matchType']=="trial":
         #trail - creat Dummy clients
         for sid in self.data['subjectIDs']:
            self.data[sid].partners[self.data['currentMatch']]='randomPlayer'
            self.data[sid].roles[self.data['currentMatch']]=0
            self.data[sid].gameTable[self.data['currentMatch']]=self.data['payoffs']
      elif self.data['matchType']=="regularDemo":
         #trail - creat Dummy clients
         for sid in self.data['subjectIDs']:
            self.data[sid].partners[self.data['currentMatch']]='randomPlayer'
      elif self.data['matchType']=="regular":
         for group in self.data['groups']:
            if len(self.data['groups'][group])>0:
               self.setPairs(self.data['groups'][group])
   

   def makeMyChoice(self,subjectID):
      history=self.getClientHistory(subjectID)
      ruleOut=self.data[subjectID].pickRule("regular",history)
      if len(history)==0:
         thisPlay=self.data[subjectID].firstPeriodRules[-1][0]
         ruleOut=Rule([[thisPlay]],-1)
      return ruleOut




   def gameOver(self):
      for sid in self.data['subjectIDs']:
         totalPay=(self.data[sid].totalPayoffs[0]-self.data[sid].lockCosts)*self.data['exchangeRate']+self.data[sid].quizEarnings
         self.data[sid].status={"page":"generic","message":["ID:"+sid,"<br>Game Pay: %.02f"%((self.data[sid].totalPayoffs[0]-self.data[sid].lockCosts)*self.data['exchangeRate']),"<br>Quiz Pay: %.02f"%(self.data[sid].quizEarnings),"<br>Total Pay: %.02f"%(totalPay)]}
         self.updateStatus(sid)


   def startExperiment(self,message,client):
      self.taskDone(message)
      self.showPayoffs()

   def showPayoffs(self):
      self.initializeTimer("all",self.data['showPayoffTime'],self.startPreMatch)
      # #self.initializeTimer(sid,5,self.pleaseMakeChoice,sid)
      for sid in self.data['subjectIDs']:
         self.data[sid].status["page"]="payoffsOnly"
         self.updateStatus(sid)

   # def setFirstPeriodPage(self):
   #    self.initializeTimer("all",30,self.startMatch)
   #    self.data['currentMatch']=0
   #    for sid in self.data['subjectIDs']:
   #       self.data[sid].newMatch(self.data['currentMatch'])
   #       self.data[sid].status["page"]="setFirstPeriodRulePage"
   #       self.updateStatus(sid)


   def startPreMatch(self):
      self.data['currentMatch']=self.data['currentMatch']+1
      if self.data['currentMatch']>self.data['totalMatches']:
         self.gameOver()#game over
      else:
         self.initializeTimer("all",self.data['preStageLengths'][self.data['currentMatch']],self.startMatch)
         self.makeMatching()
         for sid in self.data['subjectIDs']:
            self.data[sid].newMatch(self.data['currentMatch'])
            if len(self.data[sid].rules['current']['firstPeriod'])==0:
               self.data[sid].status['page']="setFirstPeriodRulePage"
               self.updateStatus(sid)      
            else:
               self.data[sid].status['page']="preMatch"
               self.updateRules(sid)      

   def checkToSeeIfAllDefaultsHaveBeenSet(self):
      allDefaultRulesSet=1
      for sid in self.data['subjectIDs']:
         if len(self.data[sid].rules['current']['firstPeriod'])==0 or len(self.data[sid].rules['current']['default'])==0:
            allDefaultRulesSet=0
      if allDefaultRulesSet==0:
         print("not all default Rules Set")
         self.initializeTimer("all",10,self.startMatch)
         for sid in self.data['subjectIDs']:
            self.updateStatus(sid)      
         # self.nextPeriodCall=reactor.callLater(2,self.startMatch)
         return False
      else:
         return True

   def startMatch(self):
      if self.checkToSeeIfAllDefaultsHaveBeenSet():
         self.data['startTime']=time.time()
         for sid in self.data['subjectIDs']:
            self.data[sid].status['page']="game"
            self.data[sid].matchRunning=1
            self.data[sid].currentPeriod=1
            self.initializePeriodTimer(sid)
            self.updateRules(sid)
            # self.sendChoices(sid,'regular')
            #self.data[sid].freeLock=1
            #self.unlockRules({},self.clientsById[sid])
            #self.sendChoices(sid,'regular')



   def initializePeriodTimer(self,sid):
      warningTime=self.data[sid].timeUntilWarning
      self.initializeTimer(sid,warningTime,self.showWarning,sid)
      self.data[sid].status['warning']="no"
      self.updateStatus(sid)

   def showWarning(self,sid):
      remainingTime=self.data[sid].timePerQuestion-self.data[sid].timeUntilWarning
      self.initializeTimer(sid,remainingTime,self.confirmChoiceFromPython,sid)
      self.data[sid].status['warning']="yes"
      self.updateStatus(sid)


   def getClientHistory(self,subjectID):
      myHistory=self.data[subjectID].history[self.data['currentMatch']]
      theirHistory=self.data[subjectID].opponentHistory[self.data['currentMatch']]
      history=[]
      for a,b in zip(myHistory,theirHistory):
         history.append([a,b])
      return history
   
   def getClientPayoffHistory(self,subjectID):
      myHistory=self.data[subjectID].history[self.data['currentMatch']]
      theirHistory=self.data[subjectID].opponentHistory[self.data['currentMatch']]
      history=[]
      for a,b in zip(myHistory,theirHistory):
         index=2*a+b
         thisPayoff=self.data[subjectID].gameTable[self.data['currentMatch']][index]
         history.append(thisPayoff)
      return history

   def confirmedMatchOver(self,message,client):
      print("confirmed Match Over")
      subjectID=client.subjectID
      self.data[subjectID].matchRunning=0
      moveToNextMatch=1
      for sid in self.data['subjectIDs']:
         if self.data[sid].matchRunning==1:
            moveToNextMatch=0
      if moveToNextMatch==1:
         if self.data['matchType']=="trial":
            msg={}
            msg['type']='endTrial'
            msg['title']='End Trial'
            msg['status']=''
            taskList.append(msg)
            self.endTrial(message,client)
         else:
            self.startPreMatch()


   def confirmChoiceFromPython(self,sid):
      self.data[sid].status['warning']="no"
      self.cancelTimerFunction(sid)
      self.data[sid].getLastPlayInfo()
      self.updateStatus(sid)
      self.checkPartner(sid)

   def confirmChoice(self,message,client):
      #print "Confi Choice",client.subjectID
      sid=client.subjectID
      self.confirmChoiceFromPython(sid)

   def checkPartner(self,subjectID):
      myPartner=self.data[subjectID].partners[self.data['currentMatch']]
      if myPartner=="randomPlayer":
         self.finishPeriod(subjectID)
      else:
         if self.data[myPartner].status['confirmed']=="yes":
            self.finishPeriod(subjectID)
            self.finishPeriod(myPartner)
         else:
            "sdf"
            #send message to confirm that you are waiting now.

   def finishPeriod(self,subjectID):
      #Get opponents choices and payoffs
      subject1=subjectID
      subject2=self.data[subjectID].partners[self.data['currentMatch']]

      self.data[subject1].currentPeriod+=1

      choice1=self.data[subject1].history[self.data['currentMatch']][-1]

      if subject2=="randomPlayer":
         choice2=random.choice([0,1])
      else:
         choice2=self.data[subject2].history[self.data['currentMatch']][-1]

      self.data[subject1].opponentHistory[self.data['currentMatch']].append(choice2)
      index1=2*choice1+choice2
      payoff1=self.data[subject1].gameTable[self.data['currentMatch']][index1][0]
      payoff2=self.data[subject1].gameTable[self.data['currentMatch']][index1][1]

      if self.data['matchType']=="regular" or self.data['matchType']=="regularDemo":
         self.data[subject1].matchPayoffs[self.data['currentMatch']][0]+=payoff1
         self.data[subject1].matchPayoffs[self.data['currentMatch']][1]+=payoff2
         self.data[subject1].totalPayoffs+=payoff1

      self.data[subject1].actionProfileFrequencies[self.data['currentMatch']][index1]+=1
      self.data[subject1].status['previousPayoffIndex']=index1

      if self.data[subject1].currentPeriod<=self.data['periodsPerMatch'][self.data['currentMatch']]:
         #start next period
         self.data[subject1].status["confirmed"]="no"
         self.initializePeriodTimer(subject1)
         self.data[subject1].status["animate"]="yes"
         self.updateRules(subject1)
         self.data[subject1].status["animate"]="no"
      else:
         #end of match
         self.data[subject1].status["page"]="postMatch"
         self.data[subject1].status["stage"]="wait"
         self.data[subject1].status["animate"]="yes"
         self.updateRules(subject1)
         self.data[subject1].status["animate"]="no"

         #check if everyone is done
         allDone=1
         for sid in self.data['subjectIDs']:
            if self.data[sid].status["page"]!="postMatch":
               allDone=0
         if allDone==1:
            self.initializeTimer("all",self.data['postMatchTime'],self.startPreMatch)
            for sid in self.data['subjectIDs']:
               self.data[sid].status["stage"]="timer"
               self.updateStatus(sid)

      self.monitorMessage()

   def sendChoices(self,sid,sendType):     
      msg={}
      msg['type']="newHistory"
      thisHistory=self.getClientHistory(sid)
      thisPayoffHistory=self.getClientPayoffHistory(sid)
      msg['history']=thisHistory[-25:]
      msg['payoffHistory']=thisPayoffHistory[-25:]
      myRule=self.makeMyChoice(sid)
      msg['nextPeriodPlay']=myRule.output
      msg['period']=len(thisHistory)
      msg['lastPlay']=self.data[sid].lastPlay
      msg['matchPayoff']=self.data[sid].matchPayoffs[self.data['currentMatch']]
      msg['unlockCosts']=self.data[sid].lockCosts
      msg['totalPayoff']=self.data[sid].totalPayoffs[0]
      msg['lockCosts']=self.data[sid].lockCosts
      msg['actionProfileFrequencies']=self.data[sid].actionProfileFrequencies[self.data['currentMatch']]
      msg['lastRule']=self.data[sid].lastRule
      msg['lastRuleLength']=self.data[sid].lastRuleLength
      self.customMessage(sid,msg)
      self.updateRules(sid,"onlyStats","regular")



   def startTrial(self,message,client):
      self.data['monitorTasks'][message['index']]['status']='Done'
      self.monitorMessage()
      self.data['matchType']="trial"
      self.data['choices']=["W","Y"]
      self.data['payoffs']=[[0,0],[0,0],[0,0],[0,0]]
      #self.preMatch()
      self.startPreMatch()





   def tester(self):
      msg={}
      for sid in self.data['subjectIDs']:
         thisClient=self.clientsById[sid]
         msg['thisRule']=['firstPeriod',0]
         self.setRulesBeginning(msg,thisClient)
         msg['thisRule']=['default',0]
         self.setRulesBeginning(msg,thisClient)
         #self.setFirstPeriod(msg,thisClient)


   def startNewGame(self,message,client):
      #unregister all clients
      self.setPreliminaries()


   def reconnectServer(self):
      if self.data['serverPage']=="quiz":
         startQuiz(self,"message","client",restart=1)

   def finishQuiz(self,message,client):
      self.taskDone(message)
      self.setMatchingsByQuiz()
      for sid in self.data['subjectIDs']:
         if self.data[sid].group=="high":
            self.data[sid].status={"page":"generic","message":["There are %s participants in your group (including yourself).<br> Everyone in your group earned $10.00 on the quiz."%(len(self.data['groups'][0]))]}
         else:
            self.data[sid].status={"page":"generic","message":["There are %s participants in your group (including yourself)."%(len(self.data['groups'][1]))]}
         self.updateStatus(sid)



   def startQuizOLD(self,message,client):
      self.data['serverPage']="quiz"
      self.taskDone(message)
      for sid in self.data['subjectIDs']:
         self.data[sid].resetAllRules()
      self.data['quizStartTime']=time.time()
      self.data['payoffs']=[[8,7],[6,5],[4,3],[2,1]]
      self.data['choices']=["W","Y"]
      for sid in self.data['subjectIDs']:
         #[quizNow,QuestionNumber,0 question and 1 solution,tryNumber]
         # if restart==0:
         self.data[sid].status={"page":"quiz","questionNumber":1,"stage":"question","tries":0}
         self.sendQuizQuestion(sid)


   def checkAnswer(self,thisProb,thisProbType,thisAnswer):
      out="incorrect"
      if thisProbType!=3:#Action
         if thisAnswer==self.data['quizQuestions']['questions'][thisProb-1]['answer']:
            out="correct"
      elif thisProbType==3:#Add
         messageIndex=thisProb-1
         thisMessage=self.data['quizQuestions']['questions'][messageIndex]
         if thisAnswer in self.data['quizQuestions']['questions'][thisProb-1]['answer']:
            out="correct"
      return out

   def nextQuestion(self,message,client):
      subjectID=client.subjectID
      currentQuestion=self.data[subjectID].status['questionNumber']+1
      if currentQuestion>10:#10:#Number of quiz problems
         if self.data[subjectID].quizEarnings>0:
            self.data[subjectID].quizEarnings=10
         self.data[subjectID].status={"page":"quizSummary","summary":"$%.02f"%(self.data[subjectID].quizEarnings)}
         self.updateStatus(subjectID)
      else:
         self.data[subjectID].status={"page":"quiz","questionNumber":currentQuestion,"stage":"question","tries":0}
         self.sendQuizQuestion(subjectID)
   def tryAgain(self,message,client):
      subjectID=client.subjectID
      self.data[subjectID].status["stage"]="question"
      self.data[subjectID].status["tries"]=self.data[subjectID].status["tries"]+1
      self.sendQuizQuestion(subjectID)


   def getQuizProblem(self,message,client):
      subjectID=client.subjectID
      self.sendQuizQuestion(subjectID)


   def sendQuizQuestion(self,subjectID):
      self.monitorMessage()
      msg=self.data['quizQuestions']['questions'][self.data[subjectID].status['questionNumber']-1]
      msg['tries']=self.data[subjectID].status['tries']+1
      if self.data[subjectID].status['tries']==0:
         msg['price']="$0.50"
      elif self.data[subjectID].status['tries']==1:
         msg['price']="$0.25"
      else:
         msg['price']="$0.00"
      msg['quizEarnings']="$%.02f"%(self.data[subjectID].quizEarnings)
      self.customMessage(subjectID,msg)


   def quizAnswer(self,message,client):
      subjectID=client.subjectID
      thisProb=self.data[subjectID].status['questionNumber']
      thisProbType=message['questionType']
      thisAnswer=message['answer']
      if thisProb not in self.data[subjectID].quizAnswers:
         self.data[subjectID].quizAnswers[thisProb]=[]
      self.data[subjectID].quizAnswers[thisProb].append([time.time()-self.data['quizStartTime'],thisAnswer])
      answer=self.checkAnswer(thisProb,thisProbType,thisAnswer)
      if answer=="correct":
         if self.data[subjectID].status['tries']==0:
            price=.5
         elif self.data[subjectID].status['tries']==1:
            price=.25
         else:
            price=0
         self.data[subjectID].quizEarnings=self.data[subjectID].quizEarnings+price
         self.data[subjectID].status["stage"]="correct"
      elif answer=="incorrect":
         self.data[subjectID].status["stage"]="incorrect"
      self.getAnswerText(subjectID)

   def getAnswerText(self,subjectID):
      msg={}
      msg['type']='answerSolution'
      msg['quizEarnings']="$%.02f"%(self.data[subjectID].quizEarnings)
      if self.data[subjectID].status["stage"]=="correct":
         msg['solution']="correct"
         msg['solutionText']="The answer is correct."
         msg['buttonText']="Next Question."
         self.customMessage(subjectID,msg)
      elif self.data[subjectID].status["stage"]=="incorrect":
         self.data[subjectID].quizEarnings=0
         self.data[subjectID].status={"page":"generic","message":["That answer was incorrect. <br> Your earnings on the quiz are $0.00.<br> Please wait for other subjects to finish quiz."]}
         self.updateStatus(subjectID)


   def reconnectingClient(self,client):
      sid=client.subjectID
      self.updateStatus(sid)

   def checkForDefaultAndFirstPeriod(self,subjectID):
      if len(self.data[subjectID].firstPeriodRules)>0 and len(self.data[subjectID].currentRules)>0:
         return True
      else:
         return False

   def updateRules(self,sid):
      self.data[sid].updateRuleStats()

      self.data[sid].status['history']=self.getClientHistory(sid)
      self.data[sid].status['payoffHistory']=self.getClientPayoffHistory(sid)
      self.data[sid].status['period']=self.data[sid].currentPeriod
      self.data[sid].status['lastPlay']=self.data[sid].lastPlay
      # myRule=self.makeMyChoice(sid)
      # msg['nextPeriodPlay']=myRule.output
      # msg['period']=len(thisHistory)
      # msg['lastPlay']=self.data[sid].lastPlay
      self.data[sid].status['matchPayoff']=self.data[sid].matchPayoffs[self.data['currentMatch']]
      self.data[sid].status['totalPayoff']=self.data[sid].totalPayoffs
      self.data[sid].status['actionProfileFrequencies']=self.data[sid].actionProfileFrequencies[self.data['currentMatch']]
      # msg['lastRule']=self.data[sid].lastRule
      # msg['lastRuleLength']=self.data[sid].lastRuleLength
      # self.customMessage(sid,msg)
      # self.updateRules(sid,"onlyStats","regular")


      self.updateStatus(sid)






   def findRuleClassByList(self,ruleIN,subjectID):
      out=-1
      for r in self.data[subjectID].allRules:
         if r.rule==ruleIN:
            out=r
         break
      return out

   def switchRuleOutput(self,message,client):
      subjectID=client.subjectID
      newRuleList=message['thisRule']
      self.data[subjectID].switchRules(newRuleList)
      self.updateRules(subjectID)

   def addRule(self,message,client):
      subjectID=client.subjectID
      thisRule=message['thisRule']
      self.data[subjectID].addRule(thisRule)
      self.updateRules(subjectID)

   def setDefault(self,message,client):
      subjectID=client.subjectID
      thisRule=message['thisRule']#either 0 or 1
      defaultType=message['defaultType']#either "setDefault" or "setFirstPeriod"
      if defaultType=="setDefault":
         self.data[subjectID].setDefaultRule(thisRule)
      elif defaultType=="setFirstPeriod":
         self.data[subjectID].setFirstPeriodRule(thisRule)
      self.updateRules(subjectID)


   def deleteRule(self,message,client):
      subjectID=client.subjectID
      ruleList=message['rule']
      self.data[subjectID].deleteRule(ruleList)
      self.updateRules(subjectID)


   def displayDemo(self,viewType,subjectID):
      if viewType=="quiz":
         msg={}
         msg['type']='startQuizOLD'
         msg['title']='Start Quiz'
         msg['status']=''
         msg['index']=0
         self.startQuizOLD(msg,{})
      elif viewType=="trial":
         msg={}
         msg['type']='startTrial'
         msg['title']='Practice'
         msg['status']=''
         msg['index']=0
         self.startTrial(msg,{})
      elif viewType=="firstMatch" or viewType=="regular":
         self.data['matchType']="regularDemo"
         thisClient=self.clientsById[subjectID]
         self.data[subjectID].setFirstPeriodRule(random.choice([0,1]),0,0,'regular')
         self.data[subjectID].setDefaultRule(random.choice([0,1]),0,0,'regular')
         self.data['currentMatch']=0
         self.data['payoffs']=[[38,38],[12,50],[50,12],[25,25]]
         self.data['preStageLengths']=[20,20,60,60,60,60,60,60,60,60,60,60]
         for k in range(20):
            self.data[subjectID].gameTable[k]=self.data['payoffs']

         try:
            self.nextPeriodCall.cancel()
         except:
            pass

         try:
            self.nonPickleData[subjectID]['makeChoiceAutomatic'].cancel()
         except:
            pass

         try:
            self.nonPickleData[subjectID]['sendAutomaticWarning'].cancel()
         except:
            pass

         self.startPreMatch()

   def setStatusElements(self,message,client):
      sid=client.subjectID
      for pair in message['pairs']:
         self.data[sid].status[pair[0]]=pair[1]
      self.data[sid].appendStatus()
      self.updateStatus(sid)

   def clickPayoffTableRow(self,message,client):
      sid=client.subjectID
      thisRow=message['row']
      self.data[sid].status["clickedRows"][thisRow]=1
      if sum(self.data[sid].status["clickedRows"])==5:
         self.data[sid].status["allRowClicked"]="True"
      self.data[sid].status["currentRow"]=thisRow
      self.data[sid].appendStatus()
      self.updateStatus(sid)

   def clickStatusBackButton(self,message,client):
      sid=client.subjectID
      self.data[sid].backStatus()
      self.updateStatus(sid)
   def clickStatusForwardButton(self,message,client):
      sid=client.subjectID
      self.data[sid].forwardStatus()
      self.updateStatus(sid)

   def submitQuizAnswer(self,message,client):
      sid=client.subjectID
      self.data[sid].status["answer"]="incorrect"
      correct=False
      print(message)
      if message['question']=="quiz1":
         if message['row']==2 and message['col']==3:
            self.data[sid].status["answer"]="correct"
      elif message['question']=="quiz2":
         if message['row']==3 and message['col']==4:
            self.data[sid].status["answer"]="correct"
      elif message['question']=="quiz3":
         if message['row']==4 and message['col']==1:
            self.data[sid].status["answer"]="correct"
      elif message['question']=="quiz4":
         if message['row']==34 and message['col']==1:
            self.data[sid].status["answer"]="correct"
      elif message['question']=="quiz5":
         if message['row']==46 and message['col']==3:
            self.data[sid].status["answer"]="correct"
      self.data[sid].appendStatus()
      self.updateStatus(sid)



class subjectClass():
   def __init__(self):
      self.status={"page":"generic","message":["Loading..."],"stage":"initializing"}
      # self.status={"stage":1,"page":"instructionsRulesFirst","message":["Plsdfsdfease read, sign, and date your consent form. <br> You may read over the instructions as we wait to begin."]}
      self.statusHistory=[copy.deepcopy(self.status)]
      self.statusHistoryIndex=0
      self.history={}
      self.opponentHistory={}
      self.actionProfileFrequencies={}
      self.gameTable={}
      self.partners={}
      self.roles={}
      self.matchPayoffs={}#Me,You
      self.totalPayoffs=0#Me,You
      self.quizEarnings=0
      self.quizAnswers={}
      # self.quizAnswers=[]
      self.lastInfo={}
      self.lastInfo['play']=-1
      self.lastInfo['rule']=-1
      self.lastInfo['ruleLength']=-1
      self.currentPeriod=0
      self.currentMatch=0
      self.freeLock=0
      self.oldRules=[]
      self.resetAllRules()
      self.timePerQuestion=20
      self.timeUntilWarning=5


   def appendStatus(self):
      # print(self.statusHistoryIndex)
      self.statusHistory=self.statusHistory[0:self.statusHistoryIndex+1]+[copy.deepcopy(self.status)]
      self.statusHistoryIndex=len(self.statusHistory)-1

      # for k in self.statusHistory:
      #    print("!!!!!!!!",k)
   def backStatus(self):
      # print(self.statusHistoryIndex)
      self.statusHistoryIndex-=1
      if self.statusHistoryIndex<0:
         self.statusHistoryIndex=0
      self.status=copy.deepcopy(self.statusHistory[self.statusHistoryIndex])
      # print(self.status)
   def forwardStatus(self):
      self.statusHistoryIndex+=1
      if self.statusHistoryIndex>=len(self.statusHistory):
         self.statusHistoryIndex=len(self.statusHistory)-1
      self.status=copy.deepcopy(self.statusHistory[self.statusHistoryIndex])



   def resetAllRules(self):
      # self.oldRules.append(self.rules)
      self.rules={}
      self.rules['all']={}
      self.rules['current']={}

      self.rules['all']['default']=[Rule([[0]],"default0"),Rule([[1]],"default1")]
      self.rules['all']['firstPeriod']=[Rule([[0]],"firstPeriod0"),Rule([[1]],"firstPeriod1")]
      self.rules['all']['regular']=[]

      self.rules['current']['default']=[]
      self.rules['current']['firstPeriod']=[]
      self.rules['current']['regular']=[]

   def newMatch(self,match):
      self.lastPlay=-1
      self.history[match]=[]
      self.opponentHistory[match]=[]
      self.actionProfileFrequencies[match]=[0,0,0,0]
      self.matchPayoffs[match]=[0,0]
      self.currentPeriod=0
      self.currentMatch=match
      self.matchRunning=0
      self.status['confirmed']="no"
      self.status['match']=match

   def getRuleByList(self,ruleList):
      thisRule=[x for x in self.rules['all']['regular'] if x.rule==ruleList]
      if len(thisRule)==0:
         out=-1
      elif len(thisRule)==1:
         out=thisRule[0]
      else:
         print("something weird is happening.  Apparently there are two of the same rules in the set?!?!?!?!?!?!?!?!")
      return out

   def deleteRule(self,ruleList):
      thisRule=self.getRuleByList(ruleList)
      if thisRule in self.rules['current']['regular']:
         self.rules['current']['regular'].remove(thisRule)
         thisRule.deletedTimes.append(self.changeInfo())
      else:
         print("TRYING TO DELETE RULE NOT IN LIST!!!!!!!!!")

   def changeInfo(self):
      return [self.currentMatch,self.currentPeriod,self.status['confirmed'],time.time()]

   def addRule(self,ruleList):
      thisRule=self.getRuleByList(ruleList)
      if thisRule==-1:
         newRule=Rule(ruleList,len(self.rules['all']['regular'])+1)
         self.rules['all']['regular'].append(newRule)
      else:
         newRule=thisRule

      if newRule not in self.rules['current']['regular']:
         newRule.addedTimes.append(self.changeInfo())
         self.rules['current']['regular'].append(newRule)
      else:
         print("TRYING TO ADD RULE ALREADY IN LIST!!!!!!!!!")


   def setDefaultRule(self,rule):
      self.status['defaultRule']=rule
      thisRule=self.rules['all']['default'][rule]
      thisRule.addedTimes.append(self.changeInfo())
      self.rules['current']['default']=[thisRule]

   def setFirstPeriodRule(self,rule):
      self.status['firstPeriodRule']=rule
      thisRule=self.rules['all']['firstPeriod'][rule]
      thisRule.addedTimes.append(self.changeInfo())
      self.rules['current']['firstPeriod']=[thisRule]

   def switchRules(self,newRuleList):
      oldRule=[x if len(x)>1 else [1-x[0]] for x in newRuleList]
      newRule=[x if len(x)>1 else [x[0]] for x in newRuleList]
      self.addRule(newRule)
      self.deleteRule(oldRule)

   def updateRuleStats(self):
      self.status["ruleInfo"]=[]
      for t in ["firstPeriod","default","regular"]:
         for r in self.rules['current'][t]:
            self.status["ruleInfo"].append(r.getRuleInfo())
      if 'confirmed' in self.status:
         if self.status['confirmed']=="no":
            self.getNextPlayInfo()
   def getNextPlayInfo(self):
      history=[[x,y] for x,y in zip(self.history[self.currentMatch],self.opponentHistory[self.currentMatch])]
      thisRule=self.pickRule(history)
      self.status['nextChoiceInfo']={}
      try:
         self.status['nextChoiceInfo']['action']=thisRule.output
         self.status['nextChoiceInfo']['number']=thisRule.number
         self.status['nextChoiceInfo']['length']=thisRule.length
      except:
         self.status['nextChoiceInfo']['action']=-1
         self.status['nextChoiceInfo']['number']=-1
         self.status['nextChoiceInfo']['length']=-1
      print(self.status['nextChoiceInfo'])



   def getLastPlayInfo(self):
      self.status['lastChoiceInfo']={}
      self.status['lastChoiceInfo']['action']=self.status['nextChoiceInfo']['action']
      self.status['lastChoiceInfo']['number']=self.status['nextChoiceInfo']['number']
      self.status['lastChoiceInfo']['length']=self.status['nextChoiceInfo']['length']
      self.history[self.currentMatch].append(self.status['nextChoiceInfo']['action'])
      self.status['confirmed']="yes"

   def pickRule(self,history):
      if len(history)==0:
         ruleOut=self.rules['current']['firstPeriod'][0]
      elif len(history)>0:
         rulesThatFit=[]
         for k in self.rules['current']['regular']:
            if k.fitHistory(history):
               rulesThatFit.append(k)
         if len(rulesThatFit)>0:
            ruleOut=max(rulesThatFit,key= lambda x: x.length)
         else:
            ruleOut=self.rules['current']['default'][0]
      return ruleOut


class Rule:
   def __init__(self,rule,number):
      self.rule=rule
      self.input=rule[:-1]
      self.length=len(self.input)
      self.output=rule[-1][0]
      self.number="%s"%(number)
      self.lastUsed="Never"
      self.frequency=0
      self.addedTimes=[]
      self.deletedTimes=[]
      self.periodsUsed={}


   def fitHistory(self,history):
      if self.length>0:
         lastN=history[-self.length:]
      else:
         lastN=[]
      if lastN==self.input:
         out=True
      else:
         out=False
      return out

   def ruleUsed(self,match,period):
      if match not in self.periodsUsed:
         self.periodsUsed[match]=[]
      self.frequency+=1
      self.lastUsed="M%sP%s"%(match,period+1)
      self.periodsUsed[match].append(period)

   def getRuleInfo(self):
      #each entry in the list should be like: [number,title,constructor,lastPlayed,totalPlayed]
      if self.number.find("default")>-1:
         title="Default Rule"
      elif self.number.find("firstPeriod")>-1:
         title="First Period Rule"
      else:
         title="Rule #%s"%(self.number)
      return [self.number,title,self.rule,self.lastUsed,self.frequency]


