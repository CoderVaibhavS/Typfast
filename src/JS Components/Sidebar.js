import React, { useState, useEffect } from 'react';
import '../CSS Components/Sidebar.css';
import Timer from './Timer.js';

export default function Sidebar(props) {

    const [reset, setReset] = useState(0);

    const handleOnReset = () => {
        setReset(1);
        props.setIsReset(1);
    }

    useEffect(() => {
        props.setStarted(!reset);
    }, [reset]);

    return(
        <div className="sidebar">
            <div className="time" id="time" >
                <div>Time Left</div>
                {props.started === 1 ? <Timer input={props.input} setTime_gone={props.setTime_gone} setFinished={props.setFinished} /> : <div>{props.input} sec</div>}
            </div>

            <div className="wpm">
                <div>WPM</div>
                <div>{props.started === 1 ? props.wpm : 0}</div>
            </div>

            <div className="reset" onClick={handleOnReset}>
                Reset
            </div>
        </div>
    )
}