import React from 'react';
import './assets/css/App.css';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './header';
import FromInputData from './component/form';
import DataFromJSON from './component/dataFromJSON';

function App() {
  return (
    <div className="App">
        <Header />
        
        
        <section className="section-1">
            <div className="row mr-0 ml-0">
                <div className="col-12 mt-5">
                    <span className="topicHeader">The Employee Provident Fund </span>
                </div>
            </div>
            <FromInputData />
        </section>

        <section className="section-2">
            <div className="row mr-0 ml-0">
                <div className="col-12 mt-5">
                    <span className="topicHeader">Data From JSON File </span>
                </div>
            </div>
            <DataFromJSON />
        </section>
    </div>
  );
}

export default App;
