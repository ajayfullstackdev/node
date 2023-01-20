const cleanUp = (query) => {
  for (let n of Object.keys(query)) {
    if (typeof query[n] === "object") cleanUp(query[n]);
    if (!isNaN(Number(query[n]))) query[n] = Number(query[n]);
  }

  return query;
};

export { cleanUp };

// http://localhost:4000/api/products?price[$gte]=100&price[$lte]=110&rating.rate[$gte]=3
