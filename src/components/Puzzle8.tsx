import React, { useState, useEffect } from 'react';

interface Puzzle8Props {
    onSuccess: () => void;
}

const Puzzle8: React.FC<Puzzle8Props> = ({ onSuccess }) => {
    const [userAnswer, setUserAnswer] = useState('');
    const [attempts, setAttempts] = useState(0);
    const [showHint, setShowHint] = useState(false);
    const [correctDays, setCorrectDays] = useState(0);

    const relationshipStartDate = new Date('2023-06-09');

    useEffect(() => {
        // 計算交往天數 - 使用更精確的計算方式
        const today = new Date();
        const startDate = new Date(relationshipStartDate);

        // 重置時間到午夜，避免時區問題
        today.setHours(0, 0, 0, 0);
        startDate.setHours(0, 0, 0, 0);

        const timeDiff = today.getTime() - startDate.getTime();
        const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));

        setCorrectDays(daysDiff);
        console.log('開始日期:', startDate.toDateString());
        console.log('今天:', today.toDateString());
        console.log('計算天數:', daysDiff);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const userDays = parseInt(userAnswer.trim());

        if (userDays === correctDays) {
            onSuccess();
        } else {
            setAttempts(prev => prev + 1);
            setUserAnswer('');
            if (attempts >= 1) {
                setShowHint(true);
            }
        }
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('zh-TW', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="final-puzzle">
            <div className="final-puzzle-header">
                <h2>最終的密語</h2>
                <p>這是最後一道謎題，也是通往我心底的鑰匙</p>
            </div>

            <div className="password-lock-container">
                <div className="password-lock">
                    <div className="lock-body">
                        <div className="lock-display">
                            <div className="lock-screen">
                                <div className="lock-icon">🔒</div>
                                <p className="lock-question">我們相愛了多少天？</p>
                            </div>
                        </div>
                    </div>
                    <div className="lock-shackle"></div>
                </div>
            </div>

            <div className="input-section">
                <form onSubmit={handleSubmit}>
                    <div className="number-input-group">
                        <input
                            type="number"
                            value={userAnswer}
                            onChange={(e) => setUserAnswer(e.target.value)}
                            placeholder="輸入天數"
                            className="days-input"
                            min="0"
                            required
                        />
                        <span className="input-suffix">天</span>
                    </div>
                    <button type="submit" className="unlock-button">
                        🔓 解鎖我的心
                    </button>
                </form>

                {attempts > 0 && (
                    <div className="feedback-section">
                        <p className="error-message">
                            答案不正確，請再想想看 ({attempts}/3)
                        </p>

                        {showHint && (
                            <div className="hint-section">
                                <p className="hint-text">
                                    💡 提示：我們從 {formatDate(relationshipStartDate)} 開始在一起
                                </p>
                                <p className="hint-detail">
                                    計算到今天 ({formatDate(new Date())}) 總共多少天？
                                </p>
                            </div>
                        )}
                    </div>
                )}

                {attempts >= 3 && (
                    <div className="extra-hint">
                        <p className="final-hint">
                            ❤️ 每一天都是珍貴的回憶，答案是 {correctDays} 天
                        </p>
                    </div>
                )}
            </div>

            <div className="romantic-quote">
                <p>"時間見證了我們的愛情，每一天都讓我更愛你"</p>
            </div>
        </div>
    );
};

export default Puzzle8;
