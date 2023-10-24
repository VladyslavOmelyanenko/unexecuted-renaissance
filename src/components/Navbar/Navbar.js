import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Language from "../../language";

import styles from './Navbar.module.scss';

const Navbar = ({isTitleActive}) => {

  const { t } = useTranslation();
  const currentLanguage = Language();
  const { pathname } = useLocation();

  const getMatchingRoute = (language) => {
    const numberOfDashes = pathname.split("/").length - 1;
    let pathWithoutLanguage;
    if (numberOfDashes >= 2) {
      pathWithoutLanguage = pathname.slice(pathname.indexOf("/", 1));
    } else {
      pathWithoutLanguage = "";
    }
    return "/" + language + pathWithoutLanguage;
  };

  return (
    <nav className={styles.navbar}>
      <Link to={"/" + currentLanguage} className={styles.navbarLink}>
        {isTitleActive ? (
          <>
            {t("poetry of")} <i>{t("un")}</i>{t("executed renaissance")}
          </>
        ) : (
          t("poetry of")
        )}
      </Link>
      <ul className={styles.languages}>
        <li>
          <Link to={getMatchingRoute("eng")}>eng</Link>
        </li>
        /
        <li>
          <Link to={getMatchingRoute("ukr")}>укр</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
