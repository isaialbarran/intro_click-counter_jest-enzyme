import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      counter: 0,
      error: false
    }
  }

  render() {
    const { error } = this.state;
    return (
      <div data-test="component-app" id="main">
        <h1 data-test="counter-display">The count is currently { this.state.counter }</h1>
        {error ?  (<div id="error">The counter cannot go below cero</div>) : ("")}
        <button
            onClick={() => this.setState({ counter: this.state.counter + 1, error: false })}
            data-test="increment-button">
          Increment counter
        </button>
        <button
            onClick={() => {
                if(this.state.counter <= 0)
                  this.setState({counter: 0, error: true});
                else{
                  this.setState({ counter: this.state.counter - 1, error:false })
                }}}
            data-test="decrement-button">
          Decrement counter
        </button>
      </div>
    );
  }
}

export default App;
