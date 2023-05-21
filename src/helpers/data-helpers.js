import { sortByDate, sortByLabel } from "./utility-helpers";

export const mapCompanies = (apiData) => {
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

export const mapChartData = (apiData) => {
  if (!apiData) {
    return [];
  }

  const { dataset_data: { data } } = apiData;
  const options = data.map(([k, v]) => {
    return {
      label: k,
      value: v
    };
  }).sort(sortByDate);
  
  return options;
};