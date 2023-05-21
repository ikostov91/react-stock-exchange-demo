import { useEffect } from 'react';
import DropdownSelector from './form-components/dropdown-selector';
import { useDispatch, useSelector } from 'react-redux';
import { appActions } from '../store';

const CompanySelector = () => {
  const { companies, companiesLoading } = useSelector((state) => state.appReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(appActions.fetchCompanies());
  }, []);

  const handleOnSelectCompany = (selection) => {
    dispatch(appActions.clearChart());

    if (!selection) {
      dispatch(appActions.selectCompany(null));
      return;
    }

    dispatch(appActions.selectCompany(selection));
    dispatch(appActions.fetchChartData(selection?.value));
  };

  return (
    <DropdownSelector
      options={companies}
      loading={companiesLoading}
      onChange={(v) => handleOnSelectCompany(v)}
    />
  );
};

export default CompanySelector;
