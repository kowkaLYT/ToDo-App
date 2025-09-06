import { useState } from "react";
import styles from "./AddTaskModal.module.scss";

export default function AddTaskModal({ isOpen, onClose, onAdd }) {
    const [text, setText] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [priority, setPriority] = useState("medium");
    const [category, setCategory] = useState("work");

    const categories = [
        { value: "work", label: "Work" },
        { value: "personal", label: "Personal" },
        { value: "home", label: "Home" },
        { value: "study", label: "Study" }
    ];

    const handleAdd = () => {
        if (text.trim()) {
            onAdd(text, date, time, priority, category);
            setText("");
            setDate("");
            setTime("");
            setPriority("medium");
            setCategory("work");
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

                    <div className={styles.priorityContainer}>
                        <label className={styles.priorityLabel}>Priority:</label>
                        <select
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                            className={styles.prioritySelect}
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>

                    <div className={styles.categoryContainer}>
                        <label className={styles.categoryLabel}>Category:</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className={styles.categorySelect}
                        >
                            {categories.map(cat => (
                                <option key={cat.value} value={cat.value}>
                                    {cat.label}
                                </option>
                            ))}
                        </select>
                    </div>

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
