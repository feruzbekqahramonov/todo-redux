import { PiTrashSimpleLight } from "react-icons/pi";
import { FaCheck } from "react-icons/fa";
import { GiReturnArrow } from "react-icons/gi";
import plus from "./assets/Plus.svg";
import "./App.css";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const todoRef = useRef(null);
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);
  console.log(todos);
  const validate = () => {
    if (!todoRef.current.value.trim()) {
      alert("Information is required!");
      return false;
    }
    if (todoRef.current.value.length <= 3 || todoRef.current.value.length >= 45) {
      alert("The number of characters will not be so!");
      return false;
    }
    return true;
  };

  function handleForm(e) {
    e.preventDefault();
    const isValidate = validate();
    if (isValidate) {
      const todo = {
        name: todoRef.current.value,
        id: Date.now(),
      };
      dispatch({ type: "ADD", payload: todo });
      todoRef.current.value = null
    }
  }

  function handleDelete(id) {
    let isDelete = confirm("Are you want to delete?") 
    if(isDelete) {
      dispatch({type: "DELETE", payload: id})
    }
  }
  const [under, setUnder] = useState(false);

  function handleChange () {
    setUnder(!under)
  }

  return (
    <>
      <div className="containeer">
        <div className="header_input">
          <input ref={todoRef} type="text" placeholder="Add a new task" />
          <img src={plus} alt="plus" className="image" onClick={handleForm} />
        </div>
        <div className="tasks_todo">
          <p className="title">Tasks to do - 4</p>
          <div className="todo_cards">
            {todos.length > 0 &&
              todos.map((todo, index) => {
                return (
                  <div className="card" key={index}>
                    <p className={under ? `line-through` : ``}>{todo.name}</p>
                    <div className="icons">
                      <span onClick={handleChange}> {under ?<GiReturnArrow className="GiReturnArrow"/> :<FaCheck className="FaCheck"/> }</span>
                      <PiTrashSimpleLight className="trash" onClick={() => {
                        handleDelete(todo.id)
                      }}/>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
