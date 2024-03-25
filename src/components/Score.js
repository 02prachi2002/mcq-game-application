import React from 'react';

const Score = ({ score, totalQuestions }) => {
  return (
    <div className=" mx-auto ">
  <h2 className="text-4xl font-bold mb-4 ">Quiz Completed!</h2>
  <p className="text-2xl font-extrabold">Your score: {score} / {totalQuestions}</p>
</div>

  );
};

export default Score;
