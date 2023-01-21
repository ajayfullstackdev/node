const cleanUp = (query) => {
  for (let n of Object.keys(query)) {
    if (typeof query[n] === "object") cleanUp(query[n]);
    if (!isNaN(Number(query[n]))) query[n] = Number(query[n]);
  }

  return query;
};

export { cleanUp };
