import Select from 'react-select';

const DropdownSelector = ({ value = null, options = [] }) => {
  return (
    <Select
      className="dropdown-selector"
      classNamePrefix="select"
      defaultValue={null}
      isDisabled={false}
      isLoading={false}
      isClearable
      isSearchable
      name="dropdown-selector"
      options={options}
    />
  );
};

export default DropdownSelector;
