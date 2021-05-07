import './App.css';
import Intro from './Pages/Intro/Intro'
import Header from './Components/Header/header'
import Recipes from "./Pages/Recipes/Recipes";
import Blogs from "./Pages/Blogs/Blogs";
import Fblogs from "./Pages/Blogs/FullBlog";
import Food from "./Pages/Food/Food";
import verification from "./Pages/Notfound404/verifi";
import Notfound from "./Pages/Notfound404/Notfound";
import AboutUs from './Pages/AboutUs/AboutUs'
import Progress from './Pages/Progress_Report/Report'
import Dashboard from './Pages/Dashboard/Dashboard'
import Clientprofile from './Pages/Profile page/Clientprofile'
import Nutritionistprofile from './Pages/Profile page/Nutritionistprofile'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';
import RecipeBook from './Pages/Dashboard/Recipe Book/RecipeBook'
import SavedBlogs from './Pages/Dashboard/SavedBlogs/SavedBlogs'
import Signupmobile from './Pages/Signup/Signup_mobile'
import loginmobile from './Pages/Login/login_mobile'
import Friends from './Pages/Dashboard/Friends/Friends'
import Nutritionist from './Pages/Dashboard/Nutritionist/Nutritionist'
import { AuthProvider } from './AuthContext'


function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Header />
          <AnimatedSwitch
            atEnter={{ opacity: 0 }}
            atLeave={{ opacity: 0 }}
            atActive={{ opacity: 1 }}
            className="switch-wrapper"
          >
            <Route exact path="/verification" component={verification} />
            <Route exact path="/:uid/Nutritionistprofile" component={Nutritionistprofile} />
            <Route exact path="/" component={Intro} />
            <Route exact path="/blogs" component={Blogs} />
            <Route exact path="/food" component={Food} />
            <Route exact path="/aboutus" component={AboutUs} />
            <Route exact path="/recipes" component={Recipes} />
            <Route exact path="/:blogid/fullBlog" component={Fblogs} />
            <Route exact path="/:uid/dashboard" component={Dashboard} />
            <Route exact path="/:uid/Nutritionistdashboard" component={Nutritionist} />
            <Route exact path="/:uid/profile" component={Clientprofile} />
            {
              window.screen.width <= 500 ? (<>
                <Route exact path="/signupmobile" component={Signupmobile} />
                <Route exact path="/loginmobile" component={loginmobile} /></>)
                : (<></>)
            }
          </AnimatedSwitch>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
