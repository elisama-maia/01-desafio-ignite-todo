import { Trash } from "phosphor-react"
import classNames from 'classnames'

import styles from './Task.module.css'

interface TaskProps {
  id: string;
  title: string;
  isCompleted: boolean;
  onCompleteTodo: (todoId: string) => void;
  onDeleteTodo: (todoId: string) => void;
}

export function Task({ id, title, isCompleted, onCompleteTodo, onDeleteTodo}: TaskProps) {

  function handleCompleteTask() {
    onCompleteTodo(id)
  }

  function handleDeleteTask() {
    onDeleteTodo(id)
  }

  return (
    <div className={styles.taskContainer}>
      <input type="checkbox" name="checkboxTask" checked={isCompleted || false} onChange={handleCompleteTask} />
      <p className={classNames(styles.taskText, {
        [styles.taskTextCompleted]: isCompleted,
        [styles.taskTextNew]: !isCompleted,
      })}>
        {title}
      </p>
      <Trash size={24} className={styles.trashIcon} onClick={handleDeleteTask} />
    </div>
  )
}