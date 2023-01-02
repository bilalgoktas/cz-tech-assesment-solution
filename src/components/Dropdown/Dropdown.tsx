import { useState } from "react";
import styles from "./Dropdown.module.css";
import classNames from "classnames";
import upArrow from "../../assets/svg/upArrow.svg";
import downArrow from "../../assets/svg/downArrow.svg";
import trashIcon from "../../assets/svg/trash.svg";

type DropdownProps = {
  options: { id: number; value: string }[];
  onChange: (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    setStateFunction: React.Dispatch<React.SetStateAction<string>>
  ) => void;
  placeholder: string;
  clearable?: boolean;
  defaultValue?: string;
};

const Dropdown = ({
  options,

  onChange,
  placeholder,
  clearable,
  defaultValue,
}: DropdownProps) => {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    defaultValue ? defaultValue : ""
  );

  const handleEnterChange = (e: any) => {
    if (e.keyCode === 13) {
      onChange(e, setSelectedOption);
      setIsOptionsOpen(false);
    }
  };

  const handleEnterClear = (e: any) => {
    if (e.keyCode === 13) {
      handleClear();
      setIsOptionsOpen(false);
    }
  };

  const handleClear = () => {
    setSelectedOption("");
    if (selectedOption != "") {
      setIsOptionsOpen(false);
    }
  };

  return (
    <div className={styles.container}>
      <button
        className={classNames(
          styles.btn,
          selectedOption === "" && styles.noValue
        )}
        onClick={() => setIsOptionsOpen(!isOptionsOpen)}
      >
        <span>{selectedOption != "" ? selectedOption : placeholder}</span>
        <img
          className={styles.icon}
          src={isOptionsOpen ? upArrow : downArrow}
          alt="arrow icon"
        />
      </button>
      <ul className={classNames(styles.options, isOptionsOpen && styles.open)}>
        {options.map((option) => (
          <li
            key={option.id}
            className={styles.option}
            onClick={(e) => {
              onChange(e, setSelectedOption);
              setIsOptionsOpen(false);
            }}
            onKeyDown={(e) => handleEnterChange(e)}
            tabIndex={0}
          >
            {option.value}
          </li>
        ))}
        {clearable && (
          <li
            className={classNames(styles.option, styles.clearBtn)}
            onClick={handleClear}
            onKeyDown={(e) => handleEnterClear(e)}
            tabIndex={0}
          >
            Clear
            <img className={styles.icon} src={trashIcon} alt="delete icon" />
          </li>
        )}
      </ul>
    </div>
  );
};

export default Dropdown;
