import React from 'react';
import { Router,  } from 'react-router'
import {HashRouter , Route , Switch} from 'react-router-dom';


import Page from './views/PageWrapper'

const App = (props) => {
  return (
    <div className="App">

        <HashRouter  >
          <Switch>
            <Route path="/:r" component={Page}></Route>
            <Route path="/" component={Page}></Route>
          </Switch>

        </HashRouter>


      {/* <Page {...props}/> */}
    </div>
  );
}

export default App;
