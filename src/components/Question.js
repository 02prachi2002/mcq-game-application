import React from 'react';

const Question = ({ question, onSelect }) => {
  const { text, choices } = question;

  return (
    <div className='m-10 border-spacing-3 border-blue-400 border-3 p-5 bg-blue-100 rounded-sm'>
      <h2 className='text-xl font-bold'>{text}</h2>
      <ul>
  {choices.map((choice, index) => (
    <li key={index} className='mt-4 text-lg'>
      <label>
        <input type="radio" name="choice" value={choice} onChange={() => onSelect(choice)} />
        {choice}
      </label>
    </li>
  ))}
</ul>

    </div>
  );
};

export default Question;
