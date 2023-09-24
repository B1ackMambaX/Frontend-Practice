import { NavLink } from 'react-router-dom';

import './header.scss';

const Header = () => {
    return (
        <header className="header">
        <div className="container">
            <div className="header__wrapper">
                <h1 className="header__title">
                    <NavLink to={'/'}><span>Marvel</span> information portal</NavLink>
                </h1>

                <nav className="header__menu">
                    <ul>
                        <li><NavLink end to={'/'}>Characters </NavLink></li>
                             / 
                        <li><NavLink to={'/comics'}> Comics</NavLink></li>
                    </ul>
                </nav>
            </div>
        </div>
    </header>
    );
};

export default Header;