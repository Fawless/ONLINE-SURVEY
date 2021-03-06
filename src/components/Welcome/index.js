import React from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

import { GlobalStyle } from "./styles";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faAngleDoubleDown } from "@fortawesome/free-solid-svg-icons";
import { faAngleDoubleUp } from "@fortawesome/free-solid-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { faLinkedinIn } from "@fortawesome/free-brands-svg-icons";

import TitleLogo from "./../../assets/img/logos/OS_white.png";
import biglogo from "./../../assets/img/logos/Online-survey_white.png";

library.add(
  faAngleDoubleDown,
  faAngleDoubleUp,
  faTwitter,
  faFacebookF,
  faLinkedinIn
);

class Welcome extends React.Component {
  render() {
    return (
      <>
        <GlobalStyle />

        <div className="whiteDiv"></div>

        <div className="boxText">
          <div className="boxTextTitre">
            <img
              src={TitleLogo}
              title="Online Survey"
              alt="Logo de Online Survey"
              className="title-logo"
              width="333px"
              height="66px"
            ></img>
          </div>
          <div className="boxTextSlogan">Your forms, made simple</div>

          <div className="div-buttons">
            <Link to="/auth/register">
              <Button className="btn-outline-default btn-inscription">
                Inscription
              </Button>
            </Link>
            <Link to="/auth/login">
              <Button className="btn-outline-default btn-connexion">
                Connexion
              </Button>
            </Link>
          </div>
        </div>

        <div
          className="div-scroll-down"
          onClick={() => {
            window.scrollBy({
              top: window.innerHeight,
              left: 0,
              behavior: "smooth"
            })
          }}
        >
          <div className="div-savoir-plus">En savoir plus</div>
          <div className="div-scroll-down-icon">
            <FontAwesomeIcon
              icon="angle-double-down"
              className="scroll-down-icon"
            />
          </div>
        </div>

        <div
          className="div-scroll-up"
          id="div-scroll-up"
          onClick={() => {
            window.scrollBy({
              top: -window.innerHeight,
              left: 0,
              behavior: "smooth"
            })
          }}
        >
          <div className="div-scroll-up-icon">
            <FontAwesomeIcon
              icon="angle-double-up"
              className="scroll-up-icon"
            />
          </div>
          <div className="div-retour-haut">Retourner en haut</div>
        </div>

        <div className="pave-scroll">
          <div className="container-text">
            <div className="slogan">Your forms, made simple</div>
            <p>
              On sait, on sait : recevoir du feedback, c???est une des choses les
              plus importantes pour votre entreprise. Formulaires de
              satisfaction client, sondages aupr??s de vos collaborateurs,
              questionnaires d?????valuations, fiches de renseignements??? On
              pourrait ??tendre cette liste ?? l???infini. Le temps pass?? ??
              construire ces formulaires, en extraire les donn??es, les compiler
              sous formes de graphiques ou de statistiques pourrait bien
              constituer la majeure partie de votre emploi du temps.
            </p>
            <p>Et c???est l?? qu???on a quelque chose ?? vous proposer :</p>
            <p>
              Online Survey, c???est tout d???abord une solution con??ue pour vous
              faire gagner du temps. Toutes les ??tapes pour recevoir du Feedback
              en une seule application Web d???une simplicit?? d??concertante.
            </p>
            <p>
              Connectez-vous, cr??ez votre formulaire, recevez vos r??ponses,
              visualisez vos r??sultats. Nous pensons que cela ne devrait pas
              ??tre plus compliqu?? que ??a. Et avec Online Survey, ??a ne l???est
              pas.
            </p>
          </div>
          <div className="container-logo">
            <img
              src={biglogo}
              title="Online Survey"
              alt="Logo de Online Survey"
              className="logo"
              width="512px"
              height="512px"
            ></img>
          </div>
        </div>
        {/* footer*/}
        <div className="footer-2">
          <div className="space">
            <Link to="/legal">Mentions l??gales</Link>
            <a href="https://www.facebook.com/OnlineSurveyHe1/" className="icon-facebook">
              <FontAwesomeIcon
                icon={faFacebookF}
                className="scroll-down-icon"
              />
            </a>
            <a
              href="https://twitter.com/OnlineSurveyHe1"
              className="icon-twitter"
            >
              <FontAwesomeIcon icon={faTwitter} className="scroll-down-icon" />
            </a>
            <a
              href="https://www.linkedin.com/company/bigbrotherproject/about/"
              className="icon-linkedin"
            >
              <FontAwesomeIcon
                icon={faLinkedinIn}
                className="scroll-down-icon"
              />
            </a>
            ?? Online Survey - 2020
          </div>
        </div>
      </>
    );
  }
}
export default Welcome;
