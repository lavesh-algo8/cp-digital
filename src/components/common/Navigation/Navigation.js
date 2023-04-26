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
import ContentType from "../../../pages/superadmin/ContentType/ContentType";
import Login from "../../../pages/superadmin/Login";
import ProcedurePage from "../../../pages/superadmin/Procedure/ProcedurePage";
import PopupTable from "../../superadmin/DocumentGenerator/PopupTable";
import ChapterSpecificData from "../../../pages/superadmin/Category/ChapterSpecificData";
import SubSectionSpecificData from "../../../pages/superadmin/Category/SubSectionSpecificData";
import ProtectedRoute from "../../superadmin/ProtectedRoute/ProtectedRoute";
import GenerateDocumentTitles from "../../../pages/superadmin/DocumentGenerator/GenerateDocumentTitles";
import AddedCalculatorPage from "../../../pages/superadmin/Calculator/AddedCalculatorPage";
import EditCalculator from "../../superadmin/Calculator/EditCalculator";
import Check from "../Check";
import Generator from "../../../pages/superadmin/Generator/Generator";
import GenerateProcedure from "../../../pages/superadmin/Generator/GenerateProcedure/GenerateProcedure";
import ProcedureProcess from "../../../pages/superadmin/Generator/GenerateProcedure/ProcedureProcess";
import TemplateGenerator from "../../../pages/superadmin/Generator/Template/TemplateGenerator";
import AddTemplateDocument from "../../superadmin/Generator/Template/AddTemplateDocument";
import ViewTemplateHeadings from "../../superadmin/Generator/Template/ViewTemplatesHeadings";
import AddSectionDocument from "../../superadmin/Generator/Template/AddSectionDcoument";

function Navigation() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* Private routes only logged in user can access */}
        <Route element={<ProtectedRoute />}>
          <Route path="/checked" element={<Check />} />
          <Route path="/superadmin/admins" element={<Admins />} />
          <Route path="/superadmin/dashboard" element={<Dashboard />} />
          <Route
            path="/superadmin/generator/documentGenerator"
            element={<DocumentGenerator />}
          />
          <Route
            path="/superadmin/generator/documentGenerator/viewProcedure/:procedureId"
            element={<PopupTable />}
          />
          <Route
            path="/superadmin/generator/documentGenerator/editdocument/:procedure/:procedureId"
            element={<EditDocument />}
          />
          <Route
            path="/superadmin/generator/documentGenerator/editsectiondocument/:subheadingtitle/:subheadingId"
            element={<EditDocumentTitles />}
          />
          <Route
            path="/superadmin/generator/documentGenerator/generatenewdocument/:sectiontitle/:procedureId"
            element={<GenerateNewDocument />}
          />
          <Route
            path="/superadmin/generator/documentGenerator/generatedocument/:subheadingtitle/:subheadingId"
            element={<GenerateDocumentTitles />}
          />

          {/*  generator */}

          <Route path="/superadmin/generator" element={<Generator />} />
          <Route
            path="/superadmin/generator/generateprocedure"
            element={<GenerateProcedure />}
          />

          <Route
            path="/superadmin/generator/generateprocedure/:procedureId/process"
            element={<ProcedureProcess />}
          />

          {/*  generator */}

          {/* template */}
          <Route
            path="/superadmin/generator/templateGenerator"
            element={<TemplateGenerator />}
          />
          <Route
            path="/superadmin/generator/templateGenerator/:templateId/addtemplatedocument"
            element={<AddTemplateDocument />}
          />

          <Route
            path="/superadmin/generator/templateGenerator/:templateId/viewtemplateheadings"
            element={<ViewTemplateHeadings />}
          />

          <Route
            path="/superadmin/generator/templateGenerator/:templateId/:sectiontitle"
            element={<AddSectionDocument />}
          />
          {/* template */}

          <Route path="/superadmin/laws" element={<Laws />}>
            <Route path=":category/:act/:actid" element={<Laws />} />
          </Route>
          {/* <Route path="/superadmin/contenttype" element={<ContentType />}>
            <Route path=":contenttype" element={<ContentType />} />
          </Route> */}

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

          <Route
            path="/superadmin/calculator/addedcalculator"
            element={<AddedCalculatorPage />}
          >
            <Route path=":id" element={<AddedCalculatorPage />} />
          </Route>

          <Route
            path="/superadmin/calculator/addedcalculator/editcalculator"
            element={<EditCalculator />}
          >
            <Route path=":id" element={<EditCalculator />} />
          </Route>

          <Route path="/superadmin/procedure" element={<ProcedurePage />}>
            <Route path=":id" element={<ProcedurePage />} />
          </Route>
        </Route>
        {/* Private routes only logged in user can access */}
      </Routes>
    </HashRouter>
  );
}

export default Navigation;
