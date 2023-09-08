import React, { useState } from 'react'
import { Form } from 'react-bootstrap';
import { authApis, endpoints } from '../../configs/Apis';
import { useNavigate } from 'react-router-dom';

export const CreateStore = () => {

    const [name, setName] = useState("");
    const [nameError, setNameError] = useState("");
    const [description, setDescription] = useState("");
    const [descriptionError, setDescriptionError] = useState("");
    const [location, setLocation] = useState("");
    const [locationError, setLocationError] = useState("");
    const [loading, setLoading] = useState(false);
    const [noti, setNoti] = useState("");
    const nav = useNavigate("");

    const validateForm = () => {
        let isValid = true;

        if (name.trim() === "") {
            setNameError("Vui lòng nhập tên cửa hàng");
            isValid = false;
        }

        if (description.trim() === "") {
            setDescriptionError("Vui lòng nhập mô tả cửa hàng");
            isValid = false;
        }

        if (location.trim() === "") {
            setLocationError("Vui lòng nhập vị trí cửa hàng");
            isValid = false;
        }

        return isValid;
    };

    const save = (e) => {
        e.preventDefault();

        if (validateForm()) {
            const process = async () => {
                setLoading(true);
                let res = await authApis().post(endpoints['create-store'], {
                    name: name,
                    description: description,
                    location: location
                });

                setNoti("Bạn đăng ký thành công. Chờ nhân viên xác nhận");

                setTimeout(() => {
                    if (res.status === 201) {
                        nav("/");
                    }
                }, 3000); 
            };

            process();
        }
    };

    return (
        <div>
            <section class="container__form mt-5">
                <h1>Đăng ký cửa hàng</h1>

                <Form onSubmit={save}>
                    <div class="form-control">
                        <input
                            value={name}
                            onChange={e => setName(e.target.value)}
                            type="text"
                            id="email"
                            placeholder="Nhập tên cửa hàng"
                        />
                    </div>
                    {<p className="text-danger">{nameError}</p>}

                    <div class="form-control">
                        <input
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            type="text"
                            placeholder="Nhập mô tả cửa hàng"
                        />
                    </div>
                    {<p1 className="text-danger">{descriptionError}</p1>}

                    <div class="form-control">
                        <input
                            value={location}
                            onChange={e => setLocation(e.target.value)}
                            type="text"
                            placeholder="Nhập vị trí cửa hàng"
                        />
                    </div>
                    {<p className="text-danger">{locationError}</p>}

                    {loading === true ? <h4 className='text-success pb-4'>{noti}</h4> : <input class="btn" type="submit" value="Đăng ký" />}
                </Form>
            </section>
        </div>
    )
}
