import './App.css';
import Intro from './Pages/Intro/Intro'
import Header from './Components/Header/header'
import Recipes  from "./Pages/Recipes/Recipes";
import Blogs  from "./Pages/Blogs/Blogs";
import Food  from "./Pages/Food/Food";
import Progress from './Pages/Progress_Report/Report'
import Dashboard from './Pages/Dashboard/Dashboard'
import { BrowserRouter as Router, Switch ,Route } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';
import DropFile from './Pages/Food/DropFile';
import Nutrients from './Pages/Food/Nutrients';


function App() {
  return (
    <>
    <Router>
    <Header/>
      <AnimatedSwitch
        atEnter={{ opacity: 0 }}
        atLeave={{ opacity: 0 }}
        atActive={{ opacity: 1 }}
        className="switch-wrapper"
      >
        <Route exact path="/" component={Intro} />
        <Route exact path="/blogs" component={Blogs} />
        <Route exact path="/food" component={Food} />
        <Route exact path="/recipes" component={Recipes} />
        <Route exact path="/progress" component={Progress} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/file" component={DropFile} />
        <Route exact path="/nutrition" component={Nutrients} />




      </AnimatedSwitch>
    </Router>
    </>
  );
}

export default App;
