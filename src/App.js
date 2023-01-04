import React, { useState } from 'react';
import './style.css';

export default function App() {
  const [dotsList, setDotsList] = useState([]);
  const [undoButtonClicked, setundoButtonClicked] = useState(false);
  const [removedDotsStack, setremovedDotsStack] = useState([]);

  const createDot = (event) => {
    setDotsList((prev) => [...prev, { x: event.clientX, y: event.clientY }]);
  };

  const removeLastDot = () => {
    setundoButtonClicked(true);
    const lastDot = dotsList[dotsList.length - 1];
    setDotsList(dotsList.slice(0, dotsList.length - 1));
    setremovedDotsStack((prev) => [...prev, lastDot]);
  };

  const handleClick = (event) => {
    createDot(event);
    setremovedDotsStack([]);
    setundoButtonClicked(false);
  };

  const putBackLastDot = () => {
    const lastRemovedDot = removedDotsStack[removedDotsStack.length - 1];
    setDotsList((prev) => [...prev, lastRemovedDot]);
    setremovedDotsStack(removedDotsStack.slice(0, removedDotsStack.length - 1));
  };

  return (
    <>
      {dotsList.length > 0 && (
        <button onClick={removeLastDot} className="button undo">
          undo
        </button>
      )}
      {undoButtonClicked && removedDotsStack.length > 0 && (
        <button onClick={putBackLastDot} className="button redo">
          redo
        </button>
      )}
      <div id="app" onClick={(e) => handleClick(e)}>
        {dotsList.map((dot) => (
          <span
            key={`${dot.y}-${dot.x}`}
            className="dot"
            style={{ top: dot.y, left: dot.x }}
          ></span>
        ))}
      </div>
    </>
  );
}
