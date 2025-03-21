import { useState } from "react";
import styles from "./dropdown.module.css";
import { ChevronUp, ChevronDown } from "lucide-react";

const Dropdown = ({ selected, onSelect, options }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleSelect = (option) => {
    onSelect(option.value);
    setIsOpen(false);
  };

  const selectedLabel = options.find((option) => option.value === selected)?.label || "Select";

  return (
    <div className={styles.dropdown}>
      <div className={styles.header} onClick={toggleDropdown}>
        {selectedLabel}
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </div>
      {isOpen && (
        <div className={styles.menu}>
          {options.map((option) => (
            <div
              key={option.value}
              className={styles.item}
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
