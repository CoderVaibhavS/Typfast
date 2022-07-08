import React from 'react';
import '../CSS Components/Finished.css';

export default function Finished(props) {

    const handleOnRetry = () => {

        props.setIsReset(1);
        props.setFinished(0);
    }

return(
    
    <div className="finished" id="finished">
        <div className="test_finished">Test Finished!!</div>
        <div className="score">Your Score: {props.wpm} WPM</div>
        <div className="accuracy score">Accuracy: {props.accuracy}%</div>
        <div className="retry" onClick={handleOnRetry}>Retry</div>
    </div>
)}