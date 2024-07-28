// src/pages/layout.js
import React, { useState } from 'react';
import { Outlet, Link } from "react-router-dom";
import '../css/home.css';
import '../css/flex-slider.css';
// import '../css/fontawesome.css';
// import '../css/owl.css';
// import '../css/templatemo-villa-agency.css';
// import '../css/animate.css';

const Layout = () => {
    const [activeLink, setActiveLink] = useState('/');

    const handleLinkClick = (path) => {
        setActiveLink(path);
    };
    return (
        <>
            {/* <!-- ***** Preloader Start ***** --> */}
            <div id="js-preloader" className="js-preloader">
                <div className="preloader-inner">
                    <div className="dots">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
            {/* <!-- ***** Preloader End ***** --> */}

            <div className="sub-header">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-8">
                            <ul className="info">
                                <li><i className="fa fa-envelope"></i> info@villaagency6868.com</li>
                                <li><i className="fa fa-map"></i> Sunny Isles Beach, FL 33160</li>
                            </ul>
                        </div>
                        <div className="col-lg-4 col-md-4">
                            <ul className="social-links">
                                <li><Link to="#"><i className="fab fa-facebook"></i></Link></li>
                                <li><Link to="https://x.com/minthu" target="_blank"><i className="fab fa-twitter"></i></Link></li>
                                <li><Link to="#"><i className="fab fa-linkedin"></i></Link></li>
                                <li><Link to="#"><i className="fab fa-instagram"></i></Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* <!-- ***** Header Area Start ***** --> */}
            <header className="header-area header-sticky">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <nav className="main-nav">
                                {/* <!-- ***** Logo Start ***** --> */}
                                <Link to="/" className="logo">
                                    <img src='./logo.png' alt="Logo" title='Villa Agency' style={{ width: '100px', height: '100px' }} />
                                </Link>
                                {/* <!-- ***** Logo End ***** --> */}
                                {/* <!-- ***** Menu Start ***** --> */}
                                <ul className="nav">
                                    <li>
                                        <Link
                                            to="/"
                                            className={`option ${activeLink === '/' ? 'active' : ''}`}
                                            onClick={() => handleLinkClick('/')}
                                        >
                                            Home
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/list_products"
                                            className={`option ${activeLink === '/list_products' ? 'active' : ''}`}
                                            onClick={() => handleLinkClick('/list_products')}
                                        >
                                            Properties
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/detail_product"
                                            className={`option ${activeLink === '/detail_product' ? 'active' : ''}`}
                                            onClick={() => handleLinkClick('/detail_product')}
                                        >
                                            Property Details
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/contact"
                                            className={`option ${activeLink === '/contact' ? 'active' : ''}`}
                                            onClick={() => handleLinkClick('/contact')}
                                        >
                                            Contact Us
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/"
                                            className={`option ${activeLink === '/schedule' ? 'active' : ''}`}
                                            onClick={() => handleLinkClick('/schedule')}
                                        >
                                            <i className="fa fa-calendar"></i> Schedule a visit
                                        </Link>
                                    </li>
                                </ul>
                                {/* <!-- ***** Menu End ***** --> */}
                            </nav>
                        </div>
                    </div>
                </div>
            </header>
            {/* <!-- ***** Header Area End ***** --> */}
            <Outlet />
            
            <footer>
                <p>Do not Copyright</p>
            </footer>

        </>
    );
};

export default Layout;
