import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Signin from './pages/Auth/Signin';
import Signup from './pages/Auth/Signup';
import Profile from './pages/Profile';
import ProductsContainer from './pages/ProductsContainer';
import ProductDetail from './pages/ProductDetail';
import ProfileDetail from './components/ProfileDetail';
import OldOrders from './components/OldOrders';
import FavoriteProducts from './components/FavoriteProducts';
import Basket from './components/Basket';
import ProtectedRoute from './pages/ProtectedRoute';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        
        <Route path='/' element={<Home />} />
        <Route path='signin' element={<Signin />} />
        <Route path='signup' element={<Signup />} />
        <Route path='/basket' element={<Basket />} />
        <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>}>
          <Route index element={<ProfileDetail />} />
          <Route path='favorite_products' element={<FavoriteProducts />} />
          <Route path='old_orders' element={<OldOrders />} />
        </Route>
        <Route path='/product/:products' element={<ProductsContainer />} />
        <Route path='/product/:products/:productdetail/*' element={<ProductDetail />} />
        <Route path='*' element={<Navigate to="/" replace />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;