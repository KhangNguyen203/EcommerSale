import {useEffect, useState } from "react";
import Apis, { endpoints } from '../configs/Apis';
import {Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";


const ProductsOfShop = (props) => {
    const [visibleProducts, setVisibleProducts] = useState(8);
    const [records, setRecords] = useState([]);


    let storeId = props.number;





    useEffect(() => {
        const loadProductsFromStore = async () => {
            try {
                let e = endpoints['store-products'](storeId);
                const res = await Apis.get(e);
                setRecords(res.data);

            } catch (ex) {
                console.error(ex);
            }
        };
        loadProductsFromStore();

    }, []);

    const handleLoadMore = () => {
        setVisibleProducts(prevVisibleProducts => prevVisibleProducts + 8);
    };


    return (
        <>
            <div>
                <h4>CÁC SẢN PHẨM KHÁC CỦA SHOP</h4>
                <Row>
                    {records.slice(0, visibleProducts).map(p => {
                        let url = `/products/${p[0]}`;

                        return <Col xs={12} md={3} className="mt-1" >
                            <Card className="w-100">
                                <Link to={url} variant="primary">

                                    <Card.Img variant="top" className="link_hover w-100" src={p[1]} />
                                    <Card.Body>
                                        <Card.Title>
                                            <div className="d-flex justify-content-center">{p[2]}</div>
                                        </Card.Title>
                                        <Card.Text>
                                            <div className="d-flex justify-content-center text-danger">{p[3]} VNĐ</div>
                                        </Card.Text>
                                    </Card.Body>
                                </Link>
                            </Card>
                        </Col>
                    })}
                </Row>
                <div className="flex-center">
                    {visibleProducts < records.length && (
                        <button className="btn-lazy-loading" onClick={handleLoadMore}>Xem thêm</button>
                    )}
                </div>
            </div>
        </>
    );
};

export default ProductsOfShop;

