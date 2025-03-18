import { Outlet, useNavigate } from "react-router-dom";
import DishList from "../../components/DishList/DishList";
import styles from "./backoffice.module.css";

const BackOffice = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <article className={styles.backofficeArticle}>
            <button className={styles.addButton} onClick={() => navigate('/backoffice/products')}>Add Product</button>
            <Outlet />
            <DishList />
                
                
            </article>
        </div>
    );
};

export default BackOffice;