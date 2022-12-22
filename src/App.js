import './App.css';

import React, { Component } from 'react';
import Navbar from './component/Navbar'
import News from './component/News';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LoadingBar from "react-top-loading-bar"

export default class App extends Component {
  pageSize = 15;
  apikey="36e62a05b9d1474a9f95385359aa0235"

  state = {
    progress: 20
  }

  setProgress = (progress) => {
    this.setState({ progress: progress })
  }


  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
            height={3}
            color='#f11946'
            progress={this.state.progress}
          />
          <Routes>
            <Route path="/" element={<News setProgress={this.setProgress} apikey={this.apikey} key='general' pageSize={this.pageSize} newsPageHead="News Panda - Top" category='general' />} />
            <Route path="/business" element={<News setProgress={this.setProgress} apikey={this.apikey} key='business' pageSize={this.pageSize} newsPageHead="News Panda - Top Headlines" category='business' />} />
            <Route path="/entertainment" element={<News setProgress={this.setProgress} apikey={this.apikey} key='entertainment' pageSize={this.pageSize} newsPageHead="News Panda - Top Headlines" country="in" category='entertainment' />} />
            <Route path="/technology" element={<News setProgress={this.setProgress} apikey={this.apikey} key='technology' pageSize={this.pageSize} newsPageHead="News Panda - Top Headlines" category='technology' />} />
            <Route path="/science" element={<News setProgress={this.setProgress} apikey={this.apikey} key='science' pageSize={this.pageSize} newsPageHead="News Panda - Top Headlines" category='science' />} />
            <Route path="/health" element={<News setProgress={this.setProgress} apikey={this.apikey} key='health' pageSize={this.pageSize} newsPageHead="News Panda - Top Headlines" category='health' />} />

          </Routes>

        </Router>
      </div>
    )
  }
}

