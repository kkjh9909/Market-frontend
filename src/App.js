import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Login} from "./pages/Login";
import {FleaMarket} from "./pages/FleaMarket";
import {Nav} from "./components/nav/Nav";
import {ProductSaleWrite} from "./pages/ProductSaleWrite";
import {ProductArticle} from "./pages/ProductArticle";
import {SignUp} from "./pages/SignUp";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Nav />
                <Routes>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/signup" element={<SignUp />}></Route>
                    <Route path="/product/write" element={<ProductSaleWrite />}></Route>
                    <Route path="/product/:postId" element={<ProductArticle />}></Route>
                    <Route path="/flea" element={<FleaMarket />}></Route>
                    <Route path="/flea/:region" element={<FleaMarket />}></Route>
                    <Route path="/near" element={<FleaMarket />}></Route>
                    <Route path="/near/:region" element={<FleaMarket />}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
