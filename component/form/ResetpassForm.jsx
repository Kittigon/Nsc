'use client'
import { useState } from "react"
import { useSearchParams } from "next/navigation"

const ResetPasswordPage = () => {
    const [ newpassword , setNewpassword] = useState('')
    const [ confirmpassword , setConfirmPassword] = useState('')
    const [ error  , setError] = useState('')

    const searchParam = useSearchParams()
    const token = searchParam.get('token')

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!newpassword || !confirmpassword){
            setError('กรุณาป้อนข้อมูลให้ครบถ้วน')
            return;
        }

        if(newpassword != confirmpassword){
            setError('รหัสผ่านไม่ตรงกัน')
            return ;
        }

        try {
            const res = await fetch('/api/resetpassword',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    token , newpassword
                })
            })

            if(res.ok){
                alert('รีเซ็ตรหัสผ่านเรียบร้อย')
                setError('')
            }else{
                setError("กรุณายืนยันอีเมลอีกครั้ง")
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
                                <label htmlFor="">รหัสผ่านใหม่</label>
                                <input
                                    onChange={((e) => { setNewpassword(e.target.value) })}
                                    type="text"
                                    className="border my-2 py-2 block w-full rounded-2xl lg:py-4" />
                            </div>

                            <div >
                                <label htmlFor="">ยืนยันรหัสผ่าน</label>
                                <input
                                    onChange={((e) => { setConfirmPassword(e.target.value) })}
                                    type="text"
                                    className="border my-2 py-2 block w-full rounded-2xl lg:py-4" />
                            </div>

                            {error && 
                                <div className="text-red-500">
                                    {error}
                                </div>
                            }

                            <hr className=" my-3 text-gray-400" />
                            <button type="submit" className=" my-2 py-2 rounded-2xl bg-gray-300 lg:py-4 ">รีเซ็ตรหัสผ่าน</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ResetPasswordPage