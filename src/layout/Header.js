import { faMagnifyingGlass, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MyCartContext, MyUserContext } from "../App";
import { Badge, Form } from "react-bootstrap";

function Header() {
  const [user, dispatch] = useContext(MyUserContext);
  const [kw, setKw] = useState("")
  const nav = useNavigate();
  const [cartCounter, ] = useContext(MyCartContext);

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
      <div id="header">
        <div class="header grid__auto">
          <div class="header__navbar-flex-user grid__auto ">
            <ul class="header__navbar-items ">
              <li class="header__navbar-item ">
                <Link to="/" >Trang chủ </Link>
              </li>

              {user === null ?
                <>
                  <li class="header__navbar-item">
                    <Link to="/login">Đăng nhập</Link>
                  </li>
                  <li class="header__navbar-item">
                    <Link to="/register">Đăng ký </Link>
                  </li>
                </> :
                user.userRole === 'ROLE_STORE' ?
                  <>
                    <li class="header__navbar-item">
                      <Link to="http://localhost:8090/SanThuongMaiDT/" >Cửa hàng của bạn</Link>
                    </li>
                    <li class="header__navbar-item">
                      <img src={user.avatar} width="30" height="30" class="rounded-circle" alt="logo" />
                      <span class="d-none d-sm-inline mx-1">{user.username}  </span>
                    </li>
                    <li class="header__navbar-item">
                      <Link to="/" onClick={logout}>Đăng xuất</Link>
                    </li>

                  </> : user.userRole === 'ROLE_USER' || user.userRole === 'ROLE_ADMIN'?
                    <>
                      <li class="header__navbar-item">
                        <Link to="/create-store">Tạo cửa hàng</Link>
                      </li>
                      <li class="header__navbar-item">
                        <img src={user.avatar} width="30" height="30" class="rounded-circle" alt="logo" />
                        <span class="d-none d-sm-inline mx-1">{user.username} </span>
                      </li>
                      <li class="header__navbar-item">
                        <Link to="/" onClick={logout}>Đăng xuất</Link>
                      </li></> : null
              }
            </ul>
          </div>

          <div class="header-flex-with-search">
            <div class="header__logo">
              <Link to="/">Trang chủ</Link>
            </div>

            <div class="header__search">
              <Form style={{ height: "100%" }} onSubmit={search}>
                <input value={kw}
                  onChange={e => setKw(e.target.value)}
                  class="header__search-input" type="text" placeholder="Tìm kiếm..." />
                <button class="header__search-btn">
                  <FontAwesomeIcon icon={faMagnifyingGlass} style={{ fontSize: '15px' }} />
                </button>
              </Form>
            </div>

            <Link to="/cart" className="nav-link"><FontAwesomeIcon icon={faShoppingCart} /><Badge bg="danger">{cartCounter}</Badge></Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;