import { useState } from 'react';
import Puzzle1 from './components/Puzzle1';
import Puzzle2 from './components/Puzzle2';
import Puzzle3 from './components/Puzzle3';
import Puzzle4 from './components/Puzzle4';
import Puzzle5 from './components/Puzzle5';
import Puzzle6 from './components/Puzzle6';
import PuzzleWrapper from './components/PuzzleWrapper';
import './index.css';

// 導入獎勵圖片
import puzzle1Reward from './assets/puzzle-2-reward.jpg';
import puzzle2Reward from './assets/puzzle-2-reward.jpg';
import puzzle3Reward from './assets/puzzle-2-reward.jpg';
import puzzle4Reward from './assets/puzzle-2-reward.jpg';
import puzzle5Reward from './assets/puzzle-2-reward.jpg';
import puzzle6Reward from './assets/puzzle-2-reward.jpg';

function App() {
    const [currentPuzzle, setCurrentPuzzle] = useState(6);

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
                    onNextPuzzle={() => goToNextPuzzle(5)}
                    keepAudioOnReward={true}
                />
            )}

            {/* 關卡 5 */}
            {currentPuzzle === 5 && (
                <PuzzleWrapper
                    puzzleNumber={5}
                    PuzzleComponent={Puzzle5}
                    rewardImage={puzzle5Reward}
                    rewardTitle="解密成功！"
                    rewardMessage="「每次聽到你這樣叫我，我的心都會融化。」"
                    rewardImageAlt="解密的訊息"
                    onNextPuzzle={() => goToNextPuzzle(6)}
                />
            )}

            {/* 關卡 6 */}
            {currentPuzzle === 6 && (
                <PuzzleWrapper
                    puzzleNumber={6}
                    PuzzleComponent={Puzzle6}
                    rewardImage={puzzle6Reward}
                    rewardTitle="搖出真心話！"
                    rewardMessage="「每一天都比昨天更愛你，這是我最真摯的告白。」"
                    rewardImageAlt="搖出的真心話"
                    onNextPuzzle={() => console.log('Go to Puzzle 7')}
                    showNextButton={false}
                />
            )}
        </div>
    );
}

export default App;
