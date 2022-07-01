import React from "react";
import { useParams } from "react-router-dom";
import ProcedureLayout from "../../../components/superadmin/Procedure/ProcedureLayout";
import ShiftingOfOffice from "./ShiftingOfOffice";

function ProcedurePage() {
  const { id } = useParams();

  const tabs = {
    shiftingOfOffice: <ShiftingOfOffice />,
  };
  return <ProcedureLayout id={id}>{tabs[id]}</ProcedureLayout>;
}

export default ProcedurePage;
