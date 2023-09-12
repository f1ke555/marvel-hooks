import './appHeader.scss';
import {NavLink} from "react-router-dom";

const AppHeader = () => {
    return (
        <header className="app__header">
            <h1 className="app__title">
                <a href="#">
                    <span>Marvel</span> information portal
                </a>
            </h1>
            <nav className="app__menu">
                <ul>
                    <NavLink
                        to='/'
                        style={({ isActive }) => ({ color: isActive ? 'red' : 'black' })}
                    >
                        Characters
                    </NavLink>
                    /
                    <NavLink
                        to='/comics'
                        style={({ isActive }) => ({ color: isActive ? 'red' : 'black' })}
                    >
                        Comics
                    </NavLink>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;