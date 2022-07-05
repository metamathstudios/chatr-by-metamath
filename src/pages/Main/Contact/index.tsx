import React from "react";
import { formatWallet } from "../../../utils";
import styles from "./styles.module.scss";

interface PageType {
  changePageHandle: (value: string | ((prevVar: string) => string)) => void;
  changeChatWith: (value: string | ((prevVar: string) => string)) => void;
  removeContact: (value: string | ((prevVar: string) => string)) => void;
  wallet: string;
  customName?: string;
}

const Contact: React.FC<PageType> = (props: PageType) => {
  return (
    <div className={styles.item}>
      <div className={styles.decorator}>
        <img src="/images/user.svg" alt="Icon" />
      </div>
      <div className={styles.data}>
        {props.customName && (
          <span className={styles.customName}>{props.customName}</span>
        )}
        <span
          className={styles.wallet}
          style={props.customName ? { fontSize: "11px" } : { fontSize: "13px" }}
        >
          {props.customName
            ? formatWallet(props.wallet, 30)
            : formatWallet(props.wallet, 34)}
        </span>
      </div>
      <div className={styles.favorite}>
        <img
          src="/images/trash.svg"
          alt="Icon"
          onClick={() => {
            props.removeContact(props.wallet);
          }}
        />
        <img
          src="/images/send.svg"
          alt="Icon"
          onClick={() => {
            props.changeChatWith(props.wallet);
            props.changePageHandle("chat");
          }}
        />
      </div>
    </div>
  );
};

export default Contact;
