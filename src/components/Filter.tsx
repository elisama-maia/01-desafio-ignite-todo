import styles from './Filter.module.css'

interface Todos {
  id: string;
  title: string;
  isCompleted: boolean;
}

interface FilterProps {
  todos: Todos[];
}

export function Filter({ todos }: FilterProps) {  
  return (
   <div className={styles.filterContainer}>
    <span className={styles.filterTitle}>
      Tarefas criadas
      <span className={styles.filterCounter}>
        {todos.length}
      </span>
    </span>
    <span className={styles.filterTitle}>
      Concluídas
      <span className={styles.filterCounter}>
        {`${todos.filter(todo => todo.isCompleted).length} de ${todos.length}`}
      </span>
    </span>
   </div>
  )
}