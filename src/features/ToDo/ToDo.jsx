import { useState } from "react";
import TaskInput from "./components/TaskInput/TaskInput.jsx";
import TaskList from "./components/TaskList/TaskList.jsx";
import styles from "./ToDo.module.scss";

export default function ToDo() {
    const [tasks, setTasks] = useState([]);

    const addTask = (task) => {
        if (task.trim()) setTasks((prev) => [...prev, task]);
    };

    const removeTask = (index) => {
        setTasks((prev) => prev.filter((_, i) => i !== index));
    };
    const editTask = (index, newTask) => {
        
        if (newTask.trim()) {
            const updated = [...tasks];
            updated[index] = newTask;
            setTasks(updated);
        }
    }
    const moveTaskUp = (index) => {
        if (index > 0) {
            const updated = [...tasks];
            [updated[index], updated[index - 1]] = [updated[index - 1], updated[index]];
            setTasks(updated);
        }
    };

    const moveTaskDown = (index) => {
        if (index < tasks.length - 1) {
            const updated = [...tasks];
            [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
            setTasks(updated);
        }
    };

    return (
        <div className={styles.toDoList} >
            <h1 className={styles.toDoTitle}>ToDo List</h1>
            <TaskInput onAdd={addTask} />
            <TaskList
                tasks={tasks}
                onRemove={removeTask}
                onMoveUp={moveTaskUp}
                onMoveDown={moveTaskDown}
                onEdit={editTask}
            />
        </div>
    );
}
