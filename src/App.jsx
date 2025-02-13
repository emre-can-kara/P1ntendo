import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Contact from './components/Contact'
import HomePage from './pages/HomePage'

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/features" component={Features} />
          <Route path="/contact" component={Contact} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
