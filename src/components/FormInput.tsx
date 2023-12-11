interface IFormInput {
  label: string;
  type: string;
  name: string;
  min?: string;
  max?: string;
  value?: string | number | undefined;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const FormInputs: React.FC<IFormInput> = ({
  label,
  type,
  name,
  value,
  min,
  max,
  handleChange,
}) => {
  return (
    <label>
      {label}
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        min={min}
        max={max}
        onChange={(e) => handleChange(e)}
        placeholder={label}
        required
      />
    </label>
  );
};

export default FormInputs;
