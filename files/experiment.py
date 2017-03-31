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
      self.monitorTaskList=['startInstructionsQuiz','finishInstructionsQuiz','startExperiment']

   # - store data in self.data[subjectID] which is a Subject object (defined below)
   # - send messages like self.customMessage(subjectID,msg)
   # - list of all subjects at self.data['subjectIDs']
  

   #changes to make for testing
   # showPayoffTime
   # setMatchingsByQuiz

   # add delay
   # key down
   # mess with fonts
   # subject ID at top


   def setParameters(self):
      print("setParameters")
      self.data['exchangeRate']=float(1)/2500
      self.data['showPayoffTime']=60
      self.data['postMatchTime']=5
      self.data['expectedPeriodsPerSupergame']=20
      self.data['currentSupergameType']={}


      self.data['totalMatches']=60
      self.data['preStageLengths']=[120 for x in range(self.data['totalMatches']+1)]




      self.data["matchTypeInfo"]={}
      self.data["matchTypeInfo"]["low"]={}
      self.data["matchTypeInfo"]["high"]={}


      #low quiz people
      thisMatchInfo={}
      thisMatchInfo['supergameType']="directResponse"
      thisMatchInfo['supergameTypeConfirmation']="In all 60 matches you will make choices directly without constructing rules."
      thisMatchInfo['supergameTypeMessage']="In all 60 you will make choices directly without constructing rules."
      thisMatchInfo['supergameTypeContinuePage']="gameDirectResponse"
      self.data["matchTypeInfo"]["low"][1]=thisMatchInfo

      #treatment 1
      thisMatchInfo={}
      thisMatchInfo['supergameType']="directResponse"
      thisMatchInfo['supergameTypeConfirmation']="In matches 1-10 you will make choices directly without constructing rules."
      thisMatchInfo['supergameTypeMessage']="In matches 1-10 you will make choices directly without constructing rules."
      thisMatchInfo['supergameTypeContinuePage']="gameDirectResponse"
      self.data["matchTypeInfo"]["high"][1]=thisMatchInfo

      thisMatchInfo={}
      thisMatchInfo['supergameType']="nonBinding"
      thisMatchInfo['supergameTypeConfirmation']="In matches 11-20 you can construct rules and edit your rule set. You will be told which action your rule set will make, but can still choose the other action if you want.<br><br> In matches 21-50 you will NOT be able to edit your rule set.  The rule set that you have at the end of match #20 will make all choices for you automatically."
      thisMatchInfo['supergameTypeMessage']="Warning: Starting in match #21 your rule set will play automatically and this will not be an option."
      thisMatchInfo['supergameTypeMessage2']="Reminder: You will not be able to make any changes to your rule set between match #21 and match #50.  The rule set you have at the end of match #20 will make all choices for you automatically at that point."
      thisMatchInfo['supergameTypeContinuePage']="setFirstPeriodRulePage"
      self.data["matchTypeInfo"]["high"][11]=thisMatchInfo
      self.data['preStageLengths'][11]=600

      thisMatchInfo={}
      thisMatchInfo['supergameType']="noChange"
      thisMatchInfo['supergameTypeConfirmation']="In matches 21-50 you will NOT be able to edit your rule set.  Your rule set will make choices for you automatically."
      thisMatchInfo['supergameTypeMessage']="In matches 21-50 you will NOT be able to edit your rule set.  Your rule set will make choices for you automatically."
      thisMatchInfo['supergameTypeContinuePage']="gameNoChange"
      self.data["matchTypeInfo"]["high"][21]=thisMatchInfo

      thisMatchInfo={}
      thisMatchInfo['supergameType']="directResponse"
      thisMatchInfo['supergameTypeConfirmation']="In matches 51-60 you will make choices directly without constructing rules."
      thisMatchInfo['supergameTypeMessage']="In matches 51-60 you will make choices directly without constructing rules."
      thisMatchInfo['supergameTypeContinuePage']="gameDirectResponse"
      self.data["matchTypeInfo"]["high"][51]=thisMatchInfo

      #treatment 2
      # thisMatchInfo={}
      # thisMatchInfo['supergameType']="directResponse"
      # thisMatchInfo['supergameTypeConfirmation']="In matches 1-10 you will make choices directly without constructing rules."
      # thisMatchInfo['supergameTypeMessage']="In matches 1-10 you will make choices directly without constructing rules."
      # thisMatchInfo['supergameTypeContinuePage']="gameDirectResponse"
      # self.data["matchTypeInfo"]["high"][1]=thisMatchInfo

      # thisMatchInfo={}
      # thisMatchInfo['supergameType']="directResponse"
      # thisMatchInfo['supergameTypeConfirmation']="In matches 11-20 you will make choices directly without constructing rules."
      # thisMatchInfo['supergameTypeMessage']="In matches 11-20 you will make choices directly without constructing rules."
      # thisMatchInfo['supergameTypeContinuePage']="gameDirectResponse"
      # self.data["matchTypeInfo"]["high"][11]=thisMatchInfo

      # thisMatchInfo={}
      # thisMatchInfo['supergameType']="nonBinding"
      # thisMatchInfo['supergameTypeConfirmation']="In matches 21-30 you can construct rules and edit your rule set. You will be told which action your rule set will make, but can still choose the other action if you want.<br><br> In matches 31-60 you will NOT be able to edit your rule set.  The rule set that you have at the end of match #30 will make all choices for you automatically."
      # thisMatchInfo['supergameTypeMessage']="Warning: Starting in match #31 your rule set will play automatically and this will not be an option."
      # thisMatchInfo['supergameTypeMessage2']="Reminder: You will not be able to make any changes to your rule set between match #31 and match #60.  The rule set you have at the end of match #30 will make all choices for you automatically at that point."
      # thisMatchInfo['supergameTypeContinuePage']="setFirstPeriodRulePage"
      # self.data["matchTypeInfo"]["high"][21]=thisMatchInfo
      # self.data['preStageLengths'][21]=600

      # thisMatchInfo={}
      # thisMatchInfo['supergameType']="noChange"
      # thisMatchInfo['supergameTypeConfirmation']="In matches 31-60 you will NOT be able to edit your rule set.  Your rule set will make choices for you automatically."
      # thisMatchInfo['supergameTypeMessage']="In matches 31-60 you will NOT be able to edit your rule set.  Your rule set will make choices for you automatically."
      # thisMatchInfo['supergameTypeContinuePage']="gameNoChange"
      # self.data["matchTypeInfo"]["high"][31]=thisMatchInfo


      #TESTING###########################################################################################
      # thisMatchInfo={}
      # thisMatchInfo['supergameType']="directResponse"
      # thisMatchInfo['supergameTypeConfirmation']="In matches 1-10 you will make choices directly without constructing rules."
      # thisMatchInfo['supergameTypeMessage']="In matches 1-10 you will make choices directly without constructing rules."
      # thisMatchInfo['supergameTypeContinuePage']="gameDirectResponse"
      # self.data["matchTypeInfo"]["high"][1]=thisMatchInfo

      # thisMatchInfo={}
      # thisMatchInfo['supergameType']="nonBinding"
      # thisMatchInfo['supergameTypeConfirmation']="In matches 11-20 you can construct rules and edit your rule set. You will be told which action your rule set will make, but can still choose the other action if you want.<br><br> In matches 21-30 you will NOT be able to edit your rule set.  The rule set that you have at the end of match #20 will make all choices for you automatically."
      # thisMatchInfo['supergameTypeMessage']="Warning: Starting in match #21 your rule set will play automatically and this will not be an option."
      # thisMatchInfo['supergameTypeMessage2']="Reminder: You will not be able to make any changes to your rule set between match #21 and match #30.  The rule set you have at the end of match #20 will make all choices for you automatically at that point."
      # thisMatchInfo['supergameTypeContinuePage']="setFirstPeriodRulePage"
      # self.data["matchTypeInfo"]["low"][1]=thisMatchInfo
      # self.data['preStageLengths'][1]=600

      # thisMatchInfo={}
      # thisMatchInfo['supergameType']="noChange"
      # thisMatchInfo['supergameTypeConfirmation']="In matches 21-50 you will NOT be able to edit your rule set.  Your rule set will make choices for you automatically."
      # thisMatchInfo['supergameTypeMessage']="In matches 21-50 you will NOT be able to edit your rule set.  Your rule set will make choices for you automatically."
      # thisMatchInfo['supergameTypeContinuePage']="gameNoChange"
      # self.data["matchTypeInfo"]["high"][21]=thisMatchInfo

      # thisMatchInfo={}
      # thisMatchInfo['supergameType']="directResponse"
      # thisMatchInfo['supergameTypeConfirmation']="In matches 51-60 you will make choices directly without constructing rules."
      # thisMatchInfo['supergameTypeMessage']="In matches 51-60 you will make choices directly without constructing rules."
      # thisMatchInfo['supergameTypeContinuePage']="gameDirectResponse"
      # self.data["matchTypeInfo"]["high"][51]=thisMatchInfo

      # self.data['showPayoffTime']=1
      # self.data['postMatchTime']=2

      # self.data['matchStartTimes']={}
      # self.data['matchStartTimes']["low"]={}
      # self.data['matchStartTimes']["high"]={}

      #TESTING###########################################################################################










      self.data['periodsPerMatch']= ["No period 0",18, 20, 12, 6, 49, 13, 10, 13, 5, 22, 21, 13, 49, 2, 15, 14, 27, 1, 51, 11, 7, 4, 1, 43, 49, 4, 26, 20, 7, 27, 4, 27, 14, 17, 19, 28, 2, 23, 24, 45, 15, 6, 2, 52, 8, 25, 32, 2, 40, 8, 5, 8, 39, 11, 6, 46, 32, 43, 27, 29]

      self.data['currentMatch']={}
      self.data['currentMatch']['high']=0
      self.data['currentMatch']['low']=0

      #payoffs
      self.data['matchType']="regular"
      self.data['choices']=["W","Y"]
      # self.data['payoffs']=[[3,3],[1,5],[4,1],[2,2]]
      # self.data['payoffs']=[[1,5],[2,6],[3,7],[4,8]]
      # self.data['payoffs']=[[48,48],[12,50],[50,12],[25,25]]
      self.data['payoffs']=[[32,32],[12,50],[50,12],[25,25]]

      self.setQuizAnswers()

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


   def setPairs(self,theseSubjectsIN,currentMatch):
      theseSubjects=theseSubjectsIN[:]
      random.shuffle(theseSubjects)
      for k in range(len(theseSubjects)/2):
         sub1=theseSubjects[2*k+0]
         sub2=theseSubjects[2*k+1]

         self.data[sub1].partners[currentMatch]=sub2
         self.data[sub1].roles[currentMatch]=0
         self.data[sub1].gameTable[currentMatch]=self.data['payoffs']

         self.data[sub2].partners[currentMatch]=sub1
         self.data[sub2].roles[currentMatch]=1
         self.data[sub2].gameTable[currentMatch]=self.reversePays(self.data['payoffs'])


   def notAcceptingClientsAnymore(self):
      for sid in self.data['subjectIDs']:
         self.data[sid].status['payoffs']=self.data['payoffs']
         self.data[sid].status['choices']=self.data['choices']
      self.setMatchingsByQuiz()


   def setMatchingsByQuiz(self):
      print("SET MATCHING BY QUIZ!!!!!!!!!!!!")
      goodQuiz=[]
      badQuiz=[]
      for sid in self.data['subjectIDs']:
         # if sid in ['subject0',"subject1",'subject2',"subject3"]:
         #    goodQuiz.append(sid)
         if self.data[sid].quizEarnings[0]==5:
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
      self.data['groups']["high"]=goodQuiz
      self.data['groups']["low"]=badQuiz


      for sid in self.data['groups']["high"]:
         self.data[sid].group="high"
      for sid in self.data['groups']["low"]:
         self.data[sid].group="low"
      print("matching set!!!!!!!")


   def makeMatching(self,group):
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
         if len(self.data['groups'][group])>0:
            self.setPairs(self.data['groups'][group],self.data['currentMatch'][group])
   

   def makeMyChoice(self,subjectID):
      history=self.getClientHistory(subjectID)
      ruleOut=self.data[subjectID].pickRule("regular",history)
      if len(history)==0:
         thisPlay=self.data[subjectID].firstPeriodRules[-1][0]
         ruleOut=Rule([[thisPlay]],-1)
      return ruleOut




   def gameOver(self,group):
      for sid in self.data['groups'][group]:
         self.data[sid].totalPayoffStringFunction(self.data['exchangeRate'])
         self.data[sid].totalPayoffString
         self.data[sid].status={"page":"generic","message":["ID:"+sid,"<br>Total Francs: %.02f"%(self.data[sid].totalPayoffs),"<br>Quiz Pay: %.02f"%(self.data[sid].quizEarnings[0]),"<br>Total Pay: %s"%(self.data[sid].totalPayoffString)]}
         self.updateStatus(sid)



   def startInstructionsQuiz(self,message,client):
      self.instructionsSpecificMonitorTableEntries()
      self.taskDone(message)
      for sid in self.data['subjectIDs']:
         self.data[sid].setInstructionStatus()
         self.updateStatus(sid)

   def startExperiment(self,message,client):
      self.data['startExperimentButtonPressTime']=time.time()
      self.experimentSpecificMonitorTableEntries()
      self.taskDone(message)
      self.showPayoffs()

   def showPayoffs(self):
      self.initializeTimer("all",self.data['showPayoffTime'],self.startPreMatchBoth)
      for sid in self.data['subjectIDs']:
         #completely reset status for everyone
         self.data[sid].status={"page":"payoffsOnly"}
         self.data[sid].status['payoffs']=self.data['payoffs']
         self.data[sid].status['group']=self.data[sid].group
         self.updateStatus(sid)


   def startPreMatchBoth(self):
      self.startPreMatch("high")
      self.startPreMatch("low")

   def setSubjectsPage(self,pageName):
      for sid in self.data['subjectIDs']:
         self.data[sid].status["page"]=pageName
         self.updateStatus(sid)




   def newDirectResponseMatch(self,group):
      print("NEW MATCH DIRECT RESPONSE")
      for sid in self.data['groups'][group]:
         self.data[sid].newMatch(self.data['currentMatch'][group])
         self.data[sid].updateNonRuleStats()
         self.data[sid].status["page"]="gameDirectResponse"
         self.updateStatus(sid)


   def confirmMatchType(self,message,client):
      sid=client.subjectID
      group=self.data[sid].group
      if self.data[sid].status["supergameInfo"]["supergameTypeContinuePage"]=="gameNoChange":
         self.data[sid].status['page']=self.data[sid].status["supergameInfo"]["supergameTypeContinuePage"]
         self.updateStatus(sid)
         allSet=1
         for sid in self.data['groups'][group]:
            if self.data[sid].status["page"]!="gameNoChange":
               allSet=0
         if allSet==1:
            self.initializeTimer(group,self.periodTime,self.makeChoicesNoChange,group)
         else:
            self.updateStatus(sid)
      else:
         self.data[sid].status['page']=self.data[sid].status["supergameInfo"]["supergameTypeContinuePage"]
         self.updateStatus(sid)
      self.monitorMessage()

   def startMatchButton(self,message,client):
      sid=client.subjectID
      group=self.data[sid].group
      self.data[sid].status['startMatchConfirm']="yes"
      self.updateStatus(sid)
      allSet=1
      for sid in self.data['groups'][group]:
         if self.data[sid].status['startMatchConfirm']=="no":
            allSet=0
      if allSet==1:
         self.cancelTimerFunction(group)
         self.startMatchNonBinding(group)
      self.monitorMessage()

   def newMatchNonBinding(self,group):
      print("NEW NON BINDING MATCH")
      self.initializeTimer(group,self.data['preStageLengths'][self.data['currentMatch'][group]],self.startMatchNonBinding,group)
      for sid in self.data['groups'][group]:
         self.data[sid].newMatch(self.data['currentMatch'][group])
         self.data[sid].status['startMatchConfirm']="no"
         if self.data[sid].rules['current']['firstPeriod']==[]:
            self.data[sid].status['page']="setFirstPeriodRulePage"
            self.updateStatus(sid)      
         else:
            self.data[sid].status['page']="preMatch"
            self.updateRules(sid)      



   def newMatchNoChange(self,group):
      print("NEW MATCH NO CHANGe")
      self.periodTime=2
      self.initializeTimer(group,self.periodTime,self.makeChoicesNoChange,group)

      for sid in self.data['groups'][group]:
         self.data[sid].newMatch(self.data['currentMatch'][group])
         self.data[sid].status["page"]="gameNoChange"
         self.data[sid].status["supergameType"]="noChange"
         self.updateRules(sid)

   def makeChoicesNoChange(self,group):
      self.periodTime=max(self.periodTime*.85,.1)
      self.initializeTimer(group,self.periodTime,self.makeChoicesNoChange,group)
      for sid in self.data['groups'][group]:
         self.data[sid].confirmChoiceNoChange()
      for sid in self.data['groups'][group]:
         self.finishPeriod(sid)




   def startMatchNonBinding(self,group):
      if self.checkToSeeIfAllDefaultsHaveBeenSet(group):
         for sid in self.data['groups'][group]:
            self.data[sid].status['page']="gameNonBinding"
            self.data[sid].matchRunning=1
            self.data[sid].currentPeriod=1
            self.updateRules(sid)


   # def matchTypeConfirmationPage(self,match):
   #    for sid in self.data['subjectIDs']:
   #       self.data[sid].status['page']=self.data['preMatchMessages'][match]
   #       self.data[sid].status['supergameTypeMessage']=self.data['supergameTypeMessages'][match]
   #       self.updateStatus(sid)

   def startPreMatch(self,group):
      #group is "high" or "low"
      self.data['currentMatch'][group]+=1
      self.data['matchStartTimes'][group][self.data['currentMatch'][group]]=time.time()
      if self.data['currentMatch'][group]<=self.data['totalMatches']:
         self.makeMatching(group)
         if self.data['currentMatch'][group] in self.data["matchTypeInfo"][group]:
            thisMatchInfo=self.data["matchTypeInfo"][group][self.data['currentMatch'][group]]
            for sid in self.data['groups'][group]:
               self.data[sid].status["supergameInfo"]=thisMatchInfo
            self.data['currentSupergameType'][group]=thisMatchInfo['supergameType']
         if self.data['currentSupergameType'][group]=="directResponse":
            self.newDirectResponseMatch(group)
         elif self.data['currentSupergameType'][group]=="nonBinding":
            self.newMatchNonBinding(group)
         elif self.data['currentSupergameType'][group]=="noChange":
            self.newMatchNoChange(group)

         #first set confirmation page if needed (do this after you start the match)
         if self.data['currentMatch'][group] in self.data["matchTypeInfo"][group]:
            #cancel the noChange timer so taht they don't start until everyone has confirmed
            if self.data['currentSupergameType'][group]=="noChange":
               self.cancelTimerFunction(group)
            for sid in self.data['groups'][group]:
               self.data[sid].status['page']="genericMatchConfirmationPage"
               self.updateStatus(sid)

      elif self.data['currentMatch'][group]>self.data['totalMatches']:
         self.gameOver(group)#game over


   def checkToSeeIfAllDefaultsHaveBeenSet(self,group):
      allDefaultRulesSet=1
      for sid in self.data['groups'][group]:
         if len(self.data[sid].rules['current']['firstPeriod'])==0 or len(self.data[sid].rules['current']['default'])==0:
            allDefaultRulesSet=0
      if allDefaultRulesSet==0:
         print("not all default Rules Set")
         self.initializeTimer(group,10,self.startMatchNonBinding,group)
         for sid in self.data['groups'][group]:
            self.updateStatus(sid)      
         # self.nextPeriodCall=reactor.callLater(2,self.startMatch)
         return False
      else:
         return True


   def initializePeriodTimer(self,sid):
      warningTime=self.data[sid].timeUntilWarning
      warningTime=100000
      self.initializeTimer(sid,warningTime,self.showWarning,sid)
      self.data[sid].status['warning']="no"
      self.updateStatus(sid)

   def showWarning(self,sid):
      remainingTime=self.data[sid].timePerQuestion-self.data[sid].timeUntilWarning
      self.initializeTimer(sid,remainingTime,self.confirmChoiceFromPython,sid)
      self.data[sid].status['warning']="yes"
      self.updateStatus(sid)


   def getClientHistory(self,subjectID):
      group=self.data[subjectID].group
      currentMatch=self.data['currentMatch'][group]
      myHistory=self.data[subjectID].history[currentMatch]
      theirHistory=self.data[subjectID].opponentHistory[currentMatch]
      history=[]
      for a,b in zip(myHistory,theirHistory):
         history.append([a,b])
      return history
   
   def getClientPayoffHistory(self,subjectID):
      group=self.data[subjectID].group
      currentMatch=self.data['currentMatch'][group]
      myHistory=self.data[subjectID].history[currentMatch]
      theirHistory=self.data[subjectID].opponentHistory[currentMatch]
      history=[]
      for a,b in zip(myHistory,theirHistory):
         index=2*a+b
         thisPayoff=self.data[subjectID].gameTable[currentMatch][index]
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
      self.data[sid].confirmChoice()
      self.checkPartner(sid)

   def confirmChoice(self,message,client):
      #print "Confi Choice",client.subjectID
      sid=client.subjectID
      self.confirmChoiceFromPython(sid)


   def cancelOtherActionConfirm(self,message,client):
      sid=client.subjectID
      otherAction=self.getOthersAction(sid)
      self.data[sid].otherActionAttempts.append(["cancel",time.time(),self.data[sid].currentPeriod,self.data[sid].currentMatch,otherAction])
      self.data[sid].status['otherActionConfirmation']="false"
      self.updateRules(sid)

   def getOthersAction(self,sid):
      history=[[x[0],y] for x,y in zip(self.data[sid].history[self.data[sid].currentMatch],self.data[sid].opponentHistory[self.data[sid].currentMatch])]
      thisRule=self.data[sid].pickRule(history)
      thisRuleChoice=thisRule.output
      otherAction=1-thisRuleChoice#other action
      return otherAction
   def confirmChoiceNonBinding(self,message,client):
      #print "Confi Choice",client.subjectID
      sid=client.subjectID
      if message["choiceType"]=="otherActionConfirmNeeded":
         self.data[sid].status['otherActionConfirmation']="true"
         self.updateRules(sid)
         otherAction=self.getOthersAction(sid)
         self.data[sid].otherActionAttempts.append(["attempt",time.time(),self.data[sid].currentPeriod,self.data[sid].currentMatch,otherAction])
      else:
         self.data[sid].confirmChoiceNonBinding(message["choiceType"])
         self.checkPartner(sid)


   def checkPartner(self,sid):
      myGroup=self.data[sid].group
      currentMatch=self.data['currentMatch'][myGroup]
      myPartner=self.data[sid].partners[currentMatch]
      if myPartner=="randomPlayer":
         self.finishPeriod(sid)
      else:
         if self.data[myPartner].status['confirmed']=="yes":
            self.finishPeriod(sid)
            self.finishPeriod(myPartner)
         else:
            self.updateRules(sid)      
            "sdf"
            #send message to confirm that you are waiting now.

   def finishPeriod(self,subjectID):
      #Get opponents choices and payoffs
      group=self.data[subjectID].group
      currentMatch=self.data['currentMatch'][group]
      subject1=subjectID
      subject2=self.data[subjectID].partners[currentMatch]

      self.data[subject1].currentPeriod+=1

      choice1=self.data[subject1].history[currentMatch][-1][0]

      if subject2=="randomPlayer":
         choice2=random.choice([0,1])
      else:
         choice2=self.data[subject2].history[currentMatch][-1][0]

      self.data[subject1].opponentHistory[currentMatch].append(choice2)
      index1=2*choice1+choice2
      payoff1=self.data[subject1].gameTable[currentMatch][index1][0]
      payoff2=self.data[subject1].gameTable[currentMatch][index1][1]

      if self.data['matchType']=="regular" or self.data['matchType']=="regularDemo":
         self.data[subject1].matchPayoffs[currentMatch][0]+=payoff1
         self.data[subject1].matchPayoffs[currentMatch][1]+=payoff2
         self.data[subject1].totalPayoffs+=payoff1
         self.data[subject1].totalPayoffStringFunction(self.data['exchangeRate'])

      self.data[subject1].actionProfileFrequencies[currentMatch][index1]+=1
      self.data[subject1].status['previousPayoffIndex']=index1

      self.data[subject1].status["confirmed"]="no"
      self.data[subject1].status["animate"]="yes"
      if self.data[subject1].currentPeriod<=self.data['periodsPerMatch'][currentMatch]:
         #start next period
         '# self.initializePeriodTimer(subject1)'
      else:
         #end of match
         self.data[subject1].status["page"]="postMatch"
         self.data[subject1].status["stage"]="wait"

         #check if everyone is done
         allDone=1
         for sid in self.data['groups'][group]:
            if self.data[sid].status["page"]!="postMatch":
               allDone=0
         if allDone==1:
            self.initializeTimer(group,self.data['postMatchTime'],self.startPreMatch,group)
            for sid in self.data['groups'][group]:
               self.data[sid].status["stage"]="timer"
               self.updateRules(sid)
      self.updateRules(subject1)
      self.data[subject1].status["animate"]="no"
      self.monitorMessage()



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
            self.data[sid].status={"page":"generic","message":["There are %s participants in your group (including yourself).<br> Everyone in your group earned $5.00 on the quiz."%(len(self.data['groups']["high"]))]}
         else:
            self.data[sid].status={"page":"generic","message":["There are %s participants in your group (including yourself)."%(len(self.data['groups']["low"]))]}
         self.updateStatus(sid)



   # def startQuizOLD(self,message,client):
   #    self.data['serverPage']="quiz"
   #    self.taskDone(message)
   #    for sid in self.data['subjectIDs']:
   #       self.data[sid].resetAllRules()
   #    self.data['quizStartTime']=time.time()
   #    self.data['payoffs']=[[8,7],[6,5],[4,3],[2,1]]
   #    self.data['choices']=["W","Y"]
   #    for sid in self.data['subjectIDs']:
   #       #[quizNow,QuestionNumber,0 question and 1 solution,tryNumber]
   #       # if restart==0:
   #       self.data[sid].status={"page":"quiz","questionNumber":1,"stage":"question","tries":0}
   #       self.sendQuizQuestion(sid)


   # def checkAnswer(self,thisProb,thisProbType,thisAnswer):
   #    out="incorrect"
   #    if thisProbType!=3:#Action
   #       if thisAnswer==self.data['quizQuestions']['questions'][thisProb-1]['answer']:
   #          out="correct"
   #    elif thisProbType==3:#Add
   #       messageIndex=thisProb-1
   #       thisMessage=self.data['quizQuestions']['questions'][messageIndex]
   #       if thisAnswer in self.data['quizQuestions']['questions'][thisProb-1]['answer']:
   #          out="correct"
   #    return out

   # def nextQuestion(self,message,client):
   #    subjectID=client.subjectID
   #    currentQuestion=self.data[subjectID].status['questionNumber']+1
   #    if currentQuestion>10:#10:#Number of quiz problems
   #       if self.data[subjectID].quizEarnings>0:
   #          self.data[subjectID].quizEarnings=10
   #       self.data[subjectID].status={"page":"quizSummary","summary":"$%.02f"%(self.data[subjectID].quizEarnings)}
   #       self.updateStatus(subjectID)
   #    else:
   #       self.data[subjectID].status={"page":"quiz","questionNumber":currentQuestion,"stage":"question","tries":0}
   #       self.sendQuizQuestion(subjectID)
   # def tryAgain(self,message,client):
   #    subjectID=client.subjectID
   #    self.data[subjectID].status["stage"]="question"
   #    self.data[subjectID].status["tries"]=self.data[subjectID].status["tries"]+1
   #    self.sendQuizQuestion(subjectID)


   # def getQuizProblem(self,message,client):
   #    subjectID=client.subjectID
   #    self.sendQuizQuestion(subjectID)


   # def sendQuizQuestion(self,subjectID):
   #    self.monitorMessage()
   #    msg=self.data['quizQuestions']['questions'][self.data[subjectID].status['questionNumber']-1]
   #    msg['tries']=self.data[subjectID].status['tries']+1
   #    if self.data[subjectID].status['tries']==0:
   #       msg['price']="$0.50"
   #    elif self.data[subjectID].status['tries']==1:
   #       msg['price']="$0.25"
   #    else:
   #       msg['price']="$0.00"
   #    msg['quizEarnings']="$%.02f"%(self.data[subjectID].quizEarnings)
   #    self.customMessage(subjectID,msg)


   # def quizAnswer(self,message,client):
   #    subjectID=client.subjectID
   #    thisProb=self.data[subjectID].status['questionNumber']
   #    thisProbType=message['questionType']
   #    thisAnswer=message['answer']
   #    if thisProb not in self.data[subjectID].quizAnswers:
   #       self.data[subjectID].quizAnswers[thisProb]=[]
   #    self.data[subjectID].quizAnswers[thisProb].append([time.time()-self.data['quizStartTime'],thisAnswer])
   #    answer=self.checkAnswer(thisProb,thisProbType,thisAnswer)
   #    if answer=="correct":
   #       if self.data[subjectID].status['tries']==0:
   #          price=.5
   #       elif self.data[subjectID].status['tries']==1:
   #          price=.25
   #       else:
   #          price=0
   #       self.data[subjectID].quizEarnings=self.data[subjectID].quizEarnings+price
   #       self.data[subjectID].status["stage"]="correct"
   #    elif answer=="incorrect":
   #       self.data[subjectID].status["stage"]="incorrect"
   #    self.getAnswerText(subjectID)

   # def getAnswerText(self,subjectID):
   #    msg={}
   #    msg['type']='answerSolution'
   #    msg['quizEarnings']="$%.02f"%(self.data[subjectID].quizEarnings)
   #    if self.data[subjectID].status["stage"]=="correct":
   #       msg['solution']="correct"
   #       msg['solutionText']="The answer is correct."
   #       msg['buttonText']="Next Question."
   #       self.customMessage(subjectID,msg)
   #    elif self.data[subjectID].status["stage"]=="incorrect":
   #       self.data[subjectID].quizEarnings=0
   #       self.data[subjectID].status={"page":"generic","message":["That answer was incorrect. <br> Your earnings on the quiz are $0.00.<br> Please wait for other subjects to finish quiz."]}
   #       self.updateStatus(subjectID)


   def reconnectingClient(self,client):
      sid=client.subjectID
      self.updateStatus(sid)
      self.monitorMessage()

   def checkForDefaultAndFirstPeriod(self,subjectID):
      if len(self.data[subjectID].firstPeriodRules)>0 and len(self.data[subjectID].currentRules)>0:
         return True
      else:
         return False


   def updateRules(self,sid):
      group=self.data[sid].group
      if self.data['currentSupergameType'][group]!="directResponse":
         self.data[sid].updateRuleStats()
      self.data[sid].updateNonRuleStats()
      self.updateStatus(sid)
      self.monitorMessage()


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
         self.data['payoffs']=[[32,32],[12,50],[50,12],[25,25]]
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
      self.monitorMessage()

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


   def setQuizAnswers(self):
      self.data['quizAnswers']=[]



      self.data['quizAnswers'].append({"question":"quizMatchesAndPeriods1","answer":"60"})
      self.data['quizAnswers'].append({"question":"quizMatchesAndPeriods2","answer":"1 out of 20"})

      self.data['quizAnswers'].append({"question":"quiz1","row":2,"col":3})
      self.data['quizAnswers'].append({"question":"quiz2","row":3,"col":4})
      self.data['quizAnswers'].append({"question":"quiz3","row":4,"col":1})

      self.data['quizAnswers'].append({"question":"quiz4","div":"history_square_34_0"})
      self.data['quizAnswers'].append({"question":"quiz5","div":"historyPayoffLabel_18"})
      self.data['quizAnswers'].append({"question":"quiz6","div":"history_square_21_1"})

      self.data['quizAnswers'].append({"question":"quizRuleLength1","div":"quizRule2"})
      self.data['quizAnswers'].append({"question":"quizRuleLength2","div":"quizRule7"})
      self.data['quizAnswers'].append({"question":"quizRuleLength3","div":"quizRule5"})

      self.data['quizAnswers'].append({"question":"quizFitHistory1","div":"quizNone"})
      self.data['quizAnswers'].append({"question":"quizFitHistory2","div":"quizRule2"})
      self.data['quizAnswers'].append({"question":"quizFitHistory3","div":"quizRule1"})

      self.data['quizAnswers'].append({"question":"quizSelectRuleFromSet1","div":"quizRuleR2"})
      self.data['quizAnswers'].append({"question":"quizSelectRuleFromSet2","div":"quizRuleDR"})
      self.data['quizAnswers'].append({"question":"quizSelectRuleFromSet3","div":"quizRuleR4"})

      self.data['quizAnswers'].append({"question":"addRuleQuiz","constructor":[[0,1],[1,1],[0,1],[0]]})
      self.data['quizAnswers'].append({"question":"deleteRuleQuiz","constructor":[[0,1],[1]]})
      self.data['quizAnswers'].append({"question":"firstPeriodRuleQuiz","thisRule":1,"defaultType":'setFirstPeriod'})

   def submitQuizAnswer(self,message,client):
      sid=client.subjectID
      self.data[sid].status["answer"]="incorrect"
      correct=False
      thisAnswer=message['answer']
      self.data[sid].quizChoices.append([thisAnswer,time.time()])
      matches=0
      for a in self.data['quizAnswers']:
         if a==thisAnswer:
            matches=1
      if matches==1:
         self.data[sid].status["answer"]="correct"
         self.data[sid].quizEarnings[1]+=1#correct
      else:         
         self.data[sid].status["answer"]="incorrect"
      self.data[sid].quizEarnings[2]+=1#totalTries

      if self.data[sid].quizEarnings[1]>17:#17
         self.data[sid].quizEarnings[0]=5#money

      if self.data[sid].quizEarnings[2]==20:
         self.data[sid].status['quizStatus']='complete'
      incorrect=self.data[sid].quizEarnings[2]-self.data[sid].quizEarnings[1]
      if incorrect>=3:
         self.data[sid].status['quizStatus']='incorrect'

      self.data[sid].status['quizInfo']=self.data[sid].quizEarnings
      self.data[sid].quizAnswers["status"][self.data[sid].status["question"]]=self.data[sid].status["answer"]
      self.data[sid].appendStatus("quizAnswer")
      self.updateStatus(sid)
      self.monitorMessage()
      self.checkSubjectsQuiz()

   def checkSubjectsQuiz(self):
      allDone=1
      for sid in self.data['subjectIDs']:
         if self.data[sid].status['quizStatus']=="working":
            allDone=0
      if allDone==1:
         self.finishInstructionsQuiz({"type":"finishInstructionsQuiz"},"")

   def finishInstructionsQuiz(self,message,client):
      self.taskDone(message)
      self.setMatchingsByQuiz()
      for sid in self.data['subjectIDs']:
         if self.data[sid].group=="high":
            self.data[sid].status={"page":"generic","message":["There are %s participants in your group (including yourself).<br> Everyone in your group earned $5.00 on the quiz."%(len(self.data['groups']["high"]))]}
         else:
            self.data[sid].status={"page":"generic","message":["There are %s participants in your group (including yourself)."%(len(self.data['groups']["low"]))]}
         self.updateStatus(sid)
      self.monitorMessage()


   def setInstructionsStatus(self):
      thisStatus={"previousPayoffIndex":1,"payoffHistory":[[32,32],[25,25],[50,12],[25,25],[50,12],[25,25],[50,12],[25,25],[50,12],[25,25],[50,12],[25,25],[50,12],[25,25],[12,50],[32,32],[12,50],[25,25],[50,12],[50,12],[32,32],[50,12],[12,50],[50,12],[25,25],[32,32],[50,12],[50,12],[32,32],[32,32],[12,50],[25,25],[12,50],[50,12],[12,50]],"period":36,"warning":"yes","actionProfileFrequencies":[6,6,13,10],"animate":"no","matchPayoff":[1200,934],"confirmed":"no","firstPeriodRule":0,"match":2,"totalPayoff":1313,"lastPlay":-1,"defaultRule":0,"stage":"timer","nextChoiceInfo":{"action":0,"length":0,"number":"default0"},"message":["Loading..."],"lastChoiceInfo":{"action":0,"length":0,"number":"default0"},"choices":["W","Y"],"ruleInfo":[["firstPeriod0","First Period Rule",[[0]],"M2P1",2],["default0","Default Rule",[[0]],"M2P35",11]],"payoffs":[[32,32],[12,50],[50,12],[25,25]],"page":"game","history":[[0,0],[1,1],[1,0],[1,1],[1,0],[1,1],[1,0],[1,1],[1,0],[1,1],[1,0],[1,1],[1,0],[1,1],[0,1],[0,0],[0,1],[1,1],[1,0],[1,0],[0,0],[1,0],[0,1],[1,0],[1,1],[0,0],[1,0],[1,0],[0,0],[0,0],[0,1],[1,1],[0,1],[1,0],[0,1]]}
      for sid in self.data['subjectIDs']:
         self.data[sid].status=thisStatus
         self.updateStatus(sid)

   def confirmChoiceDirectResponse(self,message,client):
      sid=client.subjectID
      self.data[sid].confirmChoiceDirectResponse(message['choice'])
      self.checkPartner(sid)

   def experimentSpecificMonitorTableEntries(self):
      self.data['monitorTableInfo']=[
      ['Group'         ,'self.data[sid].group'],
      ['Page'         ,'self.data[sid].status["page"]'],
      ['Match'          ,'self.data["currentMatch"][self.data[sid].group]'],
      ['Period'         ,'self.data[sid].currentPeriod'],
      ['#Rules'        ,"len(self.data[sid].rules['current']['regular'])"],
      ['play t-3'        ,"self.data[sid].history[self.data['currentMatch'][self.data[sid].group]][-3][0]"],
      ['play t-2'        ,"self.data[sid].history[self.data['currentMatch'][self.data[sid].group]][-2][0]"],
      ['play t-1'        ,"self.data[sid].history[self.data['currentMatch'][self.data[sid].group]][-1][0]"],
      ['TotalPayoff'     ,"self.data[sid].totalPayoffString"],
      # ['MatchPay'       ,'self.data[sid].myMatchPayoffs[self.data["currentMatch"]]'],
      # ['Pay t-3'        ,'self.data[sid].payoffHistory[self.data["currentMatch"]][-3]'],
      # ['Pay t-2'        ,'self.data[sid].payoffHistory[self.data["currentMatch"]][-2]'],
      # ['Pay t-1'        ,'self.data[sid].payoffHistory[self.data["currentMatch"]][-1]'],
      ]
      self.updateMonitorTableEntries()
   def instructionsSpecificMonitorTableEntries(self):
      self.data['monitorTableInfo']=[
      ['page'         ,'self.data[sid].status["page"]'],
      ['stage'         ,'self.data[sid].status["stage"]'],
      ['Correct'          ,'self.data[sid].quizEarnings[1]'],
      ['Total'         ,'self.data[sid].quizEarnings[2]'],
      ['quizStatus'    ,"self.data[sid].status['quizStatus']"],
      ['Group'         ,'self.data[sid].group'],
      # ['MatchPay'       ,'self.data[sid].myMatchPayoffs[self.data["currentMatch"]]'],
      # ['Pay t-3'        ,'self.data[sid].payoffHistory[self.data["currentMatch"]][-3]'],
      # ['Pay t-2'        ,'self.data[sid].payoffHistory[self.data["currentMatch"]][-2]'],
      # ['Pay t-1'        ,'self.data[sid].payoffHistory[self.data["currentMatch"]][-1]'],
      ]
      self.updateMonitorTableEntries()


