import React, { useRef, useState } from 'react'
import { FloatingLabel, Form } from 'react-bootstrap';
import Apis, { endpoints } from '../configs/Apis';
import { useNavigate } from 'react-router-dom';
import MySpinner from '../layout/MySpinner';

const Register = () => {
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const avatar = useRef();
  const [err, setErr] = useState('');

  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPassError, setConfirmPassError] = useState('');
  const [avatarFile, setAvatarFile] = useState(null);

  const validateForm = () => {
    let isValid = true;
    const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;

    if (!user.firstName) {
      setFirstNameError('Vui lòng nhập tên.');
      isValid = false;
    }

    if (!user.lastName) {
      setLastNameError('Vui lòng nhập họ.');
      isValid = false;
    }

    if (!user.username) {
      setUsernameError('Vui lòng nhập tên đăng nhập.');
      isValid = false;
    }

    if (!user.phone) {
      setPhoneError('Vui lòng nhập số điện thoại.');
      isValid = false;
    }

    if (!user.email) {
      setEmailError('Vui lòng nhập email.');
      isValid = false;
    }

    // if (!user.password) {
    //   setPasswordError('Vui lòng nhập mât khẩu.');
    //   isValid = false;
    // } else if (!specialCharacterRegex.test(user.password)) {
    //   setPasswordError('Mật khẩu phải chứa ít nhất một ký tự đặc biệt.');
    //   isValid = false;
    // }

    if (!user.confirmPass) {
      setConfirmPassError('Vui lòng xác nhận mật khẩu.');
      isValid = false;
    }

    if (avatar.current && avatar.current.files.length === 0) {
      setAvatarFile('Vui lòng chọn ảnh đại diện.');
      isValid = false;
    }

    return isValid;
  };

  const [user, setUser] = useState({
    "username": "",
    "password": "",
    "firstName": "",
    "lastName": "",
    "email": "",
    "phone": "",
    "confirmPass": ""
  });

  const checkUsernameExists = async () => {
    try {
      const response = await Apis.get(endpoints['check-username-exists'] + `?username=${user.username}`);
      console.info(response);

      return response.data;
    } catch (ex) {
      console.error(ex);
      return false;
    }
  };

  const register = async (e) => {
    e.preventDefault();
    if (validateForm()) {

      const usernameExists = await checkUsernameExists();

      if (usernameExists) {
        setUsernameError('Tên đăng nhập đã tồn tại');
        return;
      } else {
        setUsernameError('');
      }

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
        setConfirmPassError("Mật khẩu KHÔNG khớp!");
      }
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
            <Form.Control
              onChange={(e) => change(e, 'lastName')}
              type="text"
              placeholder="Tên"
            />
          </FloatingLabel>
          {<p className="text-danger">{firstNameError}</p>}

          <FloatingLabel label="Họ">
            <Form.Control
              onChange={e => change(e, "firstName")}
              type="text"
              placeholder="Họ"
            />
          </FloatingLabel>
          {<p className="text-danger">{lastNameError}</p>}

          <FloatingLabel
            controlId="floatingInput"
            label="Email "
            className="mb-3"
          >
            <Form.Control
              onChange={e => change(e, "email")}
              type="email"
              placeholder=""
            />
          </FloatingLabel>
          {<p className="text-danger">{emailError}</p>}

          <FloatingLabel label="Số điện thoại">
            <Form.Control onChange={e => change(e, "phone")}
              type="tel" placeholder="Số điện thoại" />
          </FloatingLabel>
          {<p className="text-danger">{phoneError}</p>}

          <FloatingLabel label="Tên đăng nhập">
            <Form.Control onChange={e => change(e, "username")}
              type="text" placeholder="Tên đăng nhập" />
          </FloatingLabel>
          {<p className="text-danger">{usernameError}</p>}

          <FloatingLabel label="Mật khẩu">
            <Form.Control onChange={e => change(e, "password")}
              type="password" placeholder="Password" />
          </FloatingLabel>
          {<p className="text-danger">{passwordError}</p>}

          <FloatingLabel label="Xác nhân mật khẩu">
            <Form.Control onChange={e => change(e, "confirmPass")}
              type="password" placeholder="Password2" />
          </FloatingLabel>
          {<p className="text-danger">{confirmPassError}</p>}

          <FloatingLabel label="Ảnh đại diện">
            <Form.Control ref={avatar} type="file"
            />
          </FloatingLabel>
          {<p className="text-danger">{avatarFile}</p>}

          {loading === true ? <MySpinner /> : <input class="btn" type="submit" value="Đăng ký" />}
          {err === null ? "" : <span className="text-danger">{err}</span>}

        </Form>
      </section>
    </div>
  )
}

export default Register
