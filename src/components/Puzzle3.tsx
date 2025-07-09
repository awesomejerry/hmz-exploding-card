import React, { useState, useEffect } from 'react';
import puzzle3Image from '../assets/puzzle-3.jpg'; // The full image for the puzzle

interface Puzzle3Props {
    onSuccess: () => void;
}

// Define the number of rows and columns for the puzzle
const ROWS = 3;
const COLS = 3;
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
    const [draggedItem, setDraggedItem] = useState<number | null>(null);
    const [selectedPiece, setSelectedPiece] = useState<number | null>(null); // For touch/click selection
    const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
    const [isDragging, setIsDragging] = useState(false);

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

    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>, id: number) => {
        const touch = e.touches[0];
        setTouchStart({ x: touch.clientX, y: touch.clientY });
        setDraggedItem(id);
        setIsDragging(true);
        e.preventDefault();
    };

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        if (!isDragging || !draggedItem) return;
        e.preventDefault();
    };

    const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
        if (!isDragging || !draggedItem || !touchStart) {
            setIsDragging(false);
            setDraggedItem(null);
            setTouchStart(null);
            return;
        }

        const touch = e.changedTouches[0];
        const element = document.elementFromPoint(touch.clientX, touch.clientY);

        if (element && element.classList.contains('jigsaw-piece')) {
            const targetPiece = pieces.find(p => {
                const pieceElement = element as HTMLElement;
                return pieceElement.dataset.pieceId === p.id.toString();
            });

            if (targetPiece && targetPiece.id !== draggedItem) {
                handlePieceSwap(draggedItem, targetPiece.id);
            }
        }

        setIsDragging(false);
        setDraggedItem(null);
        setTouchStart(null);
        e.preventDefault();
    };

    const handlePieceClick = (pieceId: number) => {
        if (selectedPiece === null) {
            // Select the first piece
            setSelectedPiece(pieceId);
        } else if (selectedPiece === pieceId) {
            // Deselect if clicking the same piece
            setSelectedPiece(null);
        } else {
            // Swap the two pieces
            handlePieceSwap(selectedPiece, pieceId);
            setSelectedPiece(null);
        }
    };

    const handlePieceSwap = (draggedId: number, targetId: number) => {
        const draggedPieceIndex = pieces.findIndex(p => p.id === draggedId);
        const targetPieceIndex = pieces.findIndex(p => p.id === targetId);

        if (draggedPieceIndex === -1 || targetPieceIndex === -1) return;

        const newPieces = [...pieces];
        // Swap the current positions of the dragged piece and the target piece
        const tempCurrentPos = newPieces[draggedPieceIndex].currentPos;
        newPieces[draggedPieceIndex].currentPos = newPieces[targetPieceIndex].currentPos;
        newPieces[targetPieceIndex].currentPos = tempCurrentPos;

        setPieces(newPieces);

        // Check if solved after state update
        if (checkPuzzleSolved(newPieces)) {
            setError(false);
            onSuccess();
        } else {
            setError(true); // Show error if not solved
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault(); // Necessary to allow dropping
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetPos: number) => {
        e.preventDefault();
        const draggedId = parseInt(e.dataTransfer.getData('text/plain'));
        const targetPieceId = pieces.find(p => p.currentPos === targetPos)?.id;

        if (targetPieceId !== undefined) {
            handlePieceSwap(draggedId, targetPieceId);
        }
        setDraggedItem(null);
    };

    const checkPuzzleSolved = (currentPieces: typeof pieces) => {
        return currentPieces.every(piece => piece.currentPos === piece.correctPos);
    };

    return (
        <div className="puzzle">
            <h1>第三關：拼湊的回憶</h1>
            <p>讓我們一起拼湊出這段美好的回憶。</p>
            <div className="puzzle-instructions">
                <p>💡 操作說明：</p>
                <ul>
                    <li>電腦：拖拽拼圖片進行交換</li>
                    <li>手機：點擊兩個拼圖片進行交換</li>
                </ul>
                {selectedPiece !== null && (
                    <p className="selection-hint">
                        已選中拼圖片 #{selectedPiece + 1}，點擊另一片進行交換
                    </p>
                )}
            </div>
            <div className="jigsaw-grid" style={{
                gridTemplateColumns: `repeat(${COLS}, 1fr)`,
                gridTemplateRows: `repeat(${ROWS}, 1fr)`,
            }}>
                {pieces.sort((a, b) => a.currentPos - b.currentPos).map((piece) => (
                    <div
                        key={piece.id}
                        className={`jigsaw-piece ${draggedItem === piece.id ? 'dragging' : ''} ${selectedPiece === piece.id ? 'selected' : ''}`}
                        data-piece-id={piece.id}
                        draggable
                        onClick={() => handlePieceClick(piece.id)}
                        onDragStart={(e) => handleDragStart(e, piece.id)}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, piece.currentPos)}
                        onTouchStart={(e) => handleTouchStart(e, piece.id)}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                        style={{
                            backgroundImage: `url(${puzzle3Image})`,
                            backgroundSize: `${COLS * 100}% ${ROWS * 100}%`,
                            backgroundPosition: `${(piece.correctPos % COLS) / (COLS - 1) * 100}% ${Math.floor(piece.correctPos / COLS) / (ROWS - 1) * 100}%`,
                            transform: (draggedItem === piece.id && isDragging) || selectedPiece === piece.id ? 'scale(1.1)' : 'scale(1)',
                            zIndex: draggedItem === piece.id || selectedPiece === piece.id ? 1000 : 1,
                            transition: isDragging ? 'none' : 'transform 0.2s ease',
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
