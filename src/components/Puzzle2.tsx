import React, { useState } from 'react';
import puzzle2Map from '../assets/puzzle-2.png';

interface Puzzle2Props {
    onSuccess: () => void;
}

const Puzzle2: React.FC<Puzzle2Props> = ({ onSuccess }) => {
    const [error, setError] = useState(false);

    const handleMapClick = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;

        const correctArea = { minX: 0.15, maxX: 0.25, minY: 0.55, maxY: 0.65 };

        if (x >= correctArea.minX && x <= correctArea.maxX && y >= correctArea.minY && y <= correctArea.maxY) {
            setError(false);
            onSuccess();
        } else {
            setError(true);
        }
    };

    return (
        <div className="puzzle">
            <h1>第二關：特別的地點</h1>
            <p>我們的第一次約會，是在這個城市的哪個角落？</p>
            <div className="map-container">
                <img
                    id="map"
                    src={puzzle2Map}
                    alt="城市地圖"
                    onClick={handleMapClick}
                />
            </div>
            {error && <p id="error-message-2">不是這裡喔，再點點看！</p>}
        </div>
    );
};

export default Puzzle2;