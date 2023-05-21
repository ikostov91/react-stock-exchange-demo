import { sortByLabel } from "./utility-helpers";

export const mapCompaniesDataset = (apiData) => {
  if (!apiData) {
    return [];
  }

  const { datasets = [] } = apiData;
  const options = datasets.map(dataset => {
    return {
      label: dataset.name,
      value: dataset.dataset_code
    };
  }).sort(sortByLabel);
  
  return options;
};