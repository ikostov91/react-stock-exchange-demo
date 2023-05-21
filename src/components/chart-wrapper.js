const ChartWrapper = ({ hasData = false, children }) => {
  return (
    <div className="chart-wrapper">
      {!hasData ? (
        <div className="no-data-container">
          <div className="no-data-label">No data to display</div>
        </div>
      ) : null}
      {children}
    </div>
  );
};

export default ChartWrapper;
