import { useState, useContext } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { MdDone } from "react-icons/md";
import { useDrop } from "react-dnd";
import { GrInProgress } from "react-icons/gr";
import ListContext from "./Context";
import TodoList_Item from "./TodoList_Item";
import TodoList_Form from "./TodoList_Form";
import "./style.scss";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [done, setDone] = useState([]);

  const move = (dropinfo, task, i, to) => {
    const target = dropinfo.targetI;
    const current = i;

    current && console.log(current);
    target && console.log(target);
  };

  return (
    <ListContext.Provider value={{ tasks, setTasks, done, setDone, move }}>
      <div className='TodoListForm_container'>
        <TodoList_Form />
      </div>

      <div className='TodoList-Container'>
        <ul className='TodoList inProgress'>
          <header className='TodoList-header'>
            <h1>
              <GrInProgress size='30px' />
            </h1>
          </header>
          {tasks.map((task, i) => {
            return (
              <TodoList_Item
                to='inProgress'
                key={task.id}
                id={task.id}
                i={i}
                task={task}
              />
            );
          })}
        </ul>
        <ul className='TodoList done'>
          <header className='TodoList-header'>
            <h1>
              <MdDone size='35px' />
            </h1>
          </header>
          {done.map((task, i) => {
            return (
              <TodoList_Item
                to='done'
                key={task.id}
                id={task.id}
                i={i}
                task={task}
              />
            );
          })}
        </ul>
        <ul className='TodoList trash'>
          <h1 className='info'>Drag here to delete.</h1>
          <h1>
            <FaTrashAlt size='77px' />
          </h1>
        </ul>
      </div>
    </ListContext.Provider>
  );
};
export default TodoList;
