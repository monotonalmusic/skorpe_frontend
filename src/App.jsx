import { useRoutes, useLocation } from "react-router-dom";
import { BasketProvider } from "./context/AppContext";
// Common Pages.
import HomePage from "./pages/home/HomePage";
import CheckoutPage from "./pages/checkout/CheckoutPage";
import KontaktPage from "./pages/kontakt/KontaktPage";

// Components
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import BackOffice from "./pages/backoffice/Backoffice";
import DishForm from "./components/DishForm/DishForm";
import DishDetail from "./pages/dishdetail/DishDetail";
import EmployeesPage from "./pages/employees/EmployeesPage";

const App = () => {
  const location = useLocation();
  const isBackOffice = location.pathname.startsWith("/backoffice");

  // Setting Up Routes
  const routes = useRoutes([
    { path: "/", element: <HomePage /> },
    { path: "/checkout", element: <CheckoutPage /> },
    { path: "/kontakt", element: <KontaktPage /> },
    {path: "/checkout", element: <CheckoutPage />},
    {path: "/dish/:id", element: <DishDetail />},
    {path: "/employees", element: <EmployeesPage />},
    {
      path: "/backoffice",
      element: <BackOffice />, // Uses Outlet to handle nested routes
      children: [{ path: "products", element: <DishForm /> }],
    },
    { path: "*", element: <div>NOT FOUND</div> },
  ]);

  return (
    <BasketProvider>
      <div>
        {!isBackOffice && <Header />}
        <div>{routes}</div>
        {!isBackOffice && <Footer />}
      </div>
    </BasketProvider>
  );
};

export default App;
