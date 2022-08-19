import React from "react";
import { isValidEthAddress } from "../../utils";
import styles from "./style.module.scss";

interface PageType {
  changePageHandle: (value: string | ((prevVar: string) => string)) => void;
  customName?: string;
}

const Send: React.FC<PageType> = (props: PageType) => {
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
          Sending From: KSAUBDAUDIBASDIUBASDIUBSADIUBSA
        </span>

        <span className={styles.title}>Hopr Token</span>
        <span className={styles.wallet}>Balance avaliable: 500</span>
        <div className={styles.addressArea}>
          <input type="text" id="addressInput" placeholder="Insert a address" />
          <div className={styles.button} id="button">
            <img
              src="/images/send.svg"
              alt="Icon"
              onClick={() => {
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
