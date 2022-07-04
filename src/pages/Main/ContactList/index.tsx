import React from "react";
import Contact from "../Contact";
import styles from "./styles.module.scss";

interface PageType {
  data: string[];
  changeChatWith: (value: string | ((prevVar: string) => string)) => void;
  changePageHandle: (value: string | ((prevVar: string) => string)) => void;
}

const ContactList: React.FC<PageType> = (props: PageType) => {
  console.log(props.data.includes("null"));
  if (!props.data.includes("null")) {
    const renderContacts = (list: string[]) =>
      list.map((value, key) => {
        return (
          <Contact
            key={key}
            wallet={value}
            changeChatWith={props.changeChatWith}
            changePageHandle={props.changePageHandle}
          />
        );
      });
    return <div className={styles.result}>{renderContacts(props.data)}</div>;
  } else {
    return null;
  }
};

export default ContactList;
