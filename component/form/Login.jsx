'use client'
import Link from "next/link"
import { useState , useEffect } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const router = useRouter();
    const {data : session} = useSession();
    useEffect (()=>{
        if(session){
            router.replace('/')
        }
    },[session])

    const handlesubmit = async (e) =>{
        e.preventDefault();

        try {
            const res = await signIn("credentials",{
                email , password , redirect:false
            })

            if(res.error){
                setError("เกิดข้อผิดพลาดโปรดลองอีกครั้ง")
                return;
            }
        
            router.replace('/')

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className="bg-purple-50 h-screen">
                <div className=" flex flex-col items-center py-10">
                    <section className="grid grid-cols-1 justify-items-center lg:grid-cols-2 ">
                        <div className=" p-5  bg-gradient-to-r from-purple-400 to-pink-200 w-[300px] hidden lg:block ">
                            <h1 className="text-5xl font-bold  text-white">Welcome to Website</h1>
                        </div>

                        <div>
                            <form onSubmit={handlesubmit}
                                className="p-5  bg-white flex flex-col w-[300px] ">
                                <h1 className="text-center text-2xl ">เข้าสู่ระบบ</h1>
                                <hr className="my-3 text-gray-400" />

                                <div >
                                    <label htmlFor="">อีเมล</label>
                                    <input type="email" onChange={(e)=>setEmail(e.target.value)} className="border my-2 py-2 block w-full rounded-2xl" />
                                </div>
                                <div >
                                    <label htmlFor="">รหัสผ่าน</label>
                                    <input type="password" onChange={(e)=>setPassword(e.target.value)} className="border my-2 py-2 block w-full rounded-2xl" />
                                </div>
                                <Link href={'/resetpassword/requestresetpage'} className="underline font-medium">ลืมรหัสผ่าน ? </Link>

                                {error && (
                                    <div className="text-red-500 ">
                                        {error}
                                    </div>
                                )}

                                <hr className=" my-3 text-gray-400" />
                                <p>คุณยังไม่มีบัญชีใช่ไหม ? <Link href={'/register'} className="text-blue-500 underline">สมัครสมาชิก</Link></p>
                                <button type="submit" className=" my-2 py-2 rounded-2xl bg-gray-300 ">เข้าสู่ระบบ</button>
                            </form>
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}
export default LoginPage