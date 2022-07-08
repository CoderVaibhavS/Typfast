import React, { useEffect, useState } from 'react';
import '../CSS Components/Sentences.css'

const Sentences = (props) => {

    const [textvalue, setValue] = useState('Click on Start...');
    const [txt, setTxt] = useState('');
    const [started1, setStarted1] = useState(0);
    const [tot_words, setTot_words] = useState(0);

    // get text by fetching api
    const randomText = async () => {
        return await fetch('https://api.quotable.io/random')
        .then(response => response.json())
        .then(data => data.content);
    }
    
    const getText = async () => {
        setValue(await randomText());
    }

    // calculate no. of words
    const words = txt === '' ? 0 : txt.split(' ').filter((element) => {return element.length !== 0}).length;
    const chars = txt.length;
    props.updateWords(tot_words + words);
    const text_len = textvalue === '' ? 0 : textvalue.split(' ').filter((element) => {return element.length !== 0}).length

    useEffect(() => {
        if(words === text_len && chars === textvalue.length) {
            let errors = props.error;
            txt.split('').forEach((element, index) => {
                if(element !== textvalue[index])
                errors++;
            });
            props.setError(errors);
            props.setAccuracy(Math.round((1 - errors/props.chars)*100*100)/100);
            setTxt('');
            getText();
            setTot_words(tot_words + words);
        }

        props.setChars(props.chars + 1);
    }, [words, chars])

    // update typed text
    const handleOnchange = (event) => {
        setTxt(event.target.value)
    }

    // trigger timer when start is clicked and get the text
    const handleOnStart = async () => {
        await getText();
        setStarted1(1);
        props.setIsReset(0);
    }

    useEffect(() => {
        props.setStarted(started1);
    }, [started1]);

    useEffect(() => {
        if(props.isReset === 1) {
            props.setStarted(0);
            setStarted1(0);
            setValue('Click on Start...');
            setTxt('');
            setTot_words(0);
            props.updateWords(0);
            props.setChars(0);
            props.setError(0);
            props.setAccuracy(0);
        }
    }, [props.isReset])

    return(
        <div className='sentences'>
            <textarea className="given-text" id="sentences" placeholder={textvalue}>
            </textarea>
            <textarea className="given-text typing" id="sentences" onChange={handleOnchange} readOnly={started1 === 1 && props.finished === 0 ? 0 : 1} value={txt}>
            </textarea>
            {started1 === 0 ? <div className='start' onClick={handleOnStart}>Start</div> : <div className='start'></div>}
        </div>
    )
}

export default Sentences;