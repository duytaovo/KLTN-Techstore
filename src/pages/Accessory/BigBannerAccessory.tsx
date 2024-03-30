import BigBanner from "src/components/BigBanner/BigBanner";
import "./bigbanneraccessory.scss";

const BigBannerAccessory = () => {
  return (
    <div>
      <BigBanner />
      <div className="groupcate text-blue-500">
        <div className="groupcate__body">
          <div className="groupcate__item">
            <div className="item-title">
              <p>Phụ kiện</p>
              <p>Phone, Tablet</p>
            </div>
          </div>
          <div className="groupcate__item">
            <div className="item-title">
              <p>Phụ kiện</p>
              <p>Laptop, PC</p>
            </div>
          </div>
          <div className="groupcate__item">
            <div className="item-title">
              <p>Thiết bị</p>
              <p>Âm thanh</p>
            </div>
          </div>
          <div className="groupcate__item">
            <div className="item-title">
              <p>Phụ kiện</p>
              <p>Công Nghệ</p>
            </div>
          </div>
          <div className="groupcate__item">
            <div className="item-title">
              <p>Phụ kiện</p>
              <p>Gaming</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BigBannerAccessory;
