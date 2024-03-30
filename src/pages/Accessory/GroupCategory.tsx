import "./groupcategory.module.scss";
const data = [
  {
    title: "Sạc dự phòng",
    link: "https://cdn.tgdd.vn/Category/57/5-Pinsa%CC%A3cdu%CC%9B%CC%A3pho%CC%80ng-120x120.png",
  },
  {
    title: "Sạc, cáp",
    link: "https://cdn.tgdd.vn/Category/9518/10-Ca%CC%81psa%CC%A3cchuye%CC%82%CC%89ndo%CC%82%CC%89i-120x120.png",
  },
  {
    title: "Tai nghe",
    link: "https://cdn.tgdd.vn/Category/54/21-Tainghe-120x120.png",
  },
  {
    title: "Loa",
    link: "https://cdn.tgdd.vn/Category/2162/22-Loa2-120x120.png",
  },
  {
    title: "Thiết bị nhà thông minh",
    link: "https://cdn.tgdd.vn/Category/9458/thongminh-120x120.png",
  },
  {
    title: "Camera, webcam",
    link: "https://cdn.tgdd.vn/Category/4728/17-Camerawebcam-120x120.png",
  },
  {
    title: "Thiết bị mạng",
    link: "https://cdn.tgdd.vn/Category/4727/16-Thie%CC%82%CC%81tbi%CC%A3ma%CC%A3ng-120x120.png",
  },
  {
    title: "Ốp lưng, miếng dán",
    link: "https://cdn.tgdd.vn/Category/9262/icon-mieng-dan-op-lung-100x100-1.png",
  },
  {
    title: "Chuột máy tính",
    link: "https://cdn.tgdd.vn/Category/86/13-Chuo%CC%A3%CC%82tma%CC%81yti%CC%81nh-120x120.png",
  },
  {
    title: "Bàn phím",
    link: "https://cdn.tgdd.vn/Category/4547/19-Ba%CC%80nphi%CC%81m-120x120.png",
  },
];
const GroupCategory = () => {
  return (
    <div className="category">
      <h3 className="category__title">Phụ Kiện Nổi Bật</h3>
      <div className="category__list">
        {data.map((item) => (
          <div className="category__item">
            <a href="">
              <img src={item.link} alt="" />
              <h3>{item.title}</h3>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupCategory;
