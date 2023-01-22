import { cleanUp, whiteListFields } from "./common.js";

export default class {
  constructor(query, queryString) {
    this.query = cleanUp(query);
    this.queryString = queryString;
  }

  find() {
    const queryWhite = whiteListFields(this.query);
    this.queryString = this.queryString.find(queryWhite);
    return this;
  }

  sort() {
    if (this.query.sort) {
      this.queryString = this.queryString.sort(this.query.sort);
    }
    return this;
  }

  pagination() {
    if (this.query.limit && this.query.page) {
      this.queryString = this.queryString
        .skip(this.query.limit * (this.query.page - 1))
        .limit(this.query.limit);
    }
    return this;
  }

  limitFields() {
    if (this.query.fields) {
      this.queryString = this.queryString.select(this.query.fields);
    }
    return this;
  }
}
