import Dropdown from "./components/Dropdown/Dropdown";
import { animals } from "./mockData";

const App = () => {
  const handleChange = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    setStateFunction: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const target = e.target as HTMLLIElement;
    setStateFunction(target.innerText);
  };

  return (
    <>
      <Dropdown
        options={animals}
        onChange={handleChange}
        placeholder="Choose an animal"
        clearable={true}
        defaultValue={"dog"}
      />
    </>
  );
};

export default App;
