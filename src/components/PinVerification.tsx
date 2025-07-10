import React, { useState } from 'react';

interface PinVerificationProps {
    onVerified: () => void;
}

const PinVerification: React.FC<PinVerificationProps> = ({ onVerified }) => {
    const [pin, setPin] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await fetch('https://n8n-flyio-awesomejerry.fly.dev/webhook/hmz-exploding-card', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ pin }),
            });

            const data = await response.json();

            if (data.success === true) {
                onVerified();
            } else {
                setError('PIN碼錯誤，請重新輸入');
            }
        } catch (err) {
            setError('驗證失敗，請檢查網路連線');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="pin-verification">
            <div className="pin-container">
                <h1>愛的密語解鎖器</h1>
                <p>請輸入PIN碼開始你的愛情解謎之旅</p>

                <form onSubmit={handleSubmit} className="pin-form">
                    <div className="pin-input-group">
                        <input
                            type="password"
                            value={pin}
                            onChange={(e) => setPin(e.target.value)}
                            placeholder="請輸入PIN碼"
                            className="pin-input"
                            disabled={isLoading}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="pin-submit-btn"
                        disabled={isLoading || !pin.trim()}
                    >
                        {isLoading ? '驗證中...' : '開始解謎'}
                    </button>
                </form>

                {error && (
                    <div className="pin-error">
                        <p>{error}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PinVerification;
