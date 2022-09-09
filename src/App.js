import React, { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Registration from "./components/registration/Registration";
import Login from "./components/login/Login";
import ChangePassword from "./components/changePassword/ChangePassword";
import MyAlert from "./components/myAlert/MyAlert";
import "./App.css";
import { useSelector } from "react-redux";
import { logoutThunk } from "./redux/registrationReducer";
import { userData } from "./fakeServer";

function App(props) {
  const email = userData.getEmail();
  const isError = useSelector((state) => state.registration.isError);
  const isLogged = useSelector((state) => state.registration.isLogged);
  const [showAlert, setShowAlert] = useState(false);

  return (
    <div className={"wrapper"}>
      <Header email={email} isLogged={isLogged} logoutThunk={logoutThunk} />

      <div className={`alert ${showAlert ? "show" : ""}`}>
        <MyAlert
          setShowAlert={setShowAlert}
          showAlert={showAlert}
          isError={isError}
        />
      </div>

      <div className={"main"}>
        <Routes>
          <Route
            path={"/registration"}
            element={<Registration setShowAlert={setShowAlert} />}
          />
          <Route
            path={"/login"}
            element={<Login setShowAlert={setShowAlert} />}
          />
          <Route
            path={"/changePassword"}
            element={<ChangePassword setShowAlert={setShowAlert} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
