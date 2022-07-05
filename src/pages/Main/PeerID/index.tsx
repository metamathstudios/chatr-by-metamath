import React from "react";
import styles from "./styles.module.scss";

const PeerID: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.data}>
        <span>Your Peer ID is:</span>
        <div className={styles.id}>
          <span>dainsdoaisndaiidan2...</span>
          <img src="/images/copyDark.svg" alt="Icon" />
        </div>
      </div>
      <div className={styles.divisor} />
    </div>
  );
};

export default PeerID;
