import React from "react";

class OptionAdd extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      option: ''
    }

  }

  handleChange = (e) => {
    this.setState({ option: this.state.option });
  }

  handleSubmit = (e) => {
    e.preventDefault();
  } 
  
  render(){
    return(
      <>
      
      </>
    )
  }
}