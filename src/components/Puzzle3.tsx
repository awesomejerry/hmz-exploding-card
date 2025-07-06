import React, { useState, useEffect } from 'react';
import puzzle3Image from '../assets/puzzle-3.png'; // The full image for the puzzle

interface Puzzle3Props {
    onSuccess: () => void;
}

// Define the number of rows and columns for the puzzle
const ROWS = 2;
const COLS = 2;
const NUM_PIECES = ROWS * COLS;

// Helper to shuffle an array
const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const Puzzle3: React.FC<Puzzle3Props> = ({ onSuccess }) => {
    const [pieces, setPieces] = useState<Array<{ id: number; currentPos: number; correctPos: number }>>([]);
    const [error, setError] = useState(false);
    const [draggedItem, setDraggedItem] = useState<number | null>(null); // ID of the piece being dragged

    useEffect(() => {
        // Initialize pieces
        const initialPieces = Array.from({ length: NUM_PIECES }, (_, i) => ({
            id: i,
            currentPos: i, // Initially, pieces are in their correct visual order
            correctPos: i,
        }));
        // Shuffle the current positions
        const shuffledPositions = shuffleArray(initialPieces.map(p => p.currentPos));
        const shuffledPieces = initialPieces.map((p, index) => ({
            ...p,
            currentPos: shuffledPositions[index], // Assign shuffled visual positions
        }));
        setPieces(shuffledPieces);
    }, []);

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, id: number) => {
        setDraggedItem(id);
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', id.toString());
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault(); // Necessary to allow dropping
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetPos: number) => {
        e.preventDefault();
        const draggedId = parseInt(e.dataTransfer.getData('text/plain'));
        const draggedPieceIndex = pieces.findIndex(p => p.id === draggedId);
        const targetPieceIndex = pieces.findIndex(p => p.currentPos === targetPos);

        if (draggedPieceIndex === -1 || targetPieceIndex === -1) return;

        const newPieces = [...pieces];
        // Swap the current positions of the dragged piece and the target piece
        const tempCurrentPos = newPieces[draggedPieceIndex].currentPos;
        newPieces[draggedPieceIndex].currentPos = newPieces[targetPieceIndex].currentPos;
        newPieces[targetPieceIndex].currentPos = tempCurrentPos;

        setPieces(newPieces);
        setDraggedItem(null); // Reset dragged item

        // Check if solved after state update
        if (checkPuzzleSolved(newPieces)) {
            setError(false);
            onSuccess();
        } else {
            setError(true); // Show error if not solved
        }
    };

    const checkPuzzleSolved = (currentPieces: typeof pieces) => {
        return currentPieces.every(piece => piece.currentPos === piece.correctPos);
    };

    return (
        <div className="puzzle">
            <h1>第三關：拼湊的回憶</h1>
            <p>讓我們一起拼湊出這段美好的回憶。</p>
            <div className="jigsaw-grid" style={{
                gridTemplateColumns: `repeat(${COLS}, 1fr)`,
                gridTemplateRows: `repeat(${ROWS}, 1fr)`,
            }}>
                {pieces.sort((a, b) => a.currentPos - b.currentPos).map((piece) => (
                    <div
                        key={piece.id}
                        className="jigsaw-piece"
                        draggable
                        onDragStart={(e) => handleDragStart(e, piece.id)}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, piece.currentPos)} // Drop target is the current visual position
                        style={{
                            backgroundImage: `url(${puzzle3Image})`,
                            backgroundSize: `${COLS * 100}% ${ROWS * 100}%`, // Scale the background image
                            backgroundPosition: `-${(piece.correctPos % COLS) * (100 / COLS)}% -${Math.floor(piece.correctPos / COLS) * (100 / ROWS)}%`,
                        }}
                    >
                        {/* Optional: Display piece ID for debugging */}
                        {/* <span style={{ color: 'white', fontSize: '2em' }}>{piece.id}</span> */}
                    </div>
                ))}
            </div>
            {error && <p id="error-message-3">拼圖不對喔，再試試看！</p>}
        </div>
    );
};

export default Puzzle3;
