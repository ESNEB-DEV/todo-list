import { IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

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

  function handleToggleCompleted(id) {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );
    setTodos(updatedTodos);
  }

  console.log(todos)
  // แสดงรายการสิ่งที่ต้องทำ
  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <li key={todo.id} className="text-gray-700 text-lg my-2 flex justify-between">
          <div onClick={() => handleToggleCompleted(todo.id)}
            className="flex items-center cursor-pointer"
            style={{
              textDecoration: !todo.isCompleted ? 'line-through' :'none',
              textDecorationThickness: !todo.isCompleted ? '3px' : 'initial'
            }}
          >
            {todo.isCompleted ? <CheckBoxOutlineBlankIcon className='mr-2' /> : <CheckBoxIcon className='mr-2' color="secondary" />}
            {todo.text}
          </div>
          <div>
            <IconButton onClick={() => handleEditClick(todo)}>
              {todo.isCompleted ? <ModeEditIcon className='mr-2' /> : ''}
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
