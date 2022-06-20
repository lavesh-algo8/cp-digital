import React from "react";
import { useParams } from "react-router-dom";
import CalculatorLayout from "../../../components/superadmin/Calculator/CalculatorLayout";
import { CalculateNetWorth } from "./CalculateNetWorth";
import ROCFeeCalculator from "./ROCFeeCalculator";

function CalculatorPage() {
  const { id } = useParams();

  const tabs = {
    calculateNetworth: <CalculateNetWorth />,
    rocFeesCalculator: <ROCFeeCalculator />,
  };

  return <CalculatorLayout id={id}>{tabs[id]}</CalculatorLayout>;
}

export default CalculatorPage;
