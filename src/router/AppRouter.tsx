import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import AddTask from "../pages/AddTask";
import TaskDetails from "../pages/TaskDetails";
import NotFound from "../pages/NotFound";
import Navbar from "../components/Navbar";
import EditTask from "../pages/EditTask";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-task" element={<AddTask />} />
        <Route path="/task/:id" element={<TaskDetails />} />
        <Route path="/task/:id/edit"element={<EditTask />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;