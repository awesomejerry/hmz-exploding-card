import { useState } from 'react';
import Puzzle1 from './components/Puzzle1';
import Puzzle2 from './components/Puzzle2';
import Puzzle3 from './components/Puzzle3';
import Puzzle4 from './components/Puzzle4';
import Puzzle5 from './components/Puzzle5';
import Puzzle6 from './components/Puzzle6';
import Puzzle7 from './components/Puzzle7';
import Puzzle8 from './components/Puzzle8';
import PuzzleWrapper from './components/PuzzleWrapper';
import './index.css';

// 導入獎勵圖片
import puzzle1Reward from './assets/puzzle-1-reward.jpg';
import puzzle2Reward from './assets/puzzle-2-reward.jpg';
import puzzle3Reward from './assets/puzzle-3-reward.jpg';
import puzzle4Reward from './assets/puzzle-4-reward.jpg';
import puzzle5Reward from './assets/puzzle-5-reward.jpg';
import puzzle6Reward from './assets/puzzle-6-reward.jpg';
import puzzle7Reward from './assets/puzzle-7-reward.jpg';
import puzzle8Reward from './assets/puzzle-8-reward.jpg';

function App() {
    const [currentPuzzle, setCurrentPuzzle] = useState(1);

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
                    onNextPuzzle={() => goToNextPuzzle(7)}
                    showNextButton={true}
                />
            )}

            {/* 關卡 7 */}
            {currentPuzzle === 7 && (
                <PuzzleWrapper
                    puzzleNumber={7}
                    PuzzleComponent={Puzzle7}
                    rewardImage={puzzle7Reward}
                    rewardTitle="光芒照亮了真心！"
                    rewardMessage="「在黑暗中，我依然能找到你，因為你是我心中永恆的光。」"
                    rewardImageAlt="光影中的真心"
                    onNextPuzzle={() => goToNextPuzzle(8)}
                    showNextButton={true}
                />
            )}

            {/* 關卡 8 */}
            {currentPuzzle === 8 && (
                <PuzzleWrapper
                    puzzleNumber={8}
                    PuzzleComponent={Puzzle8}
                    rewardImage={puzzle8Reward}
                    rewardTitle="愛的密語解鎖！"
                    rewardMessage="「這些天數見證了我們的愛情，每一天都是我愛你的證明。」"
                    rewardImageAlt="最終的愛情密語"
                    onNextPuzzle={() => console.log('All puzzles completed!')}
                    showNextButton={false}
                />
            )}
        </div>
    );
}

export default App;
