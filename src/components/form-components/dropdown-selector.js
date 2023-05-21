import Select from 'react-select';

const DropdownSelector = ({ options = [], loading = false, onChange }) => {
  return (
    <Select
      className="dropdown-selector"
      classNamePrefix="select"
      defaultValue={null}
      isLoading={loading}
      onChange={(e) => onChange(e)}
      isClearable
      isSearchable
      name="dropdown-selector"
      options={options}
    />
  );
};

export default DropdownSelector;
