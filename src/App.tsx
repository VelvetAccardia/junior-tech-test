import { ReactElement, useState } from 'react';
import './App.css'

interface ClickProps {
  clientX: number;
  clientY: number;
}

function App() {
  const [ click, setClick ] = useState<ClickProps[]>([]);
  const [ undo, setUndo] = useState<ClickProps[]>([]);

  const getCoordinates = (e: React.MouseEvent<HTMLElement>) => {

    const {clientX, clientY } = e;

    setClick(
      [...click,
      {
        clientX,
        clientY
      }])

  }

  const handleUndoCircles = ( ) => {
    const newClicks =  [...click]
    const undoCircle = newClicks.pop();
    setClick(newClicks)
    if (!undoCircle) return
    setUndo([...undo, undoCircle])

  }

  const handleRedoCircles = ( ) => {
    const newUndo = [...undo ]
    const redoCircle = newUndo.pop()
    if (!redoCircle) return
    setUndo(newUndo)
    setClick([...click, redoCircle])

  }
  return (
  <>
    <button disabled={ click.length === 0}onClick={handleUndoCircles}>Undo</button>
    <button onClick={handleRedoCircles}>Redo</button>
    <div className="App" onClick={getCoordinates} >
        {click.map((clickedPoint, index) => {
          return(
            <div 
            key={index}
            style={{
              left: clickedPoint.clientX - 8,
              top: clickedPoint.clientY - 7,
              position: 'absolute',
              borderRadius: '50%',
              backgroundColor: 'red',
              width: '25px',
              height: '25px'
            }}></div>
          )
        })}
    </div>
  </>
  )
}

export default App
