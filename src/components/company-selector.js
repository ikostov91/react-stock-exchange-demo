import { useEffect, useState } from 'react';
import DropdownSelector from './form-components/dropdown-selector';
import { mapCompaniesDataset } from '../helpers';

const CompanySelector = () => {
  const [companies, setCompaies] = useState([]);

  useEffect(() => {
    fetch(`/api/v3/datasets/?database_code=BSE`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      }
    })
      .then(res => res.json())
      .then(dataset => {
        setCompaies(mapCompaniesDataset(dataset))
      })
      .catch((err) => {
        console.error(err);
     })
  }, []);

  return (
    <DropdownSelector
      options={companies}
    />
  );
};

export default CompanySelector;
