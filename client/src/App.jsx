import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import CartProvider from './Components/CartProvider'
import Header from './Components/Header'
import Footer from './Components/Footer'
import Cart from './Components/Cart'
import Home from './Pages/Home'
import Shop from './Pages/Shop'
import Puffer from './Pages/Product Pages/Puffer'
import JupiAno from './Pages/Product Pages/Jupi Ano'
import ShdwHood from './Pages/Product Pages/Shadow Hoodie'
import ShdwDress from './Pages/Product Pages/Shadow Dress'
import Maelstrom from './Pages/Product Pages/Maelstrom'
import JupiPantsMicro from './Pages/Product Pages/Jupi Pants Micro'
import JupiPantsMilano from './Pages/Product Pages/Jupi Pants Milano'
import Durag from './Pages/Product Pages/Durag'
import ScarLong from './Pages/Product Pages/ScarLong'
import JupiLong from './Pages/Product Pages/Jupi Long'
import Success from './Pages/Success'
import Cvg from './Components/Cvg'

function App() {

  return (
    <CartProvider>
      <Router>
        <Header/>
        <Cart/>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/cvg" element={<Cvg/>} />
          <Route exact path="/shop" element={<Shop/>} />
          <Route exact path="/rosace puffer" element={<Puffer/>} />
          <Route exact path="/jupiter anorak" element={<JupiAno/>} />
          <Route exact path="/jupiter long" element={<JupiLong/>} />
          <Route exact path="/shadow hoodie" element={<ShdwHood/>} />
          <Route exact path="/shadow dress" element={<ShdwDress/>} />
          <Route exact path="/maelstrom" element={<Maelstrom/>} />
          <Route exact path="/jupi pants micro" element={<JupiPantsMicro/>} />
          <Route exact path="/jupi pants milano" element={<JupiPantsMilano/>} />
          <Route exact path="/durag" element={<Durag/>} />
          <Route exact path="/scar long" element={<ScarLong/>} />
          <Route exact path="/success" element={<Success/>} />
        </Routes>
        <Footer/>
      </Router>
    </CartProvider>
  )
}

export default App
