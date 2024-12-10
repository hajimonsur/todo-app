import { configureStore } from "@reduxjs/toolkit";
import toDoSlice from "./reducer/toDoSlice";


const store = configureStore({
    reducer: {
        toDo: toDoSlice
        
    },
});

export default store;