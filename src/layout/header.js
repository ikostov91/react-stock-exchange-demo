import DropdownSelector from "../components/form-components/dropdown-selector";

const options = [{
  value: 1,
  label: 'Option 1'
}, {
  value: 2,
  label: 'Option 2'
}]

const Header = () => {
  return (
    <header className="header">
      <DropdownSelector value={null} options={options} />
    </header>
  );
};

export default Header;
