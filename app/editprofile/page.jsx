'use client'
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import Link from "next/link"

const EditProfile = () => {
    const [formdata, setFormdata] = useState({
        email: "",
        fname: "",
        lname: ""
    })
    const [id, setId] = useState()

    const { data: session } = useSession();
    useEffect(() => {
        if (session) {
            setId(session?.user.id)
        }
    }, [session])

    useEffect(() => {
        if (id) {
            loadData(id)
        }
    }, [id])


    const loadData = async (id) => {
        try {
            const res = await fetch('http://localhost:3000/api/user/' + id, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                },
            })

            const data = await res.json();
            setFormdata(data[0])
        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = (e) => {
        setFormdata({
            ...formdata,
            [e.target.name]: e.target.value
        })
    }

    const handlesubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:3000/api/user/" + id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formdata)
            })

            if (res.ok) {
                alert("บันทึกข้อมูลสำเร็จเรียบร้อย")
                loadData(id)
            } 
        } catch (error) {
            console.log("Error Update Profile :" + error)
        }
    }


    return (
        <>
            <div className="bg-purple-50 h-screen ">
                <div className='bg-purple-400 rounded-tr-2xl rounded-br-2xl absolute left-0 w-60 text-center
                lg:w-lg
                '>
                    <h1 className=" text-3xl p-4  text-white
                        lg:text-4xl lg:text-white "
                    >แก้ไขข้อมูล</h1>
                </div>

                <div className=" flex flex-col items-center py-10 mt-20  ">
                    <section className="grid grid-cols-1 justify-items-center lg:grid-cols-2 ">
                        <div
                            className=" p-5   bg-gradient-to-r from-purple-400 to-pink-200 w-[300px] hidden lg:block ">
                            <h1 className="text-5xl font-bold  text-white">Welcome to Website</h1>
                        </div>
                        <div>
                            <form onSubmit={handlesubmit}
                                className=" p-5  bg-white flex flex-col w-[300px]">
                                <h1 className="text-center text-2xl ">แก้ไขข้อมูล</h1>
                                <hr className="my-3 text-gray-400" />

                                <div >
                                    <label htmlFor="">ชื่อ</label>
                                    <input
                                        value={formdata?.fname || ''} name="fname" type="text" className="border my-2 py-2 block w-full rounded-2xl"
                                        onChange={(e) => { handleChange(e) }}
                                    />
                                </div>
                                <div >
                                    <label htmlFor="">นามสกุล</label>
                                    <input
                                        value={formdata?.lname || ''} name="lname" type="text" className="border my-2 py-2 block w-full rounded-2xl"
                                        onChange={(e) => { handleChange(e) }}
                                    />
                                </div>
                                <div >
                                    <label htmlFor="">อีเมล</label>
                                    <input
                                        value={formdata?.email || ''} name="email" type="email" className="border my-2 py-2 block w-full rounded-2xl"
                                        onChange={(e) => { handleChange(e) }}
                                    />
                                </div>
                                <div >
                                    <ul>
                                        <li><Link href={'/changepassword'} className="text-blue-500">เปลี่ยนรหัสผ่าน</Link></li>
                                    </ul>
                                </div>

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
export default EditProfile