import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import Language from "../../language";

import Navbar from '../../components/Navbar/Navbar';
import styles from './MainPage.module.scss';

import {poetsEng, poetsUkr} from "../../poets";


const MainPage = () => {

  const { t } = useTranslation();
  const currentLanguage = Language();
  const containerRef = useRef(null);
  const heading = useRef(null);

  const [isHeadingStriked, setIsHeadingStriked] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const yearPoets = {};


  useEffect(() => {

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    const poetsLines = Array.from(containerRef.current.querySelectorAll('div'));
    console.log(poetsLines);
    poetsLines.forEach(poetsLine => {
      if (poetsLine.className !== "") {
        console.log(poetsLine.offsetTop);
        const percentageLeft = (+poetsLine.className - 1) / 11 * 100;
        const ml = (isMobile) ? (containerRef.current.offsetWidth - poetsLine.offsetWidth - 0) / 100 * percentageLeft : (containerRef.current.offsetWidth - poetsLine.offsetWidth - 60) / 100 * percentageLeft;
        poetsLine.style.marginLeft = ml + 'px';
      }
    })

    const yearGroups = {};

    const links = document.querySelectorAll(".poetLink");
    links.forEach((link) => {
      link.style.transition = 'none';
      link.style.opacity = '0';
      const classNames = link.classList;
      const yearClass = Array.from(classNames).find((className) =>
        /\b\d{4}\b/.test(className)
      );

      if (yearClass) {
        const year = yearClass.match(/\d{4}/)[0];
        if (!yearGroups[year]) {
          yearGroups[year] = [];
        }
        yearGroups[year].push(link);
      }
    });

    Object.values(yearGroups).forEach((group, groupIndex) => {
      group.forEach((link, index) => {
        setTimeout(() => {
          link.style.transition = 'opacity 1s';
          link.style.opacity = '1';
        }, (groupIndex * 100) + (index * 100)); // Adjust the delay as needed (in milliseconds)
      });
    });

     return () => {
       window.removeEventListener("resize", handleResize);
     };

  },[currentLanguage, isMobile]);

  const activePoets = () => {
    if (currentLanguage === "ukr") {
      return poetsUkr;
    } else {
      return poetsEng;
    }
  }

  for (let i = 1925; i <= 1987; i++) {
    yearPoets[i] = [];
    activePoets().forEach((poet) => {
      if (+poet.deathYear === i) {
        yearPoets[i].push(poet);
      }
    })
  }

  const strike = (element) => {
    element.style.textDecoration = "line-through";
  }

  const handleScroll = () => {
    console.log(containerRef.current.scrollTop);
    if ((containerRef.current.scrollTop >= 50) && !isHeadingStriked) {
      strike(heading.current);
      setIsHeadingStriked(true);
    }
    if ((containerRef.current.scrollTop >= 70)) {
      const poetLinks = document.querySelectorAll('.poetLink');
      poetLinks.forEach((poetLink) => {
        const poetLinkRect = poetLink.getBoundingClientRect();
        if (!isMobile) {
          if (poetLinkRect.top <= 140) {
            strike(poetLink);
          }
        } else {
          if (poetLinkRect.top <= 200) {
            strike(poetLink);
          }
        }
      })
    }
  }


  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.title}>
          <h1 className={styles.heading}>
            <Link to="about">
              <span className={styles.headingUn} ref={heading}>
                {t("un")}
              </span>
              {t("executed renaissance")}
            </Link>
          </h1>
          <span>{t("title info")}</span>
        </div>
        <ul
          className={styles.yearList}
          ref={containerRef}
          onScroll={() => handleScroll()}
        >
          {Object.entries(yearPoets).map(([year, poets]) => (
            <li>
              {!!poets.length && (
                <div className={poets[0].deathMonth}>
                  {poets.map((poet, i) => (
                    <>
                      {i >= 1 &&
                        poets[i - 1].deathMonth !== poet.deathMonth && (
                          <pre>{`\n\t`}</pre>
                        )}
                      <Link
                        className={`${styles.poetLink} poetLink ${poet.startYear}`}
                        to={`poets/${poet.slug}`}
                      >
                        {poet.name}
                      </Link>
                      {i !== poets.length - 1 && <span>, </span>}
                    </>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}

export default MainPage;