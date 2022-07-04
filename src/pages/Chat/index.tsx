import React from "react";
import { formatWallet } from "../../utils";
import Received from "./Received";
import Sended from "./Sended";
import styles from "./style.module.scss";
import Transaction from "./Transaction";

interface PageType {
  customName?: string;
  chatWith: string;
  changePageHandle: (value: string | ((prevVar: string) => string)) => void;
  changeChatWith: (value: string | ((prevVar: string) => string)) => void;
}

const Chat: React.FC<PageType> = (props: PageType) => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.menu}>
          <div className={styles.left}>
            <img
              src="/images/backArrow.svg"
              alt="Icon"
              onClick={() => {
                props.changePageHandle("main");
                props.changeChatWith("");
              }}
            />
          </div>
          <div className={styles.middle}>
            <div className={styles.peaple}>
              <img src="/images/user2.svg" alt="Icon" />
            </div>
            <div className={styles.data}>
              {props.customName && (
                <span className={styles.customName}>{props.customName}</span>
              )}
              <span
                className={styles.wallet}
                style={
                  props.customName ? { fontSize: "15px" } : { fontSize: "17px" }
                }
              >
                {props.customName
                  ? formatWallet(props.chatWith, 18)
                  : formatWallet(props.chatWith, 24)}
              </span>
            </div>
          </div>
          <div className={styles.right}>
            <img src="/images/edit.svg" alt="Icon" onClick={() => {}} />
          </div>
        </div>
      </header>
      <div className={styles.content}>
        <div className={styles.wrapper}>
          <Received text={"you owe me baitola"} />
          <Sended text={"I will pay you rn"} />
          <Transaction quantity={10} />
          <Received text={"thanks bro"} />
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.messageSender}>
          <div className={styles.left}>
            <div className={styles.wrapper}>
              <img
                src="/images/coloredPig.svg"
                alt="Icon"
                onClick={() => {
                  props.changePageHandle("wallet");
                }}
              />
            </div>
          </div>
          <div className={styles.middle}>
            <input type="text" />
          </div>
          <div className={styles.right}>
            <div className={styles.wrapper}>
              <img src="/images/send.svg" alt="Icon" />
            </div>
          </div>
        </div>
        <div className={styles.resizer} />
      </div>
    </div>
  );
};

export default Chat;
