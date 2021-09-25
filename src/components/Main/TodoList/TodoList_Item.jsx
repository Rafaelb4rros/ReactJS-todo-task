import { useContext, useState, useRef, useEffect } from "react";
import ListContext from "./Context";
import { useDrag, useDrop } from "react-dnd";
import { MdDeleteForever, MdDone } from "react-icons/md";
import { RiDeviceRecoverFill } from "react-icons/ri";

const TodoList_Item = ({ task, id, i, to }) => {
  const ref = useRef();
  const taskTextContent = task.content;
  const { tasks, setTasks, done, setDone, move } = useContext(ListContext);

  const handleDeleteTask = () => {
    tasks.map((task) => {
      task.id === id && tasks.splice(i, 1);
      setTasks([...tasks]);
    });

    done.map((task) => {
      task.id === id && done.splice(i, 1);
      setDone([...done]);
    });
  };

  const handleSetTaskDone = () => {
    setDone([...done, task]);

    tasks.splice(i, 1);
    setTasks([...tasks]);
  };
  const handleRecoveryTask = () => {
    setTasks([...tasks, task]);

    done.splice(i, 1);
    setDone([...done]);
  };
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "CARD",

    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop(
    () => ({
      accept: "CARD",
      drop: () => {
        const targetlist = to;
        const targetI = i;
        const target = task;

        const dropinfo = { targetlist, targetI, target };
        //from(inProgrees, done), to from(inProgrees, done)//
        move(dropinfo, "", "", "");
      },
    }),
    isDragging && move("", task, i, to),
    [task, i, to]
  );
  drag(drop(ref));
  return (
    <li ref={ref} className='TodoList-Item'>
      <p className='TodoLis-Item_content'>{taskTextContent}</p>

      <div className='TodoList-Item-icon_container'>
        <button
          className='TodoList-Item_backToActive'
          onClick={handleRecoveryTask}
        >
          <RiDeviceRecoverFill size='35px' color='aqua' />
        </button>
        <button className='TodoList-Item_done' onClick={handleSetTaskDone}>
          <MdDone size='35px' color='aqua' />
        </button>
        <button onClick={handleDeleteTask} className='TodoList-Item_delete'>
          <MdDeleteForever size='35px' color='red' />
        </button>
      </div>
    </li>
  );
};

export default TodoList_Item;
