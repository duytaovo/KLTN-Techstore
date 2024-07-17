import { useState, useEffect } from "react";
import styles from "./home.module.scss";
import Promo from "./Promo";
import Ticket from "./Ticket";
import BigBanner from "./BigBanner";
import PromoFirst from "./PromoFirst";
import ProductDeal from "./ProductDeal";
import ProductBrand from "./ProductBrand";
import ProductTrend from "./ProductTrend";
import CovenientService from "./CovenientService";
import DiscountOnline from "./DiscountOnline";
import ProductSuggest from "./ProductSuggest";
import ProductCategory from "./ProductCategory";
import ProductHistory from "src/components/ProductHistory";
import { Helmet } from "react-helmet-async";
import { useAppDispatch, useAppSelector } from "src/hooks/useRedux";
import { getPromo } from "src/store/banner/bannerSlice";
import { changePercentLoading } from "src/app.slice";
import { unwrapResult } from "@reduxjs/toolkit";
import MainSlider from "src/components/MainSlider";
import Skeleton from "src/components/Skeleton";
const Home = ({ title }: { title: string }) => {
  const [displayTicket, setDisplayTicket] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const data: any = useAppSelector((state) => state.data.data);
  const loading = useAppSelector((state) => state.loading.loading);

  useEffect(() => {
    const handleScroll = (event: Event) => {
      setDisplayTicket(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    document.title = title;
  }, []);
  useEffect(() => {
    const getData = async () => {
      dispatch(changePercentLoading(30));
      dispatch(changePercentLoading(70));
      // const res = await dispatch(getPromo(""));
      // unwrapResult(res);

      setTimeout(() => dispatch(changePercentLoading(100)), 500);
    };
    getData();
  }, [dispatch]);

  return (
    <div>
      <Helmet>
        <title>Trang chủ </title>
        <meta name="description" content="Trang chủ " />
      </Helmet>
      <main className={styles.main}>
        {/* <BigBanner banner={banner} /> */}

        {loading > 0 ? (
          <Skeleton
            styles={{ height: "50vh" }}
            children={undefined}
            className={undefined}
          />
        ) : (
          <div>
            <MainSlider />
            <Ticket show={displayTicket} />
            {/* <Promo /> */}
            {/* <ProductTrend /> */}
          </div>
        )}
        <PromoFirst />
        {/* <PromoSecond /> */}
        {/* <ProductSuggest /> */}
        {/* <ProductCategory /> */}
        {/* <DiscountOnline /> */}
        {/* <CovenientService /> */}
        {/* <ProductHistory styleTitle="uppercase text-textWhiteMain" /> */}
        {/* <ProductBrand /> */}
        {/* <ProductDeal /> */}
      </main>
    </div>
  );
};
export default Home;

