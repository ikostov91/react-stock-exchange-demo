export const sortByLabel = (a, b) => {
  if (a.label < b.label) {
    return -1;
  }
  if (a.label > b.label) {
    return 1;
  }

  return 0;
};

export const sortByDate = (a, b) => {
  if (new Date(a.label) < new Date(b.label)) {
    return -1;
  }
  if (new Date(a.label) > new Date(b.label)) {
    return 1;
  }

  return 0;
};
