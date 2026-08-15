"use client"

import { useState } from  'react'

type functiontype = (clickState: boolean) => React.ReactNode;

function StateReducer({
  stateReducer,
  rednerProp,
}: {
  stateReducer: (nextState: boolean) => boolean;
  rednerProp: functiontype;
}) {
  const [toggleOpen, setToggleOpen] = useState(false);

  const onToggleChange = (value: boolean) => {
    const nextState = !value;
    const newValue = stateReducer(nextState);
    setToggleOpen(newValue);
  };

  return (
    <div>
      <h1>inside the child</h1>
      <button
        onClick={() => {
          onToggleChange(toggleOpen);
        }}
      >
        click Status{" "}
      </button>
      {rednerProp(toggleOpen)}
    </div>
  );
}

function stareReducerParent() {
  const returnClickButton = (clickState: boolean) => {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <h1>this is your render Button {clickState}</h1>
      </div>
    );
  };

  return (
    <div>
      <StateReducer
        stateReducer={(value: boolean) => {
          return value;
        }}
        rednerProp={returnClickButton}
      />
    </div>
  );
}

export default stareReducerParent;




