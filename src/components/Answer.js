import React, { Component } from 'react';

export default class Answer extends Component {
  render() {
  let index = this.props.index
  let score = this.props.score
    return (
      <article className="quizOptions" onClick={() => this.props.setScores(score)}>
        <label>
          <input type='radio' name={this.props.index}/>
          {this.props.title}
        </label>
      </article>
    )
  }
}
