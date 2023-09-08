import React, { useState } from 'react'
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export const SortProduct = () => {
    const nav = useNavigate();
    const [selectedOption, setSelectedOption] = useState('');
    const handleSelectChange = (e) => {
        e.preventDefault()
        setSelectedOption(e.target.value);
        // console.log(e.target.value);
        nav(`?sort=${e.target.value}`)
    };

    return (
        <div>
            <Form className="product-filter product-filter-sort">
                <Form.Select className="product-filter-select" value={selectedOption} onChange={handleSelectChange} >
                    <option value="" >Giá</option>
                    <option value="asc">Giá tăng dần</option>
                    <option value="desc">Giá giảm dần</option>
                </Form.Select>
            </Form>
        </div>
    )
}
