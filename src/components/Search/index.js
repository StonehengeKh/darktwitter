import React from 'react';
import { connect } from "react-redux";
import { Card } from "../Card"
import { searchRecipes } from "../../actions/recipes";
import './style.css'

class Search extends React.Component {

  state = { search: "" }


  change = e => this.setState({search: e})
  

  searching = () => {
    const { searchRecipes } = this.props
    searchRecipes(this.state.search)
  }


  render() {
    const { search} = this.state;
    const { searchItems, searchError } = this.props
    return (
      <div className="search-wrap">
        <label htmlFor="" className="input__label lable">Search
            <input name="search" value={this.state.search} type="text" className="input-number" onChange={e => this.change(e.target.value)} />
          {search ? <button className="button-rec" onClick={this.searching}>go</button> :
            <button className="button-rec">go</button>}
        </label>
        <div className="revers">
          {searchItems ? searchItems.map(rec => {
            const { file, title, id } = rec;
            return <Card title={title} key={id} id={id} file={file} />
          })
            : null}
        </div>
        {searchError ? <p>Recipe not found</p> : null}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    searchItems: state.recipecReduser.searchItems,
    searchError: state.recipecReduser.searchError,
    isFetching: state.recipecReduser.isFetching
  };
};

export default connect(mapStateToProps, { searchRecipes })(Search);