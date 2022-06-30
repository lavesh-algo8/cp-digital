import {
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { GREY } from "../../../../Utility/Colors";
import TextInput from "../../../common/TextInput/TextInput";

function Step3() {
  return (
    <Grid container item xs={12} sx={{ fontSize: "14px" }}>
      <Grid container item xs={12}>
        <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
          TIME-BOUND DISCLOSURES
        </Typography>
      </Grid>
      <Grid container item xs={12} sx={{ m: 1 }}>
        <Typography variant="body1" sx={{ border: 1, p: 1 }}>
          In case of a listed company, make disclosure of the Board meeting to
          stock exchanges (where the shares of the company are listed), as soon
          as reasonably possible and not later than 24 hours from the conslusion
          of Board meeting and post the same on the website of the company
          within 2 working days.
        </Typography>
      </Grid>
      <Grid container item xs={12}>
        <Grid container item xs={12}>
          <Typography sx={{ fontSize: "16px", fontWeight: 600 }}>
            Document generator in this step
          </Typography>
        </Grid>
        <Grid container item xs={12}>
          <Typography sx={{ fontSize: "14px", fontWeight: 600, mt: 1, mb: 1 }}>
            Disclosure under Regulation 30 of the SEBI (LODR) Regulations, 2015
          </Typography>
        </Grid>
        <Grid container item xs={12}>
          <Typography sx={{ alignItems: "center", display: "flex" }}>
            <TextInput type="date" width="180px" /> NSE Ltd, Exchange Plaza, 5th
            Floor, Plot No. C/1, G Block, Bandra Kurla Complex, Bandra (East),
            Mumbai-400051
          </Typography>
        </Grid>
        <Grid container item xs={12} sx={{ mt: 1, mb: 1 }}>
          <FormControl>
            {/* <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel> */}
            <RadioGroup defaultValue="Both NSE & BSE">
              {[
                "NSE Ltd, Exchange Plaza, 5th Floor, Plot No. C/1, G Block Bandra Kurla Complex, Bandra (East), Mumbai-400051",
                "BSE Limited, Market Operations Dept. Phiroze Jeejeebhai Towers,Dalal Street, Mumbai-400021",
                "Both NSE & BSE",
                "MCX Limited, Market Operations Dept. Phiroze Jeejeebhai Towers,Dalal Street, Mumbai-400021",
              ].map((item, index) => (
                <FormControlLabel
                  style={{
                    fontSize: "12px",
                  }}
                  sx={{ fontSize: "12px" }}
                  value={item}
                  key={item}
                  control={<Radio />}
                  label={item}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid
          container
          item
          xs={12}
          sx={{ fons: "14px", fontWeight: "bold", lineHeight: "1.5rem" }}
        >
          Sub : Disclosure under Regulation 30 of the SEBI (LODR) Regulations,
          2015
          <br />
          Dear Sirs,
          <br />
          This is to inform you that
          <br />
        </Grid>
        <Grid container item xs={12}>
          <TextareaAutosize
            placeholder="Enter your text here"
            style={{
              width: "100%",
              height: "120px",
            }}
          />
        </Grid>
        <Grid
          container
          item
          xs={12}
          sx={{ fons: "14px", fontWeight: "bold", lineHeight: "1.5rem" }}
        >
          The disclosures pursuant to Regulation 30 of the SEBI (LODR)
          Regulations,, 2015 and Part A of Schedule iii of the aforsaid
          regulations, is attached as per 'Annexure A'
          <br />
          This is for your information and record
          <br />
          Yours Failtfully
          <br />
        </Grid>
        <Grid container item xs={12}>
          <Typography
            sx={{
              fons: "14px",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
            }}
          >
            For <TextInput width="180px" /> (Company Name)
          </Typography>
          <FormControl fullWidth>
            <Typography sx={{ color: GREY }} variant="body2">
              Upload DSE
            </Typography>
            <TextInput width="270px" type="file" />
          </FormControl>
        </Grid>
        <Grid
          container
          item
          xs={12}
          sx={{ mt: 2, mb: 2, display: "flex", alignItems: "center" }}
        >
          <TextInput width="270px" />
          <Typography
            sx={{ color: GREY, whiteSpace: "nowrap", pr: 4 }}
            variant="body2"
          >
            Company Secretary Name
          </Typography>
        </Grid>
        <Grid
          container
          item
          xs={12}
          sx={{ mt: 2, mb: 2, display: "flex", alignItems: "center" }}
        >
          <TextInput width="270px" />
          <Typography
            sx={{ color: GREY, whiteSpace: "nowrap", pr: 4 }}
            variant="body2"
          >
            Designation
          </Typography>
        </Grid>
        <Typography
          sx={{
            color: "black",
            whiteSpace: "nowrap",
            pr: 4,
            fontWeight: "bold",
          }}
          variant="body2"
        >
          'Annexure A'
        </Typography>
      </Grid>
    </Grid>
  );
}

export default Step3;
