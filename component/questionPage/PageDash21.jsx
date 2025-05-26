'use client'
import DataquestionsDash21 from "../questionData/DataquestionDash21"
import { useState } from "react";


const PageDash21 = () => {
    const [current, setCurrent] = useState(0)
    const [scores, setScores] = useState({
        depression: 0,
        stressed: 0,
        anxious: 0
    })
    const [showscore, setShowscore] = useState(false)


    const handleAnswer = (score) => {
        const question = DataquestionsDash21[current];
        const nextquestion = current + 1

        let newDepression = scores.depression;
        let newStressed = scores.stressed;
        let newAnxious = scores.anxious;

        if (question.category === "depression") {
            newDepression += score;
        } else if (question.category === "stressed") {
            newStressed += score;
        } else if (question.category === "anxious") {
            newAnxious += score;
        }

        setScores({
            depression: newDepression,
            stressed: newStressed,
            anxious: newAnxious
        })

        if (nextquestion < DataquestionsDash21.length) {
            setCurrent(nextquestion)
        } else {
            setShowscore(true)
        }
    }

    const risklevel = (category, score) => {
        if (category === "depression") {
            if (score <= 4) return "ปกติ";
            if (score <= 6) return "เล็กน้อย";
            if (score <= 10) return "ปานกลาง";
            if (score <= 13) return "รุนแรง";
            return "รุนแรงมาก";
        }
        if (category === "stressed") {
            if (score <= 3) return "ปกติ";
            if (score <= 5) return "เล็กน้อย";
            if (score <= 7) return "ปานกลาง";
            if (score <= 9) return "รุนแรง";
            return "รุนแรงมาก";
        }
        if (category === "anxious") {
            if (score <= 7) return "ปกติ";
            if (score <= 9) return "เล็กน้อย";
            if (score <= 12) return "ปานกลาง";
            if (score <= 16) return "รุนแรง";
            return "รุนแรงมาก";
        }
        return "";
    };

    const handleRe = () => {
        setShowscore(false)
        setCurrent(0);
        setScores({
            depression: 0,
            stressed: 0,
            anxious: 0
        });
    }

    return (
        <>
            {
                showscore
                    ?
                    <article className="bg-purple-50 min-h-screen relative ">
                        <header className="bg-purple-400 rounded-tr-2xl rounded-br-2xl absolute left-0 w-60 text-center lg:w-lg">
                            <h1 className="text-3xl p-4  text-white
                        lg:text-4xl lg:font-bold lg:text-white">แบบทดสอบ Dash-21 </h1>
                        </header>
                        <section className=" absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 shadow-2xl
                        py-10 px-10 text-center h-[450px] w-[300px] rounded-xl bg-white

                        lg:w-[500px]">
                            <h1 className="text-lg lg:text-3xl">สรุปผลคะแนนและระดับความเสี่ยง</h1>

                            <div className="flex flex-col  bg-black text-white py-5 
                                lg:flex lg:flex-col lg:gap-4 lg:my-5 lg:py-5
                            ">
                                <span>ซึมเศร้า : {scores.depression} / ความเสี่ยง :{risklevel("depression", scores.depression)} </span>
                                <span>เครียด : {scores.stressed} /  ความเสี่ยง : {risklevel("stressed", scores.stressed)}</span>
                                <span>วิตกกังวล : {scores.anxious} /  ความเสี่ยง : {risklevel("anxious", scores.anxious)} </span>
                            </div>

                            <button className=" border p-2 block w-full my-5 
                            lg:my-10"
                                onClick={() => {handleRe()}}
                            >ทำแบบทดสอบอีกครั้ง</button>
                        </section>
                    </article>
                    : <article className="bg-purple-50 min-h-screen relative ">
                        <header className="bg-purple-400 rounded-tr-2xl rounded-br-2xl absolute left-0 w-60 text-center lg:w-lg">
                            <h1 className="text-3xl p-4  text-white
                        lg:text-4xl lg:font-bold lg:text-white">แบบทดสอบ Dash-21 </h1>
                        </header>
                        <section className=" absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 shadow-2xl
                py-10 px-10 text-center h-[450px] w-[300px] rounded-xl bg-white

                lg:w-[500px]
                ">
                            <h1 className="text-xl lg:text-3xl" >{DataquestionsDash21[current].question}</h1>
                            {DataquestionsDash21[current].answerOption.map((item, index) =>
                                <button className="border block w-full my-5  hover:bg-black hover:text-white 
                                    lg:py-2" key={index}
                                    onClick={() => handleAnswer(item.score)}
                                >{item.answerText}</button>
                            )}
                        </section>
                    </article>
            }
        </>
    );
};


export default PageDash21