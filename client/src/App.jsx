import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import CartProvider from './CartProvider'
import Header from './Header'
import Footer from './Footer'
import Cart from './Cart'
import Shop from './Pages/Shop'
import Home from './Pages/Home'
import Success from './Pages/Success'
import Cancel from './Pages/Cancel'
import Cart_test from './Pages/Cart_test'

function App() {

  return (
    <CartProvider>
      <Router>
        <Header/>
        <Cart/>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/shop" element={<Shop/>} />
          <Route exact path="/success" element={<Success/>} />
          <Route exact path="/cancel" element={<Cancel/>} />
          <Route exact path="/cart" element={<Cart_test/>} />
        </Routes>
        {/* <Footer/> */}
      </Router>
    </CartProvider>
  )
}

export default App
