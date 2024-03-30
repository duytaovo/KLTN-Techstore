import PortfolioIndustry from "src/components/PortfolioIndustry";
import { PageContext } from "src/contexts/PageContext";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { BiMenu } from "react-icons/bi";
import { StyledLogoMenu } from "./Header";
import { NavLink as RouterLink } from "react-router-dom";
import Logo from "../Logo";

const LogoMenu = () => {
  const { t } = useTranslation("home");
  const { openPortfolioIndustry, handleTogglePortfolioIndustry } =
    useContext(PageContext);

  const openPortfolioIndustryHandler = () => {
    if (handleTogglePortfolioIndustry) {
      handleTogglePortfolioIndustry();
    }
  };
  return (
    <StyledLogoMenu>
      <RouterLink to="/">
        <Logo />
      </RouterLink>
      <div className="menu" onClick={openPortfolioIndustryHandler}>
        <BiMenu className="menu-icon" />
        <div className="menu-title">{t("header.product-portfolio")}</div>
      </div>
      <div className="portfolio-industry">
        {openPortfolioIndustry && <PortfolioIndustry />}
      </div>
    </StyledLogoMenu>
  );
};

export default LogoMenu;

