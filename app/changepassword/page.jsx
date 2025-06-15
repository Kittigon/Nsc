'use client'
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"

const Changepassword = () => {
    const [ password , setPassword ] = useState('')
    const [ confirmPassword , setConfirmPassword ] = useState('')
    const [ id , setId ] = useState()
    const [ error , setError ] = useState('')

    const { data : session } = useSession()
    useEffect(()=>{
        if(session){
            const id = session?.user.id
            setId(id)
        }
    },[session])

    const handlesubmit = async (e) => {
        e.preventDefault();
        
        if(!password && !confirmPassword  ){
            setError("กรุณาป้อนข้อมูลให้ครบถ้วน")
            return ;
        }

        if(confirmPassword != password){
            setError("กรุณาป้อนรหัสผ่านให้ตรงกัน")
            return;
        }

        try {
            const res = await fetch("http://localhost:3000/api/user/" + id, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    password
                })
            })

            if (res.ok) {
                alert("บันทึกข้อมูลสำเร็จเรียบร้อย")
                setError('')
            } 
        } catch (error) {
            console.log("Error Update Profile :" + error)
        }
    }


    return (
        <>
            <div className="bg-purple-50 h-screen ">
                <div className=" flex flex-col items-center py-10   ">
                    <section className="grid grid-cols-1 justify-items-center lg:grid-cols-2 ">
                        <div
                            className=" p-5   bg-gradient-to-r from-purple-400 to-pink-200 w-[300px] hidden lg:block ">
                            <h1 className="text-5xl font-bold  text-white">Welcome to Website</h1>
                        </div>
                        <div>
                            <form onSubmit={handlesubmit}
                                className=" p-5  bg-white flex flex-col w-[300px]">
                                <h1 className="text-center text-2xl ">เปลี่ยนรหัสผ่าน</h1>
                                <hr className="my-3 text-gray-400" />

                                <div >
                                    <label htmlFor="">รหัสผ่านใหม่</label>
                                    <input
                                        name="fname" type="text" className="border my-2 py-2 block w-full rounded-2xl"
                                        onChange={(e)=>{setPassword(e.target.value)}}
                                    />
                                </div>
                                <div >
                                    <label htmlFor="">ยืนยันรหัสผ่าน</label>
                                    <input
                                        name="lname" type="text" className="border my-2 py-2 block w-full rounded-2xl"
                                        onChange={(e)=>{setConfirmPassword(e.target.value)}}
                                    />
                                </div>
                                {error && 
                                    <div className="text-red-500 ">
                                        <p>{error}</p>
                                    </div>
                                }

                                <hr className=" my-3 text-gray-400" />
                                <button type="submit" className=" my-2 py-2 rounded-2xl bg-gray-300 ">บันทึกข้อมูล</button>
                            </form>
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}
export default Changepassword