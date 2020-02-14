import React from 'react';
import Header from './components/Views/Header';
import Footer from './components/Views/Footer';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import AllProjects from './components/Projects/AllProjects';
import Actions from './components/Projects/Actions'

function App() {
  return (
    <>      
    <Router>
      <Header />
      <Route exact path="/" component={AllProjects} />
      <Route path="/projects/:id" component={Actions} />
      <Footer />
    </Router>
    </>
  );
}

export default App;