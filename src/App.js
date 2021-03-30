import './App.css';
import Intro from './Pages/Intro/Intro'
import Header from './Components/Header/header'
import Recipes  from "./Pages/Recipes/Recipes";
import Blogs  from "./Pages/Blogs/Blogs";
import Food  from "./Pages/Food/Food";
import Progress from './Pages/Progress_Report/Report'
import Dashboard from './Pages/Dashboard/Dashboard'
import Clientprofile from './Pages/Profile page/Clientprofile'
import { BrowserRouter as Router, Switch ,Route } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';
import DropFile from './Pages/Food/DropFile';
import Nutrients from './Pages/Food/Nutrients';
import RecipeBook from './Pages/Dashboard/Recipe Book/RecipeBook'
import SavedBlogs from './Pages/Dashboard/SavedBlogs/SavedBlogs'


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
        <Route exact path="/userclass/dashboard" component={Dashboard} />
        <Route exact path="/userclass/dashboard/recipebook" component={RecipeBook} />
        <Route exact path="/userclass/dashboard/savedblogs" component={SavedBlogs} />
        <Route exact path="/Clientprofile" component={Clientprofile} />
      </AnimatedSwitch>
    </Router>
    </>
  );
}

export default App;
