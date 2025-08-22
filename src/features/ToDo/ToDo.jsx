import { useState } from "react";
import { Plus } from "lucide-react";
import TaskInput from "./components/TaskInput/TaskInput.jsx";
import TaskList from "./components/TaskList/TaskList.jsx";
import AddTaskModal from "./components/AddTaskModal/AddTaskModal.jsx";
import styles from "./ToDo.module.scss";

export default function ToDo() {
    const [tasks, setTasks] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const addTask = (text, date, time) => {
        if (text.trim()) {
            setTasks((prev) => [...prev, { text, date, time, completed: false }]);
        }
    };

    const removeTask = (index) => {
        setTasks((prev) => prev.filter((_, i) => i !== index));
    };

    const editTask = (index, newText, newDate, newTime) => {
        if (newText.trim()) {
            const updated = [...tasks];
            updated[index] = { text: newText, date: newDate, time: newTime };
            setTasks(updated);
        }
    };

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

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const completedCount = tasks.filter((t) => t.completed).length;
    const uncompletedCount = tasks.length - completedCount;

    return (
        <div className={styles.toDoContainer}>
            <div className={styles.toDoList}>
                <h1 className={styles.toDoTitle}>ToDo List</h1>
                <TaskInput onSearch={handleSearch} />
                <TaskList
                    tasks={tasks.filter((task) =>
                        task.text.toLowerCase().includes(searchQuery.toLowerCase())
                    )}
                    onRemove={removeTask}
                    onMoveUp={moveTaskUp}
                    onMoveDown={moveTaskDown}
                    onEdit={editTask}
                    onToggleComplete={(index) => {
                        setTasks((prev) => {
                            const updated = [...prev];
                            updated[index].completed = !updated[index].completed;
                            return updated;
                        });
                    }}
                />

                <button className={styles.buttonPlusModal} onClick={openModal}>
                    <Plus size={28} />
                </button>
            </div>

            <AddTaskModal isOpen={isModalOpen} onClose={closeModal} onAdd={addTask} />
        </div>
    );
}
