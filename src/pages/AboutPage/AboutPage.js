import { useState } from "react";
import Language from "../../language";

import Navbar from "../../components/Navbar/Navbar";
import styles from "./AboutPage.module.scss";

import {AboutTextsEng, AboutImagesEng, AboutTextsUkr, AboutImagesUkr} from './AboutInfo';

const AboutPage = () => {
  const currentLanguage = Language();
  const [activeAboutTexts] = useState(currentLanguage === 'eng' ? AboutTextsEng : AboutTextsUkr )
  const [activeImages] = useState(currentLanguage === 'eng' ? AboutImagesEng : AboutImagesUkr )

  return (
    <>
      <Navbar isTitleActive={true} />
      <main className={styles.main}>
        <div className={styles.aboutInformation}>
          {activeAboutTexts.map((section) => (
            <section className={styles.aboutSection}>
              <h2 className={styles.aboutTitle}>{section.title}</h2>
              <p className={styles.aboutText}>{section.text}</p>
            </section>
          ))}
        </div>
        <div className={styles.images}>
          {activeImages.map((image) => (
            <div className={styles.imageBlock}>
              <img src={`/aboutImages/${image.path}`} alt={image.path}></img>
              <p>{image.caption}</p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default AboutPage;
