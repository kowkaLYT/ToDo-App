import { Sun, ChevronDown } from "lucide-react";
import styles from "./TaskInput.module.scss";

export default function TaskInput({ onSearch }) {
    const handleChange = (e) => {
        onSearch(e.target.value);
    };

    return (
        <div className={styles.taskInputForm}>
            <input
                type="text"
                placeholder="Search tasks..."
                onChange={handleChange}
                className={styles.taskInput}
            />
            <button className={styles.tasksFilter}>
                <span>All</span>
                <ChevronDown className={styles.arrowDown} />
            </button>
            <Sun className={styles.taskInputIcon} />
            {/* <Moon /> */}
        </div>
    );
}
