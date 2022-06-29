import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Admins from "../../../pages/superadmin/Admins";
import { CalculateNetWorth } from "../../../pages/superadmin/Calculator/CalculateNetWorth";
import CalculatorPage from "../../../pages/superadmin/Calculator/CalculatorPage";
import Dashboard from "../../../pages/superadmin/Dashboard";
import Laws from "../../../pages/superadmin/Laws";
import Login from "../../../pages/superadmin/Login";
import ShiftingOfOffice from "../../../pages/superadmin/Procedure/ShiftingOfOffice";

function Navigation() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/superadmin/admins" element={<Admins />} />
        <Route path="/superadmin/dashboard" element={<Dashboard />} />
        <Route path="/superadmin/laws" element={<Laws />}>
          <Route path=":id" element={<Laws />} />
        </Route>
        <Route path="/superadmin/calculator" element={<CalculatorPage />}>
          <Route path=":id" element={<CalculatorPage />} />
        </Route>
        <Route path="/superadmin/procedure" element={<ShiftingOfOffice />}>
          <Route path="shiftingofoffice" element={<ShiftingOfOffice />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Navigation;
