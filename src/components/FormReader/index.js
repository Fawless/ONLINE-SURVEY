import React from "react";
import Axios from "axios";
import TextQuestion from "./TextQuestion";
import RadioQuestion from "./RadioQuestion";
import CheckBoxQuestion from "./CheckBoxQuestion";
import NumberQuestion from "./NumberQuestion";
import { Form, Button } from "reactstrap";

import { GlobalStyle } from "./styles";
import FormValidation from "../FormValidation";

class FormReader extends React.Component {
  constructor(props) {
    super(props);
    this.state = { FormContent: null, items: [], HasAnswered: false };
    this.FormID = null;
    this.SendAnswers = this.SendAnswers.bind(this);
  }

  async SendAnswers() {
    var inputs = document.getElementById("Form").elements;
    var inputs_data = [];
    for (let i = 0; i < inputs.length - 1; i++) {
      switch (inputs[i].type) {
        case "text":
          if (inputs[i].value !== "") {
            inputs_data.push({
              answerid: inputs[i].id,
              questionid: inputs[i].attributes[1].nodeValue,
              value: inputs[i].value.replace(/'/g, "''"),
            });
          }
          break;
        case "radio":
          if (inputs[i].checked) {
            inputs_data.push({
              answerid: inputs[i].id,
              questionid: inputs[i].attributes[0].nodeValue,
              value: inputs[i].labels[0].textContent,
            });
          }
          break;
        case "checkbox":
          if (inputs[i].checked) {
            inputs_data.push({
              answerid: inputs[i].id,
              questionid: inputs[i].attributes[0].nodeValue,
              value: inputs[i].labels[0].textContent,
            });
          }
          break;
        case "number":
          if (inputs[i].value !== "") {
            inputs_data.push({
              answerid: inputs[i].id,
              questionid: inputs[i].attributes[1].nodeValue,
              value: inputs[i].value,
            });
          }
          break;
        default:
          console.error("Unknown answer type : " + inputs[i].type);
          break;
      }
    }
    let SendAnswer_promise = await Axios({
      method: "post",
      url: process.env.REACT_APP_API_URL + "/send_form/" + this.FormID,
      withCredentials: true,
      data: inputs_data,
    });
    if (SendAnswer_promise.data) {
      this.setState({ HasAnswered: true });
    } else {
      alert("Quelque chose s'est mal pass??. Vous ??tes peut-??tre d??connect??.");
    }
  }

  async componentDidMount() {
    var pageURL = window.location.href;
    this.FormID = pageURL.substr(pageURL.lastIndexOf("/") + 1);

    let Check_validation_promise = await Axios({
      method: "get",
      url: process.env.REACT_APP_API_URL + "/HasAnswered/" + this.FormID,
      withCredentials: true,
    });

    if (!Check_validation_promise.data) {
      // get Form content from FormID

      let GetFormPromise = await Axios({
        method: "get",
        url: process.env.REACT_APP_API_URL + "/form/" + this.FormID,
        withCredentials: true,
      });
      let FormContent = await GetFormPromise.data;
      if (FormContent) {
        let items = [];
        for (let i = 0; i < FormContent.content.length; i++) {
          switch (FormContent.content[i].type) {
            case "text":
              items.push(
                <TextQuestion key={i} data={FormContent.content[i]} />
              );
              break;
            case "radio":
              items.push(
                <RadioQuestion key={i} data={FormContent.content[i]} />
              );
              break;
            case "checkbox":
              items.push(
                <CheckBoxQuestion key={i} data={FormContent.content[i]} />
              );
              break;
            case "number":
              items.push(
                <NumberQuestion key={i} data={FormContent.content[i]} />
              );
              break;

            default:
              console.error(
                "Unknown question type : " + FormContent.content[i].type
              );
              break;
          }
        }
        this.setState({ FormContent: FormContent, items: items });
      } else {
        alert("Ce formulaire n'existe pas.");
        document.location.href = "/form";
      }
    } else {
      this.setState({ HasAnswered: true });
    }
  }

  Validity() {
    if (document.forms["Form"].reportValidity()) {
      // browse all inputs to find if there is checkboxes
      var inputs = document.forms["Form"].getElementsByTagName("input");
      var can_send_answers = true;
      var Validity_error = false;
      for (let index = 0; index < inputs.length; index++) {
        const element = inputs[index];
        // if find a checkbox
        if (
          element.matches('[type="checkbox"]') &&
          element.matches('[isrequired="1"]')
        ) {
          // there maybe a validity error so
          var input_family = document.getElementsByName(element.name);
          Validity_error = true;
          // check if any of the checkboxes of the same family has been checked
          for (let index = 0; index < input_family.length; index++) {
            const element = input_family[index];
            if (element.checked) {
              // if at least one is checked there is no validity error
              Validity_error = false;
            }
          }
        }
        if (Validity_error) {
          can_send_answers = false;
          for (var i = 0; i < input_family.length; i++) {
            var currentinput = input_family[i];
            currentinput.classList.toggle("red-border", true);
          }

          // validity error on checkboxes
          // custom validity here
        }
      }
      if (can_send_answers) {
        this.SendAnswers();
      }
    }
  }

  render() {
    if (!this.state.HasAnswered) {
      return (
        <>
          <GlobalStyle />
          {this.state.FormContent != null ? (
            <>
              <Form id="Form" className="fullCard bg-secondary shadow border-0">
                <div className="form-title">
                  {this.state.FormContent.title.replace(/[&]nbsp[;]/gi, " ")}
                </div>
                {this.state.items}
                <div className="card-bottom">
                  <Button
                    className="btn-icon send-form-button"
                    color="default"
                    onClick={() => {
                      this.Validity();
                    }}
                    value="Send"
                  >
                    Envoyer
                  </Button>
                </div>
              </Form>
            </>
          ) : null}
        </>
      );
    } else {
      return <FormValidation FormID={this.FormID} />;
    }
  }
}

export default FormReader;
