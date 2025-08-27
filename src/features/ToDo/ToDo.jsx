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
            updated[index] = { ...updated[index], text: newText, date: newDate, time: newTime };
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

    const toggleComplete = (index) => {
        setTasks((prev) => {
            const updated = [...prev];
            updated[index] = { ...updated[index], completed: !updated[index].completed };
            return updated;
        });
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const completedCount = tasks.filter((t) => t.completed).length;
    const uncompletedCount = tasks.length - completedCount;

    const filteredTasksWithIndices = tasks
        .map((task, originalIndex) => ({ task, originalIndex }))
        .filter(({ task }) =>
            task.text.toLowerCase().includes(searchQuery.toLowerCase())
        );

    const isSearchActive = searchQuery.trim().length > 0;

    return (
        <div className={styles.toDoContainer}>
            <div className={styles.toDoList}>
                <h1 className={styles.toDoTitle}>ToDo List</h1>
                <TaskInput onSearch={handleSearch} />
                <TaskList
                    tasks={filteredTasksWithIndices}
                    onRemove={removeTask}
                    onMoveUp={isSearchActive ? null : moveTaskUp} 
                    onMoveDown={isSearchActive ? null : moveTaskDown} 
                    onEdit={editTask}
                    onToggleComplete={toggleComplete}
                    isSearchActive={isSearchActive}
                />

                <button className={styles.buttonPlusModal} onClick={openModal}>
                    <Plus size={28} />
                </button>

                {tasks.length > 0 && (
                    <div style={{ marginTop: 12 }}>
                        <small>
                            All Tasks: {tasks.length} · Completed: {completedCount} · Not Completed: {uncompletedCount}
                        </small>
                    </div>
                )}

                {isSearchActive && (
                    <div style={{ marginTop: 8 }}>
                        <small style={{ color: '#888' }}>
                            Move buttons are disabled during search
                        </small>
                    </div>
                )}
            </div>

            <AddTaskModal isOpen={isModalOpen} onClose={closeModal} onAdd={addTask} />
        </div>
    );
}