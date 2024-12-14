import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    toDoList: [],
};

// create slice
const toDoSlice = createSlice({
    name: "toDo",
    initialState,

    reducers: {
        addTodo: (state, action) => {
            state.toDoList.push({ id: Date.now(), text: action.payload, completed: false });
          },
          toggleTodo: (state, action) => {
            const todo = state.toDoList.find((item) => item.id === action.payload);
            if (todo) {
              todo.completed = !todo.completed;
            }
          },
          deleteTodo: (state, action) => {
            state.toDoList = state.toDoList.filter((item) => item.id !== action.payload);
          },
          // editTodo: (state, action) => {
          //   const { id, newText } = action.payload;
          //   const todo = state.toDoList.find((item) => item.id === id);
          //   if (todo) {
          //     todo.text = newText;
          //   }
          // },
          editTodo: (state, action) => {
            const { id, newText } = action.payload;
            if (!newText.trim()) return; // Prevent editing with empty text
            const todo = state.toDoList.find((item) => item.id === id);
            if (todo) {
              todo.text = newText;
            }
          },
        },

    },
);


// export actions
export const { addTodo, toggleTodo, deleteTodo, editTodo } = toDoSlice.actions;

// export reducer
export default toDoSlice.reducer;