import { Link as LinkIcon } from "react-bootstrap-icons";
import clsx from "clsx";
const Parameter = (productDetail: any) => {
  const { parameter, title } = productDetail;
  return (
    <div className="my-8">
      <p className="font-bold text-3xl text-gray-800 mb-4">Cấu hình {title}</p>
      <table className="w-full">
        <tbody>
          {parameter ? (
            Object.entries(parameter).map((param: any, index) => {
              if (index != 0) {
                return (
                  <tr
                    className={clsx(index % 2 === 0 && "bg-gray-100")}
                    key={index}
                  >
                    <td colSpan={4}>{param[0]}</td>
                    <td colSpan={6}>{param[1]}</td>
                  </tr>
                );
              }
            })
          ) : (
            <tr></tr>
          )}
        </tbody>
      </table>
      <div className="my-4">
        <a href="#">
          <i>
            <LinkIcon />
          </i>
          <span className="text-2xl text-blue-300">
            Hướng Dẫn Sử Dụng Tiếng Anh
          </span>
        </a>
        <span>[PDF, 0.2MB]</span>
      </div>
      {/* <ModalBox /> */}
    </div>
  );
};

export default Parameter;

