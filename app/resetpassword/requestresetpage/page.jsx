'use client'
import { useState } from "react"

const RequestResetPage = () => {
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!email){
            setError('กรุณาป้อนข้อมูลให้ครบถ้วน')
            return ;
        }

        try {
            const res = await fetch('http://localhost:3000/api/sendemail',{
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    email
                })
            })

            if(res.ok){
                alert("ส่งลิงค์รีเซ็ตรหัสผ่านไปที่อีเมลเรียบร้อย")
                setError('')
            }

        } catch (error) {
            console.log("Error send Email : ", error)
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
                    >รีเซ็ตรหัสผ่าน ?</h1>
                </div>

                <div className=" flex flex-col justify-center items-center py-10 mt-15 ">
                    <div>
                        <form onSubmit={handleSubmit}
                            className="p-5  bg-white flex flex-col lg:justify-between  lg:w-[700px] lg:h-[350px] ">
                            <h1 className="text-center text-2xl ">ป้อนอีเมลเพื่อรีเซ็ตรหัสผ่าน</h1>
                            <hr className="my-3 text-gray-400" />

                            <div >
                                <label htmlFor="">อีเมล</label>
                                <input
                                    onChange={((e) => { setEmail(e.target.value) })}
                                    type="email"
                                    className="border my-2 py-2 block w-full rounded-2xl lg:py-4" />
                            </div>

                            {error && 
                                <div className="text-red-500">
                                    {error}
                                </div>
                            }

                            <hr className=" my-3 text-gray-400" />
                            <button type="submit" className=" my-2 py-2 rounded-2xl bg-gray-300 lg:py-4 ">ยืนยัน</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default RequestResetPage