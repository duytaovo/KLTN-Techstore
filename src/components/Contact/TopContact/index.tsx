import { useTranslation } from "react-i18next";
import { BiBuildingHouse } from "react-icons/bi";
import { StyledTopContact } from "./TopContact";
import { Link } from "react-router-dom";
import { useTheme } from "@material-ui/core/styles";

function TopContact() {
  const { t } = useTranslation("home");
  const theme = useTheme();
  const PRIMARY_MAIN = theme.palette.primary.main;
  return (
    <StyledTopContact
      style={{ fontSize: "16px", background: `${PRIMARY_MAIN}` }}
    >
      <ul className="list">
        {/* <li className="element">
          <Link to="">
            <a className="element__link">
              <BiBuildingHouse className="element__icon" />
              <p>{t("header.showroom-system")}</p>
            </a>
          </Link>
        </li> */}
        <li className="element">
          <Link to="">
            <a className="element__link">
              <BiBuildingHouse className="element__icon" />
              <p>{t("header.shopping-advice")}</p>
              <span>18001234</span>
            </a>
          </Link>
        </li>
        <li className="element">
          <Link to="">
            <a className="element__link">
              <BiBuildingHouse className="element__icon" />
              <p>{t("header.customer-service")}</p>
              <span>18001234</span>
            </a>
          </Link>
        </li>
        {/* <li className="element">
          <BiBuildingHouse className="element__icon" />
          <p>{t("header.tech-news")}</p>
        </li> */}
        {/* <li className="element">
          <BiBuildingHouse className="element__icon" />
          <p>{t("header.build-configuration")}</p>
        </li> */}
      </ul>
    </StyledTopContact>
  );
}

export default TopContact;

