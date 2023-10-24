import { useParams } from "react-router-dom";
import Language from "../../language";

import Navbar from "../../components/Navbar/Navbar";
import styles from "./PoetPage.module.scss";

import { poetsEng, poetsUkr } from "../../poets";

const PoetPage = () => {
  const params = useParams();
  

  const currentLanguage = Language();
  const currentPoetSlug = params.poetSlug;

  const getPoetBySlug = (slug) => {
    const activePoetsList = (currentLanguage === "eng") ? poetsEng : poetsUkr;
    let foundPoet = null
    activePoetsList.forEach((poet) => {
      console.log(poet.slug);
      console.log(slug);
      if (poet.slug === slug) {
        foundPoet = poet;
      }
    })
    return foundPoet;
  }
  const currentPoet = getPoetBySlug(currentPoetSlug);

  return (
    <>
      <Navbar />
      {currentPoet && (
        <main className={styles.main}>
          <div className={styles.bio}>
            <h2 className={styles.title}>{currentPoet.name}</h2>
            <span className={styles.years}>
              {currentPoet.years && currentPoet.years}
            </span>
            {currentPoet.imageFile && <img src={"/poetImages/" + currentPoet.imageFile} alt={currentPoet.imageFile}></img>}
            <p className={styles.bioText}>
              {currentPoet.bio && currentPoet.bio}
            </p>
          </div>
          <div className={styles.gap}></div>
          {currentPoet.unavailable && (
            <div className={styles.poems}>
              <div className={styles.poem}>
                <h3>{currentPoet.unavailable}</h3>
              </div>
            </div>
          )}
          {currentPoet.poems && !!currentPoet.poems.length &&(<div className={styles.poems}>
            {
              currentPoet.poems.map((poem) => (
                <div className={styles.poem}>
                  <h3>{poem.title}</h3>
                  <pre>{poem.text}</pre>
                  <span>{poem.year}</span>
                </div>
              ))
            }
          </div>)}
        </main>
      )}
    </>
  );
};

export default PoetPage;
