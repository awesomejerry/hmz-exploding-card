import React, { useState } from 'react';
import Puzzle1 from './components/Puzzle1';
import Puzzle2 from './components/Puzzle2';
import './index.css'; // Import the main CSS file

function App() {
    const [currentPuzzle, setCurrentPuzzle] = useState(1);
    const [showReward1, setShowReward1] = useState(false);
    const [showReward2, setShowReward2] = useState(false);

    const handlePuzzle1Success = () => {
        setShowReward1(true);
    };

    const handlePuzzle2Success = () => {
        setShowReward2(true);
    };

    const goToNextPuzzle = (puzzleNumber: number) => {
        setCurrentPuzzle(puzzleNumber);
        setShowReward1(false); // Hide previous reward if any
        setShowReward2(false); // Hide previous reward if any
    };

    return (
        <div className="container">
            {currentPuzzle === 1 && !showReward1 && (
                <Puzzle1 onSuccess={handlePuzzle1Success} />
            )}

            {currentPuzzle === 1 && showReward1 && (
                <div id="reward" className="reward-screen">
                    <h2>答對了！</h2>
                    <img src="https://via.placeholder.com/400x400.png?text=我們的合照" alt="我們的第一張合照" />
                    <p className="message">「就是這一天，我的世界因為妳而閃亮。」</p>
                    <button onClick={() => goToNextPuzzle(2)}>前往下一關</button>
                </div>
            )}

            {currentPuzzle === 2 && !showReward2 && (
                <Puzzle2 onSuccess={handlePuzzle2Success} />
            )}

            {currentPuzzle === 2 && showReward2 && (
                <div id="reward-2" className="reward-screen">
                    <h2>找到了！</h2>
                    <img src="https://via.placeholder.com/400x400.png?text=第一次約會的地方" alt="第一次約會的地方" />
                    <p className="message">「在這裡，我第一次牽起妳的手。」</p>
                    <button onClick={() => console.log('Go to Puzzle 3')}>前往下一關</button>
                </div>
            )}

            {/* Add more puzzles here as currentPuzzle state changes */}
        </div>
    );
}

export default App;