import React from "react";

class Question extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      question: this.props.question
    }
  }

  render(){
    let q = this.state.question;
    return(
      <>
        <div key={q.id} 
            className="text-xl font-bold">
            {q.id}. {q.question}
          
          <div className="flex flex-col">
            {q.options.map(option => {
              return(
                <>
                  <div>
                    {option.value}
                  </div> 
                </>
              )
            })}
          </div>
        </div>
      </>
    )
    
  }
}

export default Question;