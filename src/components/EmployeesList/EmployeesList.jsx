import useFetch from "../../hooks/useFetch";
import styles from "./employeeslist.module.css";

const EmployeesList = () => {

    const getEmployees = useFetch("http://localhost:3042/employees");
    const employees = getEmployees.data;

    if (getEmployees.loading) return <div>Loading...</div>;



    return (
        <div>
            <ul className={styles.employeeListUl}>
                {employees.map((employee) => (
                    <li key={employee._id} className={styles.employeeListLi}>
                        <img src={employee.image} alt={employee.name} className={styles.employeeImage} />
                        <p>{employee.name}</p>
                        <p>{employee.position}</p>
                        
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default EmployeesList;