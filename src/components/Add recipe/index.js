import React from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/recipes";
import "./style.css";

export const FORM = {
  title: {
    props: {
      type: "text",
      name: "title",
      placeholder: "Title",
      className: "title"
    },
    value: "",
    component: props => <input {...props} />
  },
  text: {
    props: {
      type: "text",
      name: "text",
      placeholder: "Recipe",
      className: "text"
    },
    value: "",
    component: props => <textarea {...props} />
  }
};

class AddRecipes extends React.Component {
  constructor(props) {
    super(props);
    this.state = { form: FORM, file: "", error: "" };
  }

  handleChange = event => {
    const { value, name } = event.target;
    this.setState(prevState => ({
      ...prevState,
      form: {
        ...prevState.form,
        [name]: {
          ...prevState.form[name],
          value
        }
      }
    }));
  };

  save = () => {
    const date = new Date().toLocaleString();
    const { user, addRecipes } = this.props;
    const values = Object.keys(this.state.form).reduce((prev, elem) => {
      return { ...prev, [elem]: this.state.form[elem].value };
    }, {});
    values.file = this.state.file;
    values.authorId = user.id;
    values.login = user.login;
    values.date = date;
    this.setState(prevState => ({
      ...prevState,
      form: FORM,
      file: "",
      error: ""
    }));
    addRecipes(values);
  };

  fileChange = event => {
    this.setState(prevState => ({
      ...prevState,
      error: ""
    }));
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    if (event.target.files[0].type.split("/")[0] !== "image") {
      this.setState({ error: "File not image" });
    } else if (event.target.size > 1000 * 1024) {
      this.setState({ error: "Max size img 1MB" });
    } else {
      reader.onload = event => {
        this.setState(prevState => ({
          ...prevState,
          file: event.target.result,
          error: ""
        }));
      };
    }
  };

  render() {
    const { form } = this.state;
    const { isFetching } = this.props;

    return (
      <div className="wrap">
        {isFetching && <div>Loading...</div>}
        <div className="inputs">
          {Object.keys(form).map(el => {
            const { component: Component, props, value } = form[el];
            return (
              <Component
                value={value}
                key={el}
                onChange={this.handleChange}
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

          {this.state.error ? (
            <p className="add-error">{this.state.error}</p>
          ) : null}
          <button className="button" onClick={this.save}>
            SAVE
          </button>

          <div className="context">
            <p>Title: {this.state.form.title.value}</p>
            <pre className="text-pre">Recipe:{this.state.form.text.value}</pre>

            {this.state.file ? (
              <img src={this.state.file} alt="img" className="img"></img>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.userReduser.user,
    isFetching: state.recipecReduser.isFetching
  };
};

export default connect(
  mapStateToProps,
  actions
)(AddRecipes);
