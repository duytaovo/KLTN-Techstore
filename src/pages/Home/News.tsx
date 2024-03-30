import { Link } from "react-router-dom";
import { ChevronRight } from "react-bootstrap-icons";
import Section from "./Section";
interface News {
  thumb: string;
  title: string;
}
const news: News[] = [
  {
    thumb: "https://cdn.tgdd.vn/2022/05/banner/samsung-390-210-390x210.png",
    title:
      "Đừng bỏ qua loạt iPhone giảm giá mạnh đáng sắm nhất chương trình sale tại TGDĐ, bây giờ không mua thì khi nào mới mua?",
  },
  {
    thumb: "https://cdn.tgdd.vn/2022/05/banner/samsung-390-210-390x210.png",
    title:
      "Đừng bỏ qua loạt iPhone giảm giá mạnh đáng sắm nhất chương trình sale tại TGDĐ, bây giờ không mua thì khi nào mới mua?",
  },
  {
    thumb: "https://cdn.tgdd.vn/2022/05/banner/samsung-390-210-390x210.png",
    title:
      "Đừng bỏ qua loạt iPhone giảm giá mạnh đáng sắm nhất chương trình sale tại TGDĐ, bây giờ không mua thì khi nào mới mua?",
  },
];

const News = () => {
  return (
    <div className="flex gap-4 h-[350px] items-center">
      <Section
        title="24H CÔNG NGHỆ"
        styles="bg-white m-0 h-full"
        rightOption={
          <Link to="/news">
            <span className="cursor-pointer">
              XEM TẤT CẢ&nbsp;
              <i>
                <ChevronRight />
              </i>
            </span>
          </Link>
        }
      >
        <>
          {news.map((item: News, index: number) => {
            return (
              <Link key={index} to="/news" className="w-30">
                <div className="w-full h-full">
                  <img
                    src={item.thumb}
                    className="w-full object-cover rounded-2xl"
                  />
                  <p className="line-clamp-2 text-2xl w-full my-4">
                    {item.title}
                  </p>
                </div>
              </Link>
            );
          })}
        </>
      </Section>
      <img
        className="h-full object-cover"
        src="https://cdn.tgdd.vn/2022/03/banner/DesktopTGDD-285x350.png"
      />
    </div>
  );
};

export default News;
