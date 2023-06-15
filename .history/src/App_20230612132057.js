import { useState, useEffect, useMemo } from 'react';
import Draggable from 'react-draggable';
import Header from './Header';
import initialBoardData from './initialBoardData.json';
import React from "react";
import { Header } from "./components/header";
import Draggable, { DraggableCore } from "react-draggable";

export default function App() {
  const [board, setBoard] = useState([]);

  useEffect(() => {
    const data = window.localStorage.getItem('data');
    if (data) {
      setBoard(JSON.parse(data));
    } else {
      setBoard(initialBoardData);
    }
  }, []);

  useEffect(() => {
    if (board.length > 0) window.localStorage.setItem('data', JSON.stringify(board));
  }, [board]);

  const memoizedBoard = useMemo(() => board, [board]);

  const addNewCard = (listId) => {
    const tempBoards = [...board];
    for (const element of tempBoards) {
      if (element.id === listId) {
        element.cards.push({
          id: new Date().getTime(),
          title: 'New Card',
          description: 'New Card Description',
        });
      }
    }
    setBoard(tempBoards);
  };

  const onCardStop = (e, card, listId) => {
    const allLists = document.querySelectorAll('.list-container');
    for (const element of allLists) {
      const list = element;
      const rect = list.getBoundingClientRect();
      const data = {
        x: e.clientX,
        y: e.clientY,
      };
      let flag = false;
      if (data.x > rect.left && data.x < rect.right && data.y > rect.top && data.y < rect.bottom) {
        const finalListId = list.id.split('_')[1];
        const finalCardId = card.id;
        for (let boardIndex = 0; boardIndex < element.tempBoards.length; boardIndex++) {
          if (element.tempBoards[boardIndex].cards[boardIndex].id === finalCardId) {
            element.tempBoards[boardIndex].cards.splice(boardIndex, 1);
          }
        }
      }
      for (const element of element.tempBoards) {
        if (element.id === parseInt(finalListId)) {
          element.cards.push(card);
        }
      }
      flag = true;
      setBoard(element.tempBoards);
    }
  };

  return (
    <div>
      <Header />
      <div style={styles.boardContainer}>
        {memoizedBoard.map((list) => {
          return (
            <div id={`list_${list.id}`} key={list.id} className="list-container" style={styles.listContainer}>
              <h2>{list.title}</h2>
              <button style={styles.newCard} onClick={() => addNewCard(list.id)}>
                + New Card
              </button>
              {list.cards.map((card) => {
                return (
                  <Draggable key={card.id} onStop={(e) => onCardStop(e, card, list.id)}>
                    <div style={styles.cardContainer}>
                      <input
                        type={'text'}
                        style={styles.title}
                        value={card.title}
                        onChange={(e) => {
                          const tempBoards = [...board];
                          for (const element of tempBoards) {
                            for (let j = 0; j < element.cards.length; j++) {
                              if (element.cards[j].id === card.id) {
                                element.cards[j].title = e.target.value;
                              }
                            }
                          }
                          setBoard(tempBoards);
                        }}
                      />
                      <input
                        type={'text'}
                        style={styles.description}
                        value={card.description}
                        onChange={(e) => {
                          const tempBoards = [...board];
                          for (let i = 0; i < tempBoards.length; i++) {
                            for (let j = 0; j < tempBoards[i].cards.length; j++) {
                              if (tempBoards[i].cards[j].id === card.id) {
                                tempBoards[i].cards[j].description = e.target.value;
                              }
                            }
                          }
                          setBoard(tempBoards);
                        }}
                      />
                    </div>
                  </Draggable>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

  const styles = {
    boardContainer: {
     display: 'flex',
     flexDirection: 'row',
     justifyContent: 'space-around',
     marginTop: '100px'
    },
    listContainer: {
     backgroundColor: '#ecf0f1',
     borderRadius: '5px',
     padding: '10px',
     width: '30vw',
     minHeight: "100vh",
    },
    cardContainer: {
     backgroundColor: '#ffffff',
     borderRadius: '5px',
     padding: '10px',
     margin: '10px 0',
     minHeight: "100px",
     boxShadow: '0 0 10px 0 rgba(0,0,0,0.2)',
     display:"flex",
     flexDirection:"column",
   
    },
    title: {
     padding: 0,
     margin: 0,
     border:"none",
     fontSize:"20px",
     fontWeight:"bold",
    },
    description: {
     padding: 0,
     margin: 0,
     border:"none",
     fontSize:"15px",
   fontWeight:"bold",
    },
    newCard:{
     backgroundColor: '#2ecc71',
     color: '#ffffff',
     border: 'none',
     width:"100%",
     padding: '10px',
     borderRadius: '5px',
     cursor: 'pointer',
     outline: 'none'
   
    },
   }