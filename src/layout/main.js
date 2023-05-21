import ErrorMessage from "../components/error-message";
import LineChart from "../components/line-chart";
import { useSelector } from 'react-redux';

const Main = () => {
  const { error } = useSelector((state) => state.appReducer);

  return (
    <main className="main">
      {error ? (
        <ErrorMessage message={error} />
      ) : null}
      <LineChart />
    </main>
  );
};

export default Main;
