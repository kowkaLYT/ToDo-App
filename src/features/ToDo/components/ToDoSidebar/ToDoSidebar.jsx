import { useState, useEffect } from 'react';
import styles from './ToDoSidebar.module.scss';
export default function TaskCalendar() {
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
    return (
        <div className={styles.sidebarContainer}>
            <div className={styles.headToDo}>
                <h1 className={styles.toDoTitle}>ToDo List</h1>
            </div>
            <div className={styles.toDoTimeBox}>
                <span className={styles.time}>{formatTime(currentTime)}</span>
                <span className={styles.day}>{formatDay(currentTime)}</span>
            </div>
        </div>
    )
}