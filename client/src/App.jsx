import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home";

import Admin from "./pages/Admin";

import Login from "./pages/Login";

import ProtectedRoute from
  "./routes/ProtectedRoute";
import AdminProjects from
  "./pages/AdminProjects";

import AdminGallery from
  "./pages/AdminGallery";

import AdminSkills from
  "./pages/AdminSkills";

import AdminMessages from
  "./pages/AdminMessages";
import AdminResume from
  "./pages/AdminResume";
function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>

              <Admin />

            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/projects"
          element={
            <ProtectedRoute>

              <AdminProjects />

            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/gallery"
          element={
            <ProtectedRoute>

              <AdminGallery />

            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/skills"
          element={
            <ProtectedRoute>

              <AdminSkills />

            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/messages"
          element={
            <ProtectedRoute>

              <AdminMessages />

            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/resume"
          element={
            <ProtectedRoute>
              <AdminResume />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;