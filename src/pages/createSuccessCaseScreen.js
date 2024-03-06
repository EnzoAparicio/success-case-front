import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AccountCircle } from "@mui/icons-material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import OfferingSelectList from "../components/selectListSuccessCaseScreen/offeringSelectList";
import ClientSelectList from "../components/selectListSuccessCaseScreen/clientSelectList";
import IndustrySelectList from "../components/selectListSuccessCaseScreen/industrySelectList";
import ProjectTypeSelectList from "../components/selectListSuccessCaseScreen/projectTypeSelectList";
import FormInfoInput from "../components/BasicFormInfo";
import { ProcessContextProvider } from "../context/process.context";
import { getClients, getOfferings } from "../services/successCaseServerCalls";

const initialPage = {
  text: "",
  image: "",
};

export default function CreateSuccessCaseScreen() {
  const { navigate, setSuccessCase } = useContext(ProcessContextProvider);
  const [projectTitleValue, setProjectTitleValue] = useState("");
  const [selectedOffering, setSelectedOffering] = useState("");
  const [selectedProjectType, setSelectedProjectType] = useState([]);
  const [selectedClient, setSelectedClient] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState([]);
  const [projectContactValue, setProjectContactValue] = useState("");
  const [avgTeamSizeValue, setAvgTeamSizeValue] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [startDateValue, setStartDateValue] = useState();
  const [finishDateValue, setFinishDateValue] = useState();

  const [offerings, setOfferings] = useState();
  const [clients, setClients] = useState();

  const submitHandler = () => {
    setSuccessCase({
      title: projectTitleValue,
      offering: selectedOffering,
      client: selectedClient,
      industry: selectedIndustry,
      startDate: startDateValue,
      finishDate: finishDateValue,
      projectContact: projectContactValue,
      teamSize: avgTeamSizeValue,
      isPublic: isPublic,
      successCase: [initialPage],
      challenge: [initialPage],
      improvements: [initialPage],
      technologie: [initialPage],
    });
    navigate("successCase");
  };

  const handleProjectTitleChange = (event) => {
    setProjectTitleValue(event.target.value);
  };

  const handleOfferingChange = (event) => {
    setSelectedOffering(event.target.value);
  };

  const handleClientChange = (event) => {
    setSelectedClient(event.target.value);
  };

  const handleIndustryChange = (event) => {
    setSelectedIndustry(event.target.value);
  };

  const handleProjectTypeChange = (event) => {
    selectedProjectType(event.target.value);
  };

  const handleProjectContactChange = (event) => {
    setProjectContactValue(event.target.value);
  };

  const handleAvgTeamSizeChange = (event) => {
    setAvgTeamSizeValue(event.target.value);
  };

  const handleIsPublicChange = (event) => {
    setIsPublic(event.target.checked);
  };

  const getOfferingsInit = () => {
    getOfferings().then((response) => {
      setOfferings(response)
    });
  }

  const getClientsInit = () => {
    getClients().then((response) => {
      setClients(response)
    });
  }

  useEffect(() => {
    getOfferingsInit();
    getClientsInit();
  }, [])
  

  useEffect(() => {
    if (finishDateValue < startDateValue) {
      alert("El valor Seleccionado es menor a la fecha inicial");
      setFinishDateValue(null);
    }
  }, [finishDateValue, setFinishDateValue]);

  useEffect(() => {
    if (finishDateValue < startDateValue) {
      alert("El valor Seleccionado es menor a la fecha inicial");
      setFinishDateValue(null);
    }
  }, [startDateValue, finishDateValue]);


  return (
    <Container maxWidth="lg" sx={{ bgcolor: "white", minHeight: "100vh" }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography
            variant="h3"
            gutterBottom
            sx={{
              marginLeft: "24rem ",
              marginRight: "auto",
              marginTop: "3rem",
              fontWeight: "bold",
              color: "#c42116",
            }}
          >
            New Success Case
          </Typography>
        </Grid>

        <div>
          <FormControlLabel
            value="top"
            control={
              <Switch
                color="primary"
                checked={isPublic}
                onChange={handleIsPublicChange}
              />
            }
            label="Make Public"
            labelPlacement="top"
            sx={{
              marginLeft: "48rem ",
              marginRight: "auto",
              marginTop: "2rem",
            }}
          />
          <Tooltip
            title={
              <h1 style={{ color: "black" }}>
                If the Make Public option is turned on, any person will be able
                to see the Client field. If it is OFF, then the Client field
                will only be displayed to the Success Case creator
              </h1>
            }
          >
            <IconButton sx={{ marginTop: "3.4rem" }}>
              <HelpOutlineIcon />
            </IconButton>
          </Tooltip>
        </div>
        <Grid
          containerInput
          sx={{ width: "inherit", marginLeft: "25rem", position: "relative" }}
        >
          <Grid item xs={12} paddingRight={"19.5rem"}>
            <FormInfoInput
              marginRight={"7.4rem"}
              customStyleClass={"form-margin"}
              label={"Title"}
              width={300}
              customInput={
                <TextField
                  inputProps={{ type: "text" }}
                  onChange={handleProjectTitleChange}
                  value={projectTitleValue}
                />
              }
            ></FormInfoInput>
          </Grid>

          <Grid item xs={12}>
            <OfferingSelectList
              value={selectedOffering}
              onChange={handleOfferingChange}
              options={offerings}
            ></OfferingSelectList>
          </Grid>

          <Grid item xs={12}>
            <ClientSelectList
              value={selectedClient}
              onChange={handleClientChange}
              options={clients}
            />
          </Grid>

          <Grid item xs={12}>
            <ProjectTypeSelectList
              value={selectedProjectType}
              onChange={handleProjectTypeChange}
              options={["EJEMPLO", "EJEMPLO", "EJEMPLO", "EJEMPLO"]}
            ></ProjectTypeSelectList>
          </Grid>

          <Grid item xs={12}>
            <IndustrySelectList
              value={selectedIndustry}
              onChange={handleIndustryChange}
              options={["Entertainment", "Healthcare", "Banking", "Education"]}
            ></IndustrySelectList>
          </Grid>

          <Grid item xs={12}>
            <FormInfoInput
              marginRight={"6.9rem"}
              customStyleClass={"form-margin"}
              label={"Date"}
              customInput={
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  {/* <DatePicker
                    variant="standard"
                    value={selectedDate}
                    onChange={handleDateChange}
                  /> */}
                  {/* <DemoContainer components={['DateTimePicker']}> */}
                  <DatePicker
                    label="From"
                    value={startDateValue}
                    onChange={(newValue) => setStartDateValue(newValue)}
                  />
                  <DatePicker
                    label="To"
                    value={finishDateValue}
                    onChange={(newValue) => setFinishDateValue(newValue)}
                  />
                  {/* </DemoContainer> */}
                </LocalizationProvider>
              }
            ></FormInfoInput>
          </Grid>

          <Grid item xs={12}>
            <FormInfoInput
              marginRight={"1.4rem"}
              customStyleClass={"form-margin"}
              label={"Project contact"}
              customInput={
                <FormControl variant="standard">
                  <Input
                    id="input-with-icon-adornment"
                    startAdornment={
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    }
                    onChange={handleProjectContactChange}
                    value={projectContactValue}
                  />
                </FormControl>
              }
            ></FormInfoInput>
          </Grid>

          <Grid item xs={12}>
            <FormInfoInput
              marginRight={"0.3rem"}
              customStyleClass={"form-margin"}
              label={"Avg. Team size *"}
              width={300}
              customInput={
                <TextField
                  inputProps={{ type: "number" }}
                  onChange={handleAvgTeamSizeChange}
                  value={avgTeamSizeValue}
                />
              }
            ></FormInfoInput>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Button
            variant="contained"
            size="large"
            sx={{
              height: "2.5rem",
              marginTop: { xs: "1rem", md: "4rem" },
              marginLeft: "35rem",
              marginRight: "auto",
              marginBottom: "200px",
            }}
            onClick={submitHandler}
          >
            Create
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
