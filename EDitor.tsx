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

import React, { useEffect, useState } from "react";
import "./App.css";

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
  const [noWinner, setNoWinner] = useState(false)


  const onClick = (key) => {
    if(alreadyDone.includes(key))return;
    if(playerOneTurn){
      setPlayerOneScores((prev:any) => {return [...prev, key]})
        
    }
    else{
      setPlayerTwoScores((prev:any) => {return [...prev, key]})
    }
    setPlaterOneTurn(prev => !prev);
  }


  useEffect(() => {
      checkForWin();
  }, [playerOneScores, playerTwoScores]);


  const checkForWin = () => {
      let total = playerOneScores?.length + playerTwoScores?.length
      if(!total)return;
      if(total === (boardSize * boardSize)){
        setNoWinner(true);
        return;
      }

  }

  console.log(playerOneScores, playerTwoScores)

  return (
    <>
      <div className="app">
        <div style={{ border: "1px solid " }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(5, 1fr)`,
              gridTemplateRows: `repeat(5, 1fr)`,
            }}
          >
            {(() => {
              const items = [];
              let i = 0;
             
              while (i < boardSize) {
                let j = 0;
                while(j < boardSize){
                    let key = `${i}-${j}`
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
        </div>
      </div>
    </>
  );
}

export default App;
