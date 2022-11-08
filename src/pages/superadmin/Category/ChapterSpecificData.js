import React from "react";
import LawsLayout from "../../../components/superadmin/Law/LawsLayout";
import LawIdFetch from "../../../components/superadmin/Law/Tabs";

const ChapterSpecificData = () => {
  return (
    <>
      <LawsLayout>
        <LawIdFetch />
      </LawsLayout>
    </>
  );
};

export default ChapterSpecificData;
