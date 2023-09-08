import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Apis, { authApis, endpoints } from "../configs/Apis";
import MySpinner from "../layout/MySpinner";
import { MyUserContext } from "../App";
import { Button, Col, Form, Image, ListGroup, Row } from "react-bootstrap";
import Moment from "react-moment";

const ProductDetails = ()=>{
    const {productId} = useParams();
    const [product, setProduct] = useState(null);
    const [comments, setComments] = useState(null);
    const [content, setContent] = useState();
    const [user, ] = useContext(MyUserContext);


    useEffect(() => {
        const loadProduct = async () => {
            let {data} = await Apis.get(endpoints['details'](productId));
            setProduct(data); 
        }

        const loadComments = async () => {
            let {data} = await Apis.get(endpoints['comments-pro'](productId));
            setComments(data);
        }

        loadProduct();
        loadComments();
    }, [productId]);

    const addComment = () => {
        const process = async () => {
            let {data} = await authApis().post(endpoints['add-comment-pro'], {
                "content": content, 
                "productId": product.id
            });

            setComments([...comments, data]);
        }

        process();
    }

    if (product === null || comments === null)
        return <MySpinner /> ;        

    let url = `/login?next=/products/${productId}`;

    return<>
        <h1 className="text-center text-info mt-2">CHI TIẾT SẢN PHẨM ({productId})</h1>
        <Row>
            <Col md={5} xs={6}>
                <Image src={product.image} rounded fluid />
            </Col>
            <Col md={5} xs={6}>
                <h2 className="text-danger">{product.name}</h2>
                <p>{product.description}</p>
                <h3>{product.price} VNĐ</h3>
            </Col>
        </Row>
        <hr />

        {user===null?<p>Vui lòng <Link to={url}>đăng nhập</Link> để bình luận! </p>:<>
        <Form.Control as="textarea" aria-label="With textarea" value={content} onChange={e => setContent(e.target.value)} placeholder="Nội dung bình luận" />
        <Button onClick={addComment} className="mt-2" variant="info">Bình luận</Button>
        </>}
        <hr />
        <ListGroup>
            {
                comments.map(c => <ListGroup.Item id={c.id}>{c.userId.username} - {c.content} - <Moment locale="vi" fromNow>{c.createdDate}</Moment></ListGroup.Item>)
            }
        </ListGroup>
    </>
}

export default ProductDetails;