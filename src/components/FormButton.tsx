import Loading from "./Loading";

interface IFormButton {
  btn: string;
  isLoading?: boolean;
  setIsLoading?: (b: boolean) => void;
}
const FormButton: React.FC<IFormButton> = ({ btn, isLoading }) => {
  return (
    <div className="form-input home-bar">
      <button type="submit" className="form-btn" disabled={isLoading}>
        {isLoading ? <Loading /> : <>{btn}</>}
      </button>
    </div>
  );
};

export default FormButton;
