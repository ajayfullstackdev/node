import { cleanUp, whiteListFields } from "./common.js";

function AdvancedFiltering(query, queryString) {
  this.query = cleanUp(query);
  this.queryString = queryString;
}

AdvancedFiltering.prototype.find = function () {
  const queryWhite = whiteListFields(this.query);
  this.queryString = this.queryString.find(queryWhite);
  return this;
};

AdvancedFiltering.prototype.sort = function () {
  if (this.query.sort) {
    this.queryString = this.queryString.sort(this.query.sort);
  }
  return this;
};

AdvancedFiltering.prototype.pagination = function () {
  if (this.query.limit && this.query.page) {
    this.queryString = this.queryString
      .skip(this.query.limit * (this.query.page - 1))
      .limit(this.query.limit);
  }
  return this;
};

AdvancedFiltering.prototype.limitFields = function () {
  if (this.query.fields) {
    this.queryString = this.queryString.select(this.query.fields);
  }
  return this;
};

export default AdvancedFiltering;
