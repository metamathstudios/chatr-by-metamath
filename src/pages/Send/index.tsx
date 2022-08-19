import React, { useState }from "react";
import styles from "./style.module.scss";
import useAppState, { Settings } from "./../../state/index";
import * as getAddr from "./../../utils/getAddr";
import useUser from "./../../state/user";

interface PageType {
  changePageHandle: (value: string | ((prevVar: string) => string)) => void;
  customName?: string;
}

const Send: React.FC<PageType> = (props: PageType) => {

  const settings = useAppState().state.settings as Settings;
  const myUserState = useUser(settings);
  const myPeerId = myUserState?.state.myPeerId || "Can't Fetch PeerID";
  const hoprBalance = Number(myUserState?.balances.hopr)/1e18 || 0;
  const [nativeAddress, setNativeAddress] = useState("");

  getAddr.getAddressFromPeer(myPeerId).then(address => {
    setNativeAddress(address);
  })

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.menu}>
          <div className={styles.left}>
            <img
              src="/images/backArrow.svg"
              alt="Icon"
              onClick={() => {
                props.changePageHandle("wallet");
              }}
            />
            <span>Send</span>
          </div>
          <div className={styles.right} />
        </div>
      </header>
      <div className={styles.content}>
        <div className={styles.icon}>
          <img src="/images/user2.svg" alt="HOPR" />
        </div>
        {props.customName && (
          <span className={styles.customName}>{props.customName}</span>
        )}
        <span
          className={styles.wallet}
          style={props.customName ? { marginTop: "0" } : { marginTop: "20px" }}
        >
          Sending From:
          <br></br>
          {nativeAddress}
        </span>

        <span className={styles.title}>Hopr Token</span>
        <span className={styles.wallet}>Balance avaliable: {hoprBalance}</span>
        <div className={styles.copyArea}>
          <input type="text" />
          <div className={styles.button}>
            <img src="/images/send.svg" alt="Icon" />
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

export default Send;
