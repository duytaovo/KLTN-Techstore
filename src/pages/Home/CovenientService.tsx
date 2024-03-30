import { Link } from "react-router-dom";
import { ChevronRight } from "react-bootstrap-icons";
import clsx from "clsx";
import { ReactNode } from "react";
import Section from "src/components/Section/Section";

interface Props {
  styles?: string;
  icon?: ReactNode;
  title: string;
  content: string;
}

const services: Props[] = [
  {
    title: "Mua Mã thẻ cào",
    content: "Giảm 3% cho mệnh giá từ 100.000 trở lên",
    styles: "bg-blue-100",
  },
  {
    title: "Dịch Vụ Đóng Tiền",
    content: "Điện, Nước, Internet, Cước điện thoại trả sau",
    styles: "bg-red-100",
  },
  {
    title: "Mua thẻ game",
    content:
      "Giảm 3% cho tất cả nhà mạng, áp dụng cho mệnh giá từ 100.000 trở lên",
    styles: "bg-yellow-100",
  },
  {
    title: "Vé máy bay, tàu",
    content: "Thu hộ tiền vé xe, vé tàu, vé máy bay",
    styles: "bg-green-100",
  },
];
const CovenientService = () => {
  const Card = ({ styles, icon, title, content }: Props) => {
    return (
      <Link to="/dichvu" className="w-fit">
        <div
          className={clsx(
            "flex w-[285px] h-64 border rounded-3xl p-4 cursor-pointer ",
            styles
          )}
        >
          <div className="w-[13%]">
            <i className="inline-block w-14 h-14 rounded-full border">{icon}</i>
          </div>
          <div className="w-2/3 text-gray-800">
            <p className="py-2">{title}</p>
            <p className="py-2">{content}</p>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <Section
      title="DỊCH VỤ TIỆN ÍCH"
      styles="bg-white"
      rightOption={
        <Link to="/dichvu">
          <span className="cursor-pointer">
            XEM THÊM DỊCH VỤ&nbsp;
            <i>
              <ChevronRight />
            </i>
          </span>
        </Link>
      }
    >
      <>
        {services.map((service: Props) => (
          <Card
            key={service.title}
            styles={service.styles}
            title={service.title}
            content={service.content}
          />
        ))}
      </>
    </Section>
  );
};

export default CovenientService;
