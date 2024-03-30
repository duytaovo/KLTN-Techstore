import { colors } from "src/theme/colors";
import { fontSizes } from "src/theme/fontSizes";
import useOnClickOutside from "src/hooks/useOnclickOutside";
import { Fragment, useRef, useState } from "react";
import styled from "styled-components";
import ContactLocationDialog from "./ContactLocationDialog";
// import ContactMailDialog from "./ContactMailDialog";
import ContactPhoneDialog from "./ContactPhoneDialog";

const RightContact = () => {
  // mail dialog
  const [openContactMailDialog, setOpenContactMailDialog] = useState(false);
  const mailDialogRef = useRef(null);

  //phone dialog
  const [openContactPhoneDialog, setOpenContactPhoneDialog] = useState(false);
  const phoneDialogRef = useRef(null);

  //location dialog
  const [openContactLocationDialog, setOpenContactLocationDialog] =
    useState(false);
  const locationDialogRef = useRef(null);

  const handleCloseDialog = () => {
    setOpenContactPhoneDialog(false);
    setOpenContactMailDialog(false);
    setOpenContactLocationDialog(false);
  };

  const handleToggleContactMailDialog = () => {
    setOpenContactMailDialog(!openContactMailDialog);
  };

  const handleToggleContactPhoneDialog = () => {
    setOpenContactPhoneDialog(!openContactPhoneDialog);
  };

  const handleToggleContactLocationDialog = () => {
    setOpenContactLocationDialog(!openContactLocationDialog);
  };

  useOnClickOutside(phoneDialogRef, handleCloseDialog);
  useOnClickOutside(mailDialogRef, handleCloseDialog);
  useOnClickOutside(locationDialogRef, handleCloseDialog);

  return (
    <Fragment>
      <StyledRightContact>
        <div className="contact-item" onClick={handleToggleContactPhoneDialog}>
          <img
            src="/images/contact/phone.svg"
            alt=""
            className="contact-icon"
          />
          <div className="tooltip">Hotline</div>
        </div>
        <div className="contact-item" onClick={handleToggleContactMailDialog}>
          <img src="/images/contact/mail.svg" alt="" className="contact-icon" />
          <div className="tooltip">Email hỗ trợ</div>
        </div>
        {/* <div
          className="contact-item"
          onClick={handleToggleContactLocationDialog}
        >
          <img
            src="/images/contact/location.svg"
            alt=""
            className="contact-icon"
          />
          <div className="tooltip">Showroom</div>
        </div> */}
        <div className="contact-item">
          <a
            href="https://www.facebook.com/profile.php?id=100088876296103"
            target="_blank"
            rel="noreferrer"
          >
            <img src="/images/contact/fb.svg" alt="" className="contact-icon" />
            <div className="tooltip">
              Like fanpage & trúng quà mini mỗi ngày
            </div>
          </a>
        </div>
        <div className="messenger">
          <a
            href="https://www.facebook.com/profile.php?id=100088876296103"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="/images/contact/mes.png"
              alt=""
              className="contact-messenger"
            />
          </a>
        </div>
      </StyledRightContact>
      {/* {openContactMailDialog && (
        <ContactMailDialog ref={mailDialogRef} onClose={handleCloseDialog} />
      )} */}
      {openContactPhoneDialog && (
        <ContactPhoneDialog ref={phoneDialogRef} onClose={handleCloseDialog} />
      )}
      {openContactLocationDialog && (
        <ContactLocationDialog
          ref={locationDialogRef}
          onClose={handleCloseDialog}
        />
      )}
    </Fragment>
  );
};

const StyledRightContact = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  bottom: 80px;
  right: 20px;
  align-items: flex-end;
  z-index: 2;

  & .contact-item {
    margin-top: 8px;
    padding-right: 4px;
    cursor: pointer;
    position: relative;

    &:hover {
      & .tooltip {
        display: block;
      }
    }

    & .contact-icon {
      width: 38px;
      height: 38px;
      border-radius: 50%;
    }
  }

  & .messenger {
    height: 50px;
    // width: min-content;
    margin-top: 30px;
    cursor: pointer;

    & .contact-messenger {
      height: 100%;
    }
  }

  & .tooltip {
    padding: 8px;
    background-color: ${colors.primaryColor};
    color: ${colors.whiteColor};
    font-size: ${fontSizes.desc1};
    border-radius: 5px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 50px;
    width: max-content;
    display: none;
  }
`;

export default RightContact;

