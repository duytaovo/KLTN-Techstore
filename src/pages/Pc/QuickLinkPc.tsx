import QuickLink from "src/components/QuickLink/ButtonQuickLink";
import "./quicklinkpc-module.scss";

function QuickLinkPc(props: any) {
  const data = [
    {
      type: "Canon",
      link: "//cdn.tgdd.vn/Brand/1/Canon5693-b46-220x48-220x48.jpeg",
      demand: "Chơi game",
    },
    {
      type: "Brother",
      link: "//cdn.tgdd.vn/Brand/1/Brother5693-b32-220x48-220x48.jpeg",
      demand: "Chơi game",
    },
    {
      type: "Hp",
      link: "//cdn.tgdd.vn/Brand/1/logo-hp-149x40-6.png",
      demand: "Chơi game",
    },
    {
      type: "apple",
      link: "//cdn.tgdd.vn/Brand/1/logo-apple-220x48-2.png",
      demand: "Hỗ trợ nghe gọi",
    },
    {
      type: "Samsung",
      link: "//cdn.tgdd.vn/Brand/1/samsungnew-220x48-3.png",
      demand: "Pin Khủng",
    },
    {
      type: "Asus",
      link: "//cdn.tgdd.vn/Brand/1/logo-asus-149x40-10.png",
      demand: "Chơi game",
    },
    {
      type: "Lenovo",
      link: "//cdn.tgdd.vn/Brand/1/Lenovo522-b_6.jpg",
      demand: "Chơi game",
    },
    {
      type: "Viewsonic",
      link: "//cdn.tgdd.vn/Brand/1/viewsonictgdd-220x48.png",
      demand: "Chơi game",
    },
  ];

  return (
    <div className="container-quickLinkPC">
      <div className="quicklink">
        <div>
          {data.map((item) => (
            <QuickLink
              isImg={true}
              type={item.type}
              link={item.link}
              handleSetChoose={props.handleSetChoose}
            ></QuickLink>
          ))}
        </div>
      </div>
    </div>
  );
}

export default QuickLinkPc;
