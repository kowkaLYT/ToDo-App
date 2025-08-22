import { useState } from "react";
import styles from "./AddTaskModal.module.scss";

export default function AddTaskModal({ isOpen, onClose, onAdd }) {
    const [text, setText] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");

    const handleAdd = () => {
        if (text.trim()) {
            onAdd(text, date, time);
            setText("");
            setDate("");
            setTime("");
            onClose();
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleAdd();
        }
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2 className={styles.modalTitle}>New Note</h2>
                <div className={styles.inputModalBox}>
                    <input
                        type="text"
                        placeholder="Enter new task..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className={styles.modalInput}
                    />

                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className={styles.modalInput}
                    />

                    <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className={styles.modalInput}
                    />

                    <div className={styles.buttonsContainer}>
                        <button
                            className={styles.modalCancelButton}
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            className={styles.modalAddButton}
                            onClick={handleAdd}
                        >
                            Add
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
