import React, { useEffect, useState } from "react";
import { formatWallet } from "../../../utils";
import styles from "./styles.module.scss";

interface PageType {
  wallet: string;
  customName?: string;
}

const Contact: React.FC<PageType> = (props: PageType) => {
  const [favorited, setFavorited] = useState(false);

  const addFavorite = (wallet: string) => {
    var favorites = [""];
    const icon = document.getElementById("favIcon") as HTMLImageElement;

    if (localStorage) {
      if (localStorage.getItem("favorited")) {
        favorites = localStorage.getItem("favorited")!.split(",");
        if (!favorites.includes(wallet)) {
          if (!favorites.includes("null")) {
            favorites.push(wallet);
            localStorage.setItem("favorited", favorites.toString());
            icon.src = "/images/favorited.svg";
            window.location.reload();
          } else {
            favorites.shift();
            favorites.push(wallet);
            localStorage.setItem("favorited", favorites.toString());
            icon.src = "/images/favorited.svg";
            window.location.reload();
          }
        }
      } else {
        favorites.shift();
        favorites.push(wallet);
        localStorage.setItem("favorited", favorites.toString());
        icon.src = "/images/favorited.svg";
        window.location.reload();
      }
    }
  };

  const removeFavorite = (wallet: string) => {
    var favorites = [""];
    const icon = document.getElementById("favIcon") as HTMLImageElement;

    if (localStorage) {
      const data = localStorage.getItem("favorited");
      if (data) {
        const index = localStorage
          .getItem("favorited")!
          .split(",")
          .indexOf(wallet);
        if (index > -1) {
          if (data!.split(",").length > 1) {
            localStorage.setItem(
              "favorited",
              favorites.splice(index, 1).toString()
            );
            icon.src = "/images/unfavorited.svg";
            window.location.reload();
          } else {
            localStorage.setItem("favorited", "null");
            icon.src = "/images/unfavorited.svg";
            window.location.reload();
          }
        }
      }
    }
  };

  useEffect(() => {
    if (localStorage) {
      const favoritedWallets = localStorage.getItem("favorited");
      if (favoritedWallets) {
        if (favoritedWallets.includes(props.wallet)) {
          setFavorited(true);
        } else {
          setFavorited(false);
        }
      }
    }
  }, [favorited, props.wallet]);

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
            ? formatWallet(props.wallet, 18)
            : formatWallet(props.wallet, 24)}
        </span>
      </div>
      <div className={styles.favorite}>
        {favorited ? (
          <img
            src="/images/favorited.svg"
            alt="Icon"
            onClick={() => removeFavorite(props.wallet)}
            id="favIcon"
          />
        ) : (
          <img
            src="/images/unfavorited.svg"
            alt="Icon"
            onClick={() => addFavorite(props.wallet)}
            id="favIcon"
          />
        )}
        <img src="/images/send.svg" alt="Icon" />
      </div>
    </div>
  );
};

export default Contact;
