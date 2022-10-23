import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Menu from './components/user/Menu'
import CanteenDashboard from './components/Canteen/Dashboard';
import AddCategory from './components/Canteen/AddCategory'
import AddItem from "./components/Canteen/AddItem";
import TotalOrders from "./components/Canteen/TotalOrders"
import ItemPage from "./components/user/Cart";

function AdditionalRoutes() {
  return (
    <>
      <Router>
          <Routes>
            {/* Dashboard */}
            <Route path="canteen" element={<CanteenDashboard />} />
            <Route path="canteen/add-category" element={<AddCategory />}  />
            <Route path="canteen/add-items" element={<AddItem/>} />
            <Route path="canteen/total-order" element={<TotalOrders/>} />
            <Route path="dashboard/canteen/cancelled-order" />
            <Route path="canteen/menu-book" element={<Menu />} />


            <Route path="user/item-page" element={<ItemPage/>}/>
            <Route path="user/menupage" element={<Menu />}/>
          </Routes>
      </Router>
    </>
  );
}

export default AdditionalRoutes;