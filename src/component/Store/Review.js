import React, { useContext, useEffect, useState } from 'react';
import Apis, { endpoints } from '../../configs/Apis';
import { Link, useParams } from 'react-router-dom';
import MySpinner from '../../layout/MySpinner';
import Moment from 'react-moment';
import { Button, Form, Modal } from 'react-bootstrap';
import { MyUserContext } from '../../App';

export const Review = () => {
    const { storeId } = useParams();
    const [user,] = useContext(MyUserContext);

    const [rating, setRating] = useState(5);
    const [reviews, setReview] = useState([]);
    const [note, setNote] = useState("");
    const [visibleProducts, setVisibleProducts] = useState(5);

    useEffect(() => {
        const loadReview = async () => {
            try {
                const res = await Apis.get(endpoints['reviews'](storeId));
                setReview(res.data);
            } catch (ex) {
                console.error(ex);
            }
        };

        loadReview();
    }, [storeId]);

    const submitReview = (e) => {
        const process = async () => {
            const { data } = await Apis.post(endpoints['add-review'], {
                "note": note,
                "star": rating,
                "userId": user.id,
                "storeId": storeId
            })
            setNote("");
            setRating(0);
            setReview([data, ...reviews])
        }
        process()
    }

    const handleRatingClick = (value) => {
        setRating(value);
        console.log(value);
    };

    if (reviews === null)
        return <MySpinner />;

    const handleLoadMore = () => {
        // Tăng số lượng sản phẩm hiển thị lên 10
        setVisibleProducts(prevVisibleProducts => prevVisibleProducts + 8);
    };

    let url = `/login?next=/store/${storeId}`;

    return (
        <>
            <div>
                {user === null ?
                    <h2 className="m-5">
                        Vui lòng <Link className="text-warning" to={url}>đăng nhập</Link> để bình luận!
                    </h2> :
                    <>
                        <h2 className="mt-4">Bình luận</h2>
                        <Form.Control
                            placeholder="Nhập nội dung đánh giá cửa hàng ở đây..."
                            as="textarea"
                            name="reviewContent"
                            aria-label="With textarea"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                        />
                        {[1, 2, 3, 4, 5].map((value) => (
                            <span
                                className="display-3"
                                key={value}
                                value={value}
                                onClick={() => handleRatingClick(value)}
                                style={{
                                    cursor: 'pointer',
                                    color: value <= rating ? 'gold' : 'black',
                                }}
                            >
                                ★
                            </span>
                        ))}
                        <div>
                            <Button variant="info" onClick={submitReview} className="mt-2 mb-2 w-25">Gửi</Button>
                        </div>
                    </>
                }
            </div>

            <div>
                {reviews.slice(0, visibleProducts).map(r => (
                    <div key={r.id} className="modal show"
                        style={{ display: 'block', position: 'initial' }}>
                        <Modal.Dialog>
                            <Modal.Header>
                                <Modal.Title>
                                    <img src={r.userId.avatar}
                                        width="30" height="30" className="rounded-circle" alt="logo" />
                                    <div class="display-6 ms-4">{r.userId.username}</div>
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div class="display-5">{r.note}</div>
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <span class="display-2"
                                        key={index}
                                        style={{ color: index < r.star ? 'gold' : 'black' }}
                                    >
                                        ★
                                    </span>
                                ))}
                                <div><Moment locale="vi" fromNow>{r.createdAt}</Moment></div>
                            </Modal.Body>
                        </Modal.Dialog>
                    </div>
                ))}
            </div>

            <div className="flex-center">
                {visibleProducts < reviews.length && (
                    <button className="btn-lazy-loading" onClick={handleLoadMore}>Xem thêm</button>
                )}
            </div>
        </>
    );
};