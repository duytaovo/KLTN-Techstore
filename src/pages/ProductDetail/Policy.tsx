const Policy = () => {
  const policy = [
    "Hư gì đổi nấy 12 tháng tại 3221 siêu thị toàn quốc (miễn phí tháng đầu) Xem chi tiết",
    "Bảo hành chính hãng điện thoại 1 năm tại các trung tâm bảo hành hãng Xem địa chỉ bảo hành",
    "Bộ sản phẩm gồm: Hộp, Sách hướng dẫn, Cây lấy sim, Cáp Lightning - Type C Xem hình",
  ];
  return (
    <ul className="flex flex-wrap m-4">
      {policy.map((item, index) => {
        return (
          <li className="w-1/2 p-2 border-b" key={index}>
            {item}
          </li>
        );
      })}
    </ul>
  );
};

export default Policy;
