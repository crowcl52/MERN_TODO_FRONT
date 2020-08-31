import React from 'react';
import { useLocation, Link } from 'react-router-dom'

const NotFound = () => {

    let location = useLocation();
    return (
        <div className="notfound" >
            <h1> Not Foud <code> {location.pathname} </code> </h1>
            <Link to='/' > Regresar </Link>
        </div>
    );
}

export default NotFound;