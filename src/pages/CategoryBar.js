// src/pages/CategoryBar.js
import React from 'react';
import '../styles/CategoryBar.css';

const CategoryBar = React.forwardRef((props, ref) => (
    <div className="category-bar-container" ref={ref}>
        <div className="promo-bar">
            <p></p>
        </div>
        <div className="category-bar">
            <div className="category-option">TRENDMART</div>
        </div>
    </div>
));

export default CategoryBar;
