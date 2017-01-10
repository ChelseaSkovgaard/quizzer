import React from 'react';

const Answer = (props) => {
  const { title, id, setScores, score } = props;

  return (
    <article onClick={() => setScores(id, score)} className="quizOptions">
      <label>
        <input type="radio" name={id} />
        {title}
      </label>
    </article>
  )
}

export default Answer;
