import { useState } from "react";
import { BiMicrochip, BiSpeaker } from "react-icons/bi";
import { BsLaptop, BsPhone, BsTablet, BsSmartwatch } from "react-icons/bs";
import { CgCamera } from "react-icons/cg";

import {
  StyledIndustryCategory,
  StyledProductPortfolio,
  StyledSubCatagory,
} from "./PortfolioIndustry";
import path from "src/constants/path";
import { Link } from "react-router-dom";
const AccessComputer = [
  {
    id: 1,
    name: "CPU - Bộ vi xử lý",
    link: "processor",
  },
  {
    id: 2,
    name: "VGA - Card Màn Hình.",
    link: "graphics-card",
  },
  {
    id: 3,
    name: "Ổ cứng HDD - SSD.",
    link: "rom",
  },
  {
    id: 4,
    name: "Ram - Bộ nhớ trong.",
    link: "ram",
  },
  {
    id: 5,
    name: "Mainboard",
    link: "mainboard",
  },
];

const Accessory = [
  {
    id: 1,
    name: "Chuột máy tính",
    link: "mouse",
  },
  {
    id: 2,
    name: "Củ sạc",
    link: "adapter",
  },
  {
    id: 3,
    name: "Sạc dự phòng",
    link: "backup-charger",
  },
  {
    id: 4,
    name: "Bàn phím",
    link: "keyboard",
  },
  {
    id: 5,
    name: "Radiator",
    link: "radiator",
  },
];

const AccessoryLoud = [
  {
    id: 1,
    name: "Loa",
    link: "loudspeaker",
  },
  {
    id: 2,
    name: "Microphone",
    link: "microphone",
  },
  {
    id: 3,
    name: "Tai nghe",
    link: "earphone",
  },
];
function PortfolioIndustry() {
  const [openSubCategory, setOpenSubCategory] = useState(true);

  const onMouseEnterHandler = () => {
    setOpenSubCategory(true);
  };

  const onMouseLeaveHandler = () => {
    setOpenSubCategory(false);
  };

  return (
    <StyledProductPortfolio className="h-fit">
      <ul className="intrustry-list" onMouseEnter={onMouseEnterHandler}>
        <Link to={path.phone}>
          <li className="industry-item">
            <BsPhone className="industry-item__icon" />
            <div className="industry-item__name">
              Điện thoại & Thiết bị thông minh
            </div>
          </li>
        </Link>
        <Link to={path.laptop}>
          <li className="industry-item">
            <BsLaptop className="industry-item__icon" />
            <div className="industry-item__name">Laptop & Markbook</div>
          </li>
        </Link>
        <Link to={path.tablet}>
          <li className="industry-item">
            <BsTablet className="industry-item__icon" />
            <div className="industry-item__name">Tablet</div>
          </li>
        </Link>
        <Link to={path.smartwatch}>
          <li className="industry-item">
            <BsSmartwatch className="industry-item__icon" />
            <div className="industry-item__name">Smart Watch</div>
          </li>
        </Link>

        <li className="industry-item">
          <BiMicrochip className="industry-item__icon" />
          <div className="industry-item__name">Linh kiện máy tính</div>
          <StyledIndustryCategory className="industry-category">
            <StyledSubCatagory>
              {AccessComputer.map((item) => (
                <Link
                  to={`/${item.link}`}
                  key={item.id}
                  className="sub-category-item hover:text-blue-500 text-black"
                >
                  {item.name}
                </Link>
              ))}
            </StyledSubCatagory>
          </StyledIndustryCategory>
        </li>

        <li className="industry-item">
          <CgCamera className="industry-item__icon" />
          <div className="industry-item__name">Phụ kiện</div>
          <StyledIndustryCategory className="industry-category">
            <StyledSubCatagory>
              {Accessory.map((item) => (
                <Link
                  to={`${path.accessory}/${item.link}`}
                  key={item.id}
                  className="sub-category-item hover:text-blue-500 text-black"
                >
                  {item.name}
                </Link>
              ))}
            </StyledSubCatagory>
          </StyledIndustryCategory>
        </li>
        <li className="industry-item">
          <BiSpeaker className="industry-item__icon" />
          <div className="industry-item__name">Thiết bị âm thanh</div>
          <StyledIndustryCategory className="industry-category">
            <StyledSubCatagory>
              {AccessoryLoud.map((item) => (
                <Link
                  to={`${path.accessory}/${item.link}`}
                  key={item.id}
                  className="sub-category-item hover:text-blue-500 text-black"
                >
                  {item.name}
                </Link>
              ))}
            </StyledSubCatagory>
          </StyledIndustryCategory>
        </li>
      </ul>
    </StyledProductPortfolio>
  );
}

export default PortfolioIndustry;

