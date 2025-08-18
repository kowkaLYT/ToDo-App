import { useState } from "react";
import { Sun, ChevronDown } from "lucide-react";
import styles from "./TaskInput.module.scss";

export default function TaskInput({ onAdd }) {
    const [newTask, setNewTask] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd(newTask);
        setNewTask("");
    };

    return (
        <form onSubmit={handleSubmit} className={styles.taskInputForm}>
            <input
                type="text"
                placeholder="Enter a task..."
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                className={styles.taskInput}
            />
            <button type="submit" className={styles.addButton}>
                Add
            </button>
            <button type="submit" className={styles.tasksFilter}>
                <span>All</span>
                <ChevronDown className={styles.arrowDown} />
            </button>

            <Sun className={styles.taskInputIcon} />
            {/* <Moon /> */}
        </form>
    );
}
