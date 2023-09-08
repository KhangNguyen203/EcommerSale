import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Apis, { authApis, endpoints } from "../configs/Apis";
import MySpinner from "../layout/MySpinner";
import { MyCartContext, MyUserContext } from "../App";
import { Button, Col, Form, Image, ListGroup, Row } from "react-bootstrap";
import Moment from "react-moment";
import cookie from "react-cookies";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faShop } from "@fortawesome/free-solid-svg-icons";
import ProductsOfShop from "./ProductsOfShop";


const ProductDetails = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [comments, setComments] = useState(null);
    const [content, setContent] = useState();
    const [user,] = useContext(MyUserContext);
    const [cartCounter, cartDispatch] = useContext(MyCartContext);


    useEffect(() => {
        const loadProduct = async () => {
            let { data } = await Apis.get(endpoints['details'](productId));
            setProduct(data);
        }

        const loadComments = async () => {
            let { data } = await Apis.get(endpoints['comments-pro'](productId));
            setComments(data);
        }

        loadProduct();
        loadComments();
    }, []);

    const addComment = () => {
        const process = async () => {
            let { data } = await authApis().post(endpoints['add-comment-pro'], {
                "content": content,
                "productId": product.id
            });

            setComments([...comments, data]);
        }

        process();
    }
    const order = (p) => {
        cartDispatch({
            "type": "inc",
            "payload": 1
        });

        let cart = cookie.load("cart") || null;
        if (cart === null)
            cart = {};

        if (p.id in cart) {
            // đã có trong giỏ
            cart[p.id]["quantity"] += 1;
        } else {
            // chưa có trong giỏ
            cart[p.id] = {
                "id": p.id,
                "name": p.name,
                "unitPrice": p.price,
                "quantity": 1
            }
        }

        cookie.save("cart", cart);

        console.info(cart);
    }

    if (product === null || comments === null)
        return <MySpinner />;
    let url = `/login?next=/products/${productId}`;
    let h = `/store/${product.storeId.id}`;

    return <>
        <div style={{ backgroundColor: "#f0f0f2", marginTop: "-0.5rem" }}>
            <div className="container py-4">
                <div style={{ backgroundColor: "white", borderRadius: "5px", padding: "3px 0 10px 0" }}>
                    <h1 className="text-center text-info mt-2">CHI TIẾT SẢN PHẨM </h1>
                    <div style={{ marginLeft: "10rem" }}>
                        <Row>
                            <Col md={5} xs={6}>
                                <Image style={{ width: "25rem", height: "30rem" }} src={product.image} rounded fluid />
                            </Col>
                            <Col md={5} xs={6}>
                                <h2 className="text-danger">{product.name}</h2>
                                <p>{product.description}</p>
                                <h3>{product.price} VNĐ</h3>
                                <Button variant="success" onClick={() => order(product)}>Thêm vào giỏ</Button>
                            </Col>
                        </Row>
                    </div>
                </div>

                {/* shop's infomation and comment */}
                <div>
                    <div class="d-flex justify-content-start my-2" style={{ backgroundColor: "white", borderRadius: "5px", padding: "3px 0 10px 0" }}>
                        <div className="m-3">
                            <img src={product.storeId.userId.avatar}
                                width="50" height="50" className="rounded-circle" alt="logo" />
                        </div>

                        <div>
                            <h4>{product.storeId.userId.username}</h4>
                            <div class="d-flex justify-content-start">
                                <div className="me-2" style={{ borderStyle: "groove", borderRadius: "5px", padding: "5px" }}>
                                    <FontAwesomeIcon icon={faMessage} className="me-1" />
                                    <Link to={""} variant="primary">Chat ngay</Link>
                                </div>
                                <div style={{ borderStyle: "groove", borderRadius: "5px", padding: "5px" }}>
                                    <FontAwesomeIcon icon={faShop} className="me-1" />
                                    <Link to={h} variant="primary">Xem shop</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ backgroundColor: "white", borderRadius: "5px", padding: "3px 0 10px 0" }}>
                        <div className="ms-2">
                            <h4>Đánh giá sản phẩm</h4>
                            <div className="ms-3">
                                {user === null ? <p>Vui lòng <Link to={url}>đăng nhập</Link> để bình luận! </p> :
                                    <div className="w-50">
                                        <Form.Control as="textarea" aria-label="With textarea" value={content} onChange={e => setContent(e.target.value)} placeholder="Nội dung bình luận" />
                                        <Button onClick={addComment} className="mt-2" variant="info">Bình luận</Button>
                                    </div>}
                                <hr className="me-4" />

                                {comments.map(c => 
                                    <ListGroup.Item id={c.id}>
                                        <div style={{ position: "relative", display: "flex"}}>
                                            <div className="me-2">
                                                <img src={c.userId.avatar} width="30" height="30" alt="avatar" />
                                            </div>
                                            <div>{c.userId.username}</div>
                                            
                                            <div style={{position:"absolute", marginLeft: "70rem"}}>
                                                <Moment style={{ right: "1px" }} locale="vi" fromNow>{c.createdAt}</Moment>
                                            </div>
                                        </div>
                                        <div className="ms-5 mt-2">{c.content}</div>
                                        <hr className="me-4" />
                                    </ListGroup.Item>)
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="my-2" style={{ backgroundColor: "white", borderRadius: "5px", padding: "3px 0 10px 0" }}>
                    {/* các sản phẩm khác của shop */}
                    <ProductsOfShop number={product.storeId.id}/>
                </div>                
            </div>
        </div>
    </>
}

export default ProductDetails;