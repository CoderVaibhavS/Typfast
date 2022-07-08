import React, { useState, useEffect, useRef } from 'react';

export default function Timer(props) {
    
    const [time, setTime] = useState(props.input);

    const Ref = useRef(null);

    //timer function
    useEffect(() => {
        
        const start = Date.now();
        let a = props.input;

        Ref.current = setInterval(() => {
            const millis = Date.now() - start;
            setTime(time - Math.floor(millis / 1000));
            props.setTime_gone(props.input - a);
            a--;
        }, 1000)
        return () => {
            clearInterval(Ref.current)
        }
    }, [])

    // clear interval when time left is 0
    useEffect(() => {

        if(time === 0)  {
            clearInterval(Ref.current);
            props.setFinished(1);
        }
    })

    return(
        <>
        <div className="timer">{`${time} sec`}</div>
        </>
    )
}