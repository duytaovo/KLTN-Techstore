import { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  BsBell,
  BsCalendar2Check,
  BsCart3,
  BsClock,
  BsGeoAlt,
  BsNewspaper,
  BsPersonCircle,
  BsPiggyBank,
  BsSearch,
  BsTags,
} from "react-icons/bs";
import { IoLanguage } from "react-icons/io5";
import {
  StyledCard,
  StyledHeader,
  StyledNavItem,
  StyledNotify,
  StyledSearchHisory,
  StyledSubList,
  StyledUserActions,
} from "./Header";
import LogoMenu from "./LogoMenu";
import { Link, useNavigate } from "react-router-dom";
import { PageContext } from "src/contexts/PageContext";
import Container from "src/layouts/container";
import PopoverSearch from "../Popover";
import Search from "../Search";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "usehooks-ts";
import { searchService } from "src/services";
import ItemSearch from "../Search/ItemSearch";
import { getResultSearch } from "src/store/search/searchSlice";
import { useAppDispatch } from "src/hooks/useRedux";
import path from "src/constants/path";
import CartButton from "../Header/CartButton";
import { Avatar, MenuProps } from "antd";
import { styled } from "@mui/system";
import { Box, AppBar, Toolbar, Palette, Theme } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import CustomDropDown from "../Dropdown/Dropdown";
import { clearLS } from "src/utils/auth";
import { logoutUser } from "src/store/user/userSlice";
import { AppContext } from "src/contexts/app.context";
import { toast } from "react-toastify";
import { unwrapResult } from "@reduxjs/toolkit";
import { UserOutlined } from "@ant-design/icons";

interface Props {
  home?: boolean;
}

interface ExtendedPalette extends Palette {
  gradients: {
    primary: string;
    info: string;
    success: string;
    warning: string;
    error: string;
  };
}

interface ExtendedTheme extends Theme {
  palette: ExtendedPalette;
}

const customDropdownStyle = {
  arrow: false,
  isOnClick: false,
  className: "px-1 mx-3 xl:p-0 xl:mr-0 hover:",
};

