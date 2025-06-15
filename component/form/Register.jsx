'use client';
import Link from "next/link"
import { useState , useEffect} from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";


const RegisterPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [error, setError] = useState('')
    const [emailunique, setEmailunique] = useState('')

    const {data : session} = useSession();
    useEffect (()=>{
        if(session){
            redirect('/')
        }
    },[session])

    const handlesubmit = async (e) => {
        e.preventDefault();
        if (!email || !password || !fname || !lname) {
            setError("กรุณาป้อนข้อมูลให้ครบถ้วน")
        }

        try {
            const res = await fetch("http://localhost:3000/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email, password, fname, lname
                })
            })

            if (res.ok) {
                const form = e.target;
                setError("");
                
                alert("การสมัครสมาชิกสำเร็จเรียบร้อย")
                form.reset();
            } else {
                setEmailunique("อีเมลนี้ถูกใช้งานแล้ว โปรดลองอีกครั้ง")
                console.log("User register failed")
            }
        } catch (error) {
            console.log("Error Register :" + error)
        }

    }

    return (
        <>
            <div className="bg-purple-50 h-screen ">
                <div className=" flex flex-col items-center py-10  ">
                    <section className="grid grid-cols-1 justify-items-center lg:grid-cols-2 ">
                        <div
                            className=" p-5   bg-gradient-to-r from-purple-400 to-pink-200 w-[300px] hidden lg:block ">
                            <h1 className="text-5xl font-bold  text-white">Welcome to Website</h1>
                        </div>
                        <div>
                            <form onSubmit={handlesubmit}
                                className=" p-5  bg-white flex flex-col w-[300px]">
                                <h1 className="text-center text-2xl ">สมัครสมาชิก</h1>
                                <hr className="my-3 text-gray-400" />

                                <div >
                                    <label htmlFor="">ชื่อ</label>
                                    <input type="text" onChange={(e) => { setFname(e.target.value) }} className="border my-2 py-2 block w-full rounded-2xl" />
                                </div>
                                <div >
                                    <label htmlFor="">นามสกุล</label>
                                    <input type="text" onChange={(e) => { setLname(e.target.value) }} className="border my-2 py-2 block w-full rounded-2xl" />
                                </div>
                                <div >
                                    <label htmlFor="">อีเมล</label>
                                    <input type="email" onChange={(e) => { setEmail(e.target.value) }} className="border my-2 py-2 block w-full rounded-2xl" />
                                </div>
                                <div >
                                    <label htmlFor="">รหัสผ่าน</label>
                                    <input type="password" onChange={(e) => { setPassword(e.target.value) }} className="border my-2 py-2 block w-full rounded-2xl" />
                                </div>
                                {error && (
                                    <div className="text-red-500 ">
                                        {error}
                                    </div>
                                )}
                                {emailunique && (
                                    <div className="text-red-500 ">
                                        {emailunique}
                                    </div>
                                )}

                                <hr className=" my-3 text-gray-400" />
                                <p>คุณมีบัญชีแล้วใช่ไหม ? <Link href={'/login'} className="text-blue-500 underline">เข้าสู่ระบบ</Link></p>
                                <button type="submit" className=" my-2 py-2 rounded-2xl bg-gray-300 ">สมัครสมาชิก</button>
                            </form>
                        </div>
                    </section>

                </div>
            </div>
        </>
    )
}
export default RegisterPage