import Anchor from "./Anchor";
import Tooltip from "../Tooltip";
import AccesContent from "./AccesContent";
import "./header.module.scss";
import {
  Phone,
  Smartwatch,
  Headphone,
  Laptop,
  Tablet,
  Pc,
  Down,
} from "../Icons";
import path from "src/constants/path";
// import { styled } from "@mui/material/styles";
import { styled } from "@mui/system";
import { Typography } from "@material-ui/core";
import useSettings from "src/hooks/useSettings";
const RootStyle = styled("div")(({ theme }) => ({
  // height: "100%",
  // display: "flex",
  // textAlign: "center",
  // alignItems: "center",
  // flexDirection: "column",
  // justifyContent: "center",
  // padding: theme.spacing(8, 2),
  color: theme.palette?.primary?.main, // Use optional chaining
}));

function HeaderNav() {
  const { setColor } = useSettings();
  const anchors = [
    { name: "Điện thoại", path: path.phone, firstIcon: Phone },
    { name: "Laptop", path: path.laptop, firstIcon: Laptop },
    { name: "Tablet", path: path.tablet, firstIcon: Tablet },
    {
      name: "Phụ kiện",
      path: path.accessory,
      firstIcon: Headphone,
      secondIcon: Down,
      tooltip: true,
      content: AccesContent,
    },
    { name: "Smartwatch", path: path.smartwatch, firstIcon: Smartwatch },
    // { name: "Đồng hồ", path: "/watch", firstIcon: Watch },
    // {
    //   name: "PC",
    //   path: "/pc",
    //   firstIcon: Pc,
    //   secondIcon: Down,
    //   tooltip: true,
    //   content: PcContent,
    // },
    // { name: "Máy cũ giá rẻ", path: path.maycu },
    // { name: "Sim, thẻ cào", path: "/sim" },
    // {
    //   name: "Dịch vụ tiện ích",
    //   path: "/dichvu",
    //   secondIcon: Down,
    //   // tooltip: true,
    //   content: DvContent,
    // },
  ];
  return (
    <nav>
      {anchors.map((anchor) => {
        if (anchor.tooltip) {
          return (
            <Tooltip key={anchor.name} content={anchor.content}>
              <div>
                <Anchor
                  name={anchor.name}
                  path={anchor.path}
                  firstIcon={anchor.firstIcon}
                  secondIcon={anchor.secondIcon}
                />
              </div>
            </Tooltip>
          );
        } else {
          return (
            <Anchor
              key={anchor.name}
              name={anchor.name}
              path={anchor.path}
              firstIcon={anchor.firstIcon}
              secondIcon={anchor.secondIcon}
            />
          );
        }
      })}
    </nav>
  );
}

export default HeaderNav;

