import React from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/recipes";
import { FORM } from "../Add recipe";
import "../Add recipe/style.css";
import { Redirect } from "react-router-dom";

class UpdateRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = { form: FORM, file: "", error: "" };
  }

  fileChange = event => {
    this.setState(prevState => ({
      ...prevState,
      error: ""
    }));
    const { updateRecipe } = this.props;
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    if (event.target.files[0].type.split("/")[0] !== "image") {
      this.setState({ error: "File not image" });
    } else if (event.target.size > 1000 * 1024) {
      this.setState({ error: "Max size img 1MB" });
    } else {
      reader.onload = event => {
        updateRecipe("file", event.target.result);
      };
    }
  };

  recipeUpdate = () => {
    const { updateItem, updateRecipeSave } = this.props;
    const newItem = { ...updateItem };
    delete newItem.id;
    updateRecipeSave(updateItem.id, newItem);
  };

  render() {
    const { form } = this.state;
    const { updateItem, isFetching, user, updateRecipe, touch } = this.props;
    return (
      <>
        {updateItem && user.id === updateItem.authorId ? (
          <div className="wrap">
            {isFetching && <div>Loading...</div>}
            <div className="inputs">
              {Object.keys(form).map(el => {
                const { component: Component, props } = form[el];
                return (
                  <Component
                    value={updateItem.el}
                    key={el}
                    onChange={e => updateRecipe(e.target.name, e.target.value)}
                    {...props}
                  />
                );
              })}
              <label className="form-file">
                <input
                  type="file"
                  id="file"
                  className="inputfile"
                  onChange={this.fileChange}
                ></input>
                Select photo
              </label>

              {touch ? (
                <button className="button" onClick={this.recipeUpdate}>
                  Save
                </button>
              ) : null}
              {this.state.error ? <p>{this.state.error}</p> : null}

              <div className="context">
                <p>Title: {updateItem.title}</p>
                <pre className="text-pre">Recipe:{updateItem.text}</pre>
                <img src={updateItem.file} alt="img" className="img"></img>
              </div>
            </div>
          </div>
        ) : (
          <Redirect to="/not" />
        )}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.userReduser.user,
    updateItem: state.recipecReduser.updateItem,
    isFetching: state.recipecReduser.isFetching,
    touch: state.recipecReduser.touch
  };
};

export default connect(
  mapStateToProps,
  actions
)(UpdateRecipe);
