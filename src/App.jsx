import React, { useCallback, useEffect, useState } from 'react'
import { MdDeleteOutline } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { v4 as uuidv4 } from 'uuid';
function App() {
  let [todo, setTodo] = useState();
  const [Allcheck, setAllcheck] = useState(false)
  const [Todos, setTodos] = useState([]);
  const [completeItem, setcompleteItem] = useState([])
  let handleChange = (e) => {
    setTodo(e.target.value);
  }

  let handleadding = () => {
    if (todo.trim() !== "") {
      setTodos([...Todos, { id: uuidv4(), todo, isComplete: false }]);
      setTodo("");
    }
    else {
      alert("Plese enter any task!")
    }
  };


  let handleCheck = useCallback(
    (e) => {
      let idm = e.target.name;
      let idx = Todos.findIndex(item => {
        return item.id == idm;
      })
      let newTodos = [...Todos];
      newTodos[idx].isComplete = !newTodos[idx].isComplete;
      setTodos(newTodos);
    },
    [Todos, Allcheck]
  )



  let handleDelete = (e) => {
    let confirmation = confirm("Are you sure You want to Delete")
    if (confirmation) {
      let id = e.target.name;
      let targetToremove = Todos.filter((item) => {
        return item.id == id ? "" : item;
      })
      setTodos(targetToremove)
    }

  }


  let handleEdit = (e) => {
    let id = e.target.id;
    let select = Todos.filter((item) => {
      return item.id == id ? item : "";
    })
    setTodo(select[0].todo);
    let targetToremove = Todos.filter((item) => {
      return item.id == id ? "" : item;
    })
    setTodos(targetToremove)
uu  }

  let setCheck = useCallback(
    (e) => {
      setAllcheck((pre)=>!pre);
      if (Allcheck) {
        let completedTasks = Todos.filter((item) => item.isComplete);
        setcompleteItem(completedTasks.map((item) => item.todo));
      } else {
        setcompleteItem([]);
      }
    }
    ,
    [ Allcheck],
  )

  useEffect(() => {
    if (Allcheck) {
      let completedTasks = Todos.filter((item) => item.isComplete);
      setcompleteItem(completedTasks.map((item) => item.todo));
    } else {
      setcompleteItem([]);

    }
  }, [Allcheck,handleCheck])



  return (
    <div className='h-screen w-full light:bg-blue-500 dark:bg-zinc-900  p-3 selection:text-orange-500'>
      <h1 className='text-white text-center  font-semibold   '>Enter Your Todo</h1>
      <div className='flex gap-3 items-center justify-center max-sm:ml-10'>
        <input  placeholder='Enter your task...' onChange={handleChange} value={todo} className='rounded-lg outline-none bg-zinc-300 border border-white p-[3px] w-[40%] max-sm:w-[90%]' type="text" />
        <button onClick={handleadding} className='bg-blue-600 rounded-lg p-[5px]  p-[2px] text-zinc-100 p-1 flex items-center justify-center'>Add</button>
      </div>
      <input defaultChecked={Allcheck} onClick={(e) => setCheck(e)} type="checkbox" /><span className='text-white'> Show completed task</span>
         <div className="flex gap-3">
         {completeItem.length > 0 ? completeItem.map((item) => (
            <div className="task ease-in-out duration-1000 w-fit h-100% bg-[#082032] text-[#ECDBBA] mt-3 p-3 rounded-lg flex justify-between items-center"  key={item}>{item}</div>
          )) : ""}
         </div>
      {Todos.length == 0 ? (<p className='text-orange-500 text-center mt-4'>No todo to display</p>) : (Todos.map((item) => {
        return <div className="task w-full h-100% bg-zinc-300 mt-3 p-3 rounded-lg flex justify-between items-center" key={item.id} >
          <div className="flex gap-5">
            <input name={item.id} onChange={handleCheck} type='checkbox'/>
            <p className={item.isComplete ? 'line-through' : ''}>{item.todo}</p>
          </div>
          <span className='flex irems-center gap-3'>
            <button id={item.id}  onClick={handleEdit} className='bg-blue-600 rounded-lg p-[5px]  text-xl p-[2px] text-zinc-100 p-1 flex items-center justify-center'>Edit</button>
            <button name={item.id} onClick={handleDelete} className='bg-blue-600 rounded-lgp-[5px] text-xl p-[2px] text-zinc-100 p-1 flex items-center justify-center rounded-lg'>Delete</button>
          </span>
        </div>
      })
      )}
    </div>
  )
}

export default App