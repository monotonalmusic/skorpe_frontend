import EmployeesList from "../../components/EmployeesList/EmployeesList";
import styles from "./employeespage.module.css";

const EmployeesPage = () => {
  return (
    <div>
      <div className={styles.employeesTextDiv}>
        <h1>Personalet</h1>
        <p>
          Hos Den Glade Skorpe har vi et dedikeret og venligt personale, der
          altid går den ekstra mil for at sikre, at kunderne får den bedste
          oplevelse. Teamet består af erfarne pizzabagere, der med passion
          tilbereder lækre pizzaer med friske råvarer.
        </p>
      </div>
      <EmployeesList />
    </div>
  );
};

export default EmployeesPage;
