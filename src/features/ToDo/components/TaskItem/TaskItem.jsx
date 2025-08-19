import { useState } from "react";
import { Trash, ArrowUp, ArrowDown, PencilLine, Check } from "lucide-react";
import styles from "./TaskItem.module.scss";

export default function TaskItem({ task, index, onRemove, onMoveUp, onMoveDown, onEdit }) {
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(task);

    const handleSave = () => {
        if (value.trim()) {
            onEdit(index, value);
            setIsEditing(false);
        }
    };

    return (
        <li className={styles.taskItem}>
            {isEditing ? (
                <input
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSave()}
                    onBlur={handleSave}
                    autoFocus
                    className={styles.editInput}
                />
            ) : (
                <span className={styles.textTask}>{task}</span>
            )}

            <div className={styles.buttonsContainer}>
                <button className={styles.actionButton} onClick={() => onMoveUp(index)}><ArrowUp /></button>
                <button className={styles.actionButton} onClick={() => onMoveDown(index)}><ArrowDown /></button>

                {isEditing ? (
                    <button className={styles.actionButton} onClick={handleSave}><Check /></button>
                ) : (
                    <button className={styles.actionButton} onClick={() => setIsEditing(true)}><PencilLine /></button>
                )}

                <button className={styles.actionButton} onClick={() => onRemove(index)}><Trash /></button>
            </div>
        </li>
    );
}
