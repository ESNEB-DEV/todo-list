import React, { useState, useEffect } from 'react'
import { FaList } from "react-icons/fa";
import { Button } from '@mui/material';
import TodoItems from './TodoItems';
import FormEditTodo from './FormEditTodo';

function todo() {

  // สร้างสถานะสำหรับรายการสิ่งที่ต้องทำ
  const [todos, setTodos] = useState(() => {
    // โหลดรายการสิ่งที่ต้องทำจาก localStorage ถ้ามี
    const savedTodos = localStorage.getItem('todo');

    if (savedTodos) {
      return JSON.parse(savedTodos); // แปลงข้อมูล JSON ที่เก็บไว้ใน localStorage เป็นอาร์เรย์
    } else {
      return []; // ถ้าไม่มีข้อมูลใน localStorage ให้เริ่มต้นด้วยอาร์เรย์ว่าง
    }
  });

  // ระบุเพื่อจัดการอินพุตสิ่งที่ต้องทำและรายการสิ่งที่ต้องทำ
  const [todo, setTodo] = useState("");
  //Edit Todo
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});

  useEffect(() => {
    localStorage.setItem('todo', JSON.stringify(todos)); // บันทึกรายการสิ่งที่ต้องทำใน localStorage
  }, [todos]);

  // ฟังก์ชันเพื่อจัดการการเปลี่ยนแปลงอินพุต
  function handleInputChange(e) {
    setTodo(e.target.value); // อัปเดตสถานะของอินพุตสิ่งที่ต้องทำ
  }
  // ฟังก์ชันเพื่อเพิ่มสิ่งที่ต้องทำ
  function handleFormSubmit(e) {
    e.preventDefault(); // ป้องกันการรีเฟรชหน้าเมื่อส่งแบบฟอร์ม

    if (todo !== "") {
      setTodos([...todos,
      {
        id: todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1, // เริ่ม id ที่ 1 และเพิ่มขึ้นทีละ 1
        text: todo.trim(), // ตัดช่องว่างที่ไม่จำเป็นออกจากข้อความ
        isCompleted: todo.at(true) // กำหนดสถานะเริ่มต้นเป็นไม่เสร็จ
      }
      ])
      setTodo(""); // ล้างอินพุตหลังจากเพิ่ม
    }
  }

  return (
    <div className='mx-auto flex justify-center items-center min-h-screen bg-blue-950'>
      {isEditing ? (
        <FormEditTodo todos={todos} setTodos={setTodos} setIsEditing={setIsEditing} setCurrentTodo={setCurrentTodo} currentTodo={currentTodo} />
      ) : (
        <form className="containner mx-auto items-center flex justify-center" onSubmit={handleFormSubmit}>
          <div className="bg-white max-w-md flex flex-col p-7 min-h-[550px] rounded-xl shadow-lg p-8 w-96">
            <h2 className="text-2xl font-bold flex items-center text-gray-700">
              <FaList className="mr-3 text-gray-700" />
              Todo List
            </h2>
            <div className="flex items-center mt-5">
              <input type='text' name='todo' placeholder='Add your task...' value={todo} onChange={handleInputChange} className='bg-gray-200 rounded-md w-72 p-2 mr-2 text-gray-700' />
              <Button variant="contained" color="secondary" type='submit'>ADD</Button>
            </div>
            <div className='border boder-2 my-4'></div>
            <div className="flex-1 overflow-y-auto my-5" style={{ maxHeight: '400px' }}>
              <TodoItems todos={todos.slice(0, 10)} setTodos={setTodos} setIsEditing={setIsEditing} setCurrentTodo={setCurrentTodo} />
            </div>
            {/* <Button variant="contained">CLEAR ALL</Button> */}
          </div>
        </form>
      )
      }
    </div >
  )
}

export default todo
