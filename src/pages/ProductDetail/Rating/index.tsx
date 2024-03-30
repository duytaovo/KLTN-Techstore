import React, { useEffect, useState } from "react";
import { Avatar, Button, List, Rate, Skeleton } from "antd";
import { useAppSelector } from "src/hooks/useRedux";

import Commentmini from "../Comment/commentmini";
interface DataType {
  comment: string;
  feedbackFilesUrl?: string[];
  id?: number;
  star?: number;
  userAvatar?: string;
  userId?: number;
  username?: string;
  loading?: boolean;
}

const count = 3;
const RatingFeedback: React.FC = () => {
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DataType[]>([]);
  const [list, setList] = useState<DataType[]>([]);
  const { commentByProduct } = useAppSelector((state) => state.comments);

  useEffect(() => {
    setList(commentByProduct?.data);
    setData(commentByProduct?.data);
    setInitLoading(false);
  }, [commentByProduct]);

  const onLoadMore = () => {
    setLoading(true);
    setList(
      data.concat(
        [...new Array(count)].map(() => ({
          loading: true,
          comment: "",
        }))
      )
    );

    setList(commentByProduct?.data);
    setData(commentByProduct?.data);
    setLoading(false);
    window.dispatchEvent(new Event("resize"));
  };

  const totalStars = commentByProduct.data.reduce(
    (acc, feedback) => acc + feedback.star,
    0
  );

  // Tính trung bình số star
  const averageStars =
    commentByProduct.data.length > 0
      ? totalStars / commentByProduct.data.length
      : 0;

  const [visibleItems, setVisibleItems] = useState(3);

  const handleLoadMore = () => {
    // Hiển thị thêm 5 feedback khi bấm nút "Xem thêm"
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 1);
  };
  const loadMore = visibleItems < list.length && (
    <div
      style={{
        textAlign: "center",
        marginTop: 12,
        height: 32,
        lineHeight: "32px",
      }}
    >
      <Button onClick={handleLoadMore}>Xem thêm</Button>
    </div>
  );

  return (
    <div>
      <List
        header={
          <div className="m-8 mb-0 space-x-3 font-bold text-4xl">
            <span className="text-yellow-500">{averageStars}</span>
            <Rate value={averageStars} allowHalf disabled />
            <span className="font-normal text-mainColor text-2xl">
              {commentByProduct.data.length} đánh giá
            </span>
          </div>
        }
        className="demo-loadmore-list bg-white rounded-md border border-gray-400 w-full"
        loading={initLoading}
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={list.slice(0, visibleItems)}
        renderItem={(item) => (
          <List.Item actions={[]} key={item.id}>
            <Skeleton avatar title={false} loading={item?.loading} active>
              <Commentmini comment={item} />
            </Skeleton>
          </List.Item>
        )}
      />
    </div>
  );
};

export default RatingFeedback;
