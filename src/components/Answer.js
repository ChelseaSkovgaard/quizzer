import React, { Component } from 'react';

export default class Answer extends Component {
  render() {
    let {id, score, setScores, title} = this.props

    return (
      <article className="quizOptions" onClick={() => setScores(id, score)}>
        <label>
          <input type="radio" name={id}/>
          {title}
        </label>
      </article>
    )
  }
}
