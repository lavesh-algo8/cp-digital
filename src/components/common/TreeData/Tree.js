import { Add } from "@mui/icons-material";
import React, { useState } from "react";
import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";

const nodes = [
  {
    value: "123",
    label: "Sol System",
    children: [
      { value: "223", label: "Mercury" },
      {
        value: "1223",
        label: "Jupiter",
        children: [
          { value: "32e23", label: "Io" },
          { value: "21312", label: "Europa" },
        ],
      },
    ],
  },
  {
    value: "213123",
    label: "Sol System",
    children: [
      { value: "1009", label: "Mercury" },
      {
        value: "12890",
        label: "Jupiter",
        children: [
          { value: "19001", label: "Io" },
          { value: "100010", label: "Europa" },
        ],
      },
    ],
  },
];

const Tree = () => {
  const [checked, setchecked] = useState(["1223", "21312", "32e23"]);
  const [expanded, setexpanded] = useState([
    "123",
    "223",
    "1223",
    "21312",
    "32e23",
  ]);

  const onCheck = (checked) => {
    console.log(checked);

    setchecked(checked);
  };

  const onExpand = (expanded) => {
    setexpanded(expanded);
  };

  return (
    <CheckboxTree
      //   showExpandAll
      noCascade
      nodes={nodes}
      checkModel="all"
      checked={checked}
      expanded={expanded}
      iconsClass="fa5"
      onCheck={onCheck}
      onExpand={onExpand}
    />
  );
};
export default Tree;
