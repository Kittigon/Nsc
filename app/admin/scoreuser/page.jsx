'use client'
import { Folder } from 'lucide-react';
import Link from 'next/link';


const ScoreUser = () => {
    return (
        <>
            <div className=" bg-purple-50 min-h-screen relative">
                <header className='bg-purple-400 rounded-tr-2xl rounded-br-2xl absolute left-0 w-60 text-center
                lg:w-lg
                '>
                    <h1 className=" text-3xl p-4  text-white
                        lg:text-4xl lg:text-white "
                    >คะแนนและความเสี่ยง</h1>
                </header>

                <div className='mt-20 lg:mt-0'>
                    <div className="grid grid-cols-1 justify-items-center items-center gap-5  h-screen
                lg:grid lg:grid-cols-2 lg:justify-items-center lg:items-center lg:min-h-screen ">

                        <div className="border shadow w-[300px] h-[300px] flex flex-col justify-center items-center rounded-2xl bg-white
                lg:border lg:shadow lg:w-[450px] lg:h-[450px] lg:flex lg:flex-col lg:justify-center lg:items-center lg:rounded-2xl">
                            <Folder size={128} />
                            <span ><Link href={'/admin/scorepage/pagedash21'}>คะแนนและความเสี่ยง Dash-21</Link></span>
                        </div>

                        <div className="border shadow w-[300px] h-[300px] flex flex-col justify-center items-center rounded-2xl bg-white
                lg:border lg:shadow lg:w-[450px] lg:h-[450px] lg:flex lg:flex-col lg:justify-center lg:items-center lg:rounded-2xl">
                            <Folder size={128} />
                            <span ><Link href={'/admin/scorepage/page9q'}>คะแนนและความเสี่ยง 9Q</Link></span>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
export default ScoreUser