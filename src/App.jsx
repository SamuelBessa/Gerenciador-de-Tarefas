import { useEffect, useState } from "react";
import AddTask from "./componentes/AddTask";
import Tasks from "./componentes/Tasks"
import { v4 } from "uuid";
import Title from "./componentes/Title";

function App() {

  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || [
      {
        id: 1,
        title: "Estudar programação",
        description: "Estudar programação para se tornar um desenvolvedor full stack.",
        isCompleted: false,
      },
      {
        id: 2,
        title: "Estudar inglês",
        description: "Estudar inglês para se tornar fluente",
        isCompleted: false,
      },
      {
        id: 3,
        title: "Estudar Russo",
        description: "Estudar Russo para ficar fluente",
        isCompleted: false,
      }
    ]
  );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function onTaskClick(taskId) {
    const newTasks = tasks.map((task) => {

      if (task.id == taskId) {
        return { ...task, isCompleted: !task.isCompleted };
      }

      return task;
    });
    setTasks(newTasks);
  }

  function onDeleteTaskClick(taskId) {
    const newTasks = tasks.filter(task => task.id !== taskId)
    setTasks(newTasks);
  }

  function onAddTaskSubmit(title, description) {
    const newTask = {
      id: v4(),
      title: title,
      description: description,
      isCompleted: false,
    };
    setTasks([...tasks, newTask])
  }

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        <Title>Gerenciador de Tarefas</Title>
        <AddTask onAddTaskSubmit={onAddTaskSubmit} />
        <Tasks tasks={tasks}
          onTaskClick={onTaskClick}
          onDeleteTaskClick={onDeleteTaskClick} />
      </div>
    </div>
  )
}

export default App
