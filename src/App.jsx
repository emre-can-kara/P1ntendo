import { Route, Switch } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import Features from './components/Features'
import Contact from './components/Contact'
import BlogPage from './pages/BlogPage'
import AboutPage from './pages/AboutPage'
import PagesPage from './pages/PagesPage'
import ShopPage from './pages/ShopPage'
import ProductDetail from './pages/ProductDetail'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import CartPage from './pages/CartPage'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/shop" component={ShopPage} />
          <Route 
            path="/shop/:gender/:categoryName/:categoryId/:productSlug/:productId" 
            component={ProductDetail} 
          />
          <Route 
            path="/shop/:gender/:category/:categoryId" 
            component={ShopPage} 
          />
          <Route path="/features" component={Features} />
          <Route path="/contact" component={Contact} />
          <Route path="/blog" component={BlogPage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/pages" component={PagesPage} />
          <Route path="/signup" component={SignupPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/cart" component={CartPage} />
        </Switch>
      </main>
      <Footer />
      <ToastContainer position="top-right" />
    </div>
  )
}

export default App
