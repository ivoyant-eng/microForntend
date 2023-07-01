import { create } from "zustand";

const useStore = create((set) => ({
  // Intial States
  title: "New Title",
  description: "",
  tasks: [
    {
      id: 1,
      title: "Dummy Task",
      description: "This is description for dummy Task",
    },
  ],
  currentTask: null,

  // Setters and Getters

  /**
   *
   * @param {string} title - Title of the Task
   */
  setTitle: (newTitle) => {
    return set({ title: newTitle });
  },

  /**
   *
   * @param {string} description - Description of the Task
   */
  setDescription: (description) => set({ description: description }),

  /**
   * Adds a task.
   *
   * @param {Object} payload - The payload for the task.
   * @param {string} payload.title - The title of the task.
   * @param {string} payload.description - The description of the task.
   */
  addTask: (payload) => set((state) => ({ tasks: [...state.tasks, payload] })),

  /**
   *
   * @param {string} id - The Id of the task to be deleted
   */
  removeTask: (id) => {
    let newTask = state.tasks.filter((task) => task.id !== id);
    console.log(newTask);
    return set({ tasks: newTask });
  },

  /**
   * Adds a current Task.
   *
   * @param {Object} payload - The payload for the task.
   * @param {string} payload.title - The title of the task.
   * @param {string} payload.description - The description of the task.
   */

  addCurrentTask: (payload) => set({ currentTask: payload }),
}));

export default useStore;
