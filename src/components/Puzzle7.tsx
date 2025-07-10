import React, { useState, useEffect, useRef } from 'react';

interface Puzzle7Props {
    onSuccess: () => void;
}

const Puzzle7: React.FC<Puzzle7Props> = ({ onSuccess }) => {
    const [userAnswer, setUserAnswer] = useState('');
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isFlashlightActive, setIsFlashlightActive] = useState(false);
    const [showInput, setShowInput] = useState(false);
    const [attempts, setAttempts] = useState(0);
    const [showHint, setShowHint] = useState(false);
    const [isWordVisible, setIsWordVisible] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const correctAnswer = '巧克力棒'; // The hidden word to find
    const hiddenWordPosition = { x: 10, y: 30 }; // Position as percentage

    // 混淆詞彙和位置
    const decoyWords = [
        { word: '馬卡龍', position: { x: 15, y: 28 } },
        { word: '費南雪', position: { x: 82, y: 35 } },
        { word: '瑪德蓮', position: { x: 34, y: 67 } },
        { word: '達克瓦茲', position: { x: 67, y: 23 } },
        { word: '聖多諾黑', position: { x: 21, y: 72 } },
        { word: '馬卡龍', position: { x: 88, y: 61 } },
        { word: '費南雪', position: { x: 45, y: 19 } },
        { word: '瑪德蓮', position: { x: 57, y: 83 } },
        { word: '達克瓦茲', position: { x: 12, y: 45 } },
        { word: '聖多諾黑', position: { x: 91, y: 78 } },
        { word: '馬卡龍', position: { x: 28, y: 39 } },
        { word: '費南雪', position: { x: 76, y: 58 } },
        { word: '瑪德蓮', position: { x: 18, y: 55 } },
        { word: '達克瓦茲', position: { x: 63, y: 47 } },
        { word: '聖多諾黑', position: { x: 84, y: 26 } },
        { word: '馬卡龍', position: { x: 39, y: 81 } },
        { word: '費南雪', position: { x: 72, y: 14 } },
        { word: '瑪德蓮', position: { x: 26, y: 63 } },
        { word: '達克瓦茲', position: { x: 94, y: 52 } },
        { word: '聖多諾黑', position: { x: 51, y: 91 } },
        { word: '馬卡龍', position: { x: 8, y: 71 } },
        { word: '費南雪', position: { x: 73, y: 38 } },
        { word: '瑪德蓮', position: { x: 42, y: 22 } },
        { word: '達克瓦茲', position: { x: 85, y: 49 } },
        { word: '聖多諾黑', position: { x: 17, y: 86 } },
        { word: '馬卡龍', position: { x: 59, y: 16 } },
        { word: '費南雪', position: { x: 31, y: 74 } },
        { word: '瑪德蓮', position: { x: 78, y: 65 } },
        { word: '達克瓦茲', position: { x: 48, y: 33 } },
        { word: '聖多諾黑', position: { x: 14, y: 59 } },
        { word: '馬卡龍', position: { x: 68, y: 29 } },
        { word: '費南雪', position: { x: 23, y: 48 } },
        { word: '瑪德蓮', position: { x: 87, y: 73 } },
        { word: '達克瓦茲', position: { x: 35, y: 15 } },
        { word: '聖多諾黑', position: { x: 92, y: 44 } },
        { word: '馬卡龍', position: { x: 55, y: 77 } },
        { word: '費南雪', position: { x: 11, y: 37 } },
        { word: '瑪德蓮', position: { x: 74, y: 88 } },
        { word: '達克瓦茲', position: { x: 44, y: 54 } },
    ];

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                setMousePosition({ x, y });
                setIsFlashlightActive(true);
            }
        };

        const handleTouchMove = (e: TouchEvent) => {
            e.preventDefault();
            if (containerRef.current && e.touches.length > 0) {
                const rect = containerRef.current.getBoundingClientRect();
                const touch = e.touches[0];
                const x = ((touch.clientX - rect.left) / rect.width) * 100;
                const y = ((touch.clientY - rect.top) / rect.height) * 100;
                setMousePosition({ x, y });
                setIsFlashlightActive(true);
            }
        };

        const handleTouchStart = (e: TouchEvent) => {
            e.preventDefault();
            setIsFlashlightActive(true);
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener('mousemove', handleMouseMove);
            container.addEventListener('touchmove', handleTouchMove, { passive: false });
            container.addEventListener('touchstart', handleTouchStart, { passive: false });
        }

        return () => {
            if (container) {
                container.removeEventListener('mousemove', handleMouseMove);
                container.removeEventListener('touchmove', handleTouchMove);
                container.removeEventListener('touchstart', handleTouchStart);
            }
        };
    }, []);

    useEffect(() => {
        // Check if user found the hidden word area
        const distance = Math.sqrt(
            Math.pow(mousePosition.x - hiddenWordPosition.x, 2) +
            Math.pow(mousePosition.y - hiddenWordPosition.y, 2)
        );

        // Make word visible when flashlight is close (larger radius for visibility)
        if (distance < 12 && isFlashlightActive) {
            setIsWordVisible(true);
        } else {
            setIsWordVisible(false);
        }

        // Show input when very close to the word
        if (distance < 6 && isFlashlightActive) {
            setShowInput(true);
        }
    }, [mousePosition, isFlashlightActive]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        processAnswer();
    };

    const handleButtonClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        processAnswer();
    };

    const processAnswer = () => {
        if (userAnswer.trim() === correctAnswer) {
            onSuccess();
        } else {
            setAttempts(prev => prev + 1);
            setUserAnswer('');
            if (attempts >= 2) {
                setShowHint(true);
            }
        }
    };

    const flashlightStyle = {
        background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
      transparent 0%, 
      transparent 8%, 
      rgba(0, 0, 0, 0.95) 15%, 
      rgba(0, 0, 0, 0.98) 100%)`,
        transition: isFlashlightActive ? 'none' : 'background 0.3s ease'
    };

    return (
        <div className="shadow-puzzle" ref={containerRef}>
            <div className="shadow-puzzle-instruction">
                <h2>光影的謎題</h2>
                <p>在黑暗中尋找，那個對我們最重要的詞</p>
                <p className="shadow-puzzle-hint">移動手指或滑鼠來照亮黑暗</p>
                <p className="shadow-puzzle-hint">小心！有許多干擾詞彙</p>
            </div>

            <div className="shadow-puzzle-dark-area">
                <div className="shadow-puzzle-flashlight-overlay" style={flashlightStyle}></div>

                <div
                    className={`shadow-puzzle-hidden-word ${isWordVisible ? 'visible' : ''}`}
                    style={{
                        left: `${hiddenWordPosition.x}%`,
                        top: `${hiddenWordPosition.y}%`
                    }}
                >
                    {correctAnswer}
                </div>

                {/* 混淆詞彙 */}
                {decoyWords.map((decoy, index) => (
                    <div
                        key={index}
                        className="shadow-puzzle-decoy-word"
                        style={{
                            left: `${decoy.position.x}%`,
                            top: `${decoy.position.y}%`
                        }}
                    >
                        {decoy.word}
                    </div>
                ))}

                {showInput && (
                    <div className="shadow-puzzle-input-area">
                        <form onSubmit={handleSubmit}>
                            <div className="shadow-puzzle-input-group">
                                <input
                                    type="text"
                                    value={userAnswer}
                                    onChange={(e) => setUserAnswer(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            processAnswer();
                                        }
                                    }}
                                    placeholder="輸入你找到的詞"
                                    className="shadow-puzzle-input"
                                    autoFocus
                                    onTouchStart={(e) => e.stopPropagation()}
                                    onTouchMove={(e) => e.stopPropagation()}
                                    onTouchEnd={(e) => e.stopPropagation()}
                                />
                                <button
                                    type="button"
                                    className="shadow-puzzle-submit"
                                    onClick={handleButtonClick}
                                    onTouchEnd={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        processAnswer();
                                    }}
                                    onTouchStart={(e) => {
                                        e.stopPropagation();
                                    }}
                                >
                                    確認
                                </button>
                            </div>
                        </form>

                        {attempts > 0 && (
                            <p className="shadow-puzzle-error">
                                答案不正確，請再試一次 ({attempts}/3)
                            </p>
                        )}

                        {showHint && (
                            <p className="shadow-puzzle-hint-text">
                                提示：這是你最喜歡吃的東西
                            </p>
                        )}
                    </div>
                )}
            </div>

            {!isFlashlightActive && (
                <div className="shadow-puzzle-start-message">
                    <p>開始移動來探索黑暗中的秘密</p>
                </div>
            )}
        </div>
    );
};

export default Puzzle7;
