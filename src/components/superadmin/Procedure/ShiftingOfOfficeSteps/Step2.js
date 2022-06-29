// import {
//   FormControl,
//   Grid,
//   MenuItem,
//   Select,
//   TextField,
//   Typography,
// } from "@mui/material";
// import React from "react";
// import { GREY } from "../../../../Utility/Colors";
// import TextInput from "../../../common/TextInput/TextInput";

// function Step2() {
//   return (
//     <Grid container item xs={12}>
//       <Grid item xs={12} sx={{ mb: 2 }}>
// <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
//   BOARD MEETING
// </Typography>
// <Grid xs={12} sx={{ m: 1 }}>
//   <Typography variant="body1" sx={{ border: 1, p: 1 }}>
//     1.Board Meeting hold a meeting of the Board or Pass Board resolution
//     by circulation:
//     <br />
//     - To consider and approve change in the registered office of the
//     company within the local limits.
//     <br />
//     -To authorize CS or CFO or any director of the company to file
//     notice of change of the situation of the registered office with ROC.
//   </Typography>
// </Grid>
//   </Grid>

//       {/* TITLE 1 START */}
//       <Grid item xs={12}>
// <Typography sx={{ fontSize: "16px", fontWeight: 600 }}>
//   1. Notice Of Board Meeting
// </Typography>
//         <Grid
//           xs={12}
//           sx={{
//             fontSize: "14px",
//             display: "flex",
//             alignItems: "center",
//             whiteSpace: "nowrap",
//             flexWrap: "wrap",
//             // lineHeight: "4rem",
//           }}
//         >
//           NOTICE OF <TextInput />
//   <span style={{ color: GREY }}>(SERIAL NUMBER OF MEETING)</span>
//   <TextField
//     type={"date"}
//     size="small"
//     id="sharecapital"
//     sx={{
//       ml: 1,
//       mr: 1,
//       "& .MuiOutlinedInput-notchedOutline": {
//         border: "2px solid grey",
//       },
//       color: "grey",
//       fontSize: "15px",
//       "& .MuiSvgIcon-root": {
//         color: "grey",
//       },
//     }}
//   />
//           {/* <br /> */}
//           To the directors. The <TextInput /> meeting of the board Of Directors
//           of the company will be held on
//   <FormControl sx={{ width: "150px", ml: 1, mr: 1 }}>
//     <Select
//       size="small"
//       color="whitecol"
//       defaultValue="Name"
//       sx={{
//         "& .MuiOutlinedInput-notchedOutline": {
//           border: "2px solid grey",
//         },
//         color: "grey",
//         fontSize: "15px",
//         "& .MuiSvgIcon-root": {
//           color: "grey",
//         },
//       }}
//     >
//       {[
//         "Monday",
//         "Tuesday",
//         "Wednesday",
//         "Thursday",
//         "Friday",
//         "Saturday",
//         "Sunday",
//       ].map((day, index) => (
//         <MenuItem key={index} value={day}>
//           {day}
//         </MenuItem>
//       ))}
//     </Select>
//   </FormControl>
//   <TextInput type="date" />
//   at
//   <TextInput type="time" />
//   at
//   <TextInput width="480px" />
//   The agenda of the business to be transacted at the meeting is
//   enclosed.
//           <br />
//   Please make it convenient to attend the meeting and let us know your
//   travel plan to enable us to make your travel and stay arrangements.
//   <br />
//   Yours faithfully
//   <br />
//           <Grid sx={{ alignItems: "center", display: "flex" }}>
//             For <TextInput width="210px" />
//           </Grid>
//           <br />
//         </Grid>
//         <Grid sx={{ mt: 2, mb: 2 }}>
//   <FormControl fullWidth>
//     <Typography sx={{ color: GREY }} variant="body2">
//       Upload DSE
//     </Typography>
//     <TextInput width="270px" type="file" />
//   </FormControl>
//         </Grid>

// <Grid sx={{ mt: 2, mb: 2, display: "flex", alignItems: "center" }}>
//   <Typography
//     sx={{ color: GREY, whiteSpace: "nowrap", pr: 4 }}
//     variant="body2"
//   >
//     Directors
//   </Typography>
//   <FormControl fullWidth>
//     <TextInput width="270px" />
//   </FormControl>
// </Grid>

//         <Grid sx={{ mt: 2, mb: 2, display: "flex", alignItems: "center" }}>
//           <Typography
//             sx={{ color: GREY, whiteSpace: "nowrap", pr: 4 }}
//             variant="body2"
//           >
//             Email ID
//           </Typography>
//           <FormControl fullWidth>
//             <TextInput width="270px" />
//           </FormControl>
//         </Grid>

