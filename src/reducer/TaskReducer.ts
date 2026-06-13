import type { Task } from "../types/Task";

export type TaskState = {
  tasks: Task[];
};

export type TaskAction =
  | {
      type: "ADD_TASK";
      payload: Omit<Task, "id" | "createdAt">;
    }
  | {
      type: "DELETE_TASK";
      payload: string;
    }
  | {
      type: "TOGGLE_TASK_STATUS";
      payload: string;
    }
  | {
      type: "UPDATE_TASK";
      payload: {
        id: string;
        title: string;
        description: string;
        status: Task["status"];
      };
    };

export const taskReducer = (
  state: TaskState,
  action: TaskAction
): TaskState => {
  switch (action.type) {
    case "ADD_TASK":
      return {
        tasks: [
          ...state.tasks,
          {
            ...action.payload,
            id: crypto.randomUUID(),
            createdAt:
              new Date().toISOString(),
          },
        ],
      };

    case "DELETE_TASK":
      return {
        tasks: state.tasks.filter(
          (task) =>
            task.id !== action.payload
        ),
      };

    case "TOGGLE_TASK_STATUS":
      return {
        tasks: state.tasks.map((task) =>
          task.id === action.payload
            ? {
                ...task,
                status:
                  task.status ===
                  "completed"
                    ? "pending"
                    : "completed",
              }
            : task
        ),
      };

      case "UPDATE_TASK":
        return {
          tasks: state.tasks.map((task) =>
            task.id === action.payload.id
              ? {
                  ...task,
                  title: action.payload.title,
                  description:
                    action.payload.description,
                  status: action.payload.status,
                }
              : task
          ),
        };

    default:
      return state;
  }
};