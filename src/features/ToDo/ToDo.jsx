import { useState, useEffect } from 'react';
import { Plus } from "lucide-react";
import TaskInput from "./components/TaskInput/TaskInput.jsx";
import TaskList from "./components/TaskList/TaskList.jsx";
import AddTaskModal from "./components/AddTaskModal/AddTaskModal.jsx";
import styles from "./ToDo.module.scss";

export default function ToDo() {
    const [tasks, setTasks] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (date) => {
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });
    };

    const formatDay = (date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

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
                <div className={styles.headToDo}>
                    <h1 className={styles.toDoTitle}>ToDo List</h1>
                    <div style={{ textAlign: 'center', marginTop: '8px' }}>
                        <span style={{
                            display: 'block',
                            fontSize: '1.2rem',
                            fontWeight: 'bold',
                            marginBottom: '4px'
                        }}>
                            {formatTime(currentTime)}
                        </span>
                        <span style={{
                            display: 'block',
                            fontSize: '0.9rem',
                            color: '#666'
                        }}>
                            {formatDay(currentTime)}
                        </span>
                    </div>
                </div>
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

                <button className={styles.buttonPlusModal} onClick={openModal}>
                    <Plus size={28} />
                </button>

                {tasks.length > 0 && (
                    <div style={{ marginTop: '16px' }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '8px'
                        }}>
                            <span style={{ fontSize: '0.85rem', color: '#666' }}>
                                Progress: {completedCount} of {tasks.length} tasks
                            </span>
                            <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#333' }}>
                                {tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0}%
                            </span>
                        </div>
                        <div style={{
                            width: '100%',
                            height: '8px',
                            backgroundColor: '#e0e0e0',
                            borderRadius: '4px',
                            overflow: 'hidden',
                            boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)'
                        }}>
                            <div style={{
                                width: `${tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0}%`,
                                height: '100%',
                                backgroundColor: completedCount === tasks.length && tasks.length > 0 ? '#4CAF50' : '#2196F3',
                                borderRadius: '4px',
                                transition: 'width 0.3s ease-in-out, background-color 0.3s ease-in-out',
                                backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0.2) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.2) 75%, transparent 75%, transparent)'
                            }} />
                        </div>
                    </div>
                )}
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