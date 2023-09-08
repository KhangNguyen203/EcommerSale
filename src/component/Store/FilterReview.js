import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom';

export const FilterReview = () => {
    const { storeId } = useParams();
    const nav = useNavigate();
    const [activeButton, setActiveButton] = useState(null);

    const clickFilterStar = (e, value) => {
        e.preventDefault()
        const star = value;
        if (star > 0)
            nav(`/store/${storeId}?star=${star}`)
        else
            nav(`/store/${storeId}`)
        setActiveButton(value);
    }

    return (
        <div>
            <div className="mt-4 mb-1">
                <Button onClick={(e) => clickFilterStar(e, "0")} type="submit" className={`mb-2 review-filter-btn ${activeButton === "0" ? "active" : ""}`}>Tất cả</Button>
                <Button onClick={(e) => clickFilterStar(e, "5")} type="submit" className={`mb-2 review-filter-btn ${activeButton === "5" ? "active" : ""}`}>5 sao</Button>
                <Button onClick={(e) => clickFilterStar(e, "4")} type="submit" className={`mb-2 review-filter-btn ${activeButton === "4" ? "active" : ""}`}>4 sao</Button>
                <Button onClick={(e) => clickFilterStar(e, "3")} type="submit" className={`mb-2 review-filter-btn ${activeButton === "3" ? "active" : ""}`}>3 sao</Button>
                <Button onClick={(e) => clickFilterStar(e, "2")} type="submit" className={`mb-2 review-filter-btn ${activeButton === "2" ? "active" : ""}`}>2 sao</Button>
                <Button onClick={(e) => clickFilterStar(e, "1")} type="submit" className={`mb-2 review-filter-btn ${activeButton === "1" ? "active" : ""}`}>1 sao</Button>
            </div>
        </div >
    )
}
