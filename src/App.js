/*eslint-disable*/
import React, { Suspense, lazy, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import TopHeader from './Pages/TopHeader';
import MainPage from './Pages/MainPage';
import Footer from './Pages/Footer';
import Issue1 from './Pages/issue1';
import Issue2 from './Pages/issue2';
import Issue3 from './Pages/issue3';
import Issue4 from './Pages/issue4';
import Issue5 from './Pages/issue5';


import './App.css';

function App() {

    return (
    <div className="App">
        
        <Router>
            <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                <>
                <Route path="/" component={TopHeader}></Route>
                <Route path="/" component={MainPage} exact></Route>
                <Route path="/issue1" component={Issue1} exact></Route>
                <Route path="/issue2" component={Issue2} exact></Route>
                <Route path="/issue3" component={Issue3} exact></Route>
                <Route path="/issue4" component={Issue4} exact></Route>
                <Route path="/issue5" component={Issue5} exact></Route>
                <Footer />
                </>
                </Switch>
            </Suspense>
        </Router>
        

    </div>
  );
}

export default App;
