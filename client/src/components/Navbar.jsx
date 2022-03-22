import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { isUserAuth, logOut } from '../redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';
function Navbar() {
    const token = useSelector(state => state.auth.token);
    let dispatch = useDispatch();
    const [toggle, setToggle] = useState(false)

    useEffect(() => {
        dispatch(isUserAuth());
    }, [dispatch])

    const handleToggle = () => {
        setToggle((prev) => !prev)
    }

    const handleLogOut = () => {
        localStorage.removeItem('accessToken')
        dispatch(logOut());
        if(toggle === true){
            setToggle(false);
        }
    }

    const closeToggle = () => {
        if(toggle === true){
            setToggle(false);
        }
    }
    
    return (
        <header className='header' id='header'>
            <nav className='nav'>
                <Link to="/" className='nav__logo'>
                    <span className='nav__icon'><i className="fab fa-shopware"></i></span>
                    <h1>E-Shop</h1>
                </Link>
                <div className={`nav__menu ${toggle === true && "toggle-on"}`}>
                    <ul className="nav__list">
                        <li><Link onClick={closeToggle} to="/">Anasayfa</Link></li>
                        <li><Link onClick={closeToggle} to="/basket">Basket</Link></li>
                        {
                            token && token !== [] ? 
                            <li><Link to="/profile">Profile</Link></li>
                            :
                            <li><Link onClick={closeToggle} to="signin">Sign in</Link></li>
                        }
                        
                    </ul>
                    {
                        token && token !== [] && 
                    <div className='nav__logout'>
                        <Link onClick={handleLogOut} to="/">Logout</Link>
                    </div>
                    }
                    
                    {
                        toggle === true && (
                            <button  className="nav__close" onClick={handleToggle}>
                                <i className="fas fa-times"></i>
                            </button>
                        )
                    }
                </div>
                    {
                        toggle === false && (
                            <button className='nav__toggle' onClick={handleToggle}>
                                <i className="fas fa-bars"></i>
                            </button>
                        )
                    }
            </nav>
        </header>
    );
}

export default Navbar;
