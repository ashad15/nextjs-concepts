
"use client"


function ExpiredCards({cards, onDragStart, onDragStop}: {cards : cardArray, onDragStart : (e : React.DragEvent<HTMLDivElement>) => void, onDragStop :(e : React.DragEvent<HTMLDivElement>) => void}  ) {
  return (
    <div onDragOver={(e) => e.preventDefault()}
    onDrop={onDragStop} style={{border : '1px solid', padding :'12px'}}>
      {cards.map((card: cardInfoType) => {
        return (
            <div draggable  onDragStart={(e) => {onDragStart(e)}} style={{border : '1px solid', padding :'12px'}}>
            <h1>{card.name}</h1>
            <p>{card.desc}</p>
          </div>
        );
      })}
    </div>
  );
}

function OngoingCard({cards, onDragStart, onDragStop}: {cards : cardArray, onDragStart : (e : React.DragEvent<HTMLDivElement>) => void, onDragStop :(e : React.DragEvent<HTMLDivElement>) => void}  ) {
  return (
     <div onDragOver={(e) => e.preventDefault()}
     onDrop={onDragStop} style={{border : '1px solid', padding :'12px'}}>
      {cards.map((card: cardInfoType) => {
        return (
            <div id= 'asasdad' draggable  onDragStart={(e) => {onDragStart(e)}} style={{border : '1px solid', padding :'12px'}}>
            <h1>{card.name}</h1>
            <p>{card.desc}</p>
          </div>
        );
      })}
    </div>
  );
}

function CompletedCard({cards, onDragStart, onDragStop}: {cards : cardArray, onDragStart : (e : React.DragEvent<HTMLDivElement>) => void, onDragStop :(e : React.DragEvent<HTMLDivElement>) => void}  ) {
  return (
    <div onDragOver={(e) => e.preventDefault()}
    onDrop={onDragStop} style={{border : '1px solid', padding :'12px'}}>
      {cards.map((card: cardInfoType) => {
        return (
            <div draggable  onDragStart={(e) => {onDragStart(e)}} style={{border : '1px solid', padding :'12px'}}>
            <h1>{card.name}</h1>
            <p>{card.desc}</p>
          </div>
        );
      })}
    </div>
  );
}

function CardsContainer({children}: {children : React.ReactNode}) {

  return (
    <div style={{ display: "flex", gap: "20px", height: "100%" }}>
      {children}
    </div>
  );
}

let Cards = Object.assign(CardsContainer, {
  CompletedCard,
  OngoingCard,
  ExpiredCards,
});

export default Cards;
