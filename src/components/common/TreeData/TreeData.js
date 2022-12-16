import { Add, CheckBox, Remove } from "@mui/icons-material";
import { Box, Checkbox, FormControlLabel, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataTree } from "../../../redux/superAdminReducer/superAdminAction";
import Tree from "./Tree";

const TreeData = () => {
  const dispatch = useDispatch();
  const { checkedValues } = useSelector((state) => state?.Tree_Data);

  const { dataTree } = useSelector((state) => state?.SuperAdmin);
  const treeData = dataTree;
  console.log(dataTree);

  const [checkedvalues, setcheckedvalues] = useState({});
  const [treepath, settreepath] = useState({});

  console.log(checkedvalues);
  console.log(treepath);

  //   const RecursiveComponent = ({ data }) => {
  //     const [visible, setvisible] = useState(false);
  //     console.log(data);
  //     return (
  //       <div>
  //         <div>
  //           <Box sx={{ display: "flex", alignItems: "center" }}>
  //             {data?.children && data?.children.length > 0 ? (
  //               <IconButton
  //                 color="primary"
  //                 aria-label="upload picture"
  //                 component="label"
  //                 size="small"
  //                 onClick={() => setvisible(!visible)}
  //               >
  //                 {visible ? <Remove /> : <Add />}
  //               </IconButton>
  //             ) : (
  //               <Box sx={{ ml: 4 }}>&nbsp;</Box>
  //             )}
  //             <FormControlLabel
  //               value={data.label}
  //               label={data.label}
  //               control={
  //                 <Checkbox
  //                   checked={checkedValues[data.label]}
  //                   onChange={(e) => {
  //                     e.preventDefault();
  //                     dispatch({
  //                       type: "SET_CHECKED_VALUES",
  //                       payload: { name: data.label, value: e.target.checked },
  //                     });
  //                     let path;
  //                     treeData.find((x) => (path = dfs(x, data.label)));
  //                     console.log(path);
  //                   }}
  //                 />
  //               }
  //             />
  //           </Box>
  //           {visible &&
  //             data?.children?.map((parent) => (
  //               <Box sx={{ ml: 2 }}>
  //                 <RecursiveComponent data={parent} />
  //               </Box>
  //             ))}
  //         </div>
  //       </div>
  //     );
  //   };

  const RecursiveComponent = ({ data }) => {
    const [visible, setvisible] = useState(false);
    console.log(data);
    return (
      <div>
        <div>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {data?.children && data?.children.length > 0 ? (
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="label"
                size="small"
                onClick={() => setvisible(!visible)}
              >
                {visible ? <Remove /> : <Add />}
              </IconButton>
            ) : (
              <Box sx={{ ml: 4 }}>&nbsp;</Box>
            )}
            <FormControlLabel
              value={data.label}
              label={data.label}
              control={
                <Checkbox
                  checked={checkedvalues[data._id]}
                  onChange={(e) => {
                    e.stopPropagation();
                    setcheckedvalues({
                      ...checkedvalues,
                      [data._id]: e.target.checked,
                    });
                    let path;
                    treeData.find((x) => (path = dfs(x, data.label)));
                    console.log(path);

                    if (data.label in treepath) {
                      delete treepath[data.label];
                    } else {
                      settreepath({
                        ...treepath,
                        [data.label]: path,
                      });
                    }
                  }}
                />
              }
            />
          </Box>
          {visible &&
            data?.children?.map((parent) => (
              <Box sx={{ ml: 2 }}>
                <RecursiveComponent data={parent} />
              </Box>
            ))}
        </div>
      </div>
    );
  };

  useEffect(() => {
    dispatch(getDataTree());
  }, []);

  function dfs(o, target) {
    if (o.label === target) return [target];
    if (!o.children) return false;
    let path;
    o.children.find((x) => (path = dfs(x, target)));
    if (path) {
      return [o.label].concat(path);
    }
  }
  let path;
  treeData.find((x) => (path = dfs(x, "1.112")));
  console.log(path);

  return (
    <>
      <Box>
        {treeData &&
          treeData.map((parent) => <RecursiveComponent data={parent} />)}
      </Box>
      <Tree />
    </>
  );
};

export default TreeData;
