import React, { useState } from "react";
import { isValidEthAddress } from "../../utils";
import useAppState, { Settings } from "./../../state/index";
import useUser from "./../../state/user";
import * as getAddr from "./../../utils/getAddr";
import styles from "./style.module.scss";

interface PageType {
  changePageHandle: (value: string | ((prevVar: string) => string)) => void;
  customName?: string;
}

const Send: React.FC<PageType> = (props: PageType) => {
  const settings = useAppState().state.settings as Settings;
  const myUserState = useUser(settings);
  const myPeerId = myUserState?.state.myPeerId || "Can't Fetch PeerID";
  const hoprBalance = Number(myUserState?.balances.hopr) / 1e18 || 0;
  const [nativeAddress, setNativeAddress] = useState("");
  const [status, setStatus] = useState(0);

  getAddr.getAddressFromPeer(myPeerId).then((address) => {
    setNativeAddress(address);
  });

  const send = () => {
    const addressInput = document.getElementById(
      "addressInput"
    ) as HTMLInputElement;
    const valueInput = document.getElementById(
      "valueInput"
    ) as HTMLInputElement;
    const button = document.getElementById("button");

    var errors = 0;

    console.log(valueInput.value);

    if (addressInput && button) {
      if (
        parseInt(valueInput.value) === 0 ||
        valueInput.value === null ||
        !valueInput.value
      ) {
        var lastValue = valueInput.value;
        valueInput.value = "Invalid value!";
        valueInput.placeholder = "Invalid value!";
        valueInput.disabled = true;
        valueInput.style.borderTop = "1.5px solid red";
        valueInput.style.borderLeft = "1.5px solid red";
        valueInput.style.borderBottom = "1.5px solid red";

        setTimeout(() => {
          valueInput.style.borderTop = "1.5px solid transparent";
          valueInput.style.borderLeft = "1.5px solid transparent";
          valueInput.style.borderBottom = "1.5px solid transparent";
          valueInput.value = lastValue;
          valueInput.placeholder = "Insert a value";
          valueInput.disabled = false;
          lastValue = "";
        }, 1500);

        errors += 1;
      }

      if (isValidEthAddress(addressInput.value)) {
        var lastAddress = addressInput.value;
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
          addressInput.value = lastAddress;
          addressInput.placeholder = "Insert a address";
          addressInput.disabled = false;
          lastAddress = "";
        }, 1500);

        errors += 1;
      }

      if (errors === 0) {
        console.log("transferido");
        // @Phillipe
        setStatus(1); //Success
        setStatus(2); //Failed
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
        {status === 0 && (
          <>
            <div className={styles.icon}>
              <img src="/images/user2.svg" alt="HOPR" />
            </div>
            {props.customName && (
              <span className={styles.customName}>{props.customName}</span>
            )}
            <span
              className={styles.wallet}
              style={
                props.customName ? { marginTop: "0" } : { marginTop: "20px" }
              }
            >
              Sending From:
              <br></br>
              {nativeAddress}
            </span>

            <span className={styles.title}>Hopr Token</span>
            <span className={styles.wallet}>
              Balance avaliable: {hoprBalance}
            </span>
            <div className={styles.valueArea}>
              <input
                type="number"
                id="valueInput"
                placeholder="Insert a value"
              />
            </div>
            <div className={styles.addressArea}>
              <input
                type="text"
                id="addressInput"
                placeholder="Insert a address"
              />
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
          </>
        )}
        {status === 1 && (
          <div className={styles.status}>
            <img src="/images/success.svg" alt="Success" />
            <div className={styles.text}>Transaction sent successfully</div>
            <div
              className={styles.button}
              onClick={() => props.changePageHandle("main")}
            >
              OK
            </div>
          </div>
        )}
        {status === 2 && (
          <div className={styles.status}>
            <img src="/images/failed.svg" alt="Success" />
            <div className={styles.text}>
              There was an error in your transaction, try again
            </div>
            <div
              className={styles.button}
              onClick={() => props.changePageHandle("main")}
            >
              OK
            </div>
          </div>
        )}
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
