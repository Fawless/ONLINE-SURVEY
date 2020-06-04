import React from "react";
import RadioAnswer from "./RadioAnswer";
import { Button } from "reactstrap";

class RadioAnswerList extends React.Component {
  constructor(props) {
    super(props);
    if (typeof this.props.answers == Array) {
      this.state = { answers: this.props.answers };
    } else {
      this.state = {
        answers: [{ checked: false }, { checked: false }],
      };
    }
    this.AddRadioButton = this.AddRadioButton.bind(this);
    this.RemoveRadioButton = this.RemoveRadioButton.bind(this);
    this.HandleRadioTextChange = this.HandleRadioTextChange.bind(this);
  }

  HandleRadioTextChange(id, NewText) {
    let temp_answers = this.state.answers;
    temp_answers[id].text = NewText;
    this.setState({ answers: temp_answers });
    this.props.HandlePremadeAnswerChange(
      this.props.index,
      "radio",
      this.state.answers
    );
  }

  HandleRadioCheckChange(id, NewText) {}

  AddRadioButton() {
    let temp_answers = this.state.answers;
    temp_answers.push({ text: "new", checked: false });
    this.setState({ answers: temp_answers });
    this.props.HandlePremadeAnswerChange(
      this.props.index,
      "radio",
      this.state.answers
    );
  }

  RemoveRadioButton(id) {
    let temp_answers = this.state.answers;
    temp_answers.splice(id, 1);
    this.setState({ answers: temp_answers });
    this.props.HandlePremadeAnswerChange(
      this.props.index,
      "radio",
      this.state.answers
    );
  }

  render() {
    var items = [];
    for (var i = 0; i < this.state.answers.length; i++) {
      items.push({
        id: i,
        value: this.state.answers[i].text,
        checked: this.state.answers[i].checked,
      });
    }
    return (
      <>
        {items.map((RadioAnswerItem) => (
          <RadioAnswer
            id={RadioAnswerItem.id}
            key={RadioAnswerItem.id}
            index={this.props.index}
            value={RadioAnswerItem.value}
            checked={RadioAnswerItem.checked}
            RemoveRadioButton={this.RemoveRadioButton}
            HandleRadioTextChange={this.HandleRadioTextChange}
          />
        ))}

        <Button
          color="default"
          outline
          type="button"
          className="button-add-option"
          onClick={this.AddRadioButton}
        >
          Ajouter une option
        </Button>
      </>
    );
  }
}

export default RadioAnswerList;
