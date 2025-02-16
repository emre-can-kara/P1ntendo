import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import Features from './components/Features'
import Contact from './components/Contact'
import BlogPage from './pages/BlogPage'
import AboutPage from './pages/AboutPage'
import PagesPage from './pages/PagesPage'
import ShopPage from './pages/ShopPage'

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/shop" component={ShopPage} />
            <Route path="/shop/page/:page" component={ShopPage} />
            <Route path="/features" component={Features} />
            <Route path="/contact" component={Contact} />
            <Route path="/blog" component={BlogPage} />
            <Route path="/about" component={AboutPage} />
            <Route path="/pages" component={PagesPage} />
          </Switch>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
