import { createContext, useContext, useEffect, useState } from "react";

// src/App.tsx
type ShippingData = { name: string; address: string; zip: string };
type PaymentData = { cardNumber: string; expiry: string; cvv: string };

type WizardState = {
  step: 0 | 1 | 2;
  shipping: ShippingData;
  payment: PaymentData;
  status: "idle" | "submitting" | "success";
};



const steps = {
    1 : 'step 1',
    2 :  'step 2',
    3 : 'step 3'
}

const StepperContext = createContext<any>(null)

function StepperContainer(){


    const [ currentStep, setCurrentStep] = useState(1); 
    const [lastCompletedStep , setLastCompletedStep] = useState(0);
    const [setpsData, setStepsData] = useState({step1: {}, step2: {}, step3: {}});


   

    const contextValue = {currentStep, setCurrentStep, setLastCompletedStep, lastCompletedStep, setpsData, setStepsData};





    return (
        <section>
          <h1>hey</h1>
            <StepperContext.Provider value = {contextValue}>
           <StepperSec>
                {currentStep === 1 ? <StepperSec.StepperStep1/> : currentStep === 2 ?  <StepperSec.StepperStep2/> : currentStep === 3 ? <StepperSec.StepperStep3/> : null}
                </StepperSec>
            </StepperContext.Provider>
        </section>
    )


}

function StepperStep3({}){

  const {currentStep, setCurrentStep, setLastCompletedStep, lastCompletedStep, setpsData, setStepsData} = useContext(StepperContext)
  const [currentStepData, setCurrentStepData] = useState(setpsData?.step3) ;
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [sumitProgress, setSubmitInProgress] = useState(false)

  const onItemsChnage = (e :any) => {
    console.log(e.target.name)
      let currentStepDataCopy = JSON.parse(JSON.stringify(currentStepData))
      if(e?.target?.name === 'address'){
          currentStepDataCopy.address = e.target.value;
      }
      setCurrentStepData(currentStepDataCopy)
  }


  useEffect(() => {
      if(currentStepData?.address?.length){
          if(submitDisabled)setSubmitDisabled(false)
      }
      else{
          if(!submitDisabled)setSubmitDisabled(true)
      }
  }, [currentStepData]);

  const onSubmitStep = () => {
    if(lastCompletedStep < currentStep){
      setLastCompletedStep(currentStep)
      const stepsData = JSON.parse(JSON.stringify(setpsData));
      stepsData.step3 = currentStepData;
      setStepsData(stepsData);
      setSubmitInProgress(true);
      setTimeout(() => {
        setSubmitInProgress(false);
      },2000)
      //c
    }

  }


  return (
      <div>
          <section >
              <input  onChange={onItemsChnage} type = 'text' name  = 'address' value = {currentStepData?.address || ''}/>
              
          </section>
          <footer>
              <button   disabled  ={submitDisabled} onClick={submitDisabled ? () => {} : onSubmitStep}>Submit</button>
          </footer>
      </div>
  )

}


function StepperStep2({}){

  const {currentStep, setCurrentStep, setLastCompletedStep, lastCompletedStep, setpsData, setStepsData} = useContext(StepperContext)
  const [currentStepData, setCurrentStepData] = useState(setpsData?.step2) ;
  const [submitDisabled, setSubmitDisabled] = useState(true)

  const onItemsChnage = (e :any) => {
      let currentStepDataCopy = JSON.parse(JSON.stringify(currentStepData))
      if(e?.target?.name === 'countryCode'){
          currentStepDataCopy.countryCode = e.target.value;
      }
      if(e?.target?.name === 'phoneNumber'){
          currentStepDataCopy.phoneNumber = e.target.value;
      }
      setCurrentStepData(currentStepDataCopy)
  }


  useEffect(() => {
      if(currentStepData?.phoneNumber?.length && currentStepData?.countryCode?.length){
          if(submitDisabled)setSubmitDisabled(false)
      }
      else{
          if(!submitDisabled)setSubmitDisabled(true)
      }
  }, [currentStepData]);

  const onSubmitStep = () => {
    setCurrentStep((prev:any) => prev+1);
    if(lastCompletedStep < currentStep){
      setLastCompletedStep(currentStep)
      const stepsData = JSON.parse(JSON.stringify(setpsData));
      stepsData.step2 = currentStepData;
      setStepsData(stepsData);
    }

  }


  return (
      <div>
          <section >
              <input  onChange={onItemsChnage} type = 'number' name  = 'countryCode' value = {currentStepData?.countryCode || ''}/>
              <input onChange={onItemsChnage}  type = 'number' name  = 'phoneNumber' value = {currentStepData?.phoneNumber || ''}/>
          </section>
          <footer>
              <button  disabled  ={submitDisabled} onClick={submitDisabled ? () => {} : onSubmitStep}>NEXT</button>
          </footer>
      </div>
  )

}

