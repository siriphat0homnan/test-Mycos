import React from 'react';
import './assets/css/App.css';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './header';
import FromInputData from './form.js';

function App() {
  return (
    <div className="App">
        <Header />
        <section className="section-1">
            <div className="row">
                <div className="col-12 m-5">
                    <span className="topicHeader">The Employee Provident Fund </span>
                </div>
               
            </div>
            <FromInputData />
        </section>
    </div>
  );
}

export default App;
