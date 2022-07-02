import React, { useEffect, useState } from "react";
import ContactList from "./ContactList";
import Message from "./Message";
import styles from "./style.module.scss";

interface MainType {
  changePageHandle: (value: string | ((prevVar: string) => string)) => void;
}

const Main: React.FC<MainType> = (props: MainType) => {
  /* 
  @Phillipe - Stage description
  
  0 - Loading
  1 - Not configured yet
  2 - Favorites list
  3 - Get Started
  4 - Searching
  5 - Searched contacts list
  6 - Search found nothing
  */

  const [stage, setStage] = useState(0);
  const [data, setData] = useState([""]);
  const [favData, setFavData] = useState([""]);
  const [notifications, setNotifications] = useState([""]);

  useEffect(() => {
    if (localStorage) {
      const data = localStorage.getItem("data");
      const favoritesData = localStorage.getItem("favorited")?.split(",");

      if (data) {
        const parsed = JSON.parse(data);
        if (
          parsed.HTTPEndpoint !== "" &&
          parsed.WSEndpoint !== "" &&
          parsed.SecurityToken !== ""
        ) {
          if (favoritesData) {
            setStage(2);
            setFavData(favoritesData);
          } else {
            setStage(3);
          }
        } else {
          setStage(1);
          setNotifications(["settings"]);
        }
      } else {
        setStage(1);
        setNotifications(["settings"]);
      }
    }
  }, []);

  const delay = (amount = 750) =>
    new Promise((resolve) =>
      setTimeout(resolve, amount)
    ); /* @Phillipe método utilizado para testes (descartável) */

  const search = async (wallet: string) => {
    if (wallet.length < 8) {
      const searchElement = document.getElementById("search");
      const walletInput = document.getElementById(
        "walletInput"
      ) as HTMLInputElement;

      if (searchElement && walletInput) {
        var lastValue = walletInput.value;
        walletInput.value = "Wallet too short!";
        walletInput.placeholder = "Wallet too short!";
        walletInput.disabled = true;
        searchElement.style.outline = "1.5px solid red";

        setTimeout(() => {
          searchElement.style.outline = "1.5px solid transparent";
          walletInput.value = lastValue;
          walletInput.placeholder = "Search a user wallet...";
          walletInput.disabled = false;
          lastValue = "";
        }, 1500);
      }
    } else {
      setStage(0);
      await delay(); /* @Phillipe método utilizado para testes (descartável) */

      /* @Phillipe colocar método de busca de wallet aqui */

      /* @Phillipe dados fictícios apenas para testes */
      const fictionalData = ["0x71C7656EC7ab88b098defB751B7401B5f6d8976F"];

      setData(fictionalData);
      setStage(5);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.menu}>
          <div className={styles.left}>ChatR</div>
          <div className={styles.right}>
            {notifications.includes("gift") ? (
              <img
                src="/images/giftNotification.svg"
                alt="Icon"
                onClick={() => props.changePageHandle("gift")}
              />
            ) : (
              <img
                src="/images/gift.svg"
                alt="Icon"
                onClick={() => {
                  props.changePageHandle("gift");
                }}
              />
            )}
            {notifications.includes("wallet") ? (
              <img
                src="/images/walletNotification.svg"
                alt="Icon"
                onClick={() => props.changePageHandle("wallet")}
              />
            ) : (
              <img
                src="/images/wallet.svg"
                alt="Icon"
                onClick={() => props.changePageHandle("wallet")}
              />
            )}
            {notifications.includes("settings") ? (
              <img
                src="/images/gearNotification.svg"
                alt="Icon"
                onClick={() => props.changePageHandle("settings")}
              />
            ) : (
              <img
                src="/images/gear.svg"
                alt="Icon"
                onClick={() => props.changePageHandle("settings")}
              />
            )}
          </div>
        </div>
        <div className={styles.search}>
          <div className={styles.bar} id="search">
            <input
              type="text"
              placeholder="Search a user wallet..."
              id="walletInput"
            />
            <div className={styles.icon}>
              <img
                src="/images/search.svg"
                alt="Icon"
                onClick={() =>
                  search(
                    (document.getElementById("walletInput") as HTMLInputElement)
                      .value
                  )
                }
              />
            </div>
          </div>
        </div>
      </header>
      <div className={styles.content}>
        {stage === 0 && (
          <img
            src="/images/loading.gif"
            alt="Loading"
            style={{ width: "40px" }}
          />
        )}
        {stage === 1 && (
          <Message
            icon="gear2"
            text="Your settings are not complete, please complete to continue."
            button={{ image: "superarrow" }}
            action={props.changePageHandle}
          />
        )}
        {stage === 2 && <ContactList data={favData} />}
        {stage === 3 && (
          <Message
            icon="search"
            text="Don't know how to chat and send your token? search wallet ID to get
        started"
          />
        )}
        {stage === 4 && <Message icon="search" text="Searching..." />}
        {stage === 5 && <ContactList data={data} />}
        {stage === 6 && (
          <Message
            icon="notSearching"
            text="We didn't find any user with that ID, check and try again"
          />
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

export default Main;
