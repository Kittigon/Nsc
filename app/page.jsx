import { FileText } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <div className=" bg-purple-50 min-h-screen relative">
        <div className='bg-purple-400 rounded-tr-2xl rounded-br-2xl absolute left-0 w-60 text-center
          lg:w-lg
        '>
          <h1 className=" text-3xl p-4  text-white
          lg:text-5xl lg:text-white "
          >แบบประเมิน</h1>
        </div>

        <div className='mt-20 lg:mt-0'>
          <div className="grid grid-cols-1 justify-items-center items-center gap-5  h-screen
              lg:grid lg:grid-cols-2 lg:justify-items-center lg:items-center lg:min-h-screen ">

            <div className="border shadow w-[300px] h-[300px] flex flex-col justify-center items-center rounded-2xl bg-white
            lg:border lg:shadow lg:w-[450px] lg:h-[450px] lg:flex lg:flex-col lg:justify-center lg:items-center lg:rounded-2xl">
              <FileText size={128} />
              <span ><Link href={'/questionDash21'}>Dash-21</Link></span>
            </div>

            <div className="border shadow w-[300px] h-[300px] flex flex-col justify-center items-center rounded-2xl bg-white
            lg:border lg:shadow lg:w-[450px] lg:h-[450px] lg:flex lg:flex-col lg:justify-center lg:items-center lg:rounded-2xl">
              <FileText size={128} />
              <span ><Link href={'/question9Q'}>9Q</Link></span>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
