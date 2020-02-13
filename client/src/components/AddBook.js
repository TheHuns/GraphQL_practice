import React, { Component } from "react";
import { graphql } from "react-apollo";
import { flowRight as compose } from "lodash";
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery
} from "../queries/queries";

class AddBook extends Component {
  state = {
    name: "",
    genre: "",
    authorId: ""
  };

  displayAuthors() {
    let data = this.props.getAuthorsQuery;
    if (data.loading) {
      return (
        <option value="" disabled>
          Loading Authors
        </option>
      );
    } else {
      return data.authors.map(author => {
        return (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        );
      });
    }
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submitForm = e => {
    e.preventDefault();

    let { name, genre, authorId } = this.state;

    this.props.addBookMutation({
      variables: {
        name,
        genre,
        authorId
      },
      refetchQueries: [{ query: getBooksQuery }]
    });
  };

  render() {
    return (
      <form id="add-book" onSubmit={e => this.submitForm(e)}>
        <div className="field">
          <label>Book name:</label>
          <input type="text" name="name" onChange={e => this.onChange(e)} />
        </div>

        <div className="field">
          <label>Genre:</label>
          <input type="text" name="genre" onChange={e => this.onChange(e)} />
        </div>

        <div className="field">
          <label>Author:</label>
          <select name="authorId" onChange={e => this.onChange(e)}>
            <option>Select Author</option>
            {this.displayAuthors()}
          </select>
        </div>

        <button type="submit">+</button>
      </form>
    );
  }
}

export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);
