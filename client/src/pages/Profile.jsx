import React, { useEffect } from 'react'
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getProfile } from '../redux/profileSlice';
import { logOut } from '../redux/authSlice';


function Profile() {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let location = useLocation();

  useEffect(() => {
    if(localStorage.getItem("accessToken")){
      dispatch(getProfile(JSON.parse(localStorage.getItem("accessToken"))))
        .then(res => {
          if(res.meta.requestStatus === "rejected"){
            navigate("/signin", {state:{ from: location }})
            localStorage.removeItem("accessToken");
          }
        })
        .catch(err => {
          localStorage.removeItem("accessToken");
          dispatch(logOut());
          navigate("/signin", {state:{ from: location }})
        })
    }else{
      localStorage.removeItem("accessToken");
      navigate("/signin", {state:{ from: location }})
    }
    
}, [dispatch, location, navigate])

  return (
    <div className='profile'>
      <div className='profile__buttons'>
        <Link to="/profile">Profile</Link>
        <Link to="/profile/favorite_products">Favorite Products</Link>
        <Link to="/profile/old_orders">Old Orders</Link>
      </div>
      <Outlet />
    </div>
  )
}

export default Profile