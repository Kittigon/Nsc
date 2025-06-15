'use client';
import Link from "next/link"
import { useSession } from "next-auth/react";
import { Menu } from 'lucide-react';
import { signOut } from "next-auth/react";


const Navbar = () => {
    const { data: session } = useSession();
    return (
        <>
            <div className="bg-purple-600 h-8 "></div>
            <nav className="bg-purple-200 p-5 flex items-center justify-between 
            lg:h-20 lg:flex lg:justify-between lg:items-center">
                <div>
                    <Link href={'/'} className="font-black text-2xl">LLM Chatbot Depression</Link>
                </div>
                <div>
                    <ul className="lg:flex lg:justify-center lg:items-center lg:gap-3.5 lg:pr-4 ">
                        {!session ?
                            (
                                <div className="flex gap-2  lg:flex lg:justify-center lg:items-center lg:gap-3.5 lg:pr-4 ">
                                    <li>
                                        <Link href={'/login'}>
                                            <span className="bg-white py-2 px-4 rounded-xl ">Login</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={'/register'}>
                                            <span className="bg-white py-2 px-4 rounded-xl ">register</span>
                                        </Link>
                                    </li>
                                </div>)
                            : (
                                <li>
                                    <div className="dropdown dropdown-end">
                                        <div tabIndex={0} role="button" className="btn m-1">
                                            <i><Menu /></i>
                                        </div>

                                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm 
                                            
                                        "> 
                                            <li >
                                                <Link href={'/editprofile'} className="text-center">
                                                    <span className=" py-2 px-4 ">แก้ไขโปรไฟล์</span>
                                                </Link>
                                            </li>
                                            {session?.user?.role === "ADMIN" && (
                                                <li className="ml-4" >
                                                    <Link href={'/admin/manage'}>
                                                        <span>จัดการผู้ใช้งานในระบบ</span>
                                                    </Link>
                                                    
                                                    <Link href={'/admin/scoreuser'}>
                                                        <span>ผลคะแนนการทำแบบประเมิน</span>
                                                    </Link>
                                                </li>
                                            )}
                                            <li >
                                                <a className="text-center">
                                                    <span onClick={() => { signOut() }} className="text-red-500 py-2 px-4 ">ออกจากระบบ</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                            )
                        }
                    </ul>
                </div>
            </nav>
        </>
    )
}
export default Navbar