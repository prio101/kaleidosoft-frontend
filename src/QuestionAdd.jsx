import React from "react";

class QuestionAdd extends React.Component {
  
  constructor(props){
    super(props);

    this.state = {
      question: '',
      options: [],
      correct_answer: '',
      quiz_id: 0
    }
  }

  handleSubmit = (e) => {
    e.prevendDefault();
    let data = {  
      question: {
        question: this.state.question,
        options: this.state.options,
        correct_answer: this.state.correct_answer,
        quiz_id: this.state.quiz_id   
      }
    }
    fetch('http://localhost:3000/api/v1/questions', 
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
    if(e.target.name === 'options'){
      this.setState({ [e.target.name]: this.state.options.concat(e.target.value) });  
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  }
  
  render(){
    return(
      <>
        <div className="flex flex-col p-2 m-2 bg-gray-200 h-screen">
          <h1 className="text-2xl font-bold text-gray-800">
            Add new Question
          </h1>
          <form onChange={this.handleSubmit} className="p-2 m-2">
            <input  type="text" 
                    className="m-2 p-2 rounded-md border-2 border-gray-900"
                    value={this.state.question} 
                    name="question"
                    onChange={e => this.handleChange(e) }/>

            <input  type="text" 
                    className="m-2 p-2 rounded-md border-2 border-gray-900"
                    value={this.state.options}
                    name="options"
                    onChange={e => this.handleChange(e) }/>

            <input  type="text" 
                    className="m-2 p-2 rounded-md border-2 border-gray-900"
                    value={this.state.correct_answer} 
                    name="correct_answer"
                    onChange={e => this.handleChange(e) }/>

            <input  type="text" 
                    className="m-2 p-2 rounded-md border-2 border-gray-900"
                    value={this.state.quiz_id} 
                    name="quiz_id"
                    onChange={e => this.handleChange(e) }/>

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
