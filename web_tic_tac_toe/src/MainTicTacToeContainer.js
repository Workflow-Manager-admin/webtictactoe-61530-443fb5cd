import React, { useState } from "react";

/**
 * MainTicTacToeContainer
 * The main container for the WebTicTacToe application, rendering the board, player moves, and game status.
 */

// PUBLIC_INTERFACE
function MainTicTacToeContainer() {
  // The main game state: 3x3 grid, null/ 'X'/ 'O'
  const [board, setBoard] = useState(Array(9).fill(null));
  // Tracks whether it's X's turn (true) or O's turn (false)
  const [isXNext, setIsXNext] = useState(true);

  // Helper: calculates game status (ongoing, win, draw)
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],[3, 4, 5],[6, 7, 8], // rows
      [0, 3, 6],[1, 4, 7],[2, 5, 8], // cols
      [0, 4, 8],[2, 4, 6]            // diags
    ];
    for (let [a, b, c] of lines) {
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  const winner = calculateWinner(board);
  const movesLeft = board.includes(null);

  // PUBLIC_INTERFACE
  const handleSquareClick = (idx) => {
    if (board[idx] || winner) return;
    const nextBoard = [...board];
    nextBoard[idx] = isXNext ? "X" : "O";
    setBoard(nextBoard);
    setIsXNext((prev) => !prev);
  };

  // PUBLIC_INTERFACE
  const handleRestart = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  // PUBLIC_INTERFACE
  const renderSquare = (idx) => (
    <button
      className="ttt-square"
      key={idx}
      onClick={() => handleSquareClick(idx)}
      style={{
        color: board[idx] === "X" ? "var(--ttt-primary)" : board[idx] === "O" ? "var(--ttt-accent)" : "inherit",
      }}
      aria-label={`Square ${idx} ${board[idx] || ""}`}
      disabled={!!board[idx] || !!winner}
    >
      {board[idx]}
    </button>
  );

  // Status display
  let status;
  if (winner) {
    status = (
      <span>
        <span className="ttt-winner">{winner}</span> wins! 🎉
      </span>
    );
  } else if (!movesLeft) {
    status = <span>It's a draw!</span>;
  } else {
    status = (
      <span>
        Turn:{" "}
        <span
          className={isXNext ? "ttt-playerX" : "ttt-playerO"}
          style={{ color: isXNext ? "var(--ttt-primary)" : "var(--ttt-accent)" }}
        >
          {isXNext ? "X" : "O"}
        </span>
      </span>
    );
  }

  return (
    <div className="ttt-container">
      <h2 className="ttt-title">WebTicTacToe</h2>
      <div className="ttt-status">{status}</div>
      <div className="ttt-board">
        {[0, 1, 2].map((row) => (
          <div className="ttt-board-row" key={row}>
            {[0, 1, 2].map((col) => renderSquare(row * 3 + col))}
          </div>
        ))}
      </div>
      <button className="ttt-restart-btn" onClick={handleRestart}>
        Restart Game
      </button>
      <div className="ttt-instructions">
        X and O take turns. First to get three in a row wins.
      </div>
    </div>
  );
}

export default MainTicTacToeContainer;
