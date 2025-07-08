import React, { useState } from 'react';

interface PuzzleWrapperProps {
    puzzleNumber: number;
    PuzzleComponent: React.ComponentType<{ onSuccess: () => void }>;
    rewardImage: string;
    rewardTitle: string;
    rewardMessage: string;
    rewardImageAlt: string;
    onNextPuzzle: () => void;
    showNextButton?: boolean;
    keepAudioOnReward?: boolean; // 新增 prop 來控制是否在獎勵畫面保持音頻
}

const PuzzleWrapper: React.FC<PuzzleWrapperProps> = ({
    puzzleNumber,
    PuzzleComponent,
    rewardImage,
    rewardTitle,
    rewardMessage,
    rewardImageAlt,
    onNextPuzzle,
    showNextButton = true,
    keepAudioOnReward = false
}) => {
    const [showReward, setShowReward] = useState(false);

    const handlePuzzleSuccess = () => {
        setShowReward(true);
    };

    return (
        <div>
            {/* 正常情況下顯示 puzzle 組件 */}
            <div style={{
                display: showReward ? 'none' : 'block'
            }}>
                <PuzzleComponent onSuccess={handlePuzzleSuccess} />
            </div>

            {/* 當 keepAudioOnReward 為 true 時，在背景中保持 puzzle 組件運行（完全隱藏） */}
            {showReward && keepAudioOnReward && (
                <div style={{
                    position: 'absolute',
                    top: '-9999px',
                    left: '-9999px',
                    visibility: 'hidden',
                    pointerEvents: 'none'
                }}>
                    <PuzzleComponent onSuccess={handlePuzzleSuccess} />
                </div>
            )}

            {/* 獎勵畫面 */}
            {showReward && (
                <div id={`reward-${puzzleNumber}`} className="reward-screen">
                    <h2>{rewardTitle}</h2>
                    <img src={rewardImage} alt={rewardImageAlt} />
                    <p className="message">{rewardMessage}</p>
                    {showNextButton && (
                        <button onClick={onNextPuzzle}>前往下一關</button>
                    )}
                </div>
            )}
        </div>
    );
};

export default PuzzleWrapper;
