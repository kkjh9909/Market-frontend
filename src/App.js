import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Login} from "./pages/Login";
import {FleaMarket} from "./pages/FleaMarket";
import {NavBar} from "./components/nav/NavBar";
import {ProductSaleWrite} from "./pages/ProductSaleWrite";
import {ProductArticle} from "./pages/ProductArticle";
import {SignUp} from "./pages/SignUp";
import {ChatRoom} from "./pages/ChatRoom";
import {ContextProvider} from "./context/Context";
import {ChatRoomList} from "./pages/ChatRoomList";
import {Profile} from "./pages/Profile";
import {Test} from "./pages/Test";
import {FavoritePostList} from "./pages/FavoritePostList";
import {MyPostList} from "./pages/MyPostList";
import {EditProductArticle} from "./pages/EditProductArticle";
import {Neighborhood} from "./pages/Neighborhood";
import {NeighborhoodWrite} from "./pages/NeighborhoodWrite";
import {NeighborArticle} from "./pages/NeighborArticle";
import {Home} from "./pages/Home";
import PrivateRoute from "./context/PrivateRoute";
import {MyNeighborPostList} from "./pages/MyNeighborPostList";

function App() {

    return (
        <div className="App">
            <ContextProvider>
                <BrowserRouter>
                    <NavBar />
                    <Routes>
                        <Route path="/" element={<Home />}></Route>
                        <Route path="/home" element={<Home />}></Route>
                        <Route path="/login" element={<Login />}></Route>
                        <Route path="/signup" element={<SignUp />}></Route>
                        <Route path="/chatroom" element={<PrivateRoute component={<ChatRoom />} />}/>
                        <Route path="/product/write" element={<PrivateRoute component={<ProductSaleWrite />} />}/>
                        <Route path="/product/:postId" element={<ProductArticle />}></Route>
                        <Route path="/product/:postId/edit" element={<PrivateRoute component={<EditProductArticle />} />}/>
                        <Route path="/flea" element={<FleaMarket />}></Route>
                        <Route path="/flea/:region" element={<FleaMarket />}></Route>
                        <Route path="/near" element={<FleaMarket />}></Route>
                        <Route path="/chat/:chatroom" element={<PrivateRoute component={<ChatRoom />} />}/>
                        <Route path="/profile/chatrooms" element={<PrivateRoute component={<ChatRoomList />} />}/>
                        <Route path="/profile/favorites" element={<PrivateRoute component={<FavoritePostList />} />}/>
                        <Route path="/profile/posts" element={<PrivateRoute component={<MyPostList />} />}/>
                        <Route path="/profile/neighbors" element={<PrivateRoute component={<MyNeighborPostList />} />}/>
                        <Route path="/profile" element={<PrivateRoute component={<Profile />} />}/>

                        {/*동네 생활*/}
                        <Route path="/neighbor" element={<Neighborhood />}></Route>
                        <Route path="/neighbor/write" element={<PrivateRoute component={<NeighborhoodWrite />} />}/>
                        <Route path="/neighbor/:postId" element={<NeighborArticle />}></Route>
                    </Routes>
                </BrowserRouter>
            </ContextProvider>
        </div>
    );
}

export default App;
