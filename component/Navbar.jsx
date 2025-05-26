'use client';
import Link from "next/link"
import { LockKeyhole } from 'lucide-react';
import { Bell } from 'lucide-react';


const Navbar = () => {
    return (
        <>
            <div className="bg-purple-600 h-8 "></div>
            <nav className="bg-purple-200 p-5  lg:h-20 lg:flex lg:justify-between lg:items-center">
                <div>
                    <Link href={'/'} className="font-black text-2xl">LLM Chatbot Depression</Link>
                </div>
                <div>
                    <ul className="lg:flex lg:justify-center lg:items-center lg:gap-3.5 lg:pr-4 ">
                        <li>
                            <Link href={'/notifications'}>
                                <span className="block lg:hidden">notifications</span>
                                <span className="hidden lg:block"><Bell /></span>
                            </Link>
                        </li>
                        <li>
                            <Link href={'/login'}>
                                <span className="block lg:hidden">Login</span>
                                <LockKeyhole className=" hidden lg:block " />
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}
export default Navbar