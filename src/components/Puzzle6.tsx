import React, { useState, useEffect, useRef } from 'react';

interface Puzzle6Props {
    onSuccess: () => void;
}

const Puzzle6: React.FC<Puzzle6Props> = ({ onSuccess }) => {
    const [isCleared, setIsCleared] = useState(false);
    const [shakeCount, setShakeCount] = useState(0);
    const [isShaking, setIsShaking] = useState(false);
    const [showTestButton, setShowTestButton] = useState(false);
    const shakeThreshold = 15; // 需要搖晃的次數
    const lastShakeTimeRef = useRef<number>(0);
    const shakeTimeoutRef = useRef<number | null>(null);

    // 檢測設備是否真的支援搖晃偵測
    useEffect(() => {
        const checkDeviceMotionSupport = () => {
            // 先假設不支援，預設顯示測試按鈕
            setShowTestButton(true);

            if (typeof DeviceMotionEvent === 'undefined') {
                return; // 完全不支援
            }

            // 檢測是否真的有感測器數據
            let hasValidMotion = false;
            let motionTestCount = 0;
            const maxTestTime = 2000; // 2秒測試時間

            const testMotionHandler = (event: DeviceMotionEvent) => {
                motionTestCount++;

                if (event.accelerationIncludingGravity) {
                    const { x, y, z } = event.accelerationIncludingGravity;
                    // 檢查是否有有效的感測器數據（不是 null 且有變化）
                    if (x !== null && y !== null && z !== null) {
                        const totalAcceleration = Math.sqrt(x * x + y * y + z * z);
                        // 如果有重力數據（大約9.8m/s²），說明感測器正常工作
                        if (totalAcceleration > 5 && totalAcceleration < 15) {
                            hasValidMotion = true;
                        }
                    }
                }

                // 測試足夠次數或找到有效數據後停止
                if (motionTestCount > 10 || hasValidMotion) {
                    window.removeEventListener('devicemotion', testMotionHandler);

                    if (hasValidMotion) {
                        // 有真實的感測器，但仍需要用戶手動啟用
                        // （因為可能需要權限）
                        console.log('Device motion sensors detected');
                    } else {
                        console.log('No valid motion sensors detected');
                    }
                }
            };

            // 開始測試
            window.addEventListener('devicemotion', testMotionHandler);

            // 超時後停止測試
            setTimeout(() => {
                window.removeEventListener('devicemotion', testMotionHandler);
            }, maxTestTime);
        };

        checkDeviceMotionSupport();

        return () => {
            if (shakeTimeoutRef.current) {
                clearTimeout(shakeTimeoutRef.current);
            }
        };
    }, []);

    const setupMotionListener = () => {
        const handleDeviceMotion = (event: DeviceMotionEvent) => {
            if (!event.accelerationIncludingGravity) return;

            const { x, y, z } = event.accelerationIncludingGravity;
            if (x === null || y === null || z === null) return;

            // 計算總加速度
            const totalAcceleration = Math.sqrt(x * x + y * y + z * z);

            // 檢測搖晃（閾值可以調整）
            if (totalAcceleration > 20) {
                const currentTime = Date.now();

                // 防止過於頻繁的觸發
                if (currentTime - lastShakeTimeRef.current > 300) {
                    lastShakeTimeRef.current = currentTime;
                    handleShake();
                }
            }
        };

        window.addEventListener('devicemotion', handleDeviceMotion);

        return () => {
            window.removeEventListener('devicemotion', handleDeviceMotion);
        };
    };

    const handleShake = () => {
        setIsShaking(true);
        setShakeCount(prev => {
            const newCount = prev + 1;
            if (newCount >= shakeThreshold) {
                setIsCleared(true);
                // 2秒後自動成功
                setTimeout(() => {
                    onSuccess();
                }, 2000);
            }
            return newCount;
        });

        // 重置搖晃動畫
        if (shakeTimeoutRef.current) {
            clearTimeout(shakeTimeoutRef.current);
        }
        shakeTimeoutRef.current = setTimeout(() => {
            setIsShaking(false);
        }, 500);
    };

    const requestMotionPermission = async () => {
        try {
            if (typeof (DeviceMotionEvent as any).requestPermission === 'function') {
                const permission = await (DeviceMotionEvent as any).requestPermission();
                if (permission === 'granted') {
                    setupMotionListener();
                    setShowTestButton(false);
                } else {
                    alert('需要動作感測器權限才能正常遊戲，請使用測試按鈕');
                }
            } else {
                // 對於非 iOS 設備，直接設置監聽器
                setupMotionListener();
                setShowTestButton(false);

                // 顯示提示，如果搖晃不工作可以用測試按鈕
                setTimeout(() => {
                    if (shakeCount === 0) {
                        alert('如果搖晃無效，請重新整理頁面並使用測試按鈕');
                        setShowTestButton(true);
                    }
                }, 5000);
            }
        } catch (error) {
            console.error('Error requesting motion permission:', error);
            alert('動作權限請求失敗，請使用測試按鈕');
        }
    };

    // 電腦測試用的模擬搖晃
    const simulateShake = () => {
        handleShake();
    };

    const progressPercentage = Math.min((shakeCount / shakeThreshold) * 100, 100);

    return (
        <div className="puzzle shake-puzzle">
            <h1>第六關：搖出真心話</h1>
            <p>搖動手機，讓我的心意更清晰。</p>

            <div className="blurred-image-container">
                <div
                    className={`blurred-image ${isShaking ? 'shaking' : ''}`}
                    style={{
                        filter: `blur(${20 - (progressPercentage / 100) * 20}px)`,
                        opacity: 0.3 + (progressPercentage / 100) * 0.7
                    }}
                >
                    <div className="heart-message">
                        {isCleared ? (
                            <div className="clear-message">
                                <h2>💕 我愛你 💕</h2>
                                <p>每一天都比昨天更愛你</p>
                            </div>
                        ) : (
                            <div className="hidden-message">
                                <h2>💕 ? ? ? 💕</h2>
                                <p>? ? ? ? ? ? ? ? ?</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="shake-progress">
                <div className="progress-bar">
                    <div
                        className="progress-fill"
                        style={{ width: `${progressPercentage}%` }}
                    ></div>
                </div>
                <p>搖晃進度：{shakeCount} / {shakeThreshold}</p>
            </div>

            <div className="controls">
                <button onClick={requestMotionPermission} className="motion-button">
                    啟用搖晃偵測
                </button>
                <button onClick={simulateShake} className="test-button">
                    測試搖晃 (無法搖晃時使用)
                </button>
            </div>

            {!showTestButton && !isCleared && (
                <div className="instruction">
                    <p>🤳 開始搖晃你的手機！</p>
                    <small>如果搖晃無效，請使用上方的測試按鈕</small>
                </div>
            )}

            {isCleared && (
                <div className="success-message">
                    <p>✨ 成功解鎖！正在前往下一關... ✨</p>
                </div>
            )}
        </div>
    );
};

export default Puzzle6;
