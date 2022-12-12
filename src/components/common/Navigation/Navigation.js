import React from "react";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import Admins from "../../../pages/superadmin/Admins";
import CalculatorPage from "../../../pages/superadmin/Calculator/CalculatorPage";
import Dashboard from "../../../pages/superadmin/Dashboard";
import DocumentGenerator from "../../../pages/superadmin/DocumentGenerator/DocumentGenerator";
import EditDocument from "../../../pages/superadmin/DocumentGenerator/EditDocument";
import EditDocumentTitles from "../../../pages/superadmin/DocumentGenerator/EditDocumentTitles";
import GenerateNewDocument from "../../../pages/superadmin/DocumentGenerator/GenerateNewDocument";
import Laws from "../../../pages/superadmin/Category/Laws";
import Login from "../../../pages/superadmin/Login";
import ProcedurePage from "../../../pages/superadmin/Procedure/ProcedurePage";
import PopupTable from "../../superadmin/DocumentGenerator/PopupTable";
import ChapterSpecificData from "../../../pages/superadmin/Category/ChapterSpecificData";
import SubSectionSpecificData from "../../../pages/superadmin/Category/SubSectionSpecificData";
import ProtectedRoute from "../../superadmin/ProtectedRoute/ProtectedRoute";
import GenerateDocumentTitles from "../../../pages/superadmin/DocumentGenerator/GenerateDocumentTitles";

function Navigation() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* Private routes only logged in user can access */}
        <Route element={<ProtectedRoute />}>
          <Route path="/superadmin/admins" element={<Admins />} />
          <Route path="/superadmin/dashboard" element={<Dashboard />} />
          <Route
            path="/superadmin/documentGenerator"
            element={<DocumentGenerator />}
          />
          <Route
            path="/superadmin/documentGenerator/viewProcedure/:procedureId"
            element={<PopupTable />}
          />
          <Route
            path="/superadmin/documentGenerator/editdocument/:procedure/:procedureId"
            element={<EditDocument />}
          />
          <Route
            path="/superadmin/documentGenerator/editsectiondocument/:subheadingtitle/:subheadingId"
            element={<EditDocumentTitles />}
          />
          <Route
            path="/superadmin/documentGenerator/generatenewdocument/:sectiontitle/:procedureId"
            element={<GenerateNewDocument />}
          />
          <Route
            path="/superadmin/documentGenerator/generatedocument/:subheadingtitle/:subheadingId"
            element={<GenerateDocumentTitles />}
          />
          <Route path="/superadmin/laws" element={<Laws />}>
            <Route path=":category/:act/:actid" element={<Laws />} />
          </Route>

          <Route
            path="/superadmin/laws/:category/:act/:actid/:chapter/:chapterid"
            element={<ChapterSpecificData />}
          />
          <Route
            path="/superadmin/laws/:category/:act/:actid/:chapter/:chapterid/:subsectionname/:subsectionid"
            element={<SubSectionSpecificData />}
          />
          <Route path="/superadmin/calculator" element={<CalculatorPage />}>
            <Route path=":id" element={<CalculatorPage />} />
          </Route>
          <Route path="/superadmin/procedure" element={<ProcedurePage />}>
            <Route path=":id" element={<ProcedurePage />} />
          </Route>
        </Route>
        {/* Private routes only logged in user can access */}
      </Routes>
    </BrowserRouter>
  );
}

export default Navigation;
