import {create} from 'zustand';
import {Task} from "@/pages/tasks";
import {TASKS_KEY, useLocalStorage} from "@/hooks/useLocalStorage";

interface TaskManagerState {
    tasks: Task[];
    searchTask: string;
    addTask: (task: Task) => void;
    updateTask: (taskId: number, updatedTask: Partial<Task>) => void;
    deleteTask: (taskId: number) => void;
    setSearchTask: (searchTerm: string) => void
}

const useTaskManager = create<TaskManagerState>((set) => {
    let {get, set: setter} = useLocalStorage();
    const savedTasks = () => {
        try {
            const data = get(TASKS_KEY);
            if (data) {
                return JSON.parse(data);
            }
        } catch (e) {
            return [];
        }
    }
    console.log("saved Tasks = " + savedTasks())
    const setSavedTasks = (value: Task[]) => {
        setter(TASKS_KEY, JSON.stringify(value))
    }

    return ({
        tasks: [],
        searchTask: "",
        addTask: (task) => {
            set((state) => {
                const result = ({tasks: [...state.tasks, task]})
                setSavedTasks(result.tasks)
                return result;
            });
        },

        updateTask: (taskId, updatedTask) => {
            set((state) => {
                const result = ({
                    tasks: state.tasks.map((task) =>
                        task.id === taskId ? {...task, ...updatedTask} : task
                    ),
                })
                setSavedTasks(result.tasks)
                return result
            });
        },

        deleteTask: (taskId) => {
            set((state) => {
                const result = ({
                    tasks: state.tasks.filter((task) => task.id !== taskId),
                })
                setSavedTasks(result.tasks)
                return result
            });
        },
        setSearchTask: searchTerm => {
            set((state) => ({
                searchTask: searchTerm
            }))
        }
    })
});

export {
    useTaskManager
}