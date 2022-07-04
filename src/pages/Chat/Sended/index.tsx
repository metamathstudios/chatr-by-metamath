import React from "react";
import styles from "./style.module.scss";

interface ComponentType {
  text: string;
}

const Sended: React.FC<ComponentType> = (props: ComponentType) => {
  return (
    <div className={styles.container}>
      <div className={styles.message}>
        <div className={styles.wrapper}>
          <span>{props.text}</span>
        </div>
      </div>
    </div>
  );
};

export default Sended;
