import React, { useContext, useState } from 'react'
import { Form } from 'react-bootstrap';
import Apis, { endpoints } from '../../configs/Apis';
import { MyUserContext } from "../../App";
import { useNavigate } from 'react-router-dom';

export const CreateStore = () => {

    const [user,] = useContext(MyUserContext);
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [loading, setLoading] = useState(false);
    const [noti, setNoti] = useState("");
    const nav = useNavigate("")


    const save = (e) => {
        e.preventDefault();
        const process = async () => {
            setLoading(true);
            let res = await Apis.post(endpoints['create-store'], {
                "name": name,
                "description": description,
                "userId": user.id
            })
            setNoti("Bạn đăng ký thành công. Chờ nhân viên xác nhận");

            setTimeout(() => {
                if (res.status === 201) {
                    nav("/")
                }
                }, 2000); // Hiển thị thông báo thành công trong 3 giây
        }
        process();

    }

    return (

        <div>
            <section class="container__form">
                <h1>Đăng ký cửa hàng</h1>
                <Form onSubmit={save}>
                    <div class="form-control">
                        <input value={name} onChange={e => setName(e.target.value)}
                            type="text" id="email" placeholder="Nhập tên cửa hàng" />
                    </div>
                    <div class="form-control">
                        <input value={description} onChange={e => setDescription(e.target.value)}
                            type="text" id="password" placeholder="Nhập mô tả cửa hàng" />
                    </div>

                    {loading === true ? <div className='text-success pb-4'>{noti}</div> : <input class="btn" type="submit" value="Đăng ký" />}
                </Form>
            </section>
        </div>
    )
}
