import React from 'react'
import './menu.scss';
import menu from "./menu256.png";
function Menu(props:any) {
    return (
        <nav className={props.visibledevice}>
            <span className="hamburger">
                <img src={menu} alt="" />
            </span>
            <span className="logo">
                Logo
            </span>
        </nav>
    )
}

export default Menu
