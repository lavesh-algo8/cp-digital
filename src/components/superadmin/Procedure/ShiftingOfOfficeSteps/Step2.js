import { FormControl, Grid, MenuItem, Select, Typography } from "@mui/material";
import React from "react";
import { GREY } from "../../../../Utility/Colors";
import TextInput from "../../../common/TextInput/TextInput";

function Step2() {
  return (
    <Grid container item xs={12} sx={{ fontSize: "14px" }}>
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
        <Grid container item xs={12} sx={{ alignItems: "center" }}>
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
        <Grid container item xs={12} sx={{ alignItems: "center" }}>
          CERTIFIED TRUE COPY OF THE RESOLUTION PASSED AT THE MEETING OF THE
          BOARD OF DIRECTORS OF <TextInput width="270px" />
          HELD AT THE REGISTERED OFFICE OF THE COMPANY AT
          <TextInput width="540px" /> ON <TextInput width="180px" type="date" />
          AT <TextInput width="180px" type="time" />
          <br />
          To consider and approve the change in the registered office of the
          company within the local limits of the city/town/village.
          <br />
          <Grid container item xs={12} sx={{ alignItems: "center" }}>
            <span style={{ fontWeight: "bold" }}>"RESOLVED THAT</span> pursuant
            to the provisions of section 12 and other applicable provisions, if
            any, of the Companies Act,2013 read with rules made there under
            (including any statutory modification(s) or re-enactment there of
            for the time being in force), the consent of the board od directors
            of the Company be and is hereby accorded to shift the registered
            office of the company from
            <TextInput width="30%" />
            to
            <TextInput width="30%" />
            <br />
            with effect from
            <TextInput type="date" />
          </Grid>
          <br />
          <Grid
            container
            item
            xs={12}
            sx={{
              alignItems: "center",
            }}
          >
            <span style={{ fontWeight: "bold", marginRight: "4px" }}>
              FURTHER RESOLVED THAT{" "}
            </span>{" "}
            Mr./Ms. <TextInput width="180px" /> [name]{" "}
            <TextInput width="180px" /> [Director/CFO/CS] and Mr./Ms.
            <TextInput width="180px" /> [name] <TextInput width="180px" />{" "}
            [Director/CFO/CS] of the Company be and are hereby jointly/severally
            authorized to file the necessary documents/form(s) with the
            Registrar of Companies and to do all such acts,deeds,matter
            andthings as may be deemed necessary, desirable,proper or expedient
            for the purpose of giving effect to this resolution and for matters
            connected the rewith or thereto."
            <Grid
              container
              item
              xs={12}
              sx={{
                alignItems: "center",
              }}
            >
              For <TextInput /> (Company name)
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
              sx={{ mt: 2, mb: 2, alignItems: "center" }}
            >
              <TextInput width="320px" />
              <Typography
                sx={{ color: GREY, whiteSpace: "nowrap", pr: 4 }}
                variant="body2"
              >
                (Director name)
              </Typography>
            </Grid>
            <Grid
              container
              item
              xs={12}
              sx={{ mt: 2, mb: 2, alignItems: "center" }}
            >
              <TextInput width="320px" />
              <Typography
                sx={{ color: GREY, whiteSpace: "nowrap", pr: 4 }}
                variant="body2"
              >
                (Designation)
              </Typography>
            </Grid>
            <Grid
              container
              item
              xs={12}
              sx={{ mt: 2, mb: 2, alignItems: "center" }}
            >
              <TextInput width="320px" />
              <Typography
                sx={{ color: GREY, whiteSpace: "nowrap", pr: 4 }}
                variant="body2"
              >
                (DIN. No.)
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/* CONTENT 2 END */}
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
      {/* CONTENT 3 START */}
      <Grid container item xs={12}>
        <Grid container item xs={12}>
          <Typography sx={{ fontSize: "16px", fontWeight: 600 }}>
            3. Minutes of Board Meeting
          </Typography>
        </Grid>
        <Grid
          container
          item
          xs={12}
          sx={{
            alignItems: "center",
          }}
        >
          Minutes of the <TextInput width="120px" /> (No.) Board Meeting of{" "}
          <TextInput width="180px" /> (Company Name), held on{" "}
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
          <TextInput type="date" /> at <TextInput width="480px" /> (venue) From{" "}
          <TextInput type="time" /> (Time of commencement)
          <Grid container item xs={12}>
            Present :
            <Grid container item xs={12}>
              <TextInput width="210px" />
            </Grid>
            <Grid container item xs={12}>
              <TextInput width="210px" />
            </Grid>
            <Grid container item xs={12}>
              <TextInput width="210px" />
            </Grid>
            <Grid container item xs={12}>
              <TextInput width="210px" />
            </Grid>
          </Grid>
          {/* Internal points start */}
          <Grid container item xs={12} sx={{ p: 3 }}>
            <Grid container item xs={12}>
              <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
                1. Chairman for the meeting:
              </Typography>
              <Grid
                container
                item
                xs={12}
                sx={{ display: "flex", alignItems: "baseline" }}
              >
                Mr. <TextInput /> was elected was the Chairman for the meeting.
              </Grid>
              <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
                2. Quorum:
              </Typography>
              <Grid container item xs={12}>
                The business before the Meeting was taken up after having
                established that the requisite Quorum was present.
              </Grid>
              <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
                3. Leave of absence:
              </Typography>
              <Grid container item xs={12}>
                Leave of absence was granted to Mr./Ms. X who expressed his
                inability to atttend the meeting owing to his pre-occupation.
              </Grid>
              <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
                4. To consider and approve the change in the registered office
                of the company within the local limits of the city/town/village:
              </Typography>
              <Grid container item xs={12} sx={{ alignItems: "center" }}>
                <span style={{ fontWeight: "bold" }}>"RESOLVED THAT</span>{" "}
                pursuant to the provisions of section 12 and other applicable
                provisions, if any, of the Companies Act,2013 read with rules
                made there under (including any statutory modification(s) or
                re-enactment there of for the time being in force), the consent
                of the board od directors of the Company be and is hereby
                accorded to shift the registered office of the company from
                <TextInput width="30%" />
                to
                <TextInput width="30%" />
                <br />
                with effect from
                <TextInput type="date" />
              </Grid>
              <br />
              <Grid
                container
                item
                xs={12}
                sx={{
                  alignItems: "center",
                }}
              >
                <span style={{ fontWeight: "bold", marginRight: "4px" }}>
                  FURTHER RESOLVED THAT{" "}
                </span>{" "}
                Mr./Ms. <TextInput width="180px" /> [name]{" "}
                <TextInput width="180px" /> [Director/CFO/CS] and Mr./Ms.
                <TextInput width="180px" /> [name] <TextInput width="180px" />{" "}
                [Director/CFO/CS] of the Company be and are hereby
                jointly/severally authorized to file the necessary
                documents/form(s) with the Registrar of Companies and to do all
                such acts,deeds,matter andthings as may be deemed necessary,
                desirable,proper or expedient for the purpose of giving effect
                to this resolution and for matters connected the rewith or
                thereto."
                <Grid
                  container
                  item
                  xs={12}
                  sx={{
                    alignItems: "center",
                  }}
                >
                  For <TextInput /> (Company name)
                </Grid>
              </Grid>
              <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
                5. Conslusion of the Meeting:
              </Typography>
              <Grid container item xs={12} sx={{ alignItems: "center" }}>
                There being no other business, the Meeting conducted at{" "}
                <TextInput type="time" /> with a vote of thanks to the Chair.
              </Grid>
              <Grid
                container
                item
                xs={12}
                sx={{ mt: 2, mb: 2, alignItems: "center" }}
              >
                <Typography
                  sx={{ color: GREY, whiteSpace: "nowrap", pr: 4 }}
                  variant="body2"
                >
                  Place
                </Typography>
                <TextInput />
              </Grid>
              <Grid
                container
                item
                xs={12}
                sx={{ mt: 2, mb: 2, alignItems: "center" }}
              >
                <Typography
                  sx={{ color: GREY, whiteSpace: "nowrap", pr: 4 }}
                  variant="body2"
                >
                  Date
                </Typography>
                <TextInput type="date" />
              </Grid>
              <Grid
                container
                item
                xs={12}
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <div>
                  <FormControl>
                    <Typography sx={{ color: GREY }} variant="body2">
                      Upload DSE
                    </Typography>
                    <TextInput type="file" />
                  </FormControl>
                  <Grid
                    container
                    item
                    xs={12}
                    sx={{ mt: 2, mb: 2, alignItems: "center" }}
                  >
                    <Typography
                      sx={{ color: GREY, whiteSpace: "nowrap", pr: 4 }}
                      variant="body2"
                    >
                      For
                    </Typography>
                    <TextInput />
                  </Grid>
                  <Typography
                    sx={{ color: GREY, whiteSpace: "nowrap", pr: 4 }}
                    variant="body2"
                  >
                    (Chairman)
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </Grid>
          {/* Internal points end*/}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Step2;
