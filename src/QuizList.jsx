import React from 'react';
import { Link } from 'react-router-dom';

class QuizList extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      isLoaded: false,
      quizes: []
    }
  }

  componentDidMount(){
    fetch('http://localhost:3000/api/v1/quizes', 
      {
        method: 'GET',
        mode: 'cors',       
        headers: {
          'Content-Type': 'application/json'
        },
      })
    .then(res => res.json())
    .then((res) => {
      this.setState({ isLoaded: true, quizes: res })    
    }, (error) => {
      this.setState({ isLoaded: false, error })
    })
  }

  render(){
    return(
      <>
        
        <div className="flex flex-col w-full h-auto p-20">
          <h1 className="text-gray-800 font-bold">List of the quizes available:</h1>

          { this.state.quizes.length !== 0  ? this.state.quizes.map(quiz =>(
            <>
              <div
                key={quiz.id}
                className="flex flex-col m-2">
                <Link 
                  to={`/quiz/${quiz.id}`}>
                    {quiz.topic}
                </Link>
              </div>
            </>
          )): '' }       
        </div>
        
      </>
    )
  }
}

export default QuizList;