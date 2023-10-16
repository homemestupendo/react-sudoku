import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const Square = ({ number, onClick }) => {

    const [currentNumber, setCurrentNumber] = useState(null);

    useEffect(() => {
        setCurrentNumber(number ? number : currentNumber)
    });

    return (
        <button
            className="square"
            onClick={onClick}
        >
            {number ? number : currentNumber}
        </button>
    );
}

const Board = () => {

    const [selectedColAndRow, setSelectedColAndRow] = useState({});
    const [typedNumber, setTypedNumber] = useState(null);

    useEffect(() => {
        document.addEventListener("keydown", ({ key }) => {

            const isValidNumber = /^[1-9]$/i.test(key);
            if (!isValidNumber) {
                return;
            }
            setTypedNumber(key);
        });
    }, [])

    const renderSquare = (col, row) => {

        const selected = col === selectedColAndRow.col && row === selectedColAndRow.row;

        return (
            <Square
                col
                row
                key={`square-${col}-${row}`}
                onClick={() => handleClick(col, row)}
                selected={selected}
                number={selected ? typedNumber : null}
            />
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
        setTypedNumber(null)
        setSelectedColAndRow({ col, row })
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
            <h1>SUDOKU</h1>
            <div className="board-edges">
                <div className="game-board">
                    <Board />
                </div>
            </div>
        </div>
    );
}

const generateGameNumbers = () => {}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
