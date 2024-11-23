import TodoApp from './components/TodoApp';
import './App.css';
import { AiOutlineClose } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import { useSelector,useDispatch } from 'react-redux';
import {todoTheme} from "././action";
import { MdDarkMode } from "react-icons/md";
import { FiSun } from "react-icons/fi";

const App = () => {
  const dispatch = useDispatch()
  const theme = useSelector((state) => state.theme)

  
  const handleTheme = () => {
    dispatch(todoTheme(theme))
}


  return (
    <div className={theme ?  "todo-dark-background-container" : "todo-app-background-container"}>
      <div className={theme ? "dark-header header" : "header"}>
        <h1 className={theme ? "dark-app-name app-name" : "app-name"}>Taskio </h1>
        <div className={theme ? "dark-search-container search-conatiner" : "search-conatiner"}>
                    <AiOutlineSearch className={ theme ? "dark-header-icon header-icon" : 'header-icon' }/>
                    <input className={theme ? "input-search-element dark-input-search-element" : "input-search-element"} type="text" placeholder="Search"/>
                    <AiOutlineClose className={ theme ? "dark-header-icon header-icon" : 'header-icon' }/>
        </div> 
        <div className="theme-container" onClick={handleTheme} >{theme ?  <FiSun className="light-icon" /> : <MdDarkMode className="dark-icon" />  } </div>
            
      </div>

      <TodoApp />
    </div>
  );
}

export default App;
