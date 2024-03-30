import { Facebook, Youtube } from "react-bootstrap-icons";
import styles from "./footer.module.scss";
function Footer() {
  return (
    <footer className={`${styles.footer} b-0 w-full h-full `}>
      <div className={styles.top}>
        <div className={styles.wrap}>
          <ul>
            <li>Tích điểm Quà tặng VIP</li>
            <li>Lịch sử mua hàng</li>
            <li>Cộng tác bán hàng cùng docongnghe.com</li>
            <li>Tìm hiểu về mua trả góp</li>
            <li>Chính sách bảo hành</li>
            <li>Xem thêm</li>
          </ul>
          <ul>
            <li>Giới thiệu công ty </li>
            <li>Tuyển dụng</li>
            <li>Gửi góp ý, khiếu nại</li>
            <li>Tìm siêu thị (3.203 shop)</li>
            <li>Xem bản mobile</li>
          </ul>
          <ul>
            <li>Tổng đài hỗ trợ (Miễn phí gọi)</li>
            <li>Gọi mua: 1800.1234 (7:30 - 22:00)</li>
            <li>Kỹ thuật: 1800.1234 (7:30 - 22:00)</li>
            <li>Khiếu nại: 1800.1234 (8:00 - 21:30)</li>
            <li>Bảo hành: 1800.1234 (8:00 - 21:00)</li>
          </ul>
          <div className={styles.logo}>
            <i>
              <Facebook />
              &ensp;<span>846k Đăng ký</span>
            </i>
            &ensp;
            <i>
              <Youtube />
              &ensp;<span>846k Đăng ký</span>
            </i>
            {/* <img src="/images/ct.png" /> */}
            <p>Website cùng tập đoàn</p>
            {/* <img src="/images/vl.png" /> */}
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <p>
          © 2018. Công ty cổ phần Đồ công nghệ. GPDKKD: 12345678 do sở KH & ĐT
          TP.HCM cấp ngày 01/01/2001. GPMXH: 238/GP-BTTTT do Bộ Thông Tin và
          Truyền Thông cấp ngày 01/01/2001. Địa chỉ: 128 Nguyen Van A, P. Tân
          Định, Q.1, TP.Hồ Chí Minh. Điện thoại: 012 3456789. Email:
          cskh@docongnghe.com. Xem chính sách sử dụng
        </p>
      </div>
    </footer>
  );
}

export default Footer;
