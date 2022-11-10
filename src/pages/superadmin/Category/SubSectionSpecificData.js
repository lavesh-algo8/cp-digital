import React from "react";
import LawsLayout from "../../../components/superadmin/Law/LawsLayout";
import LawIdFetch from "../../../components/superadmin/Law/SubSectionTabs/Tabs";

const SubSectionSpecificData = () => {
  return (
    <>
      <LawsLayout>
        <LawIdFetch />
      </LawsLayout>
    </>
  );
};

export default SubSectionSpecificData;
