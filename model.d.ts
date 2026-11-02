export type TaskStatus = "todo" | "in-progress" | "done";
export interface Task {
    id: number;
    title: string;
    status: TaskStatus;
}
export declare function addTask(tasks: Task[], title: string): Task[];
/**
 * Returns a new array where the task with the matching id has its status set to "done".
 */
export declare function completeTask(tasks: Task[], id: number): Task[];
export declare function filterByStatus(tasks: Task[], status: TaskStatus): Task[];
export declare function advanceTask(tasks: Task[], id: number): Task[];
export declare function deleteTask(tasks: Task[], id: number): Task[];
export declare function countByStatus(tasks: Task[], status: TaskStatus): number;
//# sourceMappingURL=model.d.ts.map