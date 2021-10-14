import React from 'react';

class Quiz extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      id: this.props.id,
      quiz: {},
      loading: false
    }
  }

  componentDidMount(){
    
    fetch(`http://localhost:3000/api/v1/quizes/`+this.state.id,
      {
        method: 'GET',
        mode: 'cors',       
        headers: {
          'Content-Type': 'application/json'
        },
      }
    )
    .then(res=> res.json())
    .then(res => this.setState( { quiz: res, loading: true } ))
  }

  render(){
    return(
      <>
        <div className="flex flex-col">
          <h1>{this.state.quiz.topic}</h1>

        </div>
      </>
    )
  }
}


export default Quiz;
