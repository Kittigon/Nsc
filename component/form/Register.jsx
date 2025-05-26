import Link from "next/link"

const RegisterPage = () => {
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
                            <form
                                className=" p-5  bg-white flex flex-col w-[300px]">
                                <h1 className="text-center text-2xl ">สมัครสมาชิก</h1>
                                <hr className="my-3 text-gray-400" />

                                <div >
                                    <label htmlFor="">ชื่อ</label>
                                    <input type="text" className="border my-2 py-2 block w-full rounded-2xl" />
                                </div>
                                <div >
                                    <label htmlFor="">นามสกุล</label>
                                    <input type="text" className="border my-2 py-2 block w-full rounded-2xl" />
                                </div>
                                <div >
                                    <label htmlFor="">อีเมล</label>
                                    <input type="email" className="border my-2 py-2 block w-full rounded-2xl" />
                                </div>
                                <div >
                                    <label htmlFor="">รหัสผ่าน</label>
                                    <input type="password" className="border my-2 py-2 block w-full rounded-2xl" />
                                </div>
                                <hr className=" my-3 text-gray-400" />
                                <p>คุณมีบัญชีแล้วใช่ไหม ? <Link href={'/login'} className="text-blue-500 underline">เข้าสู่ระบบ</Link></p>
                                <button type="submit" className=" my-2 py-2 rounded-2xl bg-gray-300 ">Sign Up</button>
                            </form>
                        </div>
                    </section>

                </div>
            </div>
        </>
    )
}
export default RegisterPage