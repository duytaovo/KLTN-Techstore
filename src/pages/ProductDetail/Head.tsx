import { Link } from "react-router-dom";
import {
  ChevronRight,
  StarFill,
  Plus,
  HandThumbsUpFill,
} from "react-bootstrap-icons";
const Head = (dataDetail: any) => {
  const { name, slug, star, totalReview } = dataDetail;

  const data = {
    like: "910",
    breadcrumb: [
      { name: slug, path: `/${slug}` },
      { name: name, path: `/${slug}/${slug}` },
    ],
  };

  const sum = function (items = [], prop: any) {
    return items.reduce(function (a, b) {
      const star = b[prop] ? b[prop] : 0;
      return a + star;
    }, 0);
  };

  let avgStar = sum(star, "star") / star?.length;
  avgStar = Number.isNaN(avgStar) ? 0 : avgStar;

  const numberStar = Math.floor(avgStar) || 0;
  const Star = () => {
    return [...Array(numberStar)].map((e, i) => (
      <i key={i}>
        <StarFill />
      </i>
    ));
  };
  return (
    <div className="p-4">
      <ul className="breadcrumb flex text-blue-600 text-2xl list-none">
        {data.breadcrumb.map((item, index) => {
          return (
            <li key={index}>
              <Link to={item.path || "/"}>{item.name}</Link>
              <i>
                <ChevronRight />
              </i>
            </li>
          );
        })}
      </ul>
      <div className="flex items-center">
        <h1 className="text-4xl font-bold">{name}</h1>
        &emsp;
        <span className="text-yellow-300">
          <Star />
        </span>
        &nbsp;
        <span className="text-blue-400">{totalReview?.length} đánh giá</span>
        &emsp;
        <span className="text-blue-400">
          <i>
            <Plus />
          </i>
          So sánh
        </span>
        <div className="ml-auto text-xl">
          <button className="bg-blue-500 text-white p-4 rounded">
            <i>
              <HandThumbsUpFill />
            </i>
            &nbsp; Thích&nbsp;<span>{data.like}</span>
          </button>
          &emsp;
          <button className="bg-blue-500 text-white p-4 rounded">
            Chia sẻ
          </button>
        </div>
      </div>
    </div>
  );
};

export default Head;

