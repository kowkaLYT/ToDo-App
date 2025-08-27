import TaskItem from "../TaskItem/TaskItem.jsx";
import styles from "./TaskList.module.scss";

export default function TaskList({ tasks, onRemove, onMoveUp, onMoveDown, onEdit, onToggleComplete }) {
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
            {tasks.map((task, index) => (
                <TaskItem
                    key={index}
                    task={task}
                    index={index}
                    onRemove={onRemove}
                    onMoveUp={onMoveUp}
                    onMoveDown={onMoveDown}
                    onEdit={onEdit}
                    onToggleComplete={onToggleComplete}
                />
            ))}
        </ul>
    );
}
