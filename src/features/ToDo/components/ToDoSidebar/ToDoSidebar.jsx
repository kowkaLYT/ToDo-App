import { Plus } from "lucide-react";
import styles from './ToDoSidebar.module.scss';
import { useState, useEffect } from 'react';

export default function Sidebar({ onOpenModal, tasks = [] }) {
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

    const completedCount = tasks.filter((t) => t.completed).length;
    const uncompletedCount = tasks.length - completedCount;

    const priorityStats = {
        high: tasks.filter(t => t.priority === "high").length,
        medium: tasks.filter(t => t.priority === "medium").length,
        low: tasks.filter(t => t.priority === "low").length
    };

    const categoryStats = {
        work: tasks.filter(t => t.category === "work").length,
        personal: tasks.filter(t => t.category === "personal").length,
        home: tasks.filter(t => t.category === "home").length,
        study: tasks.filter(t => t.category === "study").length
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
                    <div className={styles.generalStats}>
                        Total: {tasks.length} · Completed: {completedCount} · Remaining: {uncompletedCount}
                    </div>

                    <div className={styles.statsSection}>
                        <div className={styles.statsTitle}>Priority</div>
                        <div className={styles.priorityStats}>
                            <div className={`${styles.statItem} ${styles.high}`}>
                                <div className={styles.label}>
                                    <div className={styles.dot}></div>
                                    High Priority
                                </div>
                                <div className={styles.count}>{priorityStats.high}</div>
                            </div>
                            <div className={`${styles.statItem} ${styles.medium}`}>
                                <div className={styles.label}>
                                    <div className={styles.dot}></div>
                                    Medium Priority
                                </div>
                                <div className={styles.count}>{priorityStats.medium}</div>
                            </div>
                            <div className={`${styles.statItem} ${styles.low}`}>
                                <div className={styles.label}>
                                    <div className={styles.dot}></div>
                                    Low Priority
                                </div>
                                <div className={styles.count}>{priorityStats.low}</div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.statsSection}>
                        <div className={styles.statsTitle}>Categories</div>
                        <div className={styles.categoryStats}>
                            <div className={`${styles.statItem} ${styles.work}`}>
                                <div className={styles.label}>
                                    <div className={styles.dot}></div>
                                    Work
                                </div>
                                <div className={styles.count}>{categoryStats.work}</div>
                            </div>
                            <div className={`${styles.statItem} ${styles.personal}`}>
                                <div className={styles.label}>
                                    <div className={styles.dot}></div>
                                    Personal
                                </div>
                                <div className={styles.count}>{categoryStats.personal}</div>
                            </div>
                            <div className={`${styles.statItem} ${styles.home}`}>
                                <div className={styles.label}>
                                    <div className={styles.dot}></div>
                                    Home
                                </div>
                                <div className={styles.count}>{categoryStats.home}</div>
                            </div>
                            <div className={`${styles.statItem} ${styles.study}`}>
                                <div className={styles.label}>
                                    <div className={styles.dot}></div>
                                    Study
                                </div>
                                <div className={styles.count}>{categoryStats.study}</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <button className={styles.buttonPlusModal} onClick={onOpenModal}>
                <Plus size={28} />
            </button>
        </div>
    );
}
