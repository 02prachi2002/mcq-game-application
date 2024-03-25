import React from 'react';
import QuestionList from './components/QuestionList';
import "./App.css"

function App() {
  return (
    <div className="App ">
      <section id="accueil">

<div class="triangle_rose"></div>
<div class="triangle_vert"></div>
    
  <header>
  <h1 className=' text-red-700 p-4 text-center font-extrabold text-9xl '>LET'S TEST YOUR KNOWLEDGE</h1>
      <QuestionList />
  </header>
</section>
      
    </div>
  );
}

export default App;
