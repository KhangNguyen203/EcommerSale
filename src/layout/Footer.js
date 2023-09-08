import React from 'react';

function Footer() {
    return (
        <div className='footer'>
            <div className="grid__auto" style={{padding:'10px 0'}}>
                <div className="footer-flex">
                    <div className="footer__content">
                        <div className="footer__content-container">
                            <p>Giao hàng mọi nơi trong thời gian nhanh nhất,
                                nhận hàng nhanh chóng. Hình ảnh chụp thật 100%,
                                đảm bảo sản phẩm đúng như hình đăng tải.
                                Liên hệ tư vấn nhanh chóng khi khách hàng đặt sản phẩm.</p>
                        </div>
                    </div>

                    <div className="footer__contact">
                        <div className="footer__contact-container">
                            <h3>THÔNG TIN LIÊN HỆ</h3>
                            <p>126 Nguyễn Văn Công</p>
                            <p>Điện thoại: 0971099313</p>
                        </div>
                    </div>
                </div>
                <div className="copyright">Copyright &copy; Wolf</div>
            </div>
        </div>
    );
}

export default Footer;