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
import {ChatRoom} from "./pages/ChatRoom";
import {ContextProvider} from "./context/Context";
import {ChatRoomList} from "./pages/ChatRoomList";
import {Profile} from "./pages/Profile";
import {Test} from "./pages/Test";
import {FavoritePostList} from "./pages/FavoritePostList";

function App() {
    return (
        <div className="App">
            <ContextProvider>
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
                        <Route path="/chat/:chatroom" element={<ChatRoom />}></Route>
                        <Route path="/profile/chatrooms" element={<ChatRoomList />}></Route>
                        <Route path="/profile/favorites" element={<FavoritePostList />}></Route>
                        <Route path="/profile" element={<Profile />}></Route>
                        <Route path="/near/:region" element={<FleaMarket />}></Route>
                        <Route path="/chatrooms" element={<ChatRoomList />}></Route>
                        <Route path="/test" element={<Test />}></Route>
                    </Routes>
                </BrowserRouter>
            </ContextProvider>
        </div>
    );
}

export default App;
