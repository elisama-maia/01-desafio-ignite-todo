import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'
import { PlusCircle } from "phosphor-react";

import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Filter } from "../components/Filter";
import { Task } from "../components/Task";

import clipboardUrl from "../assets/clipboard.svg"

import styles from "./Main.module.css";

interface TodosProps {
  id: string;
  title: string;
  isCompleted: boolean;
}

export function Main() {
  const [todoText, setTodoText] = useState('')
  const [todos, setTodos] = useState<TodosProps[]>([])

  function genUniqueId(): string {
    const dateStr = Date
      .now()
      .toString(36); 
  
    const randomStr = Math
      .random()
      .toString(36)
      .substring(2, 8);

      return `${dateStr}-${randomStr}`
  }

  function handleCreateNewTodo(event: FormEvent) {
    event.preventDefault()
    
    setTodos([...todos, {id: genUniqueId(), title: todoText, isCompleted: false}])
    setTodoText('')
  }

  function handleNewTodoText(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('')
    setTodoText(event.target.value)
  }

  function handleNewTodoInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity('Esse campo é obrigatório')
  }

  function onCompleteTodo(todoIdToComplete: string) {
    setTodos(todos.map(todo => {
      if (todo.id === todoIdToComplete && !todo.isCompleted) {
        return {...todo, isCompleted: true}
      } else if (todo.id === todoIdToComplete && todo.isCompleted) {
        return {...todo, isCompleted: false}
      }

      return todo
    }))
  }

  function onDeleteTodo(todoIdToDelete: string) {
    const todosWithoutDeletedOne = todos.filter(todo => {
      return todo.id !== todoIdToDelete
    })

    setTodos(todosWithoutDeletedOne)
  }

  return (
    <>
      <Header />
      <main className={styles.wrapper} >
        <form className={styles.formAddTasks} onSubmit={handleCreateNewTodo}>
          <Input 
            placeholder="Adicione uma nova tarefa"
            value={todoText}
            onChange={handleNewTodoText}
            required
            onInvalid={handleNewTodoInvalid}
          />
          <Button 
            text="Criar" 
            type="submit"
            icon={PlusCircle}
          />
        </form>
        <Filter todos={todos} />
          { todos.length > 0 ? 
            todos.map(todo => { 
             return (
              <Task
                key={todo.id}
                title={todo.title} 
                id={todo.id} 
                isCompleted={todo.isCompleted}
                onCompleteTodo={onCompleteTodo}
                onDeleteTodo={onDeleteTodo}
              />
             )
            })
            :
            <div className={styles.emptyContainer}>
              <img src={clipboardUrl} alt="clipboard" />
              <p>
                Você ainda não tem tarefas cadastradas
              </p>
              <p>
                Crie tarefas e organize seus itens a fazer
              </p>
            </div> 
          }
      </main>
    </>
  )
}