'use client'
import { useState, useEffect } from "react"
import moment from 'moment'
import 'moment/locale/th'


const Score9Q = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/scorequiz', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            })
            const data = await res.json();
            setData(data.score9qList)

        } catch (error) {
            console.log("Error loadData Error !", error)
        }
    }

    console.log(data)

    return (
        <>
            <div className=" bg-purple-50 min-h-screen relative">
                <header className='bg-purple-400 rounded-tr-2xl rounded-br-2xl absolute left-0 w-60 text-center
                lg:w-lg
                '>
                    <h1 className=" text-3xl p-4  text-white
                        lg:text-4xl lg:text-white "
                    >คะแนนและความเสี่ยง 9Q </h1>
                </header>

                <div className="mt-25 px-5 ">
                    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ไอดีผู้ใช้งาน</th>
                                    <th>ชื่อ</th>
                                    <th>นามสกุล</th>
                                    <th>คะแนน</th>
                                    <th>ความเสี่ยง</th>
                                    <th>วันที่ทำแบบทดสอบ</th>
                                </tr>
                            </thead>
                            <tbody >

                                {data && data.map((item, index) =>
                                    <tr key={index}>
                                        <td>{item.user.id}</td>
                                        <td>{item.user.fname}</td>
                                        <td>{item.user.lname}</td>
                                        <td>{item.score9q}</td>
                                        <td>{item.level9q}</td>
                                        <td>
                                            {moment(item.createdAt).locale('th').format('L')}
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
export default Score9Q