import React from 'react';
import QuizAnswer from './QuizAnswer';
import Question from './Question';

class Quiz extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      id: this.props.id,
      quiz: {},
      loaded: false,
      questions: [],
      answers: []
    }
  }

  componentDidMount(){
    fetch(`http://localhost:3000/api/v1/quizes/${this.state.id}`)
    .then(res => res.json())
    .then(res => this.setState({ quiz: res, 
                                 questions: res.questions }))
    this.setState({ loaded: true });
  }

  onAnswer = (id, answer) =>{
    this.setState({
      answers: this.state.answers.concat({ [id]: answer })
    })
  }

  render(){
    console.log(this.state.answers)
    return(
      <>
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

          </div>
        : 'Not Loaded Yet'}
      </>
    )
  }
}


export default Quiz;
