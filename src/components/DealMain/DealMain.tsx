import "./dealmain-module.scss";
interface Props {
  isDealMain?: boolean;
  dealShock?: string;
  discount?: string;
  linkImg?: string;
}
const DealMain = (props: Props) => {
  return (
    <h2 className="deal__title rounded-md">
      <a href="#">
        {props.isDealMain ? (
          <>
            <span className="deal__shock">{props.dealShock}</span>
            <> </>
            <span className="deal__discount">{props.discount}</span>
          </>
        ) : (
          <img src={props.linkImg} alt="" style={{ paddingBottom: 10 }} />
        )}
      </a>
    </h2>
  );
};

export default DealMain;
