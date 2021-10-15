import React from 'react';
import { api } from './helper';

class QuizAdd extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      topic: '',
      questions_count: 0,
      correct_answer_reward: ''
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let data = {  
                  quiz: {
                    topic: this.state.topic, 
                    questions_count: this.state.questions_count, 
                    correct_answer_reward: this.state.correct_answer_reward   
                  }
                }
    fetch('http://localhost:3000/api/v1/quizes', 
      {
        method: 'POST',
        mode: 'cors',       
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow',
        body: JSON.stringify(data)
      }).then(res => console.log(res.status));
  }

  handleChange = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  }

  render(){
    return(
      <>
        <div className="flex flex-col h-screen p-10 bg-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">Add new Quiz here:</h1>

          <form className="flex flex-col" onSubmit={this.handleSubmit}>
            <input  type="text" 
                    name='topic'
                    value={this.state.topic} 
                    onChange={ e => this.handleChange(e) }  
                    className="m-2 p-2 rounded-md border-2 border-gray-900" />

            <input type="text"
                   name='questions_count'
                   value={this.state.questions_count} 
                   onChange={ e => this.handleChange(e) } 
                   className="m-2 p-2 rounded-md border-2 border-gray-900" />

            <input type="text"
                   name='correct_answer_reward' 
                   value={this.state.correct_answer_reward} 
                   onChange={ e => this.handleChange(e) } 
                   className="m-2 p-2 rounded-md border-2 border-gray-900" />       

            <input type="submit" className="cursor-pointer rounded-md bg-blue-400 text-white font-bold p-4" />
          </form>
        </div>
      </>
    )
  }
}

export default QuizAdd;