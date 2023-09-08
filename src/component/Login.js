import React, { useContext, useState } from 'react'
import { Link, Navigate, useSearchParams } from 'react-router-dom';
import Apis, { authApis, endpoints } from '../configs/Apis';
import { Form } from 'react-bootstrap';
import cookie from "react-cookies";
import { MyUserContext } from "../App";

const Login = () => {

    const [user, dispatch] = useContext(MyUserContext);
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [q] = useSearchParams();

    const login = (e) => {
        e.preventDefault();

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
                    <div class="form-control">
                        <input value={password} onChange={e => setPassword(e.target.value)}
                            type="password" id="password" placeholder="Nhập mật khẩu" />
                    </div>

                    <input class="btn" type="submit" value="Đăng nhập" />
                    <div class="signup_link">Bạn chưa có tài khoản? <Link to="/register">Đăng ký</Link></div>
                </Form>
            </section>
        </div>
    )
}

export default Login
