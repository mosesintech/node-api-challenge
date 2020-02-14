import React from 'react';
import {Link} from 'react-router-dom';

function Header() {
    return (
        <header>
            <h1><Link to="/">Node API Challenge</Link></h1>
            <nav>
                <a href="http://mosesin.tech">MosesIn.Tech</a>
            </nav>
        </header>
    )
}

export default Header;