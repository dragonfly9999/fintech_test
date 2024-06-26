import { DatePicker } from "antd";
import { Route, Routes } from "react-router-dom";
import LoginFintech from "./pages/LoginPage/LoginFintech";
import SignUpFintech from "./pages/SignUpPage/SignUpFintech";
import Management from "./templates/ManagerTemplate/Management";
import AddProjcect from "./components/DetailPM/AddProject";
import ProjectManager from "./components/ProjectManager/ProjectManager";

function App() {
  return (
    <div className="App">
      <>
        <Routes>
          <Route element={<Management />} path="/admin">
            <Route index element={<ProjectManager />} />
            <Route element={<AddProjcect />} path="addNew" />

            {/* path="addNew" */}
          </Route>
          <Route index element={<LoginFintech />} />
          <Route element={<SignUpFintech />} path="/signUp" />
        </Routes>
      </>
    </div>
  );
}

export default App;