const menuStyle = {
  padding: "20px 20px",
  borderRadius: "16px",
};
const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 64;

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APP_BAR_MOBILE,
  [theme.breakpoints.up("lg")]: {
    minHeight: APP_BAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

function Header(props: Props) {
  const theme = useTheme();
  const PRIMARY_MAIN = theme.palette.primary.main;
  const GRADIENTS_MAIN = (theme as ExtendedTheme)?.palette.gradients?.primary;

  const colorCodes: any = GRADIENTS_MAIN.match(
    /#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/g,
  );
  const { t } = useTranslation("home");
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [zoomOutHeader, setZoomOutHeader] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { handleClosePortfolioIndustry, isHome } = useContext(PageContext);
  const { isAuthenticated } = useContext(AppContext);
  const navigate = useNavigate();

  // zoom out header
  // can fix typescript EventTarget
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;

      if (scrollTop > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    if (!isHome) {
      setZoomOutHeader(true);
      return;
    }

    let isMounted = true;
    setZoomOutHeader(false);
    const handleScrollY = (e: any) => {
      if (!isMounted) return;

      if (e?.currentTarget) {
        if (e.currentTarget.scrollY >= 46) {
          setZoomOutHeader(true);
        } else {
          setZoomOutHeader(false);
          if (handleClosePortfolioIndustry) handleClosePortfolioIndustry();
        }
      }
    };
    window.addEventListener("scroll", (e: Event) => handleScrollY(e));
    return () => {
      isMounted = false;
      window.removeEventListener("scroll", (e: Event) => handleScrollY(e));
    };
  }, [handleClosePortfolioIndustry, isHome]);

  const itemAcount: MenuProps["items"] = [
    {
      key: "0",
      label: (
        <Link to={path.register}>
          <div className={""}>
            <span className={""}>{t("header.register")}</span>
          </div>
        </Link>
      ),
    },
    {
      key: "1",
      label: (
        <Link to={path.login}>
          <div className={""}>
            <span className={""}>{t("header.login")}</span>
          </div>
        </Link>
      ),
    },
  ];

  const itemLogout: MenuProps["items"] = [
    {
      key: "3",
      label: (
        <div
          onClick={async () => {
            await navigate(path.profile);
          }}
        >
          <span className={""}>{t("header.profile")}</span>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div
          onClick={async () => {
            await clearLS();
            await dispatch(logoutUser("")).then(unwrapResult);
            await toast.success("Đăng xuất thành công");

            setTimeout(async () => {
              await location.reload();
              await navigate("/");
            }, 1000);
          }}
        >
          <span className={""}>{t("header.logout")}</span>
        </div>
      ),
    },
  ];
  const [valueSearch, setValueSearch] = useState("");
  const debouncedValue = useDebounce<string>(valueSearch, 500);
  const onChange = (value: string) => {
    setValueSearch(value);
    if (value == "") {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 700);
  }, [isLoading]);
  const { data: dataSearch } = useQuery({
    queryKey: ["dataSearch", debouncedValue],
    queryFn: () => {
      setIsLoading(false);
      return searchService.getResultSearchApi({ keyword: debouncedValue });
    },

    enabled: debouncedValue !== "",
    // keepPreviousData: true,
    staleTime: 3 * 60 * 1000,
  });
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const handle = (boolean: boolean) => {
    setIsOpenPopup(false);
  };

  useEffect(() => {
    dispatch(getResultSearch(dataSearch));
  }, [dataSearch]);

  return (
    <StyledHeader
      // style={{ fontSize: "16px", background: `white` }}
      className={` fixed top-0 z-[100] box-border text-textWhiteMain  w-full items-center justify-between  ${
        isScrolled ? `bg-gradient-to-b from-[#86A7FC] to-[#B7E5B4]` : ""
      }`}
    >
      <Container>
        <div
          className={`header-content${
            zoomOutHeader ? " header-content--zoomout" : ""
          }`}
        >
          {zoomOutHeader ? (
            <LogoMenu />
          ) : (
            <Link to="/">
              <a className="logo">
                <img
                  alt=""
                  src="/access/logo/logo.svg"
                  width={250}
                  height={35}
                />
              </a>
            </Link>
          )}

          {/* <div
            className="search "
            onMouseLeave={onMouseLeaveSearchHistoryHandler}
          >
            <input
              type="text"
              placeholder={t("header.search-placeholder")}
              onClick={handleSearchFieldClick}
              ref={searchInput}
            />
            <div className="search__icon">
              <BsSearch />
            </div>
            {openHistorySearch && (
              <StyledSearchHisory>
                <div className="history-title">
                  <div className="history-title__text">
                    {t("header.history-search")}
                  </div>
                  <div className="history-title__action">
                    {t("header.remove-history-search")}
                  </div>
                </div>
                <ul className="history-list">
                  <li
                    className="history-item"
                    onClick={handleSearch("keychorn")}
                  >
                    <BsClock className="history-item__icon" />
                    <p>Keychorn</p>
                  </li>
                  <li
                    className="history-item"
                    onClick={handleSearch("bàn phím")}
                  >
                    <BsClock className="history-item__icon" />
                    <p>Bàn phím</p>
                  </li>
                  <li
                    className="history-item"
                    onClick={handleSearch("màn hình")}
                  >
                    <BsClock className="history-item__icon" />
                    <p>
                      Màn hình máy tính, Màn hình máy tính, Màn hình máy tính,
                      Màn hình máy tính
                    </p>
                  </li>
                  <li
                    className="history-item"
                    onClick={handleSearch("khong day")}
                  >
                    <BsClock className="history-item__icon" />
                    <p>Keychorn</p>
                  </li>
                </ul>
              </StyledSearchHisory>
            )}
          </div> */}

          <PopoverSearch
            className="z-[10000] ml-4"
            isOpenPopup={isOpenPopup}
            setIsOpenPopup={setIsOpenPopup}
            handePopup={handle}
            renderPopover={
              <Box
                sx={{
                  // width: 400,
                  // backgroundColor: "white",
                  // borderRadius: "1px",
                  overflow: "auto",
                  scrollBehavior: "smooth",
                  scrollbarColor: "revert",
                  zIndex: 10000,
                }}
                className="h-auto max-h-[50vh] min-h-auto"
              >
                <div className="ml-3 text-black">
                  {dataSearch?.data?.data.length > 0 ? (
                    <div>
                      <h6 className=" mt-2 p2">Kết quả tìm kiếm</h6>
                      {dataSearch?.data?.data?.map(
                        (item: any, index: number) => (
                          <div key={index} className="m-2 ml-0">
                            <ItemSearch item={item} handePopup={handle} />
                          </div>
                        ),
                      )}
                    </div>
                  ) : (
                    <div className="h-10 bg-white">
                      {dataSearch?.data?.data.length === 0 && (
                        <h2>Không có sản phẩm trong hệ thống chúng tôi</h2>
                      )}
                    </div>
                  )}
                </div>
              </Box>
            }
          >
            <div>
              <Search
                width="400px"
                placeholder="Tìm kiếm"
                onChange={onChange}
                loading={isLoading}
                handePopup={handle}
              />
            </div>
          </PopoverSearch>
          <StyledNavItem className={zoomOutHeader ? "zoomout" : ""}>
            <li className="nav-item">
              <div className="nav-item__wrap">
                <Link to="">
                  {/* <a className="nav-item__link"> */}
                  <BsTags className="nav-item__icon" />
                  <span className="nav-item__text">Khuyến mãi</span>
                  {/* </a> */}
                </Link>
              </div>
            </li>
            <li className="nav-item">
              <div className="nav-item__wrap">
                <Link to={path.historyPurchase} className=" text-center ">
                  <BsCalendar2Check className="nav-item__icon" />
                  <span className="nav-item__text">Đơn hàng</span>
                </Link>
              </div>
            </li>

            {/* <li
              className="nav-item"
              onMouseEnter={onMouseEnterNotiHandler}
              onMouseLeave={onMouseLeaveNotiHandler}
            >
              <div className="nav-item__wrap">
                <BsBell className="nav-item__icon" />
                <span className="nav-item__text">Thông báo</span>
              </div>
              {openNotify && (
                <StyledNotify className={zoomOutHeader ? "zoomout" : ""}>
                  <img alt="" src="/access/popup/no-notify.png" />
                  <span>Bạn chưa có thông báo mới</span>
                </StyledNotify>
              )}
            </li> */}
            {/* <li
              className="nav-item"
              onMouseEnter={onMouseEnterCardHandler}
              onMouseLeave={onMouseLeaveCardHandler}
            >
              <div className="nav-item__wrap">
                <BsCart3 className="nav-item__icon" />
                <span className="nav-item__text">Giỏ hàng</span>
                <span className="nav-item__quantity">3</span>
              </div>
              {openCard && (
                <StyledCard className={zoomOutHeader ? "zoomout" : ""}>
                  <ul className="list">
                    <li className="item">
                      <img
                        src="/access/products/dongho/dongho1.jpg"
                        alt=""
                        className="item__img"
                      />
                      <div className="item__content">
                        <Link to="/">
                          <a>
                            <p className="item__content-title">
                              Vòng đeo tay/ Đồng hồ thông minh Xiaomi Amazfit
                              Pace (UYG4012RT) Vòng đeo tay/ Đồng hồ thông minh
                              Xiaomi Amazfit Pace (UYG4012RT)
                            </p>
                          </a>
                        </Link>
                        <div className="item__content-quantity">Số lượng 3</div>
                        <div className="item__content-price">3.690.000đ</div>
                      </div>
                    </li>
                    <li className="item">
                      <img
                        src="/access/products/dongho/dongho1.jpg"
                        alt=""
                        className="item__img"
                      />
                      <div className="item__content">
                        <Link to="/">
                          <a>
                            <p className="item__content-title">
                              Vòng đeo tay/ Đồng hồ thông minh Xiaomi Amazfit
                              Pace (UYG4012RT) Vòng đeo tay/ Đồng hồ thông minh
                              Xiaomi Amazfit Pace (UYG4012RT)
                            </p>
                          </a>
                        </Link>
                        <div className="item__content-quantity">Số lượng 3</div>
                        <div className="item__content-price">3.690.000đ</div>
                      </div>
                    </li>
                    <li className="item">
                      <img
                        src="/access/products/dongho/dongho1.jpg"
                        alt=""
                        className="item__img"
                      />
                      <div className="item__content">
                        <Link to="/">
                          <a>
                            <p className="item__content-title">
                              Vòng đeo tay/ Đồng hồ thông minh Xiaomi Amazfit
                              Pace (UYG4012RT) Vòng đeo tay/ Đồng hồ thông minh
                              Xiaomi Amazfit Pace (UYG4012RT)
                            </p>
                          </a>
                        </Link>
                        <div className="item__content-quantity">Số lượng 3</div>
                        <div className="item__content-price">3.690.000đ</div>
                      </div>
                    </li>
                    <li className="item">
                      <img
                        src="/access/products/dongho/dongho1.jpg"
                        alt=""
                        className="item__img"
                      />
                      <div className="item__content">
                        <Link to="/">
                          <a>
                            <p className="item__content-title">Vòng đeo tay</p>
                          </a>
                        </Link>
                        <div className="item__content-quantity">Số lượng 3</div>
                        <div className="item__content-price">3.690.000đ</div>
                      </div>
                    </li>
                  </ul>
                  <div className="count">
                    <div className="count__quantity">
                      Tổng tiền (3) sản phẩm
                    </div>
                    <div className="count__price">5.899.000đ</div>
                  </div>
                  <Link to="/cart">
                    <a>
                      <Button>Xem giỏ hàng</Button>
                    </a>
                  </Link>
                </StyledCard>
              )}
            </li> */}
            <li className="nav-item">
              <div className="nav-item__wrap">
                {/* <Link to={path.historyPurchase} className=" text-center ">
                  <BsCalendar2Check className="nav-item__icon" />
                  <span className="nav-item__text">Đơn hàng</span>
                </Link> */}
                <Link to={path.cartNew}>
                  <CartButton />
                </Link>
              </div>
            </li>

            {/* <li
              className="nav-item"
              onMouseEnter={onMouseEnterUserHandler}
              onMouseLeave={onMouseLeaveUserHandler}
            >
              <div className="nav-item__wrap">
                <BsPersonCircle className="nav-item__icon" />
                <span className="nav-item__text">Nguyễn Xuân Anh</span>
              </div>
              {openUserActions && (
                <StyledUserActions className={zoomOutHeader ? "zoomout" : ""}>
                  <div className="top">
                    <BsPersonCircle className="top__icon" />
                    <div className="top__title">Nguyễn Xuân Anh</div>
                  </div>
                  <ul className="detail-list">
                    <li
                      className="detail-item"
                      onClick={handleChangePid("account")}
                    >
                      <BsPersonCircle className="detail-item__icon" />
                      <div className="detail-item__text">
                        {t("header.account-infomation")}
                      </div>
                    </li>
                    <li
                      className="detail-item"
                      onClick={handleChangePid("orders")}
                    >
                      <BsCalendar2Check className="detail-item__icon" />
                      <div className="detail-item__text">
                        {t("header.order-management")}
                      </div>
                    </li>
                    <li
                      className="detail-item"
                      onClick={handleChangePid("addresses")}
                    >
                      <BsGeoAlt className="detail-item__icon" />
                      <div className="detail-item__text">
                        {t("header.address-book")}
                      </div>
                    </li>
                    <li
                      className="detail-item"
                      onClick={handleChangePid("notification")}
                    >
                      <BsBell className="detail-item__icon" />
                      <div className="detail-item__text">
                        {t("header.notification")}
                      </div>
                    </li>
                    <li className="detail-item">
                      <BsPiggyBank className="detail-item__icon" />
                      <div className="detail-item__text">
                        {t("header.membership-points")}
                      </div>
                    </li>
                    <li className="detail-item">
                      <BsNewspaper className="detail-item__icon" />
                      <div className="detail-item__text">
                        {t("header.news")}
                      </div>
                    </li>
                    <li className="detail-item">
                      <IoLanguage className="detail-item__icon" />
                      <div className="detail-item__text">
                        <div className="label">{t("header.language")}</div>
                        <img
                          src={`access/language/.png`}
                          alt=""
                          className="img"
                        />
                      </div>

                      <StyledSubList className="sub-list-wrap">
                        <ul className="sub-list">
                          <li
                            className="sub-list__item"
                            onClick={handleChangeLanguage("vn")}
                          >
                            <img
                              src="/access/language/vn.png"
                              alt=""
                              className="img"
                            />
                            <div className="label">{t("header.vn")}</div>
                          </li>
                          <li
                            className="sub-list__item"
                            onClick={handleChangeLanguage("en")}
                          >
                            <img
                              src="/access/language/en.png"
                              alt=""
                              className="img"
                            />
                            <div className="label">{t("header.en")}</div>
                          </li>
                        </ul>
                      </StyledSubList>
                    </li>
                  </ul>
                  <div className="logout-btn">
                    <Button>{t("header.logout")}</Button>
                  </div>
                </StyledUserActions>
              )}
            </li> */}
            <CustomDropDown
              {...customDropdownStyle}
              menuStyle={menuStyle}
              items={isAuthenticated ? itemLogout : itemAcount}
              children={
                <div className="flex items-center justify-around cursor-pointer ">
                  {true ? (
                    // <SentimentSatisfiedAltRoundedIcon />
                    <Avatar
                      className={`leading-[20px] text-[20px] `}
                      icon={
                        <UserOutlined
                          className={`text-[${PRIMARY_MAIN}]`}
                          color={"#000000"}
                          style={{ fontSize: "16px", color: `${PRIMARY_MAIN}` }}
                        />
                      }
                    />
                  ) : (
                    <div>Tài khoản</div>
                    // <AccountCircleIcon
                    //   className="text-lg"
                    //   onClick={handleOpenModal}
                    // />
                  )}

                  {/* <ArrowDropDownIcon className='group-hover:text-mainColor'/> */}
                </div>
              }
            />
          </StyledNavItem>
        </div>
      </Container>
    </StyledHeader>
  );
}

export default Header;

