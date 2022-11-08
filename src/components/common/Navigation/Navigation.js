import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Admins from "../../../pages/superadmin/Admins";
import CalculatorPage from "../../../pages/superadmin/Calculator/CalculatorPage";
import Dashboard from "../../../pages/superadmin/Dashboard";
import DocumentGenerator from "../../../pages/superadmin/DocumentGenerator/DocumentGenerator";
import EditDocument from "../../../pages/superadmin/DocumentGenerator/EditDocument";
import GenerateNewDocument from "../../../pages/superadmin/DocumentGenerator/GenerateNewDocument";
import Laws from "../../../pages/superadmin/Category/Laws";
import Login from "../../../pages/superadmin/Login";
import ProcedurePage from "../../../pages/superadmin/Procedure/ProcedurePage";
import PopupTable from "../../superadmin/DocumentGenerator/PopupTable";
import ChapterSpecificData from "../../../pages/superadmin/Category/ChapterSpecificData";
import SubSectionSpecificData from "../../../pages/superadmin/Category/SubSectionSpecificData";

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
          path="/superadmin/documentGenerator/editdocument"
          element={<EditDocument />}
        />

        <Route
          path="/superadmin/documentGenerator/generatenewdocument/:procedure/:heading/:sectiontitle"
          element={<GenerateNewDocument />}
        />
        <Route path="/superadmin/laws" element={<Laws />}>
          <Route path=":category/:act/:actid" element={<Laws />} />
        </Route>

        <Route
          path="/superadmin/laws/:category/:act/:actid/:chapter"
          element={<ChapterSpecificData />}
        />
        <Route
          path="/superadmin/laws/:category/:act/:actid/:chapter/:sectionname"
          element={<SubSectionSpecificData />}
        />
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
