import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const gameNumbers = new Array(9).fill(null);
let invalidNumbers = new Set();

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

        const gameNumber = gameNumbers[row][col]

        //const gameNumber = Math.random() * 1 >= 0.5 ? gameNumbers[row][col] : null;

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


    for (var row = 0; row < gameNumbers.length; row++) {

        gameNumbers[row] = [];

    }

    for (var row = 0; row < gameNumbers.length; row++) {

        const shuffledGameNumbers = shuffleNumbers([1, 2, 3, 4, 5, 6, 7, 8, 9]);

        for (let col = 0; col < 9; col++) {
            gameNumbers[row].push(generateGameNumber(shuffledGameNumbers, col, row));
        }

        invalidNumbers.clear();
    }
}

const generateGameNumber = (shuffledGameNumbers, col, row) => {

    console.log(shuffledGameNumbers)
    let counter = 0;

    let number = shuffledGameNumbers[counter];
    console.log(number)

    while (gameNumbers[row].includes(number) || columnIncludes(col, row, number)) {
        console.log("STUCK")
        counter++;
        number = shuffledGameNumbers[counter]
        console.log("COL", col)
        console.log("ROW", row)
        console.log("INSIDE NUMBER ", number);
        console.log("INSIDE ARRAY ", shuffledGameNumbers);
        console.log(gameNumbers)

        if(number === undefined) {
            return;
        }
    }

    return number;
}

const columnIncludes = (col, rowToSkip, number) => {

    for (let row = 0; row < gameNumbers.length; row++) {

        if (row === rowToSkip) {
            continue;
        }

        if (gameNumbers[row][col] === number) {
            return true;
        }
    }

    return false;
}

const generateRandomNumber = () => {

    const min = 1;
    const max = 9;

    return Math.floor(Math.random() * (max - min + 1) + min);
}

const shuffleNumbers = array => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

generateAllGameNumbers();
console.log("Done")
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
