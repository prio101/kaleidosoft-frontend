import React from "react";

class OptionAdd extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      option: ''
    }

  }

  handleChange = (e) => {
    console.log("option add: ", e.target.value)
    this.setState({ option: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.questionCallback(this.state.option);
    this.state.option = '';
  }
  
  render(){
    return(
      <>
        <div className="flex flex-col">
          <input type="text"
                 name='option'
                 className="m-2 p-2 rounded-md border-2 border-gray-90" 
                 value={this.state.option}
                 onChange={this.handleChange}
                 onSubmit={this.handleSubmit}
                 />
          <button
            className="bg-blue-400 p-2 rounded-full text-white" 
            onClick={this.handleSubmit}>
            Add another option
          </button>
        </div>
      </>
    )
  }
}

export default OptionAdd;