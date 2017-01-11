import React, { Component } from 'react';
import axios from 'axios';
import Question from './Question';

export default class Quiz extends Component {
  constructor() {
    super();
    this.state = {
      quizzes: '',
      selectedAnswers: {},
      scoreMessage: ''
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
        }, () => {
          let selectedAnswers = this.state.selectedAnswers
          response.data.quizzes[0].questions.forEach((question) => {
            selectedAnswers[question.id] = 0
          })
          this.setState({selectedAnswers: selectedAnswers })
        });
      })
      .catch((error) => {
        console.log(error);
    });
  }
  postScore(total) {
    axios.post('/scores', {
      'score': total
    }).then((response) => {
      console.log(response)
      this.setState({scoreMessage: response.data.score})
    })
  }
  setScores(id, score) {
    let selectedAnswers = this.state.selectedAnswers
    selectedAnswers[id] = score
    this.setState({selectedAnswers: selectedAnswers})
  }
  render() {
    let selectedAnswers = this.state.selectedAnswers
    let totalScore = Object.keys(selectedAnswers).reduce((sum, id) => {
      return sum + selectedAnswers[id]
    }, 0)
    return (
      this.state.quizzes ?
        <div>
          <h1>{this.state.quizzes[0].title}</h1>
          <section>
            {this.state.quizzes[0].questions.map((question, index) =>
              <Question
                className="question-container"
                key={question.id}
                id={question.id}
                title={question.title}
                answers={question.answers}
                setScores={this.setScores.bind(this)}
              /> )}
          </section>
          <button className="submit-btn" onClick={() => this.postScore(totalScore)}>
          Submit
          </button>
          <div>
          {totalScore} {this.state.scoreMessage}
          </div>
        </div>
      : <h1>No Quizzes</h1>
    );
  }
}
