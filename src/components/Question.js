import React, { Component } from 'react';
import Answer from './Answer';

export default class Question extends Component {
  render() {
    return (
      <section key={this.props.id} className="questionContainer">
        <h3 className="questionTitle">{this.props.title}</h3>
          {this.props.answers.map((answer, index) =>
          <Answer
            key={index}
            title={answer.title}
            score={answer.score}
          />)}
      </section>
    )
  }
}
