import React from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

import { GlobalStyle } from "./styles";

import $ from "jquery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faAngleDoubleDown } from "@fortawesome/free-solid-svg-icons";
import { faAngleDoubleUp } from "@fortawesome/free-solid-svg-icons";

import logo from "./../../assets/img/icons/common/logo512.png";

library.add(faAngleDoubleDown, faAngleDoubleUp);

class Welcome extends React.Component {
  render() {
    return (
      <>
        <GlobalStyle />

        <div className="whiteDiv"></div>

        <div className="boxText">
          <div className="boxTextTitre">Online Survey</div>
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
          onClick={(e) => {
            e.preventDefault();
            $("html, body").animate(
              {
                scrollTop: $(document).height(),
              },
              500
            );
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
          onClick={(e) => {
            e.preventDefault();
            $("html, body").animate(
              {
                scrollTop: 0,
              },
              350
            );
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
          <div className="container-logo">
            <img
              src={logo}
              title="Online Survey"
              alt="Logo de Online Survey"
            ></img>
          </div>

          <div className="slogan">Your forms, made simple</div>
          <p>
            On sait, on sait : recevoir du feedback, c’est une des choses les
            plus importantes pour votre entreprise. Formulaires de satisfaction
            client, sondages auprès de vos collaborateurs, questionnaires
            d’évaluations, fiches de renseignements… On pourrait étendre cette
            liste à l’infini. Le temps passé à construire ces formulaires, en
            extraire les données, les compiler sous formes de graphiques ou de
            statistiques pourrait bien constituer la majeure partie de votre
            emploi du temps.
          </p>
          <p>Et c’est là qu’on a quelque chose à vous proposer :</p>
          <p>
            Online Survey, c’est tout d’abord une solution conçue pour vous
            faire gagner du temps. Toutes les étapes pour recevoir du Feedback
            en une seule application Web d’une simplicité déconcertante.
          </p>
          <p>
            Connectez-vous, créez votre formulaire, recevez vos réponses,
            visualisez vos résultats. Nous pensons que cela ne devrait pas être
            plus compliqué que ça. Et avec Online Survey, ça ne l’est pas.
          </p>
        </div>
        {/* footer*/}
        <div></div>
      </>
    );
  }
}
export default Welcome;
