import { useDispatch } from "react-redux";
import { appActions } from "../store";

const ErrorMessage = ({ message = null }) => {
  const dispatch = useDispatch();

  return (
    <div className="error-message">
      {message ?? "Something went wrong."}
      <span className="dismiss-button" onClick={() => dispatch(appActions.dismissError())}></span>
    </div>
  );
}

export default ErrorMessage;
