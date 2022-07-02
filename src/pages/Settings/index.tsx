import React, { useEffect } from "react";
import styles from "./style.module.scss";

import AES from "crypto-js/aes";

interface PageType {
  changePageHandle: (value: string | ((prevVar: string) => string)) => void;
}

const Settings: React.FC<PageType> = (props: PageType) => {
  const saveSettings = () => {
    const httpEndpointValue = (
      document.getElementById("httpEndpoint") as HTMLFormElement
    ).value;
    const wsEndpointValue = (
      document.getElementById("wsEndpoint") as HTMLFormElement
    ).value;
    const securityTokenValue = (
      document.getElementById("securityToken") as HTMLFormElement
    ).value;

    const data = {
      HTTPEndpoint: AES.encrypt(
        httpEndpointValue,
        process.env.REACT_APP_SECRET_KEY!
      ).toString(),
      WSEndpoint: AES.encrypt(
        wsEndpointValue,
        process.env.REACT_APP_SECRET_KEY!
      ).toString(),
      SecurityToken: AES.encrypt(
        securityTokenValue,
        process.env.REACT_APP_SECRET_KEY!
      ).toString(),
    };

    if (localStorage) {
      localStorage.setItem("data", JSON.stringify(data));
    }
  };

  useEffect(() => {
    if (localStorage) {
      const data = localStorage.getItem("data");

      if (data) {
        const parsed = JSON.parse(data);

        (document.getElementById("httpEndpoint") as HTMLFormElement).value =
          parsed.HTTPEndpoint;
        (document.getElementById("wsEndpoint") as HTMLFormElement).value =
          parsed.WSEndpoint;
        (document.getElementById("securityToken") as HTMLFormElement).value =
          parsed.SecurityToken;
      }
    }
  });

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
                saveSettings();
              }}
            />
            <span>Settings</span>
          </div>
          <div className={styles.right} />
        </div>
      </header>
      <div className={styles.content}>
        <div className={styles.options}>
          <div className={styles.default}>
            <img src="/images/default.svg" alt="Icon" />
            <span>Default</span>
          </div>
          <div className={styles.cluster}>
            <img src="/images/cluster.svg" alt="Icon" />
            <span>Cluster</span>
          </div>
        </div>
        <div className={styles.inputs}>
          <div className={styles.item}>
            <label>HTTP Endpoint:</label>
            <input type="text" id="httpEndpoint" />
          </div>
          <div className={styles.item}>
            <label>WS Endpoint:</label>
            <input type="text" id="wsEndpoint" />
          </div>
          <div className={styles.item}>
            <label>Security Token</label>
            <input type="password" id="securityToken" />
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

export default Settings;
