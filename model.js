export function addTask(tasks, title) {
    const nextId = tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
    const newTask = {
        id: nextId,
        title,
        status: "todo",
    };
    return [...tasks, newTask];
}
/**
 * Returns a new array where the task with the matching id has its status set to "done".
 */
export function completeTask(tasks, id) {
    return tasks.map((task) => task.id === id ? { ...task, status: "done" } : task);
}
export function filterByStatus(tasks, status) {
    return tasks.filter((task) => task.status === status);
}
export function advanceTask(tasks, id) {
    return tasks.map((task) => {
        if (task.id !== id)
            return task;
        let nextStatus = task.status;
        if (task.status === "todo") {
            nextStatus = "in-progress";
        }
        else if (task.status === "in-progress") {
            nextStatus = "done";
        }
        return { ...task, status: nextStatus };
    });
}
export function deleteTask(tasks, id) {
    return tasks.filter((task) => task.id !== id);
}
export function countByStatus(tasks, status) {
    return tasks.reduce((count, task) => (task.status === status ? count + 1 : count), 0);
}