class subjectClass():
   def __init__(self):
      self.status={"page":"generic","message":["Loading..."],"stage":"initializing"}
      # self.status={"stage":1,"page":"instructionsRulesFirst",
      self.status['message']=["Please read, sign, and date your consent form. <br> You may read over the instructions as we wait to begin."]
      self.statusHistory=[]
      self.statusHistoryIndex=0
      self.history={}
      self.opponentHistory={}
      self.actionProfileFrequencies={}
      self.gameTable={}
      self.partners={}
      self.roles={}
      self.matchPayoffs={}#Me,You
      self.totalPayoffs=0#Me,You
      self.quizEarnings=[0.00,0,0]#money,correct,totalTries
      self.quizChoices=[]#money,correct,totalTries
      self.quizAnswers={}
      self.quizAnswers['status']={}
      self.quizAnswers['answers']={}
      # self.quizAnswers=[]
      self.lastInfo={}
      self.lastInfo['play']=-1
      self.lastInfo['rule']=-1
      self.lastInfo['ruleLength']=-1
      self.currentPeriod=0
      self.currentMatch=0
      self.freeLock=0
      self.group="notSet"
      self.oldRules=[]
      self.resetAllRules()
      self.timePerQuestion=20
      self.timeUntilWarning=5
      self.totalPayoffString="$0"
      self.otherActionAttempts=[]
      # self.setInstructionStatus()

   def setInstructionStatus(self):
      # self.status["previousPayoffIndex"]=1
      self.status["payoffHistory"]=[[32,32],[25,25],[50,12],[25,25],[50,12],[25,25],[50,12],[25,25],[50,12],[25,25],[50,12],[25,25],[50,12],[25,25],[12,50],[32,32],[12,50],[25,25],[50,12],[50,12],[32,32],[50,12],[12,50],[50,12],[25,25],[32,32],[50,12],[50,12],[32,32],[32,32],[12,50],[25,25],[12,50],[32,32],[12,50]]
      self.status["period"]=36
      self.status["warning"]="yes"
      self.status["actionProfileFrequencies"]=[6,6,13,10]
      self.status["animate"]="no"
      self.status["matchPayoff"]=[1200,934]
      self.status["confirmed"]="yes"
      self.status["firstPeriodRule"]=0
      self.status["match"]=2
      self.status["totalPayoff"]=1313
      self.status["lastPlay"]=-1
      self.status["defaultRule"]=0
      self.status["stage"]="timer"
      self.status["nextChoiceInfo"]={"action":0,"length":0,"number":"default0"}
      self.status["message"]=["Loading..."]
      self.status["lastChoiceInfo"]={"action":0,"length":0,"number":"default0"}
      self.status["choices"]=["W","Y"]
      self.status["ruleInfo"]=[["firstPeriod0","First Period Rule",[[0]],"M2P1",2],["default0","Default Rule",[[0]],"M2P35",11]]
      self.status["payoffs"]=[[32,32],[12,50],[50,12],[25,25]]
      self.status["history"]=[[0,0],[1,1],[1,0],[1,1],[1,0],[1,1],[1,0],[1,1],[1,0],[1,1],[1,0],[1,1],[1,0],[1,1],[0,1],[0,0],[0,1],[1,1],[1,0],[1,0],[0,0],[1,0],[0,1],[1,0],[1,1],[0,0],[1,0],[1,0],[0,0],[0,0],[0,1],[1,1],[0,1],[0,0],[0,1]]
      self.status['supergameInfo']={}
      self.status['supergameInfo']['supergameType']="instructions"
      self.status['page']='fitTheHistoryInstructions'
      # self.status['page']='instructionsRulesFirst'
      # self.status['page']='instructionMultipleRulesFitTheHistory'
      # self.status['page']='instructionsMatches'
      self.status['page']='overviewScreen'
      # self.status['page']='instructionsPayoffTable'
      self.status['stage']='1'
      self.status['quizStatus']='working'
      self.appendStatus()

   def checkStatus(self,thisStatus,toBeDeleted):
      shouldBeDeleted=False
      for k in toBeDeleted:
         if "answer" in k and "answer" in thisStatus:
            if k['page']==thisStatus['page'] and k['answer']==thisStatus['answer'] and k['stage']==thisStatus['stage']:
               shouldBeDeleted=True
      return shouldBeDeleted

   def appendStatus(self,appendType="regular"):
      self.getQuizAnswer()
      thisStatus=copy.deepcopy(self.status)
      if appendType=="quizAnswer":
         self.statusHistory=self.statusHistory[0:self.statusHistoryIndex]+[thisStatus]#don't add status from before for quiz answers
      else:
         self.statusHistory=self.statusHistory[0:self.statusHistoryIndex+1]+[thisStatus]
      self.statusHistoryIndex=len(self.statusHistory)-1
      self.status['backButton']="yes"
      self.status['forwardButton']="no"
      # print("")
      # print("")
      # for k in self.statusHistory:
      #    print(k['page'],k['stage'])

      # for k in self.statusHistory:
      #    print("!!!!!!!!",k)
   def backStatus(self):
      # print(self.statusHistoryIndex)
      self.statusHistoryIndex-=1
      if self.statusHistoryIndex<=0:
         self.statusHistoryIndex=0
      self.status=copy.deepcopy(self.statusHistory[self.statusHistoryIndex])
      self.status['backButton']="yes"
      self.status['forwardButton']="yes"
      if self.statusHistoryIndex==0:
         self.status['backButton']="no"
      self.getQuizAnswer()
   def forwardStatus(self):
      self.statusHistoryIndex+=1
      if self.statusHistoryIndex>=len(self.statusHistory):
         self.statusHistoryIndex=len(self.statusHistory)-1
      self.status=copy.deepcopy(self.statusHistory[self.statusHistoryIndex])
      self.getQuizAnswer()
      self.status['backButton']="yes"
      self.status['forwardButton']="yes"
      if self.statusHistoryIndex==len(self.statusHistory)-1:
         self.status['forwardButton']="no"
   def getQuizAnswer(self):
      if 'question' in self.status:
         questionName=self.status['question']
         if questionName not in self.quizAnswers['status']:
            self.quizAnswers['status'][questionName]="none"
         if questionName not in self.quizAnswers['answers']:
            self.quizAnswers['answers'][questionName]=[]
         self.status['answer']=self.quizAnswers['status'][questionName]



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
      self.currentPeriod=1
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

   def updateNonRuleStats(self):
      self.status['history']=self.getClientHistory()
      self.status['payoffHistory']=self.getClientPayoffHistory()
      self.status['period']=self.currentPeriod
      self.status['lastPlay']=self.lastPlay
      self.status['matchPayoff']=self.matchPayoffs[self.currentMatch]
      self.status['totalPayoff']=self.totalPayoffs
      self.status['actionProfileFrequencies']=self.actionProfileFrequencies[self.currentMatch]


   def getClientHistory(self):
      myHistory=self.history[self.currentMatch]
      theirHistory=self.opponentHistory[self.currentMatch]
      history=[]
      for a,b in zip(myHistory,theirHistory):
         history.append([a[0],b])
      return history
   
   def getClientPayoffHistory(self):
      myHistory=self.history[self.currentMatch]
      theirHistory=self.opponentHistory[self.currentMatch]
      history=[]
      for a,b in zip(myHistory,theirHistory):
         index=2*a[0]+b
         thisPayoff=self.gameTable[self.currentMatch][index]
         history.append(thisPayoff)
      return history

   def getNextPlayInfo(self):
      history=[[x[0],y] for x,y in zip(self.history[self.currentMatch],self.opponentHistory[self.currentMatch])]
      thisRule=self.pickRule(history)
      self.status['nextChoiceInfo']={}
      try:
         self.status['nextChoiceInfo']['action']=thisRule.output
         self.status['nextChoiceInfo']['number']=thisRule.number
         self.status['nextChoiceInfo']['length']=thisRule.length
         self.status['nextChoiceInfo']['info']=thisRule.getRuleInfo()
      except:
         self.status['nextChoiceInfo']['action']=-1
         self.status['nextChoiceInfo']['number']=-1
         self.status['nextChoiceInfo']['length']=-1
         self.status['nextChoiceInfo']['info']=["NA","NA","NA","NA"]



   def confirmChoice(self):
      history=[[x[0],y] for x,y in zip(self.history[self.currentMatch],self.opponentHistory[self.currentMatch])]
      thisRule=self.pickRule(history)
      thisRule.ruleUsed(self.currentMatch,self.currentPeriod)
      self.status['lastChoiceInfo']={}
      self.status['lastChoiceInfo']['action']=thisRule.output
      self.status['lastChoiceInfo']['number']=thisRule.number
      self.status['lastChoiceInfo']['length']=thisRule.length
      self.history[self.currentMatch].append(thisRule.output)
      self.status['confirmed']="yes"


   def confirmChoiceDirectResponse(self,choice):
      self.status['confirmed']="yes"
      if(choice)==0:
         self.status['choice']="W"
      elif(choice)==1:
         self.status['choice']="Y"
      self.status['lastChoiceInfo']={}
      self.status['lastChoiceInfo']['action']=choice
      self.status['lastChoiceInfo']['number']=1
      self.status['lastChoiceInfo']['length']=1
      self.history[self.currentMatch].append([choice,"directResponse",choice,time.time()])
      self.status['confirmed']="yes"      
      
   def confirmChoiceNonBinding(self,choice):
      history=[[x[0],y] for x,y in zip(self.history[self.currentMatch],self.opponentHistory[self.currentMatch])]
      thisRule=self.pickRule(history)
      thisRuleChoice=thisRule.output
      self.status['otherActionConfirmation']="false"
      if choice=="ruleSet":
         self.lastPlay=thisRuleChoice
         thisRule.ruleUsed(self.currentMatch,self.currentPeriod)
         self.status['lastChoiceInfo']={}
         self.status['lastChoiceInfo']['action']=self.lastPlay
         self.status['lastChoiceInfo']['number']=thisRule.number
         self.status['lastChoiceInfo']['length']=thisRule.length
      elif choice=="otherAction":
         self.lastPlay=1-thisRuleChoice#other action
         self.otherActionAttempts.append(["confirm",time.time(),self.currentPeriod,self.currentMatch,self.lastPlay])
         thisRule.ruleNotUsed(self.currentMatch,self.currentPeriod)
         self.status['lastChoiceInfo']={}
         self.status['lastChoiceInfo']['action']=self.lastPlay
         self.status['lastChoiceInfo']['number']=-1
         self.status['lastChoiceInfo']['length']=-1

      self.status['nonBindingChoice']=choice
      self.history[self.currentMatch].append([self.lastPlay,choice,thisRule.number,time.time()])
      self.status['confirmed']="yes"


   def confirmChoiceNoChange(self):
      history=[[x[0],y] for x,y in zip(self.history[self.currentMatch],self.opponentHistory[self.currentMatch])]
      thisRule=self.pickRule(history)
      thisRuleChoice=thisRule.output
      self.lastPlay=thisRuleChoice
      thisRule.ruleUsed(self.currentMatch,self.currentPeriod)
      self.status['lastChoiceInfo']={}
      self.status['lastChoiceInfo']['action']=self.lastPlay
      self.status['lastChoiceInfo']['number']=thisRule.number
      self.status['lastChoiceInfo']['length']=thisRule.length
      self.history[self.currentMatch].append([self.lastPlay,"noChange",thisRule.number,time.time()])
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

   def totalPayoffStringFunction(self,exchangeRate):
      quiz=float(self.quizEarnings[0])
      other=self.totalPayoffs*exchangeRate
      total=quiz+other
      this="%.02f+%.02f=$%.02f"%(quiz,other,total)
      self.totalPayoffString=this




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
      self.periodsUsed=[]
      self.periodsNotUsed=[]


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
      self.frequency+=1
      self.lastUsed="M%sP%s"%(match,period)
      self.periodsUsed.append([match,period,time.time()])

   def ruleNotUsed(self,match,period):
      self.periodsNotUsed.append([match,period,time.time()])

   def getRuleInfo(self):
      #each entry in the list should be like: [number,title,constructor,lastPlayed,totalPlayed]
      if self.number.find("default")>-1:
         title="Default Rule"
      elif self.number.find("firstPeriod")>-1:
         title="First Period Rule"
      else:
         title="Rule #%s"%(self.number)
      return [self.number,title,self.rule,self.lastUsed,self.frequency]


