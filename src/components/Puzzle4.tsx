import React, { useState, useRef, useEffect } from 'react';
import staticNoise from '../assets/audio/static.wav';
import secretMessage from '../assets/audio/secret.mp3';

interface Puzzle4Props {
    onSuccess: () => void;
}

const CORRECT_FREQUENCY = 91.3;
const FREQUENCY_TOLERANCE = 0.0; // The range for a perfect lock
const FADE_TOLERANCE = 1;      // The wider range for audio to start fading in

const Puzzle4: React.FC<Puzzle4Props> = ({ onSuccess }) => {
    const [frequency, setFrequency] = useState(98.0);
    const [audioInitialized, setAudioInitialized] = useState(false);
    const staticAudioRef = useRef<HTMLAudioElement>(null);
    const secretAudioRef = useRef<HTMLAudioElement>(null);
    const successTimerRef = useRef<number | null>(null);

    const handleFrequencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!audioInitialized) return; // 只有在音頻初始化後才能調整頻率
        const newFrequency = parseFloat(e.target.value);
        setFrequency(newFrequency);
    };

    const initializeAudio = async () => {
        const staticAudio = staticAudioRef.current;
        const secretAudio = secretAudioRef.current;

        if (staticAudio && secretAudio && !audioInitialized) {
            try {
                // Set up audio properties
                staticAudio.loop = true;
                staticAudio.volume = 1;
                secretAudio.loop = true;
                secretAudio.volume = 0;

                // Start playing both audios
                await staticAudio.play();
                await secretAudio.play();

                setAudioInitialized(true);
            } catch (error) {
                console.error("Failed to initialize audio:", error);
            }
        }
    };

    useEffect(() => {
        const staticAudio = staticAudioRef.current;
        const secretAudio = secretAudioRef.current;

        if (successTimerRef.current) {
            clearTimeout(successTimerRef.current);
        }

        if (staticAudio && secretAudio && audioInitialized) {
            const distance = Math.abs(frequency - CORRECT_FREQUENCY);

            if (distance <= FREQUENCY_TOLERANCE) {
                // Correct frequency range - only secret audio
                staticAudio.volume = 0;
                staticAudio.muted = true;
                secretAudio.volume = 1;
                secretAudio.muted = false;
                successTimerRef.current = setTimeout(() => {
                    onSuccess();
                }, 2000);
            } else if (distance < FADE_TOLERANCE) {
                // Fade-in range
                const fadeProgress = 1 - (distance - FREQUENCY_TOLERANCE) / (FADE_TOLERANCE - FREQUENCY_TOLERANCE);
                staticAudio.muted = false;
                secretAudio.muted = false;
                secretAudio.volume = fadeProgress;
                staticAudio.volume = 1 - fadeProgress;
            } else {
                // Outside of any range - only static audio
                secretAudio.volume = 0;
                secretAudio.muted = true;
                staticAudio.volume = 1;
                staticAudio.muted = false;
            }
            console.log(`Static: ${staticAudio.muted ? 'muted' : staticAudio.volume}, Secret: ${secretAudio.muted ? 'muted' : secretAudio.volume}`);
        }

        return () => {
            if (successTimerRef.current) {
                clearTimeout(successTimerRef.current);
            }
        };
    }, [frequency, onSuccess, audioInitialized]);

    return (
        <div className="puzzle radio-puzzle">
            <h1>第四關：調頻收音機</h1>
            <p>在雜訊中，尋找只屬於我們的頻率。</p>
            <div className="radio-ui">
                <div className="frequency-display">{frequency.toFixed(1)} MHz</div>
                <input
                    type="range"
                    min="88.0"
                    max="108.0"
                    step="0.1"
                    value={frequency}
                    onChange={handleFrequencyChange}
                    className="frequency-slider"
                    disabled={!audioInitialized}
                />
            </div>
            {!audioInitialized && (
                <button onClick={initializeAudio} className="start-button">
                    開始收聽
                </button>
            )}
            <audio ref={staticAudioRef} src={staticNoise} preload="auto"></audio>
            <audio ref={secretAudioRef} src={secretMessage} preload="auto"></audio>
        </div>
    );
};

export default Puzzle4;
