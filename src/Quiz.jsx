import React from 'react';

class Quiz extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      id: this.props.id,
      quiz: {},
      loaded: false,
      questions: []
    }
  }

  componentDidMount(){
    fetch(`http://localhost:3000/api/v1/quizes/${this.state.id}`)
    .then(res=> res.json())
    .then(res => this.setState({ quiz: res, questions: res.questions }))
    this.setState({ loaded: true });
  }

  render(){
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
                  <div key={q.id} 
                        className="text-xl font-bold">
                    {q.id}. {q.question}
                    
                    <div className="flex flex-col">
                      {Object.keys(q.options).map(option => {
                        return(
                          <>
                            <div>
                              {option}: {q.options[option]}
                            </div> 
                          </>
                        )
                      })}
                    </div>
                  </div> 
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
