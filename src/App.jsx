import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import Features from './components/Features'
import Contact from './components/Contact'
import BlogPage from './pages/BlogPage'
import AboutPage from './pages/AboutPage'
import PagesPage from './pages/PagesPage'

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/features" component={Features} />
          <Route path="/contact" component={Contact} />
          <Route path="/blog" component={BlogPage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/pages" component={PagesPage} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
