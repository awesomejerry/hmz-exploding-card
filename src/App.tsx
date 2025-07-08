import { useState } from 'react';
import Puzzle1 from './components/Puzzle1';
import Puzzle2 from './components/Puzzle2';
import Puzzle3 from './components/Puzzle3';
import Puzzle4 from './components/Puzzle4';
import PuzzleWrapper from './components/PuzzleWrapper';
import './index.css';

// 導入獎勵圖片
import puzzle1Reward from './assets/puzzle-2-reward.jpg';
import puzzle2Reward from './assets/puzzle-2-reward.jpg';
import puzzle3Reward from './assets/puzzle-2-reward.jpg';
import puzzle4Reward from './assets/puzzle-2-reward.jpg';

function App() {
    const [currentPuzzle, setCurrentPuzzle] = useState(4);

    const goToNextPuzzle = (puzzleNumber: number) => {
        setCurrentPuzzle(puzzleNumber);
    };

    return (
        <div className="container">
            {/* 關卡 1 */}
            {currentPuzzle === 1 && (
                <PuzzleWrapper
                    puzzleNumber={1}
                    PuzzleComponent={Puzzle1}
                    rewardImage={puzzle1Reward}
                    rewardTitle="答對了！"
                    rewardMessage="「就是這一天，我的世界因為妳而閃亮。」"
                    rewardImageAlt="我們的第一張合照"
                    onNextPuzzle={() => goToNextPuzzle(2)}
                />
            )}

            {/* 關卡 2 */}
            {currentPuzzle === 2 && (
                <PuzzleWrapper
                    puzzleNumber={2}
                    PuzzleComponent={Puzzle2}
                    rewardImage={puzzle2Reward}
                    rewardTitle="找到了！"
                    rewardMessage="「在這裡，我第一次牽起妳的手。」"
                    rewardImageAlt="第一次約會的地方"
                    onNextPuzzle={() => goToNextPuzzle(3)}
                />
            )}

            {/* 關卡 3 */}
            {currentPuzzle === 3 && (
                <PuzzleWrapper
                    puzzleNumber={3}
                    PuzzleComponent={Puzzle3}
                    rewardImage={puzzle3Reward}
                    rewardTitle="拼湊成功！"
                    rewardMessage="「每一次回憶，都讓我們的愛更完整。」"
                    rewardImageAlt="拼湊的回憶"
                    onNextPuzzle={() => goToNextPuzzle(4)}
                />
            )}

            {/* 關卡 4 */}
            {currentPuzzle === 4 && (
                <PuzzleWrapper
                    puzzleNumber={4}
                    PuzzleComponent={Puzzle4}
                    rewardImage={puzzle4Reward}
                    rewardTitle="找到了！"
                    rewardMessage="「這是只屬於我們的頻率。」"
                    rewardImageAlt="我們的頻率"
                    onNextPuzzle={() => console.log('Go to Puzzle 5')}
                    showNextButton={false}
                    keepAudioOnReward={true}
                />
            )}
        </div>
    );
}

export default App;
