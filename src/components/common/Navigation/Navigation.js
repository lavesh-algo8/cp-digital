import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Admins from "../../../pages/superadmin/Admins";
import CalculatorPage from "../../../pages/superadmin/Calculator/CalculatorPage";
import Dashboard from "../../../pages/superadmin/Dashboard";
import DocumentGenerator from "../../../pages/superadmin/DocumentGenerator/DocumentGenerator";
import GenerateNewDocument from "../../../pages/superadmin/DocumentGenerator/GenerateNewDocument";
import Laws from "../../../pages/superadmin/Laws";
import Login from "../../../pages/superadmin/Login";
import ProcedurePage from "../../../pages/superadmin/Procedure/ProcedurePage";
import PopupTable from "../../superadmin/DocumentGenerator/PopupTable";

function Navigation() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/superadmin/admins" element={<Admins />} />
        <Route path="/superadmin/dashboard" element={<Dashboard />} />
        <Route
          path="/superadmin/documentGenerator"
          element={<DocumentGenerator />}
        />
        <Route
          path="/superadmin/documentGenerator/viewProcedure"
          element={<PopupTable />}
        />

        <Route
          path="/superadmin/documentGenerator/generatenewdocument/:procedure/:heading/:sectiontitle"
          element={<GenerateNewDocument />}
        />
        <Route path="/superadmin/laws" element={<Laws />}>
          <Route path=":id" element={<Laws />} />
        </Route>
        <Route path="/superadmin/calculator" element={<CalculatorPage />}>
          <Route path=":id" element={<CalculatorPage />} />
        </Route>
        <Route path="/superadmin/procedure" element={<ProcedurePage />}>
          <Route path=":id" element={<ProcedurePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Navigation;
