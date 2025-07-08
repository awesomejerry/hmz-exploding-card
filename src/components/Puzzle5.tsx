import React, { useState } from 'react';

interface Puzzle5Props {
    onSuccess: () => void;
}

const Puzzle5: React.FC<Puzzle5Props> = ({ onSuccess }) => {
    const [userInput, setUserInput] = useState('');
    const [showHint, setShowHint] = useState(false);
    const [wrongAttempts, setWrongAttempts] = useState(0);

    // 凱撒密碼：字母往後移一位
    const encryptedMessage = "Xibu ep zpv dbmm nf?"; // 解密後是 "What do you call me?"
    const correctAnswer = "寶貝"; // 正確答案

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserInput(e.target.value);
    };

    const handleSubmit = () => {
        if (userInput.trim() === correctAnswer) {
            onSuccess();
        } else {
            setWrongAttempts(prev => prev + 1);
            // 不自動顯示提示，讓用戶手動選擇
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    // 解密函數（凱撒密碼解密）
    const decryptMessage = (message: string) => {
        return message.split('').map(char => {
            if (char.match(/[a-zA-Z]/)) {
                const isUppercase = char === char.toUpperCase();
                const code = char.toLowerCase().charCodeAt(0);
                const shifted = String.fromCharCode(((code - 97 - 1 + 26) % 26) + 97);
                return isUppercase ? shifted.toUpperCase() : shifted;
            }
            return char;
        }).join('');
    };

    return (
        <div className="puzzle code-puzzle">
            <h1>第五關：秘密暗號</h1>
            <p>我在這段密文中藏了一個問題，請先解密，然後回答。</p>

            <div className="encrypted-message">
                <h3>加密訊息：</h3>
                <div className="cipher-text">{encryptedMessage}</div>
            </div>

            <div className="cipher-hint">
                <h4>解密提示：</h4>
                <p>凱撒密碼：每個字母都往後移了一位</p>
                <p>例如：'b' → 'a', 'c' → 'b', 'X' → 'W'</p>
                {wrongAttempts > 0 && (
                    <button
                        onClick={() => setShowHint(!showHint)}
                        className="hint-button"
                    >
                        {showHint ? '隱藏' : '顯示'}解密結果
                    </button>
                )}
                {showHint && wrongAttempts > 0 && (
                    <div className="decrypted-hint">
                        <strong>解密結果：</strong> {decryptMessage(encryptedMessage)}
                    </div>
                )}
            </div>

            <div className="answer-section">
                <input
                    type="text"
                    value={userInput}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    placeholder="請輸入你的答案..."
                    className="answer-input"
                />
                <button onClick={handleSubmit} className="submit-button">
                    提交答案
                </button>
            </div>

            {wrongAttempts > 0 && (
                <div className="feedback">
                    <p>想想看，你平常是怎麼叫我的呢？</p>
                    {wrongAttempts >= 2 && (
                        <p><strong>額外提示：</strong> 是一個很甜蜜的稱呼...</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Puzzle5;
