import React from 'react'
import { useState } from 'react';
import { resultInitalState } from './constant';

const Quiz = ({questions}) => {
    const [currentquestion, setCurrentQuestion] = useState(0);
    const [answeridx, setAnsweridx] = useState(null);
    const [answer, setAnswer] = useState(null);
    const [result, setResult] = useState(resultInitalState);
    const [showResult, setShowResult] = useState(false);

    const {question, choices, correctAnswer  } = questions[currentquestion];

    const onAnswerClick = (answer, index)=>{
        setAnsweridx(index);
        if(answer === correctAnswer){
            setAnswer(true);
        }
        else{
            setAnswer(false);
        }
    };
    const onClickNext = () =>{
        setAnsweridx(null);
        setResult((prev) =>
            answer?
            {
                ...prev,
                score: prev.score+5,
                correctAnswers: prev.correctAnswers+1
            }:
            {
                ...prev,
                wrongAnswers: prev.wrongAnswers+1
            }
        );
        if(currentquestion !== questions.length-1){
            setCurrentQuestion((prev) => prev+1)
        }
        else{
            setCurrentQuestion(0);
            setShowResult(true);
        }

    };

    const onTryAgain = ()=>{
        setResult(resultInitalState);
        setShowResult(false);
    }

  return (
    <div className='quiz_container'>
        {!showResult ? (<>
        <span className='active-question-no'>{currentquestion+1}/</span>
        <span className='totol-question'>{questions.length}</span>
        <h2>{question}</h2>
        <ul>
            {
                choices.map((choice, index)=>(
                    <li 
                        onClick={()=>onAnswerClick(choice, index)}
                        key={choice}
                        className= {answeridx === index ? 'selected-answer': null}
                    >
                        {choice}

                    </li>

                ))
            }
        </ul>
        <div className='footer'>
            <button  onClick={onClickNext} disabled={answeridx===null}> 
                {currentquestion === questions.length-1 ? "Finish" : "Next"}
            </button>
        </div>
        
        </>): <div className='result'>
            <h3>Result</h3>
            <p>Total Questions: <span>{questions.length}</span></p>
            <p>Total Score: <span>{result.score}</span></p>
            <p>Correct Answers: <span>{result.correctAnswers}</span></p>
            <p>Wrong Answers: <span>{result.wrongAnswers}</span></p>
            <button onClick={onTryAgain}>Try Again</button>
        </div>}
        

      
    </div>
  )
}

export default Quiz
