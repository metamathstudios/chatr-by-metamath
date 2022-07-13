import React from "react";
import styles from "./style.module.scss";

interface PageType {
  changePageHandle: (value: string | ((prevVar: string) => string)) => void;
}

const Wallet: React.FC<PageType> = (props: PageType) => {
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
              }}
            />
            <span>Wallet</span>
          </div>
          <div className={styles.right} />
        </div>
      </header>
      <div className={styles.content}>
        <div className={styles.wallet}>
          <div className={styles.icon}>
            <img src="/images/hopr.svg" alt="HOPR" />
          </div>
          <div className={styles.text}>
            Hopr Token <span>500 HOPR</span>
          </div>
          <div className={styles.actions}>
            <img
              src="/images/receive.svg"
              alt="HOPR"
              onClick={() => props.changePageHandle("transfer")}
            />
            <img
              src="/images/send.svg"
              alt="HOPR"
              onClick={() => props.changePageHandle("send")}
            />
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <span>By</span>
        <img src="/images/metamath.svg" alt="MetaMath" />
        <div className={styles.resizer} />
      </div>
    </div>
  );
};

export default Wallet;
