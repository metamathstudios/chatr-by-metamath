import React from "react";
import styles from "./styles.module.scss";
import useAppState, { Settings } from "./../../../state/index";
import useUser, { UserState } from "./../../../state/user";



const PeerID: React.FC = () => {

  const settings = useAppState().state.settings as Settings;
  const myPeerId = useUser(settings);
  
  console.log(myPeerId);
  return (
    <div className={styles.container}>
      <div className={styles.data}>
        <span>Your Peer ID is:</span>
        <div className={styles.id}>
          <span>{myPeerId.state.myPeerId}</span>
        </div>
        <div className={styles.pointer}>
          <img src="/images/copyDark.svg" alt="Icon" />
        </div>
        
      </div>
      <div className={styles.divisor} />
    </div>
  );
};

export default PeerID;
