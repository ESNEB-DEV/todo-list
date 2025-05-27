
import { FaList } from "react-icons/fa";
import { Button } from '@mui/material';

function FormEditTodo({ todos, setTodos, setIsEditing, setCurrentTodo, currentTodo }) {

    function handleEditInputChange(e) {
        setCurrentTodo({ ...currentTodo, text: e.target.value }); // อัปเดตข้อความของสิ่งที่ต้องทำที่กำลังแก้ไข
    }
    // update todo
    function handleUpdateTodo(id, UpdatedTodo) {
        const updateItem = todos.map((todo) => {
            return todo.id === id ? UpdatedTodo : todo; // ถ้า ID ตรงกัน ให้ใช้สิ่งที่ต้องทำที่อัปเดต มิฉะนั้นให้ใช้สิ่งที่ต้องทำเดิม
        })
        setIsEditing(false); // ตั้งค่าสถานะการแก้ไขเป็นเท็จ
        setTodos(updateItem); // อัปเดตรายการสิ่งที่ต้องทำด้วยรายการที่อัปเดต
    }

    function handleEditFomSubmit(e) {
        e.preventDefault(); // ป้องกันการรีเฟรชหน้าเมื่อส่งแบบฟอร์ม 

        handleUpdateTodo(currentTodo.id, currentTodo); // เรียกใช้ฟังก์ชันเพื่ออัปเดตสิ่งที่ต้องทำ
    }

    return (
        <div className='App mx-auto flex justify-center items-center min-h-screen bg-blue-950'>
            <form className="containner mx-auto items-center flex justify-center" onSubmit={handleEditFomSubmit}>
                <div className="bg-white max-w-md flex flex-col p-7 min-h-[550px] rounded-xl shadow-lg p-8 w-96">
                    <h2 className="text-2xl font-bold flex items-center text-gray-700">
                        <FaList className="mr-3 text-gray-700" />
                        Edit Todo
                    </h2>
                    <div className="flex items-center mt-5">
                        <input type='text' name='editTodo' placeholder='Edit Todo' value={currentTodo.text} onChange={handleEditInputChange} className='bg-gray-200 rounded-md w-72 p-2 mr-2 text-gray-700' />
                    </div>
                    <div className="mt-5 items-center flex justify-center">
                        <Button variant="contained" color="success" type='submit'>Update</Button>
                        <Button variant="outlined" color="primary" onClick={() => setIsEditing(false)} style={{ marginLeft: '10px' }}>Cancel</Button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default FormEditTodo
