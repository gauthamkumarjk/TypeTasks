export type TaskStatus = "todo" | "in-progress" | "done";

export interface Task {
  id: number;
  title: string;
  status: TaskStatus;
}


export function addTask(tasks: Task[], title: string): Task[] {
  const nextId = tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
  const newTask: Task = {
    id: nextId,
    title,
    status: "todo",
  };
  return [...tasks, newTask];
}

/**
 * Returns a new array where the task with the matching id has its status set to "done".
 */
export function completeTask(tasks: Task[], id: number): Task[] {
  return tasks.map((task) =>
    task.id === id ? { ...task, status: "done" } : task
  );
}


export function filterByStatus(tasks: Task[], status: TaskStatus): Task[] {
  return tasks.filter((task) => task.status === status);
}

export function advanceTask(tasks: Task[], id: number): Task[] {
  return tasks.map((task) => {
    if (task.id !== id) return task;

    let nextStatus: TaskStatus = task.status;
    if (task.status === "todo") {
      nextStatus = "in-progress";
    } else if (task.status === "in-progress") {
      nextStatus = "done";
    }

    return { ...task, status: nextStatus };
  });
}


export function deleteTask(tasks: Task[], id: number): Task[] {
  return tasks.filter((task) => task.id !== id);
}


export function countByStatus(tasks: Task[], status: TaskStatus): number {
  return tasks.reduce((count, task) => (task.status === status ? count + 1 : count), 0);
}