import { Button, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

function TodoItems({ todos, setTodos, setIsEditing, setCurrentTodo }) {

  // ฟังก์ชันเพื่อจัดการการลบสิ่งที่ต้องทำ
  function handleDeleteClick(id) {
    const removeItem = todos.filter((todo) => {
      return todo.id !== id; // กรองรายการสิ่งที่ต้องทำที่ไม่ตรงกับ ID ที่ต้องการลบ
    })

    setTodos(removeItem); // อัปเดตรายการสิ่งที่ต้องทำหลังจากลบ
  }

  function handleEditClick(todo) {
    setIsEditing(true); // ตั้งค่าสถานะการแก้ไขเป็นจริง
    setCurrentTodo(todo); // ตั้งค่าสถานะสิ่งที่ต้องทำที่กำลังแก้ไข
  }

  console.log(todos)
  // แสดงรายการสิ่งที่ต้องทำ
  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <li key={todo.id} className="text-gray-700 text-lg my-2 flex justify-between">
          {todo.text}
          <div>
            <IconButton onClick={() => handleEditClick(todo)}>
              <ModeEditIcon />
            </IconButton>
            <IconButton onClick={() => handleDeleteClick(todo.id)}>
              <DeleteIcon />
            </IconButton>
          </div>
        </li>
      ))}
    </div>
  )
}

export default TodoItems
