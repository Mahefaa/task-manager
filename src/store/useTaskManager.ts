import {create} from 'zustand';
import {Task} from "@/pages/tasks";

interface TaskManagerState {
    tasks: Task[];
    searchTask: string;
    addTask: (task: Task) => void;
    updateTask: (taskId: number, updatedTask: Partial<Task>) => void;
    deleteTask: (taskId: number) => void;
    setSearchTask: (searchTerm: string) => void
}

const useTaskManager = create<TaskManagerState>((set) => ({
    tasks: [],
    searchTask: "",
    addTask: (task) => {
        set((state) => ({tasks: [...state.tasks, task]}));
    },

    updateTask: (taskId, updatedTask) => {
        set((state) => ({
            tasks: state.tasks.map((task) =>
                task.id === taskId ? {...task, ...updatedTask} : task
            ),
        }));
    },

    deleteTask: (taskId) => {
        set((state) => ({
            tasks: state.tasks.filter((task) => task.id !== taskId),
        }));
    },
    setSearchTask: searchTerm => {
        set((state) => ({
            searchTask: searchTerm
        }))
    }
}));

export {
    useTaskManager
}