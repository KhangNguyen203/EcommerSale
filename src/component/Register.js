import React, { useRef, useState } from 'react'
import { FloatingLabel, Form } from 'react-bootstrap';
import Apis, { endpoints } from '../configs/Apis';
import { useNavigate } from 'react-router-dom';
import MySpinner from '../layout/MySpinner';

const Register = () => {

  const [user, setUser] = useState({
    "username": "",
    "password": "",
    "firstName": "",
    "lastName": "",
    "email": "",
    "phone": "",
    "confirmPass": ""
  });
  const avatar = useRef();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const nav = useNavigate();

  const register = (e) => {
    e.preventDefault();

    const process = async () => {
      let formData = new FormData();
      for (let field in user)
        if (field !== "confirmPass")
          formData.append(field, user[field]);

      if (avatar.current.files.length > 0)
        formData.append("avatar", avatar.current.files[0]);

      setLoading(true);

      let res = await Apis.post(endpoints['register'], formData)

      if (res.status === 201) {
        nav("/login");
      } else {
        setErr("Hệ thống đang bị lỗi!");
      }
    }
    if (user.password === user.confirmPass)
      process();
    else {
      setErr("Mật khẩu KHÔNG khớp!");
    }
  }

  const change = (e, field) => {
    setUser(current => {
      return { ...current, [field]: e.target.value };
    });
  }

  return (
    <div>
      <section class="container__form">
        <h1>Đăng ký</h1>

        <Form onSubmit={register}>
          <FloatingLabel label="Tên">
            <Form.Control onChange={e => change(e, "lastName")}
              type="text" placeholder="Tên" />
          </FloatingLabel>

          <FloatingLabel label="Họ">
            <Form.Control onChange={e => change(e, "firstName")}
              type="text" placeholder="Họ" />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingInput"
            label="Email "
            className="mb-3"
          >
            <Form.Control onChange={e => change(e, "email")}
              type="email" placeholder="" />
          </FloatingLabel>

          <FloatingLabel label="Số điện thoại">
            <Form.Control onChange={e => change(e, "phone")}
              type="tel" placeholder="Số điện thoại" />
          </FloatingLabel>

          <FloatingLabel label="Tên đăng nhập">
            <Form.Control onChange={e => change(e, "username")}
              type="text" placeholder="Tên đăng nhập" />
          </FloatingLabel>

          <FloatingLabel label="Mật khẩu">
            <Form.Control onChange={e => change(e, "password")}
              type="password" placeholder="Password" />
          </FloatingLabel>

          <FloatingLabel label="Xác nhân mật khẩu">
            <Form.Control onChange={e => change(e, "confirmPass")}
              type="password" placeholder="Password2" />
          </FloatingLabel>
          {err === null ? "" : <span className="text-danger">{err}</span>}

          <FloatingLabel label="Ảnh đại diện">
            <Form.Control ref={avatar} type="file" placeholder="" />
          </FloatingLabel>

          {/* <div class="form-control">
            <input ref={avatar}
              type="file" placeholder="Ảnh đại diện" />
          </div> */}
          {loading === true ? <MySpinner /> : <input class="btn" type="submit" value="Đăng ký" />}

        </Form>
      </section>
    </div>
  )
}

export default Register
