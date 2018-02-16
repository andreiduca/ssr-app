import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Loadable from 'react-loadable';
import { connect } from 'react-redux';
import { setMessage } from './store/appReducer';
const AsyncComponent = Loadable({
    loader: () => import(/* webpackChunkName: "myNamedChunk" */"./someComponent"),
    loading: () => <div>loading...</div>,
    modules: ['myNamedChunk']
});

class App extends Component {
    componentDidMount() {
        if(!this.props.message) {
            this.props.updateMessage("Hi, I'm from client!");
        }
    }
  render() {
    return (
      <div className="App">
        <header className="App-header">
         
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
              Redux: { this.props.message }
        </p>
        <AsyncComponent/>
      </div>
    );
  }
}

export default connect(
    ({ app }) => ({
        message: app.message,
    }),
    dispatch => ({
        updateMessage: (txt) => dispatch(setMessage(txt)),
    })
)(App);
