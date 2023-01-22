const cleanUp = (query) => {
  for (let n of Object.keys(query)) {
    if (typeof query[n] === "object") cleanUp(query[n]);
    if (!isNaN(Number(query[n]))) query[n] = Number(query[n]);
  }

  return query;
};

const whiteListFields = (query) => {
  const workingQuery = JSON.parse(JSON.stringify(query));
  const excludeFields = ["sort", "page", "limit", "fields"];
  excludeFields.forEach((ele) => delete workingQuery[ele]);

  return workingQuery;
};

export { cleanUp, whiteListFields };
