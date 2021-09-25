import { MdAdd, MdKeyboardArrowRight } from "react-icons/md";
import { useState, useRef, useEffect, useContext } from "react";
import ListContext from "./Context";

const TodoList_Form = () => {
  const forminput = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const [takeTask, setTakeTask] = useState("");

  const { tasks, setTasks } = useContext(ListContext);

  const handleActiveInput = () => {
    setIsActive(true);
  };

  useEffect(() => {
    const input = forminput.current;
    isActive ? input.classList.add("active") : input.classList.remove("active");
    input.focus();
  }, [isActive]);

  const handleTakeValue = (e) => {
    setTakeTask(e.target.value);
  };
  const handlerNewTask = (e) => {
    e.preventDefault();

    const input = forminput.current;

    if (input.value !== "") {
      input.style.border = "";
      setTasks([
        ...tasks,
        {
          content: takeTask,
          id: Math.floor(Math.random() * 10000000 * 9),
          createdAt: new Date(),
        },
      ]);
    } else {
      input.style.border = "solid 1px red";
      input.focus();
      return;
    }

    setTakeTask("");
    setIsActive(false);
  };

  return (
    <form onSubmit={handlerNewTask} className='TodoList-form'>
      <div className='TodoList-form_container'>
        <input
          value={takeTask}
          onChange={handleTakeValue}
          ref={forminput}
          placeholder='ex: Buy a coffe...'
          className='TodoList-form_input'
          type='text'
        />
        {isActive ? (
          <button className='TodoList-form_btn' type='submit'>
            <MdAdd size='30' />
          </button>
        ) : (
          <span className='TodoList-form_btn' onClick={handleActiveInput}>
            <MdKeyboardArrowRight size='30' />
          </span>
        )}
      </div>
    </form>
  );
};
export default TodoList_Form;
