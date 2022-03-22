import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getProducts } from "../redux/productSlice";
import { Link, useParams } from "react-router-dom";
import iphoneLogo from "../Assets/dropdown-icons/iPhone.svg";
import macBookLogo from "../Assets/dropdown-icons/MacBookPro.svg";
import iMacLogo from "../Assets/dropdown-icons/iMac.svg";
import iPadLogo from "../Assets/dropdown-icons/iPad.svg";
import accessories from "../Assets/dropdown-icons/Aksesuarlar.svg";
import watch from "../Assets/dropdown-icons/AppleWatch.svg";

function ProductFilter() {
  let dispatch = useDispatch();
  let params = useParams();
  const [onModel, setOnModel] = useState(false);

  useEffect(() => {
    dispatch(getProducts(params.products))
  }, [dispatch, params])

  const handleDropDown = (dropdown) => {
    let item = document.querySelector(`.${dropdown}`)

    item.classList.value.includes('passive') === true ? 
      item.classList.replace('passive', 'active')
      :
      item.classList.replace('active', 'passive')
  }

  const handleFilterModel = () => {
    setOnModel(true);
  }
  const closeModel = () => {
    setOnModel(false);
  }

  return (
    <section className={`items-container ${onModel ? "on-model" : ""}`}>

      <button onClick={closeModel} className="btn btn-close close-filter-model">
      </button>

      <button className="filter-btn" onClick={handleFilterModel}>
        <span>Filter</span>
        <i className="fas fa-filter"></i>
      </button>

      <div className={`items-category`}>
        <div className="dropdown" onClick={() => handleDropDown("Mac")}>
          <span>Mac</span>
          <i className="far fa-angle-down"></i>
        </div>
        <div className="dropdown__items passive Mac">
          <Link to="/product/Mac" className="Mac">
            <img src={macBookLogo} alt="mac logo" />
            <span>All Mac's</span>
          </Link>
          <Link to="/product/MacBook_Air" className="MacBook_Air">
            <img src={macBookLogo} alt="mac logo" />
            <span>MacBook Air</span>
          </Link>
          <Link to="/product/MacBook_Pro" className="MacBook_Pro">
            <img src={macBookLogo} alt="mac logo" />
            <span>MacBook Pro</span>
          </Link>
          <Link to="/product/iMac" className="iMac">
            <img src={iMacLogo} alt="mac logo" />
            <span>iMac</span>
          </Link>
        </div>

        <div className="dropdown" onClick={() => handleDropDown("iPhone")}>
          <span>iPhone</span>
          <i className="far fa-angle-down"></i>
        </div>
        <div className="dropdown__items passive iPhone">
          <Link to="/product/iPhone" className="iPhone">
            <img alt="iphone logo" src={iphoneLogo} />
            <span>All iPhone's</span>
          </Link>
          <Link to="/product/iPhone_13_Pro_Max" className="iPhone_13_Pro_Max">
            <img alt="iphone logo" src={iphoneLogo} />
            <span>iPhone 13 Pro Max</span>
          </Link>
          <Link to="/product/iPhone_13_Pro" className="iPhone_13_Pro">
            <img alt="iphone logo" src={iphoneLogo} />
            <span>iPhone 13 Pro</span>
          </Link>
          <Link to="/product/iPhone_13" className="iPhone_13">
            <img alt="iphone logo" src={iphoneLogo} />
            <span>iPhone 13</span>
          </Link>
        </div>

        <div className="dropdown" onClick={() => handleDropDown("iPad")}>
          <span>iPad</span>
          <i className="far fa-angle-down"></i>
        </div>
        <div className="dropdown__items passive iPad">
          <Link to="/product/iPad" className="iPad">
            <img alt="ipad logo" src={iPadLogo} />
            <span>All iPad's</span>
          </Link>
          <Link to="/product/iPad_Air" className="iPad_Air">
            <img alt="ipad logo" src={iPadLogo} />
            <span>iPad Air</span>
          </Link>
          <Link to="/product/iPad_Pro" className="iPad_Pro">
            <img alt="ipad logo" src={iPadLogo} />
            <span>iPad Pro</span>
          </Link>
        </div>

        <div className="dropdown" onClick={() => handleDropDown("Watch")}>
          <span>Watch</span>
          <i className="far fa-angle-down"></i>
        </div>
        <div className="dropdown__items passive Watch">
          <Link to="/product/Watch" className="Watch">
            <img alt="Watch logo" src={watch} />
            <span>All Watches</span>
          </Link>
          <Link to="/product/Series_7" className="Watch">
            <img alt="Watch logo" src={watch} />
            <span>Series 7</span>
          </Link>
          <Link to="/product/SE" className="Watch">
            <img alt="Watch logo" src={watch} />
            <span>SE</span>
          </Link>
          <Link to="/product/Series_3" className="Watch">
            <img alt="Watch logo" src={watch} />
            <span>Series 3</span>
          </Link>
        </div>

        <div className="dropdown" onClick={() => handleDropDown("Accessories")}>
          <span>Accessories</span>
          <i className="far fa-angle-down"></i>
        </div>
        <div className="dropdown__items passive Accessories">
          <Link to="/product/Accessories" className="Accessories">
            <img alt="Accessories logo" src={accessories} />
            <span>All Accessories</span>
          </Link>
        </div>
      </div>
      
    </section>
  );
}

export default ProductFilter;
