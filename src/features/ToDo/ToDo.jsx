import { useState } from 'react';
import TaskInput from "./components/TaskInput/TaskInput.jsx";
import TaskList from "./components/TaskList/TaskList.jsx";
import AddTaskModal from "./components/AddTaskModal/AddTaskModal.jsx";
import TaskCalendar from "./components/TaskCalendar/TaskCalendar.jsx";
import Sidebar from "./components/ToDoSidebar/ToDoSidebar.jsx";
import styles from "./ToDo.module.scss";

export default function ToDo() {
    const [tasks, setTasks] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const addTask = (text, date, time, priority = "medium") => {
        if (text.trim()) {
            setTasks((prev) => [...prev, {
                text,
                date,
                time,
                priority,
                completed: false
            }]);
        }
    };

    const removeTask = (index) => {
        setTasks((prev) => prev.filter((_, i) => i !== index));
    };

    const editTask = (index, newText, newDate, newTime, newPriority = "medium") => {
        if (newText.trim()) {
            const updated = [...tasks];
            updated[index] = {
                ...updated[index],
                text: newText,
                date: newDate,
                time: newTime,
                priority: newPriority
            };
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

    const handleDragStart = (e, dragIndex) => {
        e.dataTransfer.setData('text/plain', dragIndex.toString());
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = (e, dropIndex) => {
        e.preventDefault();
        const dragIndex = parseInt(e.dataTransfer.getData('text/plain'));

        if (dragIndex === dropIndex) return;

        const updated = [...tasks];
        const draggedTask = updated[dragIndex];

        updated.splice(dragIndex, 1);
        updated.splice(dropIndex, 0, draggedTask);

        setTasks(updated);
    };

    const toggleComplete = (index) => {
        setTasks((prev) => {
            const updated = [...prev];
            updated[index] = { ...updated[index], completed: !updated[index].completed };
            return updated;
        });
    };

    const sortTasksByPriority = () => {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        const sorted = [...tasks].sort((a, b) => {
            const priorityA = priorityOrder[a.priority || "medium"];
            const priorityB = priorityOrder[b.priority || "medium"];
            return priorityB - priorityA;
        });
        setTasks(sorted);
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

    const priorityStats = {
        high: tasks.filter(t => t.priority === "high").length,
        medium: tasks.filter(t => t.priority === "medium").length,
        low: tasks.filter(t => t.priority === "low").length
    };

    return (
        <div className={styles.toDoContainer}>
            <Sidebar onOpenModal={openModal} />
            <div className={styles.toDoList}>
                <TaskCalendar tasks={tasks} />
                {tasks.length > 0 && (
                    <div className={styles.sortControls}>
                        <button
                            onClick={sortTasksByPriority}
                            className={styles.sortButton}
                        >
                            Sort by Priority
                        </button>
                    </div>
                )}

                <TaskInput onSearch={handleSearch} />
                <TaskList
                    tasks={filteredTasksWithIndices}
                    onRemove={removeTask}
                    onMoveUp={isSearchActive ? null : moveTaskUp}
                    onMoveDown={isSearchActive ? null : moveTaskDown}
                    onEdit={editTask}
                    onToggleComplete={toggleComplete}
                    isSearchActive={isSearchActive}
                    onDragStart={handleDragStart}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                />

                {tasks.length > 0 && (
                    <div className={styles.progressBar}>
                        <div className={styles.progressHeader}>
                            <span>Progress: {completedCount} of {tasks.length} tasks</span>
                            <span className={styles.progressPercent}>
                                {tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0}%
                            </span>
                        </div>
                        <div className={styles.progressTrack}>
                            <div className={styles.progressFill} style={{
                                width: `${tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0}%`
                            }} />
                        </div>
                    </div>
                )}
                {tasks.length > 0 && (
                    <div className={styles.taskStats}>
                        <small>
                            All Tasks: {tasks.length} · Completed: {completedCount} · Not Completed: {uncompletedCount}
                        </small>
                        <small className={styles.priorityStats}>
                            <span className={styles.priorityHigh}>High: {priorityStats.high}</span> ·
                            <span className={styles.priorityMedium}>Medium: {priorityStats.medium}</span> ·
                            <span className={styles.priorityLow}>Low: {priorityStats.low}</span>
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