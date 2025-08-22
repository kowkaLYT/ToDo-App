import { useState } from "react";
import { Trash, ArrowUp, ArrowDown, PencilLine, Check } from "lucide-react";
import styles from "./TaskItem.module.scss";

export default function TaskItem({ task, index, onRemove, onMoveUp, onMoveDown, onEdit }) {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(task.text);
    const [date, setDate] = useState(task.date);
    const [time, setTime] = useState(task.time);
    const [completed, setCompleted] = useState(false);

    const handleSave = () => {
        if (text.trim()) {
            onEdit(index, text, date, time);
            setIsEditing(false);
            setCompleted(false);
        }
    };

    return (
        <li className={`${styles.taskItem} ${completed ? styles.completed : ""}`}>
            {isEditing ? (
                <>
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSave()}
                        className={styles.editInput}
                    />
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className={styles.editInput}
                    />
                    <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className={styles.editInput}
                    />
                </>
            ) : (
                <label className={styles.taskLabel}>
                    <input
                        type="checkbox"
                        checked={completed}
                        onChange={(e) => setCompleted(e.target.checked)}
                    />
                    <span className={styles.textTask}>
                        {task.text} — {task.date} {task.time}
                    </span>
                </label>
            )}
            <div className={styles.buttonsContainer}>
                <button className={styles.actionButton} onClick={() => onMoveUp(index)}>
                    <ArrowUp />
                </button>
                <button className={styles.actionButton} onClick={() => onMoveDown(index)}>
                    <ArrowDown />
                </button>

                {isEditing ? (
                    <button className={styles.actionButton} onClick={handleSave}>
                        <Check />
                    </button>
                ) : (
                    <button className={styles.actionButton} onClick={() => setIsEditing(true)}>
                        <PencilLine />
                    </button>
                )}

                <button className={styles.actionButton} onClick={() => onRemove(index)}>
                    <Trash />
                </button>
            </div>
        </li>
    );
}
