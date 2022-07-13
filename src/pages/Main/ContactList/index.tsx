import React from "react";
import Contact from "../Contact";
import PeerID from "../PeerID";
import styles from "./styles.module.scss";

interface PageType {
  data: string[];
  changeChatWith: (value: string | ((prevVar: string) => string)) => void;
  changePageHandle: (value: string | ((prevVar: string) => string)) => void;
  removeContact: (value: string | ((prevVar: string) => string)) => void;
}

const ContactList: React.FC<PageType> = (props: PageType) => {
  if (!props.data.includes("null")) {
    const renderContacts = (list: string[]) =>
      list.map((value, key) => {
        return (
          <Contact
            key={key}
            wallet={value}
            changeChatWith={props.changeChatWith}
            changePageHandle={props.changePageHandle}
            removeContact={props.removeContact}
          />
        );
      });
    return (
      <div className={styles.container}>
        <PeerID />
        <div className={styles.result}>{renderContacts(props.data)}</div>
      </div>
    );
  } else {
    return null;
  }
};

export default ContactList;
