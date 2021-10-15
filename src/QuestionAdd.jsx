import React from "react";
import OptionAdd from "./OptionAdd";

class QuestionAdd extends React.Component {
  
  constructor(props){
    super(props);

    this.state = {
      question: '',
      options: [],
      correct_answer: '',
      quiz_id: 0,
      quizzes: [],
      isLoaded: false,
      quizzes_options: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch('https://kaelido-backend.herokuapp.com/api/v1/quizes',
      {
        method: 'GET',
        mode: 'cors',       
        headers: {
          'Content-Type': 'application/json'
        },
      })
    .then(res => res.json())
    .then((res) => {
      this.setState({ isLoaded: true, quizzes: res })    
    }, (error) => {
      this.setState({ isLoaded: false, error })
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let data = {  
      question: {
        question: this.state.question,
        options: this.state.options,
        correct_answer: this.state.correct_answer,
        quiz_id: this.state.quiz_id   
      }
    }
    fetch('https://kaelido-backend.herokuapp.com/api/v1/questions', 
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
    console.log("NamE:",e.target.name);
    if(e.target.name !== 'option'){
      this.setState({ [e.target.name]: e.target.value });
    }
    
  }

  addOption = (value) => {
    console.log("inside add option:", value);
    this.setState({ options: this.state.options.concat({ value })})
  }
  
  render(){
    return(
      <>
        <span className="p-2 m-2 flex flex-col bg-gray-700 text-white">
          Added options
          {this.state.options.map((elem, key )=> 
            <span className="flex flex-col">
              {key+1}: {elem.value}
            </span>
          )}
        </span>
        <div className="flex flex-col p-2 m-2 bg-gray-200 h-screen">
          <h1 className="text-2xl font-bold text-gray-800">
            Add new Question
          </h1>
          <form onSubmit={this.handleSubmit} className="p-2 m-2 flex flex-col">
            <label>Question</label>
            <input  type="text" 
                    className="m-2 p-2 rounded-md border-2 border-gray-900"
                    value={this.state.question} 
                    name="question"
                    onChange={e => this.handleChange(e) }/>
            <label>Options</label>
            
            <OptionAdd questionCallback={ this.addOption }/>
            
            <label>Correct Answer</label>
            <input  type="text" 
                    className="m-2 p-2 rounded-md border-2 border-gray-900"
                    value={this.state.correct_answer} 
                    name="correct_answer"
                    onChange={e => this.handleChange(e) }/>
            <label> Select Quiz 
              { this.state.isLoaded ?
                <select 
                  value={this.state.quiz_id} 
                  name="quiz_id"
                  onChange={e => this.handleChange(e)}
                  className="p-4 m-4 bg-gray-800 text-white font-bold"
                  >
                    <option>Select A Quiz</option>
                  <>
                    {this.state.quizzes.map(option=>
                      <>
                        <option value={option.id}>{option.topic}</option>
                      </>
                    )}
                  </>
                </select>
                   
              : ''}
            </label>
            <input  type="submit" 
                    className="cursor-pointer rounded-md bg-blue-400 text-white font-bold p-4"
            />       

          </form>
        </div>
      </>
    );
  }
}

export default QuestionAdd;
