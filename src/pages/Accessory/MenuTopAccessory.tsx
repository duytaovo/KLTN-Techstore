import MenuTop from "src/components/MenuTop/MenuTop";
import { useEffect, useState } from "react";

const data: { title: string; type: string }[] = [
  {
    title: "Deal Sốc",
    type: "icona-dealsoc",
  },
  {
    title: "Apple",
    type: "icona-apple",
  },
  {
    title: "Pin sạc dự phòng",
    type: "icona-pin",
  },
  {
    title: "Cáp sạc",
    type: "icona-cable",
  },
  {
    title: "Tai Nghe",
    type: "icona-headphone",
  },
  {
    title: "Loa",
    type: "icona-loudspeaker",
  },
  {
    title: "Thiết bị nhà thông minh",
    type: "icona-smarthome",
  },
  {
    title: "Phụ kiện gaming",
    type: "icona-gaming",
  },
];
const MenuTopAccessory = () => {
  const [menuTop, setMenuTop] = useState(true);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 400) {
        setMenuTop(false);
      } else {
        setMenuTop(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <nav className={menuTop ? "menu-top" : "menu-top menu-top-fixed"}>
      <div className="body">
        {data.map((item) => (
          <MenuTop title={item.title} type={item.type} style={"w-28 h-28"} />
        ))}
      </div>
    </nav>
  );
};
export default MenuTopAccessory;
