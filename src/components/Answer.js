import React, { Component } from 'react';

export default class Answer extends Component {
  render() {
  let index = this.props.index
  let score = this.props.score
  let checked = this.props.checked
    return (
      <article className="quizOptions" onClick={() => this.props.setScores(index, score)}>
        <label>
          <input type="radio" name={this.props.index}/>
          {this.props.title}
        </label>
      </article>
    )
  }
}
