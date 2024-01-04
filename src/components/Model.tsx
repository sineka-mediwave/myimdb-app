import { IShowError } from "../type";
import { Link } from "react-router-dom";
interface IModel {
  showModalMsg: IShowError;
  toggleModel?: () => void;
}

const Model: React.FC<IModel> = ({ showModalMsg, toggleModel }) => {
  return (
    <dialog open>
      <article>
        <Link
          to="/"
          className="close"
          onClick={toggleModel && (() => toggleModel())}
        >
          X
        </Link>
        <h3>{showModalMsg.action}</h3>
        <p>{showModalMsg.msg}</p>
      </article>
    </dialog>
  );
};

export default Model;
