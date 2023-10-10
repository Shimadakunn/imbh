import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import CartProvider from './Components/CartProvider'
import Header from './Components/Header'
import Footer from './Components/Footer'
import Cart from './Components/Cart'
import Shop from './Pages/Shop'
import Puffer from './Pages/Product Pages/Puffer'
import JupiLong from './Pages/Product Pages/Jupi Ano'
import ShdwHood from './Pages/Product Pages/Shadow Hoodie'
import ShdwDress from './Pages/Product Pages/Shadow Dress'
import Maelstrom from './Pages/Product Pages/Maelstrom'
import JupiPants from './Pages/Product Pages/Jupi Pants'
import Durag from './Pages/Product Pages/Durag'
import ScarLong from './Pages/Product Pages/ScarLong'
import ScarShort from './Pages/Product Pages/Scar Short'
import JupiShirt from './Pages/Product Pages/Jupi Shirt'
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
          <Route exact path="/rosace puffer" element={<Puffer/>} />
          <Route exact path="/jupiter anorak" element={<JupiLong/>} />
          <Route exact path="/shadow hoodie" element={<ShdwHood/>} />
          <Route exact path="/shadow dress" element={<ShdwDress/>} />
          <Route exact path="/maelstrom" element={<Maelstrom/>} />
          <Route exact path="/jupi pants" element={<JupiPants/>} />
          <Route exact path="/durag" element={<Durag/>} />
          <Route exact path="/scar long" element={<ScarLong/>} />
          <Route exact path="/scar short" element={<ScarShort/>} />
          <Route exact path="/jupi shirt" element={<JupiShirt/>} />
          <Route exact path="/success" element={<Success/>} />
          <Route exact path="/cancel" element={<Cancel/>} />
        </Routes>
        {/* <Footer/> */}
      </Router>
    </CartProvider>
  )
}

export default App
