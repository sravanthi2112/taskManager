import { useRef, useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addTodo, saveLocastoragedata } from "../../action"
import TodoItem from "../TodoItem"
import CompletedTodo from "../CompletedTodo"
import { HiPlus } from "react-icons/hi2";
import { AiOutlineBulb } from "react-icons/ai";
import { HiCheck } from "react-icons/hi2";
import './index.css'
import {v4 as uuidv4} from 'uuid'

const TodoApp =  () => {
    const dispatch = useDispatch()
    const [todoTitle, setTodoTile] = useState("")
    const [todoNote, setTodoNote] = useState("")
    const [todoDate, setTodoDate] = useState("")
    const todos = useSelector((state) => state.todos )
    const theme = useSelector((state) => state.theme)
    const [clickedinputelement, setClickedinputelement] = useState(false)
    const inputNote = useRef(null)
    const inputdate = useRef(null)
    const [backgroundcolor, setBackgroundcolor] = useState("")
    const [stotedTasksList, setSortedTasksList] = useState(todos)

    let storeddata

    useEffect(() => {
        const previousdata = JSON.parse(localStorage.getItem("todolist"))
        if ( previousdata != null) {
            storeddata = previousdata.todos
            console.log(storeddata, "stored data")
            dispatch(saveLocastoragedata(storeddata))
        }

    }, [])



    const onClickSendTodo = () => {
        if(todoTitle.trim(" ")){
            console.log("checking title", todoTitle, todoNote, todoDate, backgroundcolor)
            const newTodo = {
                id: uuidv4(),
                title : todoTitle,
                note : todoNote,
                date : todoDate,
                bgcolor: backgroundcolor,
                iscompleted: false
            }
            dispatch(addTodo(newTodo))
            setTodoTile("")
            setTodoNote("")
            setTodoDate("")
            setBackgroundcolor("white")

            const setTasklists = localStorage.setItem("todolist", JSON.stringify({todos: [...todos,newTodo] }) )
        }
        setClickedinputelement(false)
    }


    const handleinputelement = () => {
        setClickedinputelement(true)
    }

    const titleok = (event) => {
        if (event.key === "Enter") {
            inputNote.current.focus()
        }
    }

    const noteok = (event) => {
        if (event.key === "Enter") {
            inputdate.current.focus()
        }
    }

    const onClikedbackground = (color) => {
        setBackgroundcolor(color)
    }

    console.log("checking filter", todos)
    console.log(typeof todos)
    const completedtodos = todos.filter((eachtodo) => eachtodo.iscompleted === true)
    const pendingTodos = todos.filter((eachtodo) => eachtodo.iscompleted === false)
    
    const handledatesort = () => {
        console.log("insidesort")
        const datesortedArray = todos.sort((a,b) => (
            new Date(a.date) - new Date(b.date)
        ))
    
        setSortedTasksList(datesortedArray)
    }

    return(
        <div className={theme ?  "todo-dark-content-container" : "todo-app-content-container" } >
            
            <div className="empty-view-conatiner">
                <div className={clickedinputelement ? "input-active-container" : "large-input-conatiner"}  >
                    <div>
                        <input className={theme ? "dark-search-bar search-bar" : "search-bar"} type="text" maxLength={30} value = {todoTitle} placeholder="Add Task" onChange={(event) => setTodoTile(event.target.value)} onKeyUp={titleok}  onClick={handleinputelement}/>
                        {clickedinputelement &&<input ref={inputNote} className="search-bar" type="text" value = {todoNote} placeholder="Describe in detail...." onChange={(event) => setTodoNote(event.target.value)} onKeyUp={noteok}/>}
                        {clickedinputelement && <input ref={inputdate} className="search-bar date-input-field" type="date" value = {todoDate} placeholder="date" onChange={(event) => setTodoDate(event.target.value)}/>}
                    </div>
                    {clickedinputelement &&  <div className="input-container-options">
                        <div className={backgroundcolor === 'white' ? "selected-color background-colors white" : "background-colors white"}  onClick={() => onClikedbackground('white')}>  {backgroundcolor === 'white' && <HiCheck /> } </div>
                        <div className={backgroundcolor === 'red' ? "selected-color background-colors red" : "background-colors red"}  onClick={() => onClikedbackground('red')}> {backgroundcolor === 'red' && <HiCheck />} </div>
                        <div className={backgroundcolor === 'mint' ? "selected-color background-colors mint" : "background-colors mint"}  onClick={() => onClikedbackground('mint')}> {backgroundcolor === 'mint' && <HiCheck />}</div>
                        <div className={backgroundcolor === 'purple' ? "selected-color background-colors purple" : "background-colors purple"}  onClick={() => onClikedbackground('purple')}> {backgroundcolor === 'purple' && <HiCheck />}</div>
                        <div className={backgroundcolor === 'sand' ? "selected-color background-colors sand" : "background-colors sand"}  onClick={() => onClikedbackground('sand')}> {backgroundcolor === 'sand' && <HiCheck />}</div>
                        <button onClick={() => onClickSendTodo() } className={theme ?  "dark-always-show-add-task-btn" : "always-show-add-task-btn"}>Add Task</button>
                    </div>}
                </div>
            </div> 
            {todos.length  === 0 ? <div className="empty-view-conatiner" onClick={onClickSendTodo}>
                    <AiOutlineBulb className="bulb-img"/>
                    <h2 className="emptyview-heading">Tasks Appear here </h2>
                    <p>Your Task list is empty</p>
                </div> :
            <div onClick={onClickSendTodo}>
                <div className="input-conatiner">
                    <input className="search-bar" type="text" value = {todoTitle} placeholder="Type Todo" onChange={(event) => setTodoTile(event.target.value)}/>
                    <button onClick={() => onClickSendTodo()}  className="icons"><HiPlus className="addicon" /></button>
                </div>
                
                {pendingTodos.length > 0 &&
                    <div className="todos-container">
                    <ul className="list-group">
                        <h3 className="todo-type-heading">Pending Todos</h3>
                        <button className="sortby-btn" onClick={handledatesort}>Sortby date</button>
                        {pendingTodos.map((todo) => (
                            <TodoItem key={todo.id} todo = {todo}/>
                        ))}
                    </ul>
                </div>
                }
            
                {completedtodos.length >= 1 && 
                <>
                    {theme ? <hr className="dark-hrline"/> : <hr/>  }
                    <h3 className="todo-type-heading">Completed Todos</h3>
                    <div className="todos-container">
                        <ul className="list-group mt-4">
                            {completedtodos.map((todo) => (
                                <CompletedTodo key={todo.id} todo = {todo} />
                            ))}
                        </ul>
                    </div> 
                </>
                }
            </div>}

        </div>
    )
}

export default TodoApp