//         <Grid sx={{ mt: 2, mb: 2, display: "flex", alignItems: "center" }}>
//           <Typography
//             sx={{ color: GREY, whiteSpace: "nowrap", pr: 4 }}
//             variant="body2"
//           >
//             Address
//           </Typography>
//           <FormControl fullWidth>
//             <TextInput width="360px" />
//           </FormControl>
//         </Grid>

// <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
//   BOARD MEETING
// </Typography>
// <Grid xs={12} sx={{ m: 1 }}>
//   <Typography variant="body1" sx={{ border: 1, p: 1 }}>
//     1.To appoint the Chairman of the Meeting.
//     <br />
//     2.To grant leave of absence, if any;
//     <br />
//     3.To consider and approve change in the registered office of the
//     company within the local limits of the city/town/village.
//   </Typography>
// </Grid>
//       </Grid>
//       {/* TITLE 1 END */}

//   <Grid
//     item
//     xs={12}
//     sx={{
//       height: "4px",
//       backgroundColor: "#000",
//       mt: 4,
//       mb: 4,
//     }}
//   ></Grid>

//       {/* TITLE 2 START */}
//       <Grid
//         // container
//         item
//         xs={12}
//         sx={{
//           fontSize: "14px",
//           //   display: "flex",
//           alignItems: "center",
//           whiteSpace: "nowrap",
//           flexWrap: "wrap",
//           border: 1,
//           // lineHeight: "4rem",
//         }}
//       >
//         <Typography sx={{ fontSize: "16px", fontWeight: 600 }}>
//           2. CTC of Board Resolution
//         </Typography>
//         <Grid
//           item
//           xs={12}
//           sx={{
//             fontSize: "14px",
//             display: "flex",
//             alignItems: "center",
//             whiteSpace: "nowrap",
//             flexWrap: "wrap",
//           }}
//         >
//           <div
//             style={{
//               width: "min-content",
//               border: "1px solid red",
//               display: "flex",
//               //   flex: 1,
//             }}
//           >
//             CERTIFIED TRUE COPY OF THE RESOLUTION PASSED AT THE MEETING OF THE
//             BOARD OF DIRECTORS OF
//           </div>
//           {/* <TextInput width="180px" /> */}
//           HELD AT THE REGISTERED OFFICE OF THE COMPANY AT{" "}
//           {/* <TextInput width="480px" /> */}
//   ON <TextInput width="180px" type="date" /> AT{" "}
//   <TextInput width="180px" type="time" />
//           <span style={{ fontWeight: "bold" }}>
// To consider and approve the change in the registered office of the
// company within the local limits of the city/town/village.
//           </span>
//           <br />
//         </Grid>
//         <Grid
//           container
//           item
//           xs={12}
//           sx={{
//             fontSize: "14px",
//             display: "flex",
//             alignItems: "center",
//             whiteSpace: "nowrap",
//             flexWrap: "wrap",
//             // lineHeight: "4rem",
//           }}
//         >
//   <span style={{ fontWeight: "bold" }}>RESOLVED THAT"</span> pursuant to
//   the provisions of section 12 and other applicable provisions, if any,
//   of the Companies Act,2013 read with rules made there under (including
//   any statutory modification(s) or re-enactment there of for the time
//   being in force, the consent of the board od directors of the Company
//   be and is hereby accorded to shift the registered office of the
//   company from
//           <TextInput width="480px" />
//           to
//           <TextInput width="480px" />
//         </Grid>
//       </Grid>
//       {/* TITLE 2 END */}
//     </Grid>
//   );
// }

// export default Step2;

import { FormControl, Grid, MenuItem, Select, Typography } from "@mui/material";
import React from "react";
import { GREY } from "../../../../Utility/Colors";
import TextInput from "../../../common/TextInput/TextInput";

