
import { MdClose } from "react-icons/md";
import { useDispatch,useSelector } from "react-redux";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import './index.css'
import { deleteTodo , todoStatus, todoEdit} from "../../action";
import { useState } from "react";
import { MdOutlineDone } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

const TodoItem = (props) => {
    const dispatch = useDispatch()
    const {todo} = props 
    const {id, title, bgcolor, note, date} = todo
    const theme = useSelector((state) => state.theme)
    const [isediting,setIsditing ] = useState(false)
    console.log(title)
    const [editedTodo, setEditedtodo] = useState(note.trim())
    let disableEdit = false

    const handleDelete = () => (
        dispatch(deleteTodo(id))
    )

    const handleTodoStatus = () => (
        dispatch(todoStatus(id))
    )

    const handleEdit = (id) => {
        setIsditing(true)
    }

    const handleSave = () => {
        dispatch(todoEdit({editedTodo, id}))
        setIsditing(false)
    }

    console.log(isediting, "added task todo")

    return (
        <li className={`todoitem-container ${bgcolor} `}>
            <div className="todo-title-container">
                <button onClick={handleTodoStatus} className="icons">
                    <MdOutlineCheckBoxOutlineBlank className = "icon" />
                </button>
                {isediting ?  <input autoFocus className="edit-input-element" type="text" value = {editedTodo} placeholder="enter new task" onChange={(event) => setEditedtodo(event.target.value)}/> 
                : 
                <div>
                    <div className="title-date">
                        <h5 className={theme ? "dark-todo-title" : "todo-title" }>{title}</h5>
                        <p>{date}</p>
                    </div>
                    <p className={theme ? "dark-todo-title" : "todo-title" }>{note}</p>
                </div>
                }
            </div>
            <div className="large-screen-options">
                {isediting ? <button onClick={handleSave} className= {theme ? "dark-delete-btn" : "delete-btn"  }>Save</button> : <button onClick={handleEdit} disabled = {disableEdit} className= {theme ? "dark-delete-btn" : "delete-btn"  } >Edit</button>}
                <button className= {theme ? "dark-delete-btn" : "delete-btn"  } onClick={handleDelete}>Delete </button>
            </div>
            <div className="small-screen-options">
            
                {isediting ? <button onClick={handleSave} className={theme ? "dark-icons" :"icons"}><MdOutlineDone /></button> : <button onClick={handleEdit} className={theme ? "dark-icons" :"icons"}><CiEdit /> </button>}
                <button onClick={handleDelete} className={theme ? "dark-icons" :"icons"}><MdClose className = "small-screen-icons" /> </button>
            </div>
        </li>
    )
}

export default TodoItem

