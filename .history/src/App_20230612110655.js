import React, { useState, useEffect} from "react";
import { Header } from "./components/header";
import Draggable from "react-draggable";

export default function App() {

  const [board, setBoard] = useState([])
  
  return (
    <div>
     <Header />
     <div style={styles.boardContainer}>
      {board.map((list) => {
       return (
        <div id={`list_${list.id}`} key={list.id} className="list-container" style={styles.listContainer}>
         <h2>{list.title}</h2>
         <button
          style={styles.newCard}
          onClick={() => {
           let temp_boards = [...board]
           for (const element of temp_boards) {
            if (element.id === list.id) {
             element.cards.push({
              id: new Date().getTime(),
              title: 'New Card',
              description: 'New Card Description'
             })
            }
           }
           setBoard(temp_boards)
          }}
         >+ New Card</button>
         {list.cards.map((card) => {
          return (
           <Draggable
            key={card.id}
            onStop={(e,) => {
              
            }}
           >
            <div style={styles.cardContainer}>
             <input type={"text"} style={styles.title} value={card.title}
              onChange={(e) => {
                let allLists = document.querySelector('.list-container');
                for (let i = 0; i < allLists.clientHeight;)
              }}
             />
             <input type={"text"} style={styles.description} value={card.description}
              onChange={(e) => {
                
              }}
             />
            </div>
           </Draggable>
          )
         })}
        </div>
       )
      })}
     </div>
    </div>
   );
  }