import React, { useState } from 'react';

interface Puzzle2Props {
    onSuccess: () => void;
}

const Puzzle2: React.FC<Puzzle2Props> = ({ onSuccess }) => {
    const [error, setError] = useState(false);

    const handleMapClick = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;

        const correctArea = { minX: 0.4, maxX: 0.6, minY: 0.4, maxY: 0.6 };

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
                    src="https://via.placeholder.com/400x400.png?text=城市地圖" 
                    alt="城市地圖" 
                    onClick={handleMapClick} 
                />
            </div>
            {error && <p id="error-message-2">不是這裡喔，再點點看！</p>}
        </div>
    );
};

export default Puzzle2;
