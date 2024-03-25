import React, { useState, useEffect } from 'react';
import Question from './Question';
import Score from './Score';
import questionsData from '../data/questions';
import "./QuestionList.css"

const QuestionList = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1800); // Timer set to half an hour (1800 seconds)
  const [responses, setResponses] = useState(new Array(questionsData.length).fill(null));
  const [showAnswers, setShowAnswers] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  useEffect(() => {
    if (!quizCompleted && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleQuizSubmit();
    }
  }, [timeLeft, quizCompleted]);

  const handleAnswerSelect = (selectedChoice) => {
    const updatedResponses = [...responses];
    updatedResponses[currentQuestionIndex] = selectedChoice;
    setResponses(updatedResponses);
    const currentQuestion = questionsData[currentQuestionIndex];
    if (selectedChoice === currentQuestion.answer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questionsData.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    }
  };

  const handlePreviousQuestion = () => {
    const previousQuestionIndex = currentQuestionIndex - 1;
    if (previousQuestionIndex >= 0) {
      setCurrentQuestionIndex(previousQuestionIndex);
    }
  };

  const handleQuizSubmit = () => {
    setQuizCompleted(true);
  };

  const handleQuitQuiz = () => {
    setQuizCompleted(true);
    setCurrentQuestionIndex(0);
    setResponses(new Array(questionsData.length).fill(null));
  };

  const handleQuestionNavigation = (index) => {
    setCurrentQuestionIndex(index);
  };

  const toggleAnswers = () => {
    setShowAnswers(!showAnswers);
  };

  const startQuiz = () => {
    setQuizStarted(true);
  };

  const currentQuestion = questionsData[currentQuestionIndex];

  return (
    <div>
      {quizStarted ? (
        <div>
          {quizCompleted ? (
            <div className=" mx-auto p-8  ">
              <Score score={score} totalQuestions={questionsData.length} />
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold tgbtn flex flex-wrap justify-center mt-8" onClick={toggleAnswers}>Toggle Answers</button>
              {showAnswers && (
                <div className=''>
                  <h3 className='text-2xl font-semibold mt-9 mb-3 '>Answers</h3>
                  {questionsData.map((question, index) => (
                    <div key={index} className=' border-lime-600 border-2 rounded-sm p-4 mb-4 font-semibold '>
                      <p>{index + 1}. {question.text}</p>
                      <p>Correct Answer: {question.answer}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (

            <div className=" mx-auto p-4 flex flex-wrap justify-center ">
                <div className=' flex-col flex-wrap w-[65rem] text-left'>
                <h3 className=' border-spacing-3 border-red-600 border-2 p-3 font-semibold text-lg '>Time Left: {timeLeft} seconds</h3>  
              <Question
                question={currentQuestion}
                onSelect={handleAnswerSelect}
                response={responses[currentQuestionIndex]}
              />
              <div className='flex flex-row flex-wrap justify-between  '>
              <div className='flex flex-row flex-wrap justify-evenly w-1/2 my-8 mx-[-2rem]'>
              <button className='next-btn' onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>
              <svg fill="#000000" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
              <g id="SVGRepo_iconCarrier"><path d="M.75 10L6 4.5V8h13v4H6v3.5L.75 10z"></path></g></svg>
                <div class="text">
                   Back
                </div>
                </button>


              <button className='next-btn' onClick={handleNextQuestion} disabled={currentQuestionIndex === questionsData.length - 1}>
              <svg fill="#000000" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
              <g id="SVGRepo_iconCarrier"><path d="M14 15.5V12H1V8h13V4.5l5.25 5.5L14 15.5z"></path></g></svg>
              <div className="text">
                 Next
              </div>

              </button>

              <button className=" text-white font-bold py-1 px-2 rounded mr-5 sub-btn " onClick={handleQuizSubmit}>
              <span class="circle1"></span>
    <span class="circle2"></span>
    <span class="circle3"></span>
    <span class="circle4"></span>
    <span class="circle5"></span>
    <span class="text">Submit</span>
                </button>
              </div>
             
              
              <button className="noselect m-7 mt-9" onClick={handleQuitQuiz}><span class="text">Quit</span>
              <span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z">
                  </path></svg></span></button>
              </div>
              

                </div>
              
                <div className='grid grid-cols-1 gap-3 w-[15rem] pt-15 mt-5 ml-10'>
  <div className='flex flex-col flex-wrap'>
    <h4 className='text-2xl font-bold mb-6'>Question Navigation:</h4>
    <ul className="grid grid-cols-3 gap-3 quesul">
      {questionsData.map((question, index) => (
        <li key={index}>
          <button className={`font-bold py-2 px-4 rounded-full ${responses[index] !== null ? 'bg-green-500' : 'bg-red-500'} text-white`} onClick={() => handleQuestionNavigation(index)}>
            {index + 1}
          </button>
        </li>
      ))}
    </ul>
  </div>
</div>

            </div>
          )}
        </div>
      ) : (
        <div className="mx-auto pl-4">
          <h2 className="text-5xl font-bold mb-4 mt-3 ">Welcome to the Quiz!</h2>
          <p className="mb-2 text-2xl font-medium pl-10">Instructions:</p>
          <ul className=" list-disc ml-6 mb-4 text-lg pt-5 pl-10">
            <li>Answer all questions within the given time limit for each question.</li>
            <li>Once the time of the test ends it will automatically submit itself. </li>
            <li>Click "Submit" to end the quiz and see your score.</li>
            <li>You can also quit the quiz anytime using the "Quit" button.</li>
            <li>Click on the "Submit" button only when you wish to submit the test</li>
            <li>"Next" button for skip to the question</li>
            <li>"Back" button for going back to previous question </li>
          </ul>
          <button className=' pt-6 ' onClick={startQuiz}><a href="#" class="btn-flip" data-back="Let's Go" data-front="Start"></a></button>
        </div>
      )}
    </div>
  );
};

export default QuestionList;
