import React from 'react';


class QuizAnswer extends React.Component {
  
  constructor(props){
    super(props);
    console.log(props)
    this.state = {
      question: this.props.question,
      label: this.props.question.label,
      answer: '',
      correct_answer: this.props.question.correct_answer
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e){
    this.setState({ answer: e.target.value })
  }

  handleSubmit(e)
  {
    console.log(this.state.correct_answer);
    this.props.quizCallBack(this.state.question.id, this.state.answer, this.state.correct_answer);
    e.preventDefault();
  }
  
  render(){
    return(
      <>
        <div className="flex flex-col m-4">
          
            <label 
              className="block">
                Answer { this.state.question.label } 
            </label>  
            
            <input 
              type="text" 
              className="p-2 
                        roudned-md 
                        border-gray-700 
                        border-4"
              placeholder="answer"
              value={this.state.answer}
              onChange={this.handleChange}
              
            />
            <button onClick = {(e)=>this.handleSubmit(e)}
                    className="cursor-pointer 
                              m-2 
                              p-2 
                              bg-blue-400 
                              text-white">
                                Submit
            </button>
          
        </div> 
      </>
    )
  }
}

export default QuizAnswer;