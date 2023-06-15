import React, { useState, useEffect, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Draggable from './Draggable';
import Header from './Header';
import Draggable from 'react-draggable';
import Header from './components/header';

const styles = {
  boardContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '20px',
  },
  listContainer: {
    backgroundColor: '#f2f2f2',
    borderRadius: '5px',
    width: '300px',
    padding: '10px',
    marginRight: '20px',
  },
  newCard: {
    backgroundColor: '#0079bf',
    color: '#fff',
    borderRadius: '3px',
    border: 'none',
    padding: '5px 10px',
    marginBottom: '10px',
    cursor: 'pointer',
  },
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: '3px',
    padding: '10px',
    marginBottom: '10px',
  },
  title: {
    fontWeight: 'bold',
    fontSize: '16px',
    marginBottom: '5px',
    width: '100%',
    border: 'none',
    borderBottom: '1px solid #ccc',
    padding: '5px',
  },
  description: {
    width: '100%',
    border: 'none',
    borderBottom: '1px solid #ccc',
    padding: '5px',
  },
};

function App() {
  const [board, setBoard] = useState([]);

  useEffect(() => {
    const data = window.localStorage.getItem('data');
    if (data) {
      setBoard(JSON.parse(data));
    } else {
      setBoard([
        {
          id: 1,
          title: 'To Do',
          cards: [
            {
              id: uuidv4(),
              title: 'Learn React',
              description: 'Learn the fundamentals of React'
            },
            {
              id: uuidv4(),
              title: 'Learn Firebase',
              description: 'Learn the fundamentals of Firebase'
            }
          ]
        },
        {
          id: 3,
          title: 'Completed',
          cards: [
           {
            id: uuidv4(),
            title: 'Learn Node.js',
            description: 'Learn the fundamentals of Node.js'
           },
           {
            id: uuidv4(),
            title: 'Learn Express',
            description: 'Learn the fundamentals of Express'
           }
          ]
         }
      ]);
    }
  }, []);

  useEffect(() => {
    if (board.length > 0) window.localStorage.setItem('data', JSON.stringify(board));
  }, [board]);

  const memoizedBoard = useMemo(() => board, [board]);

  const addNewCard = (listId) => {
    const updatedBoards = board.map((element) => {
      if (element.id === listId) {
        return {
          ...element,
          cards: [
            ...element.cards,
            {
              id: uuidv4(),
              title: 'New Card',
              description: 'New Card Description',
            },
          ],
        };
      }
      return element;
    });
    setBoard(updatedBoards);
  };

  const onCardStop = (e, card, listId) => {
    const allLists = document.querySelectorAll('.list-container');
    for (const list of allLists) {
      const rect = list.getBoundingClientRect();
      const data = {
        x: e.clientX,
        y: e.clientY,
      };
      if (data.x > rect.left && data.x < rect.right && data.y > rect.top && data.y < rect.bottom) {
        const finalCardId = card.id;
        const tempBoards = board.map((element) => {
          const cards = element.cards.filter((c) => c.id !== finalCardId);
          return {
            ...element,
            cards,
          };
        });
        setBoard(tempBoards);
      }
    }
    const finalListId = listId.split('_')[1];
    const tempBoards = board.map((element) => {
      if (element.id === parseInt(finalListId)) {
        return {
          ...element,
          cards: [...element.cards, card],
        };
      }
      return element;
    });
    setBoard(tempBoards);
  };

  return (
    <div>
      <Header />
      <div style={styles.boardContainer}>
        {memoizedBoard.map((list) => (
          <div id={`list_${list.id}`} key={list.id} className="list-container" style={styles.listContainer}>
            <h2>{list.title}</h2>
            <button style={styles.newCard} onClick={() => addNewCard(list.id)}>
              + New Card
            </button>
            {list.cards.map((card) => (
              <Draggable key={card.id} onStop={(e) => onCardStop(e, card, list.id)}>
                <div style={styles.cardContainer}>
                  <input
                    type="text"
                    style={styles.title}
                    value={card.title}
                    onChange={(e) => {
                      const tempBoards = board.map((element) => {
                        const cards = element.cards.map((c) => {
                          if (c.id === card.id) {
                            return {
                              ...c,
                              title: e.target.value,
                            };
                          }
                          return c;
                        });
                        return {
                          ...element,
                          cards,
                        };
                      });
                      setBoard(tempBoards);
                    }}
                  />
                  <input
                    type="text"
                    style={styles.description}
                    value={card.description}
                    onChange={(e) => {
                      const tempBoards = board.map((element) => {
                        const cards = element.cards.map((c) => {
                          if (c.id === card.id) {
                            return {
                              ...c,
                              description: e.target.value,
                            };
                          }
                          return c;
                        });
                        return {
                          ...element,
                          cards,
                        };
                      });
                      setBoard(tempBoards);
                    }}
                  />
                </div>
              </Draggable>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
