'use client'
import { useState, useEffect } from "react"
import { Trash2 } from 'lucide-react';
import { Pencil } from 'lucide-react';
import moment from 'moment'
import 'moment/locale/th'

const ManagePage = () => {
    const [newpassword, setNewpassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [selectedUserid, setSelectedUserid] = useState(null);


    const [data, setData] = useState([])
    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        try {
            const res = await fetch("http://localhost:3000/api/user", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            })

            const data = await res.json();
            setData(data.showuser)
        } catch (error) {
            console.log("Error loadData : " + error)
        }
    }

    const handleDelete = async (id) => {
        try {
            const res = await fetch("http://localhost:3000/api/user/" + id, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
            })

            if (res.ok) {
                alert("ลบผู้ใช้งานสำเร็จ")
                loadData();
            }

        } catch (error) {
            console.log("Error Delete :" + error)
        }
    }

    const handleSubmitPassword = async (id) => {

        if (!newpassword || !confirmPassword) {
            setError("กรุณาป้อนข้อมูลให้ครบถ้วน")
            return;
        }

        if (newpassword != confirmPassword) {
            setError("รหัสผ่านไม่ตรงกัน")
            return;
        }

        const password = newpassword;

        try {
            const res = await fetch('http://localhost:3000/api/user/' + id, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    password
                })
            })

            if (res.ok) {
                alert('เปลี่ยนรหัสผ่านผู้ใช้งานเรียบร้อย')
                setError('')
                setNewpassword('')
                setConfirmPassword('')
                loadData()
            }

        } catch (error) {
            console.log("Error Submit : ", error)
        }
    }

    return (
        <>
            <div className=" bg-purple-50 min-h-screen relative">
                <div className='bg-purple-400 rounded-tr-2xl rounded-br-2xl absolute left-0 w-60 text-center
                lg:w-lg
                '>
                    <h1 className=" text-3xl p-4  text-white
                        lg:text-4xl lg:text-white "
                    >จัดการผู้ใช้งาน</h1>
                </div>

                <div className="mt-25 mx-auto px-5">
                    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ไอดี</th>
                                    <th>ชื่อ</th>
                                    <th>นามสกุล</th>
                                    <th>อีเมล</th>
                                    <th>บทบาท</th>
                                    <th>เแก้ไขเมื่อ</th>
                                    <th> เปลี่ยนรหัสผ่าน / ลบผู้ใช้งาน</th>
                                </tr>
                            </thead>
                            <tbody>

                                {data && data.map((item, index) =>
                                    <tr key={index}>
                                        <th>{item.id}</th>
                                        <td>{item.fname}</td>
                                        <td>{item.lname}</td>
                                        <td>{item.email}</td>
                                        <td>{item.role}</td>
                                        <td>
                                            {moment(item.updatedAt).locale('th').format('L')}
                                        </td>
                                        <td>
                                            <span className="flex  items-center ml-7 gap-7  lg:ml-8">
                                                <>
                                                    <button className="btn"
                                                        onClick={() => {
                                                            setSelectedUserid(item)
                                                            document.getElementById('my_modal_2').showModal()
                                                        }}>
                                                        <Pencil className="text-blue-500" />
                                                    </button>

                                                    <dialog id="my_modal_2" className="modal">
                                                        <div className="modal-box">
                                                            <form method="dialog">
                                                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                                            </form>
                                                            <h3 className="font-bold text-lg">เปลี่ยนรหัสผ่านผู้ใช้งาน</h3>

                                                            <div
                                                                className="py-4">
                                                                <div className="my-3">
                                                                    <label className="text-md" >รหัสผ่านใหม่</label>
                                                                    <input
                                                                    value={newpassword}
                                                                        onChange={(e) => { setNewpassword(e.target.value) }}
                                                                        type="text" className="border block w-full p-2 outline-0" />
                                                                </div>
                                                                <div className="mt-3">
                                                                    <label className="text-md " >ยืนยันรหัสผ่าน</label>
                                                                    <input
                                                                        value={confirmPassword}
                                                                        onChange={(e) => { setConfirmPassword(e.target.value) }}
                                                                        type="text" className="border block w-full p-2 outline-0" />
                                                                </div>
                                                                {error &&
                                                                    <div className="text-red-500">
                                                                        {error}
                                                                    </div>
                                                                }
                                                            </div>
                                                            <button
                                                                onClick={() => { handleSubmitPassword(selectedUserid?.id) }}
                                                                type="submit"
                                                                className="btn w-full my-4">
                                                                บันทึก
                                                            </button>
                                                        </div>
                                                    </dialog>

                                                    <button className="btn"
                                                        onClick={() => { handleDelete(item.id) }}>
                                                        <Trash2 className="text-red-500" />
                                                    </button>
                                                </>

                                            </span>
                                        </td>
                                    </tr>

                                )}
                            </tbody>

                        </table>
                    </div>
                </div>

            </div>
        </>
    )
}
export default ManagePage