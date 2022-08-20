import React, { useState } from "react";
import { isValidEthAddress } from "../../utils";
import styles from "./style.module.scss";
import useAppState, { Settings } from "./../../state/index";
import * as getAddr from "./../../utils/getAddr";
import useUser from "./../../state/user";

interface PageType {
  chatWith?: string;
  changePageHandle: (value: string | ((prevVar: string) => string)) => void;
  changeChatWith: (value: string | ((prevVar: string) => string)) => void;
  customName?: string;
}

const Send: React.FC<PageType> = (props: PageType) => {

  const settings = useAppState().state.settings as Settings;
  const myUserState = useUser(settings);
  const myPeerId = myUserState?.state.myPeerId || "Can't Fetch PeerID";
  const hoprBalance = Number(myUserState?.balances.hopr)/1e18 || 0;
  const [nativeAddress, setNativeAddress] = useState("");
  const [destinationAddress, setDestinationAddress] = useState("");

  getAddr.getAddressFromPeer(myPeerId).then(address => {
    setNativeAddress(address);
  })

  if(props.chatWith) {
  getAddr.getAddressFromPeer(props.chatWith).then(address => {
    setDestinationAddress(address);
  })
  }

  const send = () => {
    const addressInput = document.getElementById(
      "addressInput"
    ) as HTMLInputElement;
    const button = document.getElementById("button");

    if (!isValidEthAddress(addressInput.value)) {
      if (addressInput && button) {
        var lastValue = addressInput.value;
        addressInput.value = "Invalid address!";
        addressInput.placeholder = "Invalid address!";
        addressInput.disabled = true;
        addressInput.style.borderTop = "1.5px solid red";
        addressInput.style.borderLeft = "1.5px solid red";
        addressInput.style.borderBottom = "1.5px solid red";
        button.style.borderRight = "1.5px solid red";
        button.style.borderTop = "1.5px solid red";
        button.style.borderBottom = "1.5px solid red";

        setTimeout(() => {
          addressInput.style.borderTop = "1.5px solid transparent";
          addressInput.style.borderLeft = "1.5px solid transparent";
          addressInput.style.borderBottom = "1.5px solid transparent";
          button.style.borderRight = "1.5px solid transparent";
          button.style.borderTop = "1.5px solid transparent";
          button.style.borderBottom = "1.5px solid transparent";
          addressInput.value = lastValue;
          addressInput.placeholder = "Insert a address";
          addressInput.disabled = false;
          lastValue = "";
        }, 1500);
      }
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.menu}>
          <div className={styles.left} id="leftArea">
            <img
              src="/images/backArrow.svg"
              alt="Icon"
              onClick={() => {
                props.changeChatWith("");
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
        <div className={styles.addressArea}>
          { (destinationAddress !== '') ? (
            <input type="text" id="addressInput" placeholder="Insert a address" value={destinationAddress}></input>
          ): (<input type="text" id="addressInput" placeholder="Insert a address"></input>) }
          <div className={styles.button} id="button">
            <img
              src="/images/send.svg"
              alt="Icon"
              onClick={() => {
                console.log(`Sending Amount to ${destinationAddress}`);
                send();
              }}
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

export default Send;
