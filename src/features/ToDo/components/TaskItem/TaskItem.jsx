import { Trash, ArrowUp, ArrowDown } from "lucide-react";
import styles from "./TaskItem.module.scss";
export default function TaskItem({ task, index, onRemove, onMoveUp, onMoveDown }) {
    return (
        <li className={styles.taskItem}>
            <span className={styles.textTask}>{task}</span>
            <div className={styles.buttonsContainer}>
                <button className={styles.actionButton} onClick={() => onMoveUp(index)}><ArrowUp /></button>
                <button className={styles.actionButton} onClick={() => onMoveDown(index)}><ArrowDown /></button>
                <button className={styles.actionButton} onClick={() => onRemove(index)}><Trash /></button>
            </div>
        </li>
    );
}
