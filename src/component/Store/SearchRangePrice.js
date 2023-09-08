import React, { useState } from 'react'
import { Button, FloatingLabel, Form } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom';

export const SearchRangePrice = () => {
    const { storeId } = useParams();
    const [fromPrice, setFromPrice] = useState("");
    const [toPrice, setToPrice] = useState("");
    const nav = useNavigate();

    const searchPrice = (e) => {
        e.preventDefault()
        nav(`/store/${storeId}?fromPrice=${fromPrice}&toPrice=${toPrice}`)
    }
    return (
        <div>
            <div>
                <Form onSubmit={searchPrice} className="product-filter">
                    <FloatingLabel label="Giá từ">
                        <Form.Control value={fromPrice}
                            onChange={e => setFromPrice(e.target.value)}
                            className="product-input"
                            type="text" placeholder="Giá từ" />
                    </FloatingLabel>
                    <FloatingLabel className="product-filter-margin" label="Đến giá">
                        <Form.Control value={toPrice}
                            onChange={e => setToPrice(e.target.value)}
                            className="product-input product-filter-margin"
                            type="text" placeholder="Đến giá" />
                    </FloatingLabel>
                    <Button type="submit" className="product-btn">Tìm</Button>
                </Form>
            </div>
        </div>
    )
}
