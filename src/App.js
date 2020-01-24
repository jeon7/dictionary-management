import React from 'react';
import { Route } from 'react-router-dom';
import Dictionaries from './components/overview/Dictionaries';
import Records from './components/edit/Records';

const App = () => {
  return (
    <>
      <Route component={Dictionaries} path="/" exact={true} />
      <Route component={Records} path="/edit/:dictionary_title" />
    </>
  );
};

export default App;
