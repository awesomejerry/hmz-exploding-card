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
    const containerRef = useRef<HTMLDivElement>(null);

    const correctAnswer = '寶貝'; // The hidden word to find
    const hiddenWordPosition = { x: 50, y: 45 }; // Position as percentage

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

        if (distance < 8 && isFlashlightActive) { // Within 8% distance
            setShowInput(true);
        }
    }, [mousePosition, isFlashlightActive]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
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
            </div>

            <div className="shadow-puzzle-dark-area">
                <div className="shadow-puzzle-flashlight-overlay" style={flashlightStyle}></div>

                <div
                    className="shadow-puzzle-hidden-word"
                    style={{
                        left: `${hiddenWordPosition.x}%`,
                        top: `${hiddenWordPosition.y}%`
                    }}
                >
                    {correctAnswer}
                </div>

                {showInput && (
                    <div className="shadow-puzzle-input-area">
                        <form onSubmit={handleSubmit}>
                            <div className="shadow-puzzle-input-group">
                                <input
                                    type="text"
                                    value={userAnswer}
                                    onChange={(e) => setUserAnswer(e.target.value)}
                                    placeholder="輸入你找到的詞"
                                    className="shadow-puzzle-input"
                                    autoFocus
                                />
                                <button type="submit" className="shadow-puzzle-submit">
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
                                提示：這是我對你最常用的稱呼
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
