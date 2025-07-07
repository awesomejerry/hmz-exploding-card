import { useState } from 'react';
import Puzzle1 from './components/Puzzle1';
import Puzzle2 from './components/Puzzle2';
import Puzzle3 from './components/Puzzle3'; // 新增 Puzzle3 導入
import './index.css'; // Import the main CSS file

// 導入獎勵圖片。如果實際圖片尚未提供，請確保檔案存在或使用佔位符。
import puzzle1Reward from './assets/puzzle-2-reward.jpg'; // 修正為 puzzle-1-reward.jpg
import puzzle2Reward from './assets/puzzle-2-reward.jpg';
import puzzle3Reward from './assets/puzzle-2-reward.jpg'; // 新增 Puzzle3 獎勵圖片導入

function App() {
    const [currentPuzzle, setCurrentPuzzle] = useState(3);
    const [showReward1, setShowReward1] = useState(false);
    const [showReward2, setShowReward2] = useState(false);
    const [showReward3, setShowReward3] = useState(false); // 新增 Puzzle3 的獎勵狀態

    const handlePuzzle1Success = () => {
        setShowReward1(true);
    };

    const handlePuzzle2Success = () => {
        setShowReward2(true);
    };

    const handlePuzzle3Success = () => { // 新增 Puzzle3 的成功處理函數
        setShowReward3(true);
    };

    const goToNextPuzzle = (puzzleNumber: number) => {
        setCurrentPuzzle(puzzleNumber);
        setShowReward1(false); // 隱藏之前的獎勵
        setShowReward2(false); // 隱藏之前的獎勵
        setShowReward3(false); // 隱藏之前的獎勵
    };

    return (
        <div className="container">
            {/* 關卡 1 */}
            {currentPuzzle === 1 && !showReward1 && (
                <Puzzle1 onSuccess={handlePuzzle1Success} />
            )}

            {/* 關卡 1 獎勵 */}
            {currentPuzzle === 1 && showReward1 && (
                <div id="reward" className="reward-screen">
                    <h2>答對了！</h2>
                    <img src={puzzle1Reward} alt="我們的第一張合照" />
                    <p className="message">「就是這一天，我的世界因為妳而閃亮。」</p>
                    <button onClick={() => goToNextPuzzle(2)}>前往下一關</button>
                </div>
            )}

            {/* 關卡 2 */}
            {currentPuzzle === 2 && !showReward2 && (
                <Puzzle2 onSuccess={handlePuzzle2Success} />
            )}

            {/* 關卡 2 獎勵 */}
            {currentPuzzle === 2 && showReward2 && (
                <div id="reward-2" className="reward-screen">
                    <h2>找到了！</h2>
                    <img src={puzzle2Reward} alt="第一次約會的地方" />
                    <p className="message">「在這裡，我第一次牽起妳的手。」</p>
                    <button onClick={() => goToNextPuzzle(3)}>前往下一關</button>
                </div>
            )}

            {/* 關卡 3 */}
            {currentPuzzle === 3 && !showReward3 && (
                <Puzzle3 onSuccess={handlePuzzle3Success} />
            )}

            {/* 關卡 3 獎勵 */}
            {currentPuzzle === 3 && showReward3 && (
                <div id="reward-3" className="reward-screen">
                    <h2>拼湊成功！</h2>
                    <img src={puzzle3Reward} alt="拼湊的回憶" />
                    <p className="message">「每一次回憶，都讓我們的愛更完整。」</p>
                    <button onClick={() => console.log('Go to Puzzle 4')}>前往下一關</button>
                </div>
            )}

            {/* 更多關卡將在此處添加 */}
        </div>
    );
}

export default App;