import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const gameNumbers = new Array(9).fill(new Array(9).fill(null));

const Square = ({ number, gameNumber, onClick }) => {

    const [currentNumber, setCurrentNumber] = useState(null);

    useEffect(() => {
        setCurrentNumber(number ? number : currentNumber)
    });

    return (
        <button
            className="square"
            onClick={onClick}
        >
            {gameNumber}
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
    }, []);

    

    const renderSquare = (col, row) => {

        const gameNumber = 2; 

        const selected = col === selectedColAndRow.col && row === selectedColAndRow.row;

        return (
            <Square
                col
                row
                key={`square-${col}-${row}`}
                onClick={() => handleClick(col, row)}
                selected={selected}
                number={selected ? typedNumber : null}
                gameNumber={gameNumber}
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

const generateAllGameNumbers = () => {
    for (let i = 0; i < gameNumbers.length; i++) {
        for (let j = 0; 0 < gameNumbers[i].length; j++) {
            gameNumbers[i][j] = generateGameNumber();
        }
    }
}

const generateGameNumber = (col, row) => {

    let number = generateRandomNumber();

    while(gameNumbers[row].includes(number)) {
        number = generateRandomNumber();
    }

    gameNumbers[row][col] = number;
    return number;
}

const generateRandomNumber = () => {

    const min = 1;
    const max = 9;

    return Math.floor(Math.random() * (max - min + 1) + min);
}

//generateAllGameNumbers();

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
