import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Nav = () => {
    let { user, logoutUser } = useContext(AuthContext);

    return (
        <nav className="navbar navbar-expand-lg navbar-info bg-info">
            <div className="container">
                <Link className="navbar-brand text-white" to="/">{user ? user.username : 'LightYear'}</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                {user ? (
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link className="nav-link text-white" to="/">Dashboard <span
                                    className="sr-only">(current)</span></Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link onClick={logoutUser} className="nav-link text-white" to="#">Logout</Link>
                            </li>
                        </ul>

                    </div>
                ) : (
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/login">Login</Link>
                            </li>
                        </ul>

                    </div>
                )}
            </div>
        </nav>
    );
}

export default Nav;