import React from "react";
import { Link } from 'react-router-dom';

const ComicsLandPage = () => {
    return (
        <div>
            <title>Comics</title>
            <h1>
                Comics Landing Page
            </h1>
            <h1>
                <Link to="/comics/our-stack">Our Stack</Link>
            </h1>
        </div>
    );
}

export default ComicsLandPage;