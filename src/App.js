import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ItemManager from './ItemManager';
import 'jquery';
import 'bootstrap/dist/js/bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ItemManager></ItemManager>
      </div>
    );
  }
}

export default App;
