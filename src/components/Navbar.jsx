import React from 'react';
import { Link } from "react-router-dom";
import "./Navbar.css";


export const Navbar = () => {
    return (
        
        <nav>
            <Link to= "/" className= "title">
            Website
            </Link>
            <ul>
                <li>
                    <Link to= "/about">About</Link>
                </li>
                <li>
                    <Link to= "/contact">Contacts</Link>
                </li>
            </ul>
        </nav>

    );
    
};