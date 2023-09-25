import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import CartProvider from './Components/CartProvider'
import Header from './Components/Header'
import Footer from './Components/Footer'
import Cart from './Components/Cart'
import Shop from './Pages/Shop'
import Product1 from './Pages/Product Pages/Product1'
import Success from './Pages/Success'
import Cancel from './Pages/Cancel'

function App() {

  return (
    <CartProvider>
      <Router>
        <Header/>
        <Cart/>
        <Routes>
          <Route exact path="/" element={<Shop/>} />
          <Route exact path="/shop" element={<Product1/>} />
          <Route exact path="/success" element={<Success/>} />
          <Route exact path="/cancel" element={<Cancel/>} />
        </Routes>
        {/* <Footer/> */}
      </Router>
    </CartProvider>
  )
}

export default App
