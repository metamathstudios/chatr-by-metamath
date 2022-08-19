import React, { useState } from "react";
import styles from "./style.module.scss";
import useAppState, { Settings } from "./../../state/index";
import * as getAddr from "./../../utils/getAddr";
import useUser from "./../../state/user";
import { formatWallet } from "./../../utils";

interface PageType {
  changePageHandle: (value: string | ((prevVar: string) => string)) => void;
}

const Transfer: React.FC<PageType> = (props: PageType) => {

  const settings = useAppState().state.settings as Settings;
  const myUserState = useUser(settings);
  const myPeerId = myUserState?.state.myPeerId || "Can't Fetch PeerID";
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
            <span>Transfer</span>
          </div>
          <div className={styles.right} />
        </div>
      </header>
      <div className={styles.content}>
        <img src="/images/hopr.svg" alt="HOPR" />
        <span className={styles.title}>HOPR Token</span>
        <span className={styles.warning}>Send token to this wallet</span>
        <div className={styles.copyArea}>
          <div className={styles.address}>{formatWallet(nativeAddress, 10)}</div>
          <div className={styles.button}>
            <img onClick={() => {navigator.clipboard.writeText(nativeAddress)}} src="/images/copy.svg" alt="Icon" />
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

export default Transfer;
