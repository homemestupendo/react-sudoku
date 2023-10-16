import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const Square = props => {

    return (
        <button className="square" onClick={props.onClick}>
            {/* TODO */}
        </button>
    );
}

const Board = props => {

    const renderSquare = (i) => {
        return <Square key={`square-${i}`} onClick={handleClick} />;
    }

    const renderLine = () => {
        return (
            <div className="board-row">
                {squares}
            </div>
        )
    }

    const handleClick = () => {
        console.log("clicked!")
    }

    const squares = new Array(9).fill(null).map((element, index) => {
        return renderSquare(index);
    });

    return (
        <div>
            {renderLine()} 
            {renderLine()} 
            {renderLine()}
            {renderLine()} 
            {renderLine()} 
            {renderLine()}  
            {renderLine()} 
            {renderLine()} 
            {renderLine()} 
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

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
