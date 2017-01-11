import React, { Component } from 'react';
import axios from 'axios';
import Question from './Question';

export default class Quiz extends Component {
  constructor() {
    super();
    this.state = {
      quizzes: ''
    };
  }

  componentDidMount() {
    this.fetchQuestions();
  }

  fetchQuestions() {
    axios.get('/quizzes')
      .then((response) => {
        this.setState({
          quizzes: response.data.quizzes,
        });
      })
      .catch((error) => {
        console.log(error);
    });
  }

  render() {
    return (
      this.state.quizzes ?
        <div>
          <h1>{this.state.quizzes[0].title}</h1>
          <section>
            {this.state.quizzes[0].questions.map((question, index) =>
              <Question
                className="question-container"
                key={question.id}
                id={index}
                title={question.title}
                answers={question.answers}
              /> )}
          </section>
          <button className="submit-btn">
          Submit
          </button>
        </div>
      : <h1>No Quizzes</h1>
    );
  }
}
