import {v4 as uuidv4} from 'uuid'
import { useEffect } from 'react';

const intnialState = {
    todos : [],
    theme : false,
}



const todoReducer = (state=intnialState,action) => {

    switch (action.type) {
        case "SAVE_LOCALSTORAGE_DATA":
          //const {tasklist} = action.payload
          console.log(action.payload , "tasklist")
          return{
            ...state, todos : action.payload
          }

        case "ADD_TODO":
          console.log("action.js", action.payload)
          //const newTodo = { id: uuidv4(), title: action.payload.title, note : action.payload.note, date:action.payload.date, bgcolor : action.payload.bgcolor ,iscompleted : false};
          const addtodotolist = [...state.todos, action.payload]
          console.log(addtodotolist, "Check")
          //const setTasklists = localStorage.setItem("todolist", JSON.stringify({...state, todos: [...state.todos,newTodo] }) )
          //const storedtaskslist = JSON.parse(localStorage.getItem("todolist"))
          //console.log(storedtaskslist.todos, "redureer.js")

          return {
            ...state,
            //todos: storedtaskslist.todos,
            todos: addtodotolist
          };
        
        case "DELETE_TODO":
          const updatedlist = state.todos.filter((todo) => todo.id !== action.payload)
          localStorage.setItem("todolist",JSON.stringify({todos: updatedlist}))
          console.log(updatedlist)
          return {
            ...state,
            todos: state.todos.filter((todo) => todo.id !== action.payload),
          };

        case "TODO_STATUS":
            console.log(!action.payload.iscompleted)
            return { 
                ...state,
                todos: state.todos.map((todo) =>
                  todo.id === action.payload
                    ? { ...todo, iscompleted : !todo.iscompleted }
                    : todo
                ),
              };

        case "TODO_EDIT" : 
              const {editedTodo, id} = action.payload
              console.log( editedTodo, id, "todoedit")
              return {
                ...state, 
                todos : state.todos.map((todo) =>
                    todo.id === id 
                    ? { ...todo, note : editedTodo} : todo
                )
              }

        case "TODO_THEME" :
          const theme = action.payload
          return {...state, theme:!theme}

        default:
          return state;
      }
}

export default todoReducer