function StepperStep1({}){

    const {currentStep, setCurrentStep, setLastCompletedStep, lastCompletedStep, setpsData, setStepsData} = useContext(StepperContext)
    const [currentStepData, setCurrentStepData] = useState(setpsData?.step1) ;
    const [submitDisabled, setSubmitDisabled] = useState(true)

    const onItemsChnage = (e :any) => {
      console.log(e.target.name)
        let currentStepDataCopy = JSON.parse(JSON.stringify(currentStepData))
        if(e?.target?.name === 'name'){
            currentStepDataCopy.name = e.target.value;
        }
        if(e?.target?.name === 'email'){
            currentStepDataCopy.email = e.target.value;
        }
        setCurrentStepData(currentStepDataCopy)
    }


    useEffect(() => {
        if(currentStepData?.name?.length && currentStepData?.email?.length){
            if(submitDisabled)setSubmitDisabled(false)
        }
        else{
            if(!submitDisabled)setSubmitDisabled(true)
        }
    }, [currentStepData]);

    const onSubmitStep = () => {
      setCurrentStep((prev:any) => prev+1);
      if(lastCompletedStep < currentStep){
        setLastCompletedStep(currentStep)
        const stepsData = JSON.parse(JSON.stringify(setpsData));
        stepsData.step1 = currentStepData;
        setStepsData(stepsData);
      }

    }


    return (
        <div>
            <section >
                <input  onChange={onItemsChnage} type = 'text' name  = 'name' value = {currentStepData?.name || ''}/>
                <input onChange={onItemsChnage}  type = 'text' name  = 'email' value = {currentStepData?.email || ''}/>
            </section>
            <footer>
                <button  disabled  ={submitDisabled} onClick={submitDisabled ? () => {} : onSubmitStep}>NEXT</button>
            </footer>
        </div>
    )

}

function Stepper({children} : {children :any}){

    const {currentStep, setpsData, lastCompletedStep, setCurrentStep} = useContext(StepperContext)

    return (
        <div>
          <h1>asd</h1>
                <div >
                  <div style = {{display : 'flex', alignItems : 'center', justifyContent : 'space-between'}}>
                   <h2> Showwing {currentStep} of 3</h2>
                   <div>
                    <button onClick={() => {setCurrentStep((prev:any) => prev -1)}} disabled = {currentStep === 1} > back </button>
                    <button disabled = {currentStep === 3 ||  currentStep === lastCompletedStep}  onClick={() => {setCurrentStep((prev:any) => prev +1)}}>Next</button>
                   </div>
                   </div>
                   {children}
                </div>
        </div>
    )
}


export const StepperSec = Object.assign(Stepper, {
    StepperStep1,
    StepperStep2,
    StepperStep3
  });



function App() {




  // TODO: step state, per-step va
  // 
  // 
  // lidation, stepper nav (back-only jump),
  // fake async submit with loading state
  return (<StepperContainer/>);
}
export default App;







// Builds the URL for a single user. (The bulk /users endpoint is off-limits.)
const USER_URL = (id: number) => `https://dummyjson.com/users/${id}`;

// Load exactly these users. Heads up: some of these ids are invalid.
const USER_IDS = [
  3, 7, 12, 9999, 1, 19, 25, 4, 250, 14, 22, 8, 30, 11, 999, 5, 17, 28, 2, 23,
  9, 26, 15, 6, 20, 13, 27, 10, 24, 18,
];

// DO NOT MODIFY this METHOD. Use it as it is
// Load a single user. This is the only sanctioned fetch path - use it as-is.
// IMPORTANT: the returned object does NOT include `id` (the API does not give
// you back the id you asked for). You must attach the id yourself.
async function fetchUser(id: number) {
  const res = await fetch(USER_URL(id));
  if (!res.ok)
    throw new Error(`Failed to load user ${id} (HTTP ${res.status})`);
  const user = await res.json();
  delete user.id;
  return user;
}

const columns = [
  {
    id: "id",
    name: "ID",
  },
  {
    id: "name",
    name: "Full Name",
  },
  {
    id: "email",
    name: "Email Address",
  },
  {
    id: "phone",
    name: "Phone Number",
  },
  {
    id: "company_address",
    name: "Company Address",
  },
];

const boardSize = 5;

function App() {
  const [playerOneScores, setPlayerOneScores] = useState<any>([]);
  const [playerTwoScores, setPlayerTwoScores] = useState<any>([]);
  const [playerOneTurn, setPlaterOneTurn] = useState(true);
  const [alreadyDone, setAlreadyDone] = useState<any>([]);
  const [noWinner, setNoWinner] = useState(false);
  const [winner, setWinner] = useState('')


  const onClick = (key) => {
    if(alreadyDone.includes(key))return;
    if(playerOneTurn){
      setPlayerOneScores((prev:any) => {return [...prev, key]})
        
    }
    else{
      setPlayerTwoScores((prev:any) => {return [...prev, key]})
    }
    setAlreadyDone((prev : any) => {return [...prev ,  key]})
    setPlaterOneTurn(prev => !prev);
  }


  useEffect(() => {
      checkPossibilities();
  }, [JSON.stringify(playerOneScores) , JSON.stringify(playerTwoScores) ]);


  const checkForWin = (score) => {
    console.log(score)

      const check = (score, type = 'columns') => {

        let foundSomething = false;
          for(let k = 0; k < boardSize; k++){
            let found = true;
            for(let l = 0; l<boardSize ; l++ ){
              let generatedkey = type === 'columns' ?    `${k+1}-${l+1}` :`${l+1}-${k+1}`;
              console.log
              if(!score.includes(generatedkey)){
                found = false;
                break;
              };


            }

            if(found){
              foundSomething = true;
              break;
            }

          }
          return foundSomething;
         
      }

       
      let ans = check(score, 'columns');
      if(!ans){
        ans = check(score, 'rows');
      }

      if(ans){
        setWinner(playerOneTurn ? 'One' : 'Two');
      } 

      

  }



  const checkPossibilities = () => {
      let total = playerOneScores?.length + playerTwoScores?.length;
      if(!total)return;
      if(total === (boardSize * boardSize)){
        setNoWinner(true);
        return;
      }
      if(playerOneTurn)checkForWin(playerOneScores);
      else checkForWin(playerTwoScores);

  }

  console.log(playerOneScores, playerTwoScores)

  return (
    <>
      <div className="app">
        <div style={{ border: "1px solid " }}>
          {winner ? <h1>hey player {winner} you won!</h1>  : noWinner ? <h1>No Winner; Try Again</h1>: 
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${boardSize}, 1fr)`,
              gridTemplateRows: `repeat(${boardSize}, 1fr)`,
            }}
          >
            {(() => {
              const items = [];
              let i = 0;
             
              while (i < boardSize) {
                let j = 0;
                while(j < boardSize){
                    let key = `${i+1}-${j+1}`
                    items.push(<div style={{border : '1px solid', minWidth : '12px', minHeight: '12px'}} onClick={onClick.bind({}, key)}>



                      {playerOneScores.includes(key) ? 'player1' : playerTwoScores.includes(key) ? 'player2' : null}
                    </div>)
                    j++
                }
                i++;
              }
              return items;
            })()}
          </div>
          }
        </div>
      </div>
    </>
  );
}

export default App;



/*
  ~~~~~~~~~~~~~~~~~~~~~~~~~~Problem Statement~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  Build a table of users with the `columns` defined below, plus in-memory
  global search, sorting, and pagination.

  Loading the data - read carefully:
    - The bulk users endpoint is OFF-LIMITS. Do NOT call
      https://dummyjson.com/users.
    - Load each user with the provided `fetchUser(id)` helper - it is the only
      fetch path. Load exactly the ids in `USER_IDS`, as efficiently as you
      reasonably can.
    - IMPORTANT: `fetchUser` does NOT return the user's `id`. You still have to
      show the id in the first column - so track which id you requested and
      attach it yourself.
    - Some ids in `USER_IDS` are invalid - the table must still display every
      user that loads successfully.

  Global Search - search across all columns shown in the table.
*/


import { useEffect, useState } from 'react';
const currentUser = {
  id: 1,
  name: 'ASHAD',
  avatar: 'clock',
};

const generateMsg = (id, text, senderid, reciverid1, timestamp) => {
  return {
    id: id,
    senderId: senderid,
    receiverId: reciverid1,
    text: text,
    timestamp: timestamp,
  };
};

// type ChatData = {
//   users: User[];
//   messages: Message[];
// };

const dummyData = [
  {
    chatName: 'first Chat',
    chatid: 10,
    users: [
      {
        id: 1,
        name: 'ASHAD',
        avatar: 'clock',
      },
      {
        id: 2,
        name: 'ASHAD2',
        avatar: 'pen',
      },
      {
        id: 3,
        name: 'ASHAD3',
        avatar: 'tick',
      },
    ],
    messages: [
      generateMsg(Date.now(), 'hey', 2, -1, Date.now()),
      generateMsg(Date.now(), 'hey2', 1, 2, Date.now()),
      generateMsg(Date.now(), 'heyasd', 3, 1, Date.now()),
    ],
  },
  {
    chatName: 'second Chat',
    chatid: 11,
    users: [
      {
        id: 1,
        name: 'ASHAD',
        avatar: 'clock',
      },
      {
        id: 2,
        name: 'ASHAD2',
        avatar: 'pen',
      },
      {
        id: 3,
        name: 'ASHAD3',
        avatar: 'tick',
      },
    ],
    messages: [
      generateMsg(Date.now(), 'seconda hey', 2, 1, Date.now()),
      generateMsg(Date.now(), 'second hey2', 3, 2, Date.now()),
      generateMsg(Date.now(), 'third asd', 1, 3, Date.now()),
    ],
  },
];

export default function useChatHook() {
  const [chats, setChats] = useState();
  const [ originalChats, setOriginalChats] = useState(dummyData)
  const [currentSelectedChat, setCurrentSelectedChat] = useState({});
  const [inputText, setInputText] = useState('');
  const [searchtext, setSearchText] = useState('');
  const [currentSelectedChatId, setCurrentSelectedChatID] = useState(null)


  useEffect(() => {
    if(!currentSelectedChatId)return;
    let chatsCopy = JSON.parse(JSON.stringify(chats))
    let chat = chatsCopy.find((ch) => ch.chatid === currentSelectedChatId);
    setCurrentSelectedChat(chat);
  }, [currentSelectedChatId, chats])

  const setSelectedChat = (id) => {
    setCurrentSelectedChatID(id)
   
  };

  const onSearch = (e) => {
   let text = e?.target?.value;
   setSearchText(text);
  };


  useEffect(() => {
    const chatsCopy = JSON.parse(JSON.stringify(originalChats));
    let chats = chatsCopy.filter((ch) => ch.chatName?.toLowerCase().includes(searchtext?.toLowerCase()));
    setChats(chats);
  }, [searchtext, originalChats])


  const onChatSend = (chatid) => {
     let newMsg =  generateMsg(Date.now(), inputText, currentUser?.id, -1, Date.now());
     const chatsCopy = JSON.parse(JSON.stringify(originalChats));
     chatsCopy.forEach((ch) => {
       if(ch?.chatid === chatid){
         ch.messages?.push(newMsg);
       } 
     });
     setOriginalChats(chatsCopy);
     setInputText('')

  }

  return {
    chats,
    currentSelectedChat,
    setSelectedChat,
    onSearch,
    currentUser,
    inputText, 
    setInputText,
    onChatSend,

  };
}





import React, { useEffect, useState } from 'react';
import './App.css';

import useChatHook from './useChathook';



function ChatRenderer(){
  
}

export default function App() {
  const { chats, currentSelectedChat, onSearch, setSelectedChat, currentUser, setInputText, inputText, onChatSend} = useChatHook();

  return <div>


    <main style = {{display : 'flex', width : '100%', height : '100vh'}}>
      <section style = {{maxWidth : '30%', borderRight : '1px solid'}}>
        <div>
          <input type = 'text' onChange = {onSearch}/>
        </div>
        <div>
            {chats?.map((ch :any) => {
              return (
                <div onClick = {() => {setSelectedChat(ch.chatid)}} style= {{border : '1px solid black', cursor : 'pointer'}}>
                  <h3>{ch.chatName}</h3>
                
                </div>
              )
            })}
        </div>
      </section>
      <section style = {{flex : '1 1 auto'}}>
        
        {currentSelectedChat?.chatid ? <div style = {{display : 'flex', flexDirection : 'column', height : '100%'}}>
          <div style = {{flex : '1 1 auto'}}>
          {currentSelectedChat?.messages?.map((msg) => {
            if(msg.receiverId === currentUser?.id || msg.receiverId === -1 || msg.senderId === currentUser?.id){
              return(<div style = {{display : 'flex', justifyContent :  msg.senderId === currentUser?.id?  'flex-end' : ''}}>

                <h3>{msg.text}</h3>
                </div>
                )
            }
            
          })}
          </div>
          <div style ={{display  : 'flex', justifyContent :'space-between'}}>
            <input type = 'text' value ={inputText} onChange = {(e) => setInputText(e?.target?.value)}/>
            <button onClick = {() => {onChatSend(currentSelectedChat?.chatid)}}>send</button>
          </div>
          
        </div> : <h1>
          Select a chat to continue</h1>}

      </section>
    </main>
  </div>;
}