function Step2() {
  return (
    <Grid container item xs={12} sx={{ border: 2 }}>
      <Grid container item xs={12}>
        <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
          BOARD MEETING
        </Typography>
      </Grid>
      <Grid container item xs={12} sx={{ m: 1 }}>
        <Typography variant="body1" sx={{ border: 1, p: 1 }}>
          1.Board Meeting hold a meeting of the Board or Pass Board resolution
          by circulation:
          <br />
          - To consider and approve change in the registered office of the
          company within the local limits.
          <br />
          -To authorize CS or CFO or any director of the company to file notice
          of change of the situation of the registered office with ROC.
        </Typography>
      </Grid>

      {/* CONTENT 1 START */}
      <Grid container item xs={12}>
        {/* heading 1 */}
        <Grid container item xs={12}>
          <Typography sx={{ fontSize: "16px", fontWeight: 600 }}>
            1. Notice Of Board Meeting
          </Typography>
        </Grid>
        <Grid container item xs={12}>
          NOTICE OF <TextInput />
          <span style={{ color: GREY }}>(SERIAL NUMBER OF MEETING)</span>
          <TextInput type="date" />
          To the directors. The <TextInput /> meeting of the board Of Directors
          of the company will be held on
          <FormControl sx={{ width: "150px", ml: 1, mr: 1 }}>
            <Select
              size="small"
              color="whitecol"
              defaultValue="Name"
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "2px solid grey",
                },
                color: "grey",
                fontSize: "15px",
                "& .MuiSvgIcon-root": {
                  color: "grey",
                },
              }}
            >
              {[
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ].map((day, index) => (
                <MenuItem key={index} value={day}>
                  {day}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextInput type="date" />
          at
          <TextInput type="time" />
          at
          <TextInput width="210px" />
          The agenda of the business to be transacted at the meeting is
          enclosed. <br />
          Please make it convenient to attend the meeting and let us know your
          travel plan to enable us to make your travel and stay arrangements.
          <br />
          Yours faithfully
          <br />
          <Grid container item xs={12}>
            For <TextInput width="210px" />
          </Grid>
        </Grid>
        <FormControl fullWidth>
          <Typography sx={{ color: GREY }} variant="body2">
            Upload DSE
          </Typography>
          <TextInput width="270px" type="file" />
        </FormControl>
        <Grid
          container
          item
          xs={12}
          sx={{ mt: 2, mb: 2, display: "flex", alignItems: "center" }}
        >
          <Typography
            sx={{ color: GREY, whiteSpace: "nowrap", pr: 4 }}
            variant="body2"
          >
            Director
          </Typography>
          <TextInput width="270px" />
        </Grid>
        <Grid
          container
          item
          xs={12}
          sx={{ mt: 2, mb: 2, display: "flex", alignItems: "center" }}
        >
          <Typography
            sx={{ color: GREY, whiteSpace: "nowrap", pr: 4 }}
            variant="body2"
          >
            Email ID
          </Typography>
          <TextInput width="270px" />
        </Grid>
        <Grid
          container
          item
          xs={12}
          sx={{ mt: 2, mb: 2, display: "flex", alignItems: "center" }}
        >
          <Typography
            sx={{ color: GREY, whiteSpace: "nowrap", pr: 4 }}
            variant="body2"
          >
            Address
          </Typography>
          <TextInput width="540px" />
        </Grid>
        <Grid container item xs={12}>
          <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
            AGENDA FOR THE MEETING
          </Typography>
          <Grid xs={12} sx={{ m: 1 }}>
            <Typography variant="body1" sx={{ border: 1, p: 1 }}>
              1.To appoint the Chairman of the Meeting.
              <br />
              2.To grant leave of absence, if any;
              <br />
              3.To consider and approve change in the registered office of the
              company within the local limits of the city/town/village.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      {/* CONTENT 1 END */}
      <Grid
        item
        xs={12}
        sx={{
          height: "4px",
          backgroundColor: "#000",
          mt: 4,
          mb: 4,
        }}
      ></Grid>
      {/* CONTENT 2 START */}
      <Grid container item xs={12}>
        <Grid container item xs={12}>
          <Typography sx={{ fontSize: "16px", fontWeight: 600 }}>
            2. CTC of Board Resolution
          </Typography>
        </Grid>
        <Grid container item xs={12}>
          CERTIFIED TRUE COPY OF THE RESOLUTION PASSED AT THE MEETING OF THE
          BOARD OF DIRECTORS OF <TextInput width="270px" />
          HELD AT THE REGISTERED OFFICE OF THE COMPANY AT
          <TextInput width="540px" /> ON <TextInput width="180px" type="date" />
          AT <TextInput width="180px" type="time" />
          <br />
          To consider and approve the change in the registered office of the
          company within the local limits of the city/town/village.
          <br />
          <span style={{ fontWeight: "bold" }}>RESOLVED THAT"</span> pursuant to
          the provisions of section 12 and other applicable provisions, if any,
          of the Companies Act,2013 read with rules made there under (including
          any statutory modification(s) or re-enactment there of for the time
          being in force), the consent of the board od directors of the Company
          be and is hereby accorded to shift the registered office of the
          company from
          <TextInput width="100%" />
          <br />
          to
          <br />
          <TextInput width="100%" />
          <br />
          with effect from
          <TextInput type="date" />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Step2;
