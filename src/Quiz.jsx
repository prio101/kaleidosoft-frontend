import React from 'react';
import QuizAnswer from './QuizAnswer';
import Question from './Question';
import { base_url, api } from './helper';

class Quiz extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      id: this.props.id,
      quiz: {},
      loaded: false,
      questions: [],
      answers: [],
      showResult: false,
      result: 0
    }
  }

  componentDidMount(){
    let url = base_url + api + this.state.id;
    fetch('https://kaelido-backend.herokuapp.com/api/v1/quizes/'+this.state.id,
      {
        method: 'GET',
        mode: 'cors',       
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then(res => res.json())
      .then(res => this.setState({ quiz: res, 
                                   questions: res.questions }))
      this.setState({ loaded: true });
      console.log(this.state.quiz)
  }

  handleSubmit = () => {
    let total = this.evaluateResult();

    // didn't have time to work with user auth and Feedback system
    
    let data = {
      user_id: 1,
      result: total,
      feedback: 'Lorem Ipsum',
      quiz_id: this.state.quiz.id
    }
    fetch('https://kaelido-backend.herokuapp.com/results', 
    {
      method: 'POST',
      mode: 'cors',       
      headers: {
      'Content-Type': 'application/json'
      },
      redirect: 'follow',
      body: JSON.stringify(data)
    }).then(res => console.log(res.status));

    this.setState({ showResult: true, result: total })
  }

  onAnswer = (id, answer, correct_answer) =>{
    console.log("params:",correct_answer)
    this.setState({
      answers: this.state.answers.concat({ id: id, given_answer: answer, correct_answer: correct_answer })
    })
  }

  evaluateResult = () => {
    let reward_point = this.state.quiz.correct_answer_reward
    let total = 0;
    this.state.answers.map(answer =>{
      if(answer.given_answer.toLowerCase() === answer.correct_answer.toLowerCase()){
        total = total + reward_point;
      }
    })
    return total;
  }

  render(){
    console.log(this.state.answers)
    return(
      <>
        {this.state.showResult ? (
          <h1 className="flex flex-row justify-center font-bold text-3xl">
            Your Result is : {Number(this.state.result).toFixed(2)} - Quiz: {this.state.quiz.topic}
          </h1>
        )
        :''}

        {this.state.loaded ? 
          <div className="flex flex-col p-20">
            <h1 className="text-3xl">{this.state.quiz.topic}</h1>
            <p className="text-xl font-bold">Question Count: {this.state.quiz.questions_count}</p>

            <h1 className="text-xl">Questions:</h1>

            {this.state.questions.map(q => {
              return(
                <>
                  <Question question={q} />  
                  <QuizAnswer question={q} 
                              quizCallBack={this.onAnswer}
                              />
                </>
              )
            })}
            <button
              onClick={this.handleSubmit}
              className="p-4 m-2 roudned-md text-white font-bold text-xl bg-green-400"
            >Submit The Quiz</button>
          </div>
        : 'Not Loaded Yet'}
      </>
    )
  }
}


export default Quiz;
