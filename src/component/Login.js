import React, { useContext, useState } from 'react'
import { Link, Navigate, useSearchParams } from 'react-router-dom';
import Apis, { authApis, endpoints } from '../configs/Apis';
import { Form } from 'react-bootstrap';
import cookie from "react-cookies";
import { MyUserContext } from "../App";

const Login = () => {

    const [user, dispatch] = useContext(MyUserContext);
    const [username, setUsername] = useState();
    const [usernameError, setUsernameError] = useState();
    const [password, setPassword] = useState();
    const [passwordError, setPasswordError] = useState();

    const [q] = useSearchParams();

    const validateForm = () => {
        let isValid = true;

        if (username.trim() === "") {
            setUsernameError("Vui lòng nhập tên đăng nhập");
            isValid = false;
        }

        if (password.trim() === "") {
            setPasswordError("Vui lòng nhập mật khẩu");
            isValid = false;
        }


        return isValid;
    };

    const checkUsernameExists = async () => {
        try {
            const response = await Apis.get(endpoints['check-username-exists'] + `?username=${username}`);
            console.info(response);

            return response.data;
        } catch (ex) {
            console.error(ex);
            return false;
        }
    };

    const login = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            const usernameExists = await checkUsernameExists();

            if (!usernameExists) {
                setUsernameError('Tên đăng nhập không tồn tại');
                return;
            }
            else {
                setUsernameError('');
            }

            const process = async () => {
                try {
                    let res = await Apis.post(endpoints['login'], {
                        "username": username,
                        "password": password
                    })
                    cookie.save("token", res.data)

                    let { data } = await authApis().get(endpoints['current-user']);
                    cookie.save("user", data)
                    dispatch({
                        "type": "login",
                        "payload": data
                    })
                } catch (ex) {
                    console.error(ex);
                }
            }
            process();
        }
    }


    if (user !== null) {
        let url = q.get("next") || "/";
        return <Navigate to={url} />
    }

    return (
        <div>
            <section class="container__form">
                <h1>Đăng nhập</h1>
                <Form onSubmit={login}>
                    <div class="form-control">
                        <input value={username} onChange={e => setUsername(e.target.value)}
                            type="text" id="email" placeholder="Nhập username" />
                    </div>
                    {<p className="text-danger">{usernameError}</p>}

                    <div class="form-control">
                        <input value={password} onChange={e => setPassword(e.target.value)}
                            type="password" id="password" placeholder="Nhập mật khẩu" />
                    </div>
                    {<p className="text-danger">{passwordError}</p>}

                    <input class="btn" type="submit" value="Đăng nhập" />
                    <div class="signup_link">Bạn chưa có tài khoản? <Link to="/register">Đăng ký</Link></div>

                </Form>
            </section>
        </div>
    )
}

export default Login