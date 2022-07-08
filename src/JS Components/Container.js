import React, { useState, useEffect } from "react";
import '../CSS Components/Container.css';
import Sentences from "./Sentences";
import Sidebar from "./Sidebar";
import Finished from './Finished'

export default function Container() {

    const [time_gone, setTime_gone] = useState(0);
    const [input, setInput] = useState(60);
    const [words, setWords] = useState(0);
    const [chars, setChars] = useState(0);
    const [wpm, setWpm] = useState(0);
    const [isReset, setIsReset] = useState(0);
    const [finished, setFinished] = useState(0);
    const [error, setError] = useState(0);
    const [accuracy, setAccuracy] = useState(100);
    const [started, setStarted] = useState(0);

    const updateWords = (words) => {
        setWords(words);
        updateWpm(words);
    }

    const updateWpm = (words) => {
        time_gone === 0 ? setWpm(0) : setWpm(Math.ceil(words * input / (time_gone)));
    }

    const handleOnChange = (event) => {
        setInput(event.target.value);
        console.log(input)
    };

    return (
        <div className="container" id="container">

            <div className="container-div">
                <div className="upper">
                    {started !== 1 ?
                        <div className="input type-line" id="input">
                            Enter test time in sec: <input type="number" value={input} onChange={handleOnChange} />
                        </div>
                        : <div className="input type-line" id="input"></div>}

                    <div className="type-line" id="type-line">
                        {`Type the following sentences in ${input} Seconds.`}
                    </div>
                </div>

                {finished === 0 ?
                    <div className="type-box" id="type-box">


                        <Sentences setStarted={setStarted} updateWords={updateWords} input={input} error={error} setError={setError} setIsReset={setIsReset} isReset={isReset} finished={finished} accuracy={accuracy} setAccuracy={setAccuracy} setChars={setChars} chars={chars} />
                        <Sidebar setStarted={setStarted} started={started} input={input} setTime_gone={setTime_gone} wpm={wpm} setIsReset={setIsReset} setFinished={setFinished} />
                    </div>
                    : <Finished wpm={wpm} setIsReset={setIsReset} setFinished={setFinished} accuracy={accuracy} />}
            </div>
        </div>
    )
}