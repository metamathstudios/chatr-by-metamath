import React from "react";
import Contact from "../Contact";
import styles from "./styles.module.scss";

interface PageType {
  data: string[];
}

const ContactList: React.FC<PageType> = (props: PageType) => {
  console.log(props.data.includes("null"));
  if (!props.data.includes("null")) {
    const renderContacts = (list: string[]) =>
      list.map((value, key) => {
        return <Contact key={key} wallet={value} />;
      });
    return <div className={styles.result}>{renderContacts(props.data)}</div>;
  } else {
    return null;
  }
};

export default ContactList;
