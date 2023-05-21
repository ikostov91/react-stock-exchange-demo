const ChartWrapper = ({ hasData = false, isLoading = false, children }) => {
  return (
    <div className="chart-wrapper">
      {(!hasData && !isLoading) ? (
        <div className="chart-overlay">
          <div className="overlay-label">No data to display</div>
        </div>
      ) : null}
      {isLoading ? (
        <div className="chart-overlay">
          <div className="overlay-label">Loading...</div>
        </div>
      ) : null}
      {children}
    </div>
  );
};

export default ChartWrapper;
