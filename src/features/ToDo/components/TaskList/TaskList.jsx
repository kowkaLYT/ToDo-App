import TaskItem from "../TaskItem/TaskItem.jsx";
import styles from "./TaskList.module.scss";

export default function TaskList({
    tasks,
    onRemove,
    onMoveUp,
    onMoveDown,
    onEdit,
    onToggleComplete,
    isSearchActive,
    onDragStart,
    onDragOver,
    onDrop
}) {
    if (tasks.length === 0) {
        return (
            <div className={styles.emptyState}>
                <img src="/img-empty.png" alt="Nothing here" className={styles.emptyImage} />
                <p>Empty...</p>
            </div>
        );
    }

    return (
        <ul className={styles.taskList}>
            {tasks.map(({ task, originalIndex }, displayIndex) => (
                <TaskItem
                    key={originalIndex}
                    task={task}
                    index={originalIndex}
                    displayIndex={displayIndex}
                    totalFilteredTasks={tasks.length}
                    onRemove={onRemove}
                    onMoveUp={onMoveUp}
                    onMoveDown={onMoveDown}
                    onEdit={onEdit}
                    onToggleComplete={onToggleComplete}
                    isSearchActive={isSearchActive}
                    onDragStart={onDragStart}
                    onDragOver={onDragOver}
                    onDrop={onDrop}
                />
            ))}
        </ul>
    );
}
