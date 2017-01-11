import React, { Component } from 'react';
import axios from 'axios';
import Question from './Question';

export default class Quiz extends Component {
  constructor() {
    super();
    this.state = {
      quizzes: '',
      selectedAnswers: [null, null, null, null],
      totalScore: 0,
      score: 0
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

  postScore() {
    let totalScore = this.state.totalScore
    axios.post('/scores', {
      'score': totalScore
    })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
    });
  }

  setScores(score) {
    // let selectedAnswers = this.state.selectedAnswers;
    // selectedAnswers[index] = score;
    // console.log(index)
    // this.setState({ selectedAnswers: selectedAnswers });
    let newScore = this.state.score + score;
    this.setState({score: newScore})
  }

  addScores(score) {
    // let array = this.state.selectedAnswers
    // let sum = array.reduce((a, b) => a + b, 0)
    // console.log(sum)
    // this.setState({totalScore: sum})
    this.postScore()
  }

  resetQuiz() {
    this.setState({totalScore: 0})
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
                setScores={(score) => this.setScores(score)}
              /> )}
          </section>
          <button className="submit-btn" onClick={() => this.addScores().bind(this)}>
          Submit
          </button>
          <button className="reset-btn" onClick={() => this.resetQuiz().bind(this)}>
          Reset
          </button>
          <div>
          Current Score: {this.state.score}
          </div>
        </div>
      : <h1>No Quizzes</h1>
    );
  }
}
