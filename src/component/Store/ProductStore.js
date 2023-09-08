import React, { useEffect, useState } from 'react'
import Apis, { endpoints } from '../../configs/Apis';
import { Card, Col, Row } from 'react-bootstrap';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import MySpinner from '../../layout/MySpinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

export default function ProductStore() {
    const { storeId } = useParams();

    const [products, setProducts] = useState(null);
    const [q] = useSearchParams();
    // const nav = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 8;
    const lastIndex = recordsPerPage * currentPage;
    const firstIndex = lastIndex - recordsPerPage;
    const [numbers, setNumbers] = useState([]);
    const [records, setRecords] = useState([]);

    const [all,] = useState("");

    useEffect(() => {
        const loadProductsFromStore = async () => {

            let e = endpoints['store-products'](storeId);

            let kw = q.get("kw")
            let cateId = q.get("cateId")
            let fromPrice = q.get("fromPrice")
            let toPrice = q.get("toPrice")
            let sort = q.get("sort");

            if (sort === "desc")
                e = endpoints['store-product-desc'](storeId);

            else if (sort === "asc") {
                e = endpoints['store-product-asc'](storeId);
            }
            else if (kw !== null) {
                e = `${e}?kw=${kw}`
            } else if (fromPrice !== null && toPrice !== null) {
                e = `${e}?toPrice=${toPrice}&fromPrice=${fromPrice}`
            } else if (cateId !== null) {
                e = `${e}?cateId=${cateId}`
            } else if (fromPrice !== null) {
                e = `${e}?fromPrice=${fromPrice}`
            } else if (toPrice !== null) {
                e = `${e}?toPrice=${toPrice}`
            } else if (all === true) {
                e = `${e}`;
            }

            let res = await Apis.get(e);

            const slicedRecords = res.data.slice(firstIndex, lastIndex);
            const nPage = Math.ceil(res.data.length / recordsPerPage);
            const updatedNumbers = Array.from({ length: nPage }, (_, index) => index + 1);
            setProducts(slicedRecords);
            setRecords(slicedRecords);
            setNumbers(updatedNumbers);
        }

        loadProductsFromStore();

    }, [q, storeId, lastIndex, firstIndex, all])

    if (products === null) {
        return <MySpinner />
    }

    const changePage = (id, e) => {
        e.preventDefault();
        setCurrentPage(id);
    }

    function nextPage(e) {
        e.preventDefault();
        setCurrentPage(currentPage + 1)
    }

    function prePage(e) {
        e.preventDefault();
        if (currentPage !== 1)
            setCurrentPage(currentPage - 1)
    }

    return (
        <>
            {records.length === 0 && <h1 className="text-center text">Không có sản phẩm cần tìm</h1>}

            <Row>
                {records.map(p => {
                    let h = `/products/${p[0]}`;
                    return (
                        <>
                            <Col xs={12} md={3} className="mt-2 mb-3">
                                <Card style={{ width: '22rem' }} className="card-hover">
                                    <Link to={h} >
                                        <Card.Img variant="top" src={p[1]} fluid rounded />
                                        <Card.Body>
                                            <h1 className="product-item-name">{p[2]}</h1>
                                            <p className="product-item-price">{p[3]} VNĐ</p>
                                        </Card.Body>
                                    </Link>
                                </Card>
                            </Col >
                        </>
                    )
                })}
            </Row >



            <div className="pagination mt-4" >
                <button className="page-item">
                    <a onClick={prePage} className="page-link" href="/">
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </a>
                </button>
                {numbers.map((n, i) => (
                    <button key={i} className="page-item" >
                        <a onClick={(e) => changePage(n, e)} className={`page-link ${currentPage === n ? 'active-btn' : ''}`} href="/">{n}
                        </a>
                    </button>
                ))}
                <button className="page-item">
                    <a onClick={nextPage} className="page-link" href="/">
                        <FontAwesomeIcon icon={faChevronRight} />
                    </a>
                </button>
            </div>
        </>
    )
}
