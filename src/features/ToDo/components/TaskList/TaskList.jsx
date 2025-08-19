import TaskItem from "../TaskItem/TaskItem.jsx";
import styles from "./TaskList.module.scss";

export default function TaskList({ tasks, onRemove, onMoveUp, onMoveDown, onEdit }) {
    return (
        <ol className={styles.tasksContainer}>
            {tasks.map((task, index) => (
                <TaskItem
                    key={index}
                    task={task}
                    index={index}
                    onRemove={onRemove}
                    onMoveUp={onMoveUp}
                    onMoveDown={onMoveDown}
                    onEdit={onEdit}
                />
            ))}
        </ol>
    );
}
