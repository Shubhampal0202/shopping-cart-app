import { Provider } from "react-redux";
import { store } from "./utils/store";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/header/Header";
import Home from "./Components/home/Home";
import Cart from "./Components/cart/Cart";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
