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
              let allLists = document.querySelectorAll('.list-container');
              for (const element of allLists) {
                let list = element;
                let rect = list.getBoundingClientRect();
                let data = {
                  x: e.clientX,
                  y: e.clientY
                }
                let flag = false
                if (data.x > rect.left && data.x < rect.right && data.y > rect.top && data.y < rect.bottom) {
                  let final_list_id = list.id.split('_')[1];
                  let final_card_id = card.id;
                  for (let boardIndex = 0; boardIndex < temp_boards.length; boardIndex++) {
                    if (temp_boards[boardIndex].cards[boardIndex].id === final_card_id) {
                      temp_boards[boardIndex].cards.splice(boardIndex, 1)
                    }
                  }
                }
                for (const element of temp_boards) {
                  if (element.id === parseInt(final_list_id)) {
                    element.cards.push(card)
                  }
                }
                flag = true
                setBoard(temp_boards)
              }
            }
          }
           >
            <div style={styles.cardContainer}>
             <input type={"text"} style={styles.title} value={card.title}
              onChange={(e) => {
                let temp_boards = [...board]
                for (let i)
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