import React, { useState } from 'react';

interface Puzzle1Props {
    onSuccess: () => void;
}

const Puzzle1: React.FC<Puzzle1Props> = ({ onSuccess }) => {
    const [year, setYear] = useState('');
    const [month, setMonth] = useState('');
    const [day, setDay] = useState('');
    const [error, setError] = useState(false);

    const handleSubmit = () => {
        if (year === '2023' && month === '06' && day === '09') {
            setError(false);
            onSuccess();
        } else {
            setError(true);
        }
    };

    return (
        <div className="puzzle">
            <h1>第一關：我們的第一天</h1>
            <p>我們故事開始的那一天是？</p>
            <div className="date-input">
                <input type="text" value={year} onChange={(e) => setYear(e.target.value)} placeholder="YYYY" maxLength={4} />
                <span>/</span>
                <input type="text" value={month} onChange={(e) => setMonth(e.target.value)} placeholder="MM" maxLength={2} />
                <span>/</span>
                <input type="text" value={day} onChange={(e) => setDay(e.target.value)} placeholder="DD" maxLength={2} />
            </div>
            <button onClick={handleSubmit}>確認答案</button>
            {error && <p id="error-message">日期不對喔，再想一想！</p>}
        </div>
    );
};

export default Puzzle1;
