import React, { Component } from 'react';

export default class Answer extends Component {
  render() {
    return (
      <article className="quizOptions">
        <label>
          <input type="radio" name={this.props.index}/>
          {this.props.title}
        </label>
      </article>
    )
  }
}
