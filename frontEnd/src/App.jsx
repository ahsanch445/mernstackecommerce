import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Nav from "./Costomer/Components/Navigation/Nav";
import Login from "./Costomer/Pages/Login/Login";
import SignUp from "./Costomer/Pages/SignUp/SignUp";
import Home from "./Costomer/Pages/Home/Home";
import Footer from './Costomer/Components/Footers/Footer';
import ProductCard from "./Costomer/Components/Products/Product";
import ProductDetalis from './Costomer/Components/ProductDetalis/ProductDetalis';
import Ratting from './Costomer/Components/RattingCard/Ratting';
import Cart from './Costomer/Components/Cart/Cart';
import AdminOrderPage from './Costomer/Pages/OrdersPage/Order';
import AdminOrderDetails from "./Costomer/Pages/OrdersPage/OrdersDetails";
import Stepper from './Costomer/Components/CartPayment/Stepper';
import OrderDetail from './Costomer/Components/OrderDetails/OrderDetail';
import OrderPlaced from './Costomer/Components/OrderPlacedDetails/OrderPlaced';
import DeliveryAddress from './Costomer/Components/DeliveryAddress/DeliveryAddress';
import { ToastContainer, toast } from 'react-toastify';
import Verification from './Costomer/Pages/EmailVerification/Verification';
import 'react-toastify/dist/ReactToastify.css';
import Profile from './Costomer/Pages/Profile/Profile';
import AllUsers from './Costomer/Pages/Alluser/AllUsers';
import Allproducts from './Costomer/Pages/Allproducts/Allproducts';
import { useSelector } from 'react-redux';
import { toastContext } from './Context-Api/Context';
import CategoryProducts from './Costomer/Components/CategoryProducts/CategoryProducts';
import AllCategory from './Costomer/Pages/Allcategory/AllCategory';
import Categorypage from './Costomer/Components/CategoryProducts/Categorypage';
import OrderNav from './Costomer/Components/NavCartDetails/OrderNav';

const App = () => {
  let { userLogout } = useContext(toastContext);
  const [update, setupdate] = useState(false);
  let user;
  const location = useLocation();

  useEffect(() => {
    user = JSON.parse(localStorage.getItem("user"));
  }, [userLogout]);

  const hideNavPaths = ['/login', '/signup'];

  return (
    <>
      {!hideNavPaths.includes(location.pathname) && <Nav />}
      <Routes>
        <Route path='/login' element={user ? <Navigate to="/" /> : <Login />} />
        <Route path='/signup' element={user ? <Navigate to="/" /> : <SignUp />}></Route>
        <Route path='/addtocart' element={<OrderNav />}></Route>
        <Route path='/' element={<Home />}></Route>
        <Route path='/profile' element={<Profile />}>
          <Route path='alluser' element={<AllUsers />}></Route>
          <Route path='allproducts' element={<Allproducts />}></Route>
          <Route path='allcategories' element={<AllCategory />}></Route>
        </Route>
        <Route path='/auth/verifiy/:id' element={<Verification />}></Route>
        <Route path='/Card' element={<ProductCard />}></Route>
        <Route path='/:categoryname/:sectionname/:itemsname' element={<Categorypage />}></Route>
        <Route path='/:lavelOne/:lavelTwo/:lavelThree' element={<ProductCard />}></Route>
        <Route path='/product/:productid' element={<ProductDetalis />}></Route>
        <Route path='/product:id' element={<Cart />}></Route>
        <Route path='/Checkout/:id' element={<Cart />}></Route>
        <Route path='/checkout' element={<DeliveryAddress />}></Route>
        <Route path='/account/myorder' element={<OrderDetail />}></Route>
        <Route path='/admin/orders' element={<AdminOrderPage />}></Route>
        <Route path='/admin/orders/details' element={<AdminOrderDetails />}></Route>
        <Route path='/account/myorder/:id' element={<OrderPlaced />}></Route>
      </Routes>
    </>
  );
}

const AppWithRouter = () => (

    <App />

);

export default AppWithRouter;
