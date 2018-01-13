import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import ClipsList from './ClipsList'
class App extends Component {
  constructor(props){
    super(props)
    
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">My super playlist</h1>
        </header>
          <ClipsList/>
      </div>
      
    );
  }
}

export default App;
