import { useState } from "react";
import styles from "./styles.module.scss";

import Gift from "../pages/Gift";
import Main from "../pages/Main";
import Settings from "../pages/Settings";
import Wallet from "../pages/Wallet";

function App() {
  const [page, setPage] = useState("main");
  return (
    <div className={styles.app}>
      {page === "main" && <Main changePageHandle={setPage} />}
      {page === "settings" && <Settings changePageHandle={setPage} />}
      {page === "gift" && <Gift changePageHandle={setPage} />}
      {page === "wallet" && <Wallet changePageHandle={setPage} />}
    </div>
  );
}

export default App;
