import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const Square = props => {

    const { col, row } = props;

    return (
        <button
            className="square"
            onClick={props.onClick}
        >
            {props.selected ? "T" : "F"}
        </button>
    );
}

const Board = props => {

    const [selected, setSelected] = useState({});
    
    const renderSquare = (col, row) => {
        return (
                <Square 
                    col={col} 
                    row={row} 
                    key={`square-${col}-${row}`} 
                    onClick={() => handleClick(col, row)}
                    selected={col === selected.col && row === selected.row} />
        )
    }

    const renderLine = rowIndex => {

        const squares = new Array(9).fill(null).map((element, squareIndex) => {
            return renderSquare(squareIndex, rowIndex);
        });

        return (
            <div key={`row-${rowIndex}`} className="board-row">
                {squares}
            </div>
        )
    }

    const handleClick = (col, row) => {
        setSelected({ col, row})
    }


    const lines = new Array(9).fill(null).map((element, index) => renderLine(index));

    return (
        <div>
            {lines}
        </div>
    );
}

const Game = () => {

    return (
        <div className="game">
            <div className="game-board">
                <Board />
            </div>
        </div>
    );
}

// ========================================

document.addEventListener("keydown", event => console.log(event.key));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
