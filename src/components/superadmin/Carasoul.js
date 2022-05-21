import { Box, Card, Paper } from "@mui/material";
import React from "react";
import Carousel from "react-material-ui-carousel";

const Carasoul = () => {
  var items = [
    {
      name: "Calculators",
      description:
        "Corpro, a group of dedicated, research oriented and skilled professionals is pioneer in delivering innovative and distinguished corporate business solutions through a unique model of integrated legal and financial consulting services since 2003.",
      imag: "/calculator.png",
    },
    {
      name: "Customizable Documents",
      description:
        "Corpro, a group of dedicated, research oriented and skilled professionals is pioneer in delivering innovative and distinguished corporate business solutions through a unique model of integrated legal and financial consulting services since 2003.",
      imag: "/document.png",
    },
    {
      name: "List of Laws",
      description:
        "Corpro, a group of dedicated, research oriented and skilled professionals is pioneer in delivering innovative and distinguished corporate business solutions through a unique model of integrated legal and financial consulting services since 2003.",
      imag: "/law.png",
    },
  ];

  function Item(props) {
    return (
      <Card
        sx={{
          minHeight: "75vh",
          borderRadius: "20px",
          backgroundColor: "rgba(109,124,137, 0.5)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          color: "white",
          // backgroundColor: "transparent",
        }}
      >
        <Box
          sx={{
            px: 3,
          }}
        >
          <h2>{props.item.name}</h2>
          <p>{props.item.description}</p>
        </Box>
        <Box
          sx={{
            mt: 2,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <img
            src={props.item.imag}
            alt={props.item.name}
            height="320px"
            width="320px"
          />
        </Box>
      </Card>
    );
  }

  return (
    <>
      <Carousel
        timeout={400}
        autoPlay
        animation="fade"
        navButtonsAlwaysInvisible
        indicatorIconButtonProps={{
          style: {
            float: "left",
            left: "16px",
            paddingLeft: "4px",
            top: "-43px",
            color: "black",
          },
        }}
        activeIndicatorIconButtonProps={{
          style: {
            color: "white",
          },
        }}
      >
        {items.map((item, i) => (
          <Item key={i} item={item} />
        ))}
      </Carousel>
    </>
  );
};

export default Carasoul;
