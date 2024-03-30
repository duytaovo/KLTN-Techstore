import { CameraFill, PersonFill, CaretUpFill } from "react-bootstrap-icons";
import moment from "moment";
import { Rate } from "antd";
const Commentmini = ({ comment, replies, handleReply }: any) => {
  return (
    <div className="mx-8">
      {
        <div className="user my-8">
          <div>
            <i>
              <PersonFill className="text-4xl" />
            </i>
            &nbsp;
            <strong>{`${comment?.username}`}</strong>
            {comment?.username === "ADMIN" && (
              <b className="ml-4 bg-yellow-400 rounded px-2">Quản trị viên</b>
            )}
          </div>
          <p>{comment.comment}</p>
          <div>
            <Rate value={comment?.star} disabled allowHalf />
          </div>
          <span className="text-gray-400">
            {moment(comment?.createdTime?.substring(0, 10)).format(
              "HH:MM-MM/DD/YYYY",
            )}
          </span>
          {/* {comment?.feedbackFilesUrl?.map((item: string) => {
            <img src={item} alt="" />;
          })} */}
          {/* <span
            className="text-blue-400 cursor-pointer"
            onClick={() => {
              if (comment?.replyforId === null) {
                handleReply(comment?.id);
              } else {
                handleReply(comment?.creator?.replyforId);
              }
            }}
          >
            Trả lời
          </span> */}
        </div>
      }
      {true && (
        <div className="admin bg-gray-100 p-4 my-4 border border-gray-200 relative">
          <i className="absolute top-0 -translate-y-3/4 text-gray-100">
            <CaretUpFill className="text-5xl" />
          </i>
          <div>
            <i>
              <PersonFill className="text-4xl" />
            </i>
            &nbsp;
            <strong>{"ADMIN"}</strong>&emsp;
            <b className="bg-yellow-400 rounded px-2">Quản trị viên</b>
          </div>
          <p>
            Cảm ơn anh/chị đã để lại đánh giá, bên công ty em sẽ trả lời trong
            thời gian sớm nhất. Có thêm thắc mắc nào anh chị vui lòng liên hệ
            sdt 012345678.
          </p>
          {/* <span
            className="text-blue-400 cursor-pointer"
            // onClick={() => handleReply(item2?.id)}
          >
            Trả lời
          </span> */}
          {/* <span className="text-blue-400 mr-2">Hài lòng</span>&emsp;
          <span className="text-blue-400 mr-2">Không hài lòng</span>&emsp; */}
          <span className="text-gray-400">
            {moment(comment?.createdAt).format("HH:MM-MM/DD/YYYY")}
          </span>
        </div>
      )}
    </div>
  );
};

export default Commentmini;

