'use client';
import Dataquestions9Q from "@/component/questionData/Dataquestion9Q"
import { useState } from "react";

const Page9Q = () => {
    const [current, setCurrent] = useState(0)
    const [scores9q, setScores9q] = useState(0)
    const [level, setLevel] = useState('')
    const [showscores, setShowscores] = useState(false)


    const handleAnswer = (score) => {
        const nextquestion = current + 1
        if (nextquestion < Dataquestions9Q.length) {
            setCurrent(nextquestion)
            setScores9q(scores9q + score)
        } else {
            setShowscores(true)
            risklevel();
        }
    }
    console.log("คะแนนรวม" + scores9q)
    console.log('level ' + level)

    const risklevel = () => {
        if (scores9q < 7) {
            setLevel("ไม่มีอาการของโรคซึมเศร้า");
        } else if (scores9q >= 7 && scores9q <= 12) {
            setLevel("มีอาการของโรคซึมเศร้าระดับน้อย");
        } else if (scores9q >= 13 && scores9q <= 18) {
            setLevel("มีอาการของโรคซึมเศร้าระดับปานกลาง");
        } else if (scores9q >= 19) {
            setLevel("มีอาการของโรคซึมเศร้าระดับรุนแรง");
        }
    };

    const handleRe = () => {
        setShowscores(false)
        setScores9q(0)
        setLevel('')
        setCurrent(0)
    }

    return (
        <>
            {
                showscores ?
                    <article className="bg-purple-50 min-h-screen relative ">
                        <header className="bg-purple-400 rounded-tr-2xl rounded-br-2xl absolute left-0 w-60 text-center lg:w-lg">
                            <h1 className="text-3xl p-4  text-white
                        lg:text-4xl lg:font-bold lg:text-white">แบบทดสอบ 9Q </h1>
                        </header>
                        <section className=" absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 shadow-2xl
                        py-10 px-10 text-center h-[450px] w-[300px] rounded-xl bg-white

                        lg:w-[500px]">
                            <h1 className="text-lg lg:text-3xl">สรุปผลคะแนนและระดับความเสี่ยง</h1>
                            <div className="bg-black block w-full text-white text-3xl py-3 my-5 font-bold text-center
                            lg:text-5xl lg:py-5 lg:my-8 
                            
                            ">{scores9q}</div>
                            <div className="text-md font-bold shadow  border-gray-400 p-2 my-5 
                            lg:text-xl
                            
                            ">{level}</div>

                            <button className=" border p-2 block w-full my-5 
                            lg:my-10"
                            onClick={()=>{handleRe()}}
                            >ทำแบบทดสอบอีกครั้ง</button>

                        </section>
                    </article>

                    : <article className="bg-purple-50 min-h-screen relative ">
                        <header className="bg-purple-400 rounded-tr-2xl rounded-br-2xl absolute left-0 w-60 text-center lg:w-lg">
                            <h1 className="text-3xl p-4  text-white
                        lg:text-4xl lg:font-bold lg:text-white">แบบทดสอบ 9Q </h1>
                        </header>
                        <section className=" absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 shadow-2xl
                py-10 px-10 text-center h-[450px] w-[300px] rounded-xl bg-white

                lg:w-[500px]
                ">
                            <h1 className="text-xl lg:text-3xl" >{Dataquestions9Q[current].question}</h1>

                            {Dataquestions9Q[current].answerOption.map((item, index) =>
                                <button className="border block w-full my-5  hover:bg-black hover:text-white 

                            lg:py-2
                        " key={index}
                                    onClick={() => handleAnswer(item.score)}
                                >{item.answerText}</button>
                            )}

                        </section>
                    </article>
            }

        </>
    )
}
export default Page9Q