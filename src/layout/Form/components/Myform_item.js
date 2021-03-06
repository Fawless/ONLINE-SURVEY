import React from "react";
import { Card } from "reactstrap";

import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faShareAlt } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import ClipboardJS from "clipboard";
import Axios from "axios";
library.add(faShareAlt, faEdit, faChevronRight);

class FormTitle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { nb_answer: 0 };
  }

  async componentDidMount() {
    let nb_answer_promise = await Axios({
      method: "get",
      url:
        process.env.REACT_APP_API_URL + "/numberofanswer/" + this.props.data.id,
      withCredentials: true,
      data: { FormID: this.props.data.id },
    });
    this.setState({
      nb_answer: nb_answer_promise.data,
    });
  }

  async send_stats() {
    try {
      let question_list_promise = await Axios({
        method: "get",
        url: process.env.REACT_APP_API_URL + "/question_list/" + this.props.id,
        withCredentials: true,
      });
      var stats = [];
      let item_processed = 0;
      question_list_promise.data.forEach(async (question) => {
        let question_info_promise = await Axios({
          method: "get",
          url: process.env.REACT_APP_API_URL + "/question_info/" + question.id,
          withCredentials: true,
        });

        let answers_promise = await Axios({
          method: "get",
          url:
            process.env.REACT_APP_API_URL + "/question_answers/" + question.id,
          withCredentials: true,
        });

        let answers = [];
        answers_promise.data.forEach((element) => {
          answers.push(element.text);
        });
        stats.push({
          type: question_info_promise.data.type,
          name: question_info_promise.data.text,
          answers: answers,
        });
        item_processed++;
        if (item_processed === question_list_promise.data.length) {
          this.props.updt_selected_form_card(stats);
        }
      });
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    new ClipboardJS(".div-share-form");
    return (
      <Card className="form-list-card-form">
        <div className="div-title-form">
          {(() => {
            let FormName = this.props.data.name.replace(/[&]nbsp[;]/gi, " ");
            FormName = FormName.replace(/[<]br[^>]*[>]/gi, "");
            return FormName;
          })()}
        </div>
        <div className="div-trash-icon">
          <button
            type="button"
            className="close button-delete-form"
            aria-label="Close"
            onClick={() => {
              this.props.remove_form(this.props.idx, this.props.id);
            }}
          >
            <FontAwesomeIcon icon="trash-alt" className="fa-s trash-icon" />
          </button>
        </div>
        <div className="div-answers-share">
          <div className="div-answers-form">
            {this.state.nb_answer} R??ponse(s) -{" "}
          </div>
          <div
            className="div-share-form"
            data-clipboard-text={this.props.FormLink}
            onClick={() => {
              let popup = document.getElementsByClassName("popup-share")[
                this.props.reverse_idx
              ];
              popup.classList.toggle("visible", true);
              setTimeout(() => {
                popup.classList.toggle("visible", false);
              }, 2000);
            }}
          >
            Partager
            <FontAwesomeIcon icon="share-alt" className="fa-s share-icon" />
            <span className="popup-share">Lien copi?? !</span>
          </div>
        </div>
        <Link
          to={"form/" + this.props.data.id + "/edit"}
          className="div-edit-form"
        >
          <FontAwesomeIcon icon="edit" className="fa-s edit-icon icon-gauche" />
          ??diter le formulaire
          <FontAwesomeIcon icon="edit" className="fa-s edit-icon icon-droite" />
        </Link>
        <div
          className="div-stats-form"
          onClick={() => {
            this.send_stats();

            window.scrollBy({
              top: 10000,
              left: 0,
              behavior: "smooth"
            })

          }}
        >
          R??sultats et statistiques
          <FontAwesomeIcon icon="chevron-right" className="fa-xl stats-icon" />
        </div>
      </Card>
    );
  }
}

export default FormTitle;
