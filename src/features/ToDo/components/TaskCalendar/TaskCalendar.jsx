import { useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp, Calendar } from 'lucide-react';
import styles from './TaskCalendar.module.scss';

export default function TaskCalendar({ tasks = [] }) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isExpanded, setIsExpanded] = useState(false);

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    const goToPreviousMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    const goToNextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

    const formatDateKey = date => date.toISOString().split('T')[0];
    const getTasksForDate = date => {
        const dateKey = formatDateKey(date);
        return tasks.filter(task => {
            if (!task.date) return false;
            let taskDate;
            if (task.date.includes('-')) taskDate = task.date;
            else if (task.date.includes('/')) {
                const [month, day, year] = task.date.split('/');
                taskDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
            } else {
                const parsedDate = new Date(task.date);
                if (!isNaN(parsedDate)) taskDate = parsedDate.toISOString().split('T')[0];
            }
            return taskDate === dateKey;
        });
    };

    const getTaskCountForDate = date => getTasksForDate(date).length;
    const getCompletedTasksForDate = date => getTasksForDate(date).filter(t => t.completed).length;
    const isToday = date => date.toDateString() === new Date().toDateString();
    const isSelectedDate = date => date.toDateString() === selectedDate.toDateString();
    const handleDateClick = date => setSelectedDate(date);
    const getCurrentWeekDays = () => {
        const today = new Date();

        const dayOfWeek = today.getDay();
        const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
        const startOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + mondayOffset);

        const weekDays = [];
        for (let i = 0; i < 7; i++) {
            const day = new Date(startOfWeek);
            day.setDate(startOfWeek.getDate() + i);
            weekDays.push(day);
        }
        return weekDays;
    };
    const getFullMonthDays = () => {
        const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        const firstDayOfWeek = firstDayOfMonth.getDay();
        const daysInMonth = lastDayOfMonth.getDate();
        const prevMonthDays = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
        const calendarDays = [];
        for (let i = firstDayOfWeek - 1; i >= 0; i--) calendarDays.push({ day: prevMonthDays - i, isCurrentMonth: false, date: new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, prevMonthDays - i) });
        for (let d = 1; d <= daysInMonth; d++) calendarDays.push({ day: d, isCurrentMonth: true, date: new Date(currentDate.getFullYear(), currentDate.getMonth(), d) });
        const remainingDays = 42 - calendarDays.length;
        for (let d = 1; d <= remainingDays; d++) calendarDays.push({ day: d, isCurrentMonth: false, date: new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, d) });
        return calendarDays;
    };

    const renderDayCell = (date, isCurrentMonth = true, isWeekView = false) => {
        const taskCount = getTaskCountForDate(date);
        const completedCount = getCompletedTasksForDate(date);
        const isTodayDate = isToday(date);
        const isSelected = isSelectedDate(date);
        const dayTasks = getTasksForDate(date);

        let cellClass = `${styles.dayCell} ${isCurrentMonth ? '' : ' ' + styles.notCurrent} ${isSelected ? ' ' + styles.selected : ''} ${isTodayDate ? ' ' + styles.today : ''} ${isWeekView ? ' ' + styles.weekView : ''}`;

        return (
            <div key={date.getTime()} onClick={() => handleDateClick(date)} className={cellClass}
                title={taskCount > 0 ? `${taskCount} task${taskCount > 1 ? 's' : ''}: ${dayTasks.map(t => t.text).join(', ')}` : ''}>
                <span className={styles.dayNumber}>{date.getDate()}</span>
                {isWeekView && <div className={styles.dayName}>{daysOfWeek[date.getDay()]}</div>}
                {taskCount > 0 &&
                    <div className={styles.tasks}>
                        <div className={styles.taskCount}>{taskCount}</div>
                        {completedCount > 0 && <div className={styles.taskCompletedDot}>{isWeekView && <span>{completedCount}</span>}</div>}
                        {isWeekView && dayTasks.slice(0, 3).map((task, idx) => <div key={idx} className={`${styles.taskText} ${task.completed ? styles.completed : ''}`}>{task.text.length > 15 ? `${task.text.substring(0, 15)}...` : task.text}</div>)}
                        {isWeekView && taskCount > 3 && <div className={styles.moreTasks}>+{taskCount - 3} more</div>}
                    </div>}
            </div>
        );
    };

    const weekDays = getCurrentWeekDays();
    const monthDays = getFullMonthDays();

    return (
        <div className={styles.taskCalendar}>
            <div className={styles.calendarContainer}>
                <div className={styles.calendarHeader}>
                    <div className={styles.calendarTitle}>
                        <Calendar size={24} color="#3b82f6" />
                        <h2>{isExpanded ? 'Month View' : 'This Week'}</h2>
                    </div>
                    <div className={styles.calendarControls}>
                        {isExpanded && <>
                            <button className={styles.navButton} onClick={goToPreviousMonth}><ChevronLeft size={18} /></button>
                            <span className={styles.monthLabel}>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</span>
                            <button className={styles.navButton} onClick={goToNextMonth}><ChevronRight size={18} /></button>
                        </>}
                        <button className={styles.toggleView} onClick={() => setIsExpanded(!isExpanded)}>
                            {isExpanded ? <><ChevronUp size={16} /> Week View</> : <><ChevronDown size={16} /> Month View</>}
                        </button>
                    </div>
                </div>
                {!isExpanded ?
                    <div className={styles.weekView}>
                        <div className={styles.weekDays}>{daysOfWeek.map(day => <div key={day}>{day}</div>)}</div>
                        <div className={styles.weekDates}>{weekDays.map(date => renderDayCell(date, true, true))}</div>
                    </div>
                    :
                    <div className={styles.monthView}>
                        <div className={styles.monthDaysHeader}>{daysOfWeek.map(day => <div key={day}>{day}</div>)}</div>
                        <div className={styles.monthDates}>{monthDays.map(d => renderDayCell(d.date, d.isCurrentMonth, false))}</div>
                    </div>
                }
            </div>
        </div>
    );
}
