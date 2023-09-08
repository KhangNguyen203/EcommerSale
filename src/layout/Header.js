import { faSearch} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MyCartContext, MyUserContext } from "../App";
import { Badge, Col, Container, Form, Row } from "react-bootstrap";
import Apis, { endpoints } from "../configs/Apis";
import '../base.css';


function Header() {
  const [user, dispatch] = useContext(MyUserContext);
  const [cartCounter,] = useContext(MyCartContext);
  const [kw, setKw] = useState("")
  const nav = useNavigate();
  const [category, setCategory] = useState(null);

  useEffect(() => {
    const loadCategory = async () => {
      try {
        let e = endpoints['categories'];
        const res = await Apis.get(e);
        setCategory(res.data);
      } catch (ex) {
        console.error(ex);
      }
    }
    loadCategory();
  }, []);


  const logout = () => {
    dispatch({
      "type": "logout",
    })
  }

  const search = (e) => {
    e.preventDefault()
    nav(`/?kw=${kw}`)
  }
  return (
    <>
      <div>
        {/* <div className="d-fixed w-100" style={{ backgroundColor: "#00FFFF", zIndex:"1"}}> */}
        <div className="w-100" style={{ backgroundColor: "#00FFFF", height: "175px", top: "0",position: "sticky", zIndex: "10"}}>
          <div style={{paddingRight:"25px"}}>
            <ul className="d-flex justify-content-end pt-2">
              {user === null ?
                <>
                  <li className="list-unstyled me-3">
                    <Link to="/login" className="text-decoration-none">Đăng nhập</Link>
                  </li>
                  <li className="list-unstyled">
                    <Link to="/register" className="text-decoration-none">Đăng ký </Link>
                  </li>
                </> :
                user.userRole === 'ROLE_STORE' ?
                  <>
                    <li class="header__navbar-item">
                      <Link to="http://localhost:8080/SanThuongMaiDT/" className="text-decoration-none">Cửa hàng của bạn</Link>
                    </li>
                    <li class="header__navbar-item">
                      <img src={user.avatar} width="30" height="30" class="rounded-circle" alt="logo" />
                      <span class="d-none d-sm-inline mx-1">{user.username}  </span>
                    </li>
                    <li class="header__navbar-item">
                      <Link to="/" className="text-decoration-none" onClick={logout}>Đăng xuất</Link>
                    </li>

                  </> : user.userRole === 'ROLE_USER' || user.userRole === 'ROLE_ADMIN' ?
                    <>
                      <li class="header__navbar-item">
                        <Link to="/create-store" className="text-decoration-none">Tạo cửa hàng</Link>
                      </li>
                      <li class="header__navbar-item">
                        <img src={user.avatar} width="30" height="30" class="rounded-circle" alt="logo" />
                        <span class="d-none d-sm-inline mx-1">{user.username} </span>
                      </li>
                      <li class="header__navbar-item">
                        <Link to="/" onClick={logout} className="text-decoration-none">Đăng xuất</Link>
                      </li>
                    </>
                    : null
              }
            </ul>
          </div>

          <div style={{ marginTop: "-3rem" }}>
            <div className="d-flex justify-content-center">
              <Form style={{ width: "35rem" }} onSubmit={search} className="d-flex">
                <div className="input-group">
                  <input
                    value={kw}
                    onChange={e => setKw(e.target.value)}
                    type="text"
                    className="form-control"
                    placeholder="Tìm kiếm..."
                    aria-label="Tìm kiếm..."
                    aria-describedby="search-icon"
                    style={{backgroundColor:"#f0f0f2"}}
                  />
                  <button className="btn btn-primary" style={{ marginTop: "39px", height: "39px" }} type="submit" id="search-icon">
                    <FontAwesomeIcon icon={faSearch} style={{ fontSize: '15px' }} />
                  </button>
                </div>
              </Form>
            </div>
          </div>

          <div style={{ height: "50px", marginTop: "-2.5rem"}}>
            <Container>
              <hr />
              <Row>
                <Col>
                  <div className="d-flex">
                    <div >
                      <Link to="/#" className="text-decoration-none danhMuc" style={{ margin: "0 7rem 0 3rem" }}>Home</Link>
                    </div>
                    <div>
                      <Link to="/cart" className="text-decoration-none danhMuc" style={{ marginRight: "5rem" }}>Cart<Badge bg="danger">{cartCounter}</Badge></Link>
                    </div>
                    <div>
                      <Link to="/category" className="text-decoration-none danhMuc" style={{ marginRight: "5rem" }}>Category</Link>
                      {/* <h1 class="parent">hover me</h1> */}
                    </div>
                    <div>
                      <Link to="/shop" className="text-decoration-none danhMuc" style={{ marginRight: "5rem" }}>Shop</Link>
                    </div>
                    <div>
                      <Link to="/#" className="text-decoration-none danhMuc" style={{ marginRight: "5rem" }}>My Account</Link>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;