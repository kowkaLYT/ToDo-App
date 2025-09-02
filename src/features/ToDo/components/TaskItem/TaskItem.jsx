import { useState } from "react";
import { Trash, ArrowUp, ArrowDown, PencilLine, Check } from "lucide-react";
import styles from "./TaskItem.module.scss";

export default function TaskItem({
    task,
    index,
    displayIndex,
    totalFilteredTasks,
    onRemove,
    onMoveUp,
    onMoveDown,
    onEdit,
    onToggleComplete,
    isSearchActive,
    onDragStart,
    onDragOver,
    onDrop,
}) {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(task.text);
    const [date, setDate] = useState(task.date);
    const [time, setTime] = useState(task.time);
    const [priority, setPriority] = useState(task.priority || "medium");
    const [isDragOver, setIsDragOver] = useState(false);

    const handleSave = () => {
        if (text.trim()) {
            onEdit(index, text, date, time, priority); 
            setIsEditing(false);
        }
    };

    const handleDragStart = (e) => {
        onDragStart(e, index);
        e.currentTarget.style.opacity = '0.5';
    };

    const handleDragEnd = (e) => {
        e.currentTarget.style.opacity = '1';
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        onDragOver(e);
        setIsDragOver(true);
    };

    const handleDragLeave = (e) => {
        setIsDragOver(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragOver(false);
        onDrop(e, index);
    };


    const getPriorityClass = (priority) => {
        switch (priority) {
            case "high": return styles.priorityHigh;
            case "medium": return styles.priorityMedium;
            case "low": return styles.priorityLow;
            default: return styles.priorityMedium;
        }
    };

    return (
        <li
            className={`${styles.taskItem} ${task.completed ? styles.completed : ""} ${isDragOver ? styles.dragOver : ""}`}
            draggable={!isEditing && !isSearchActive}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            style={{
                cursor: (!isEditing && !isSearchActive) ? 'grab' : 'default',
                transition: 'all 0.2s ease'
            }}
        >
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
                    <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        className={styles.editSelect}
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </>
            ) : (
                <label className={styles.taskLabel}>
                    <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => onToggleComplete(index)}
                    />
                    <div className={styles.taskContent}>
                        <span className={`${styles.priorityBadge} ${getPriorityClass(task.priority || "medium")}`}>
                            {task.priority || "medium"}
                        </span>
                        <span className={styles.textTask}>
                            {task.text} — {task.date} {task.time}
                        </span>
                    </div>
                </label>
            )}
            <div className={styles.buttonsContainer}>
                <button
                    className={styles.actionButton}
                    onClick={() => onMoveUp && onMoveUp(index)}
                    disabled={isSearchActive || displayIndex === 0}
                >
                    <ArrowUp />
                </button>
                <button
                    className={styles.actionButton}
                    onClick={() => onMoveDown && onMoveDown(index)}
                    disabled={isSearchActive || displayIndex === totalFilteredTasks - 1}
                >
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
