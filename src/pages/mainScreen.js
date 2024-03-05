import { Box, Container, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "../components/dataTable/dataTable";
import FilterMainScreen from "../components/filterMainScreen/filterMainScreen";
import CreateButton from "../components/button/createButton";
import BasicTitle from "../components/basicTitle/basicTitle";
import { getSuccessCase } from "../services/successCaseServerCalls";

function MainScreen() {

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {

      const getSuccessCases = await getSuccessCase();
      
      const data = getSuccessCases.map((successCase) => {
      return {
       id: successCase.id,
       client: successCase.Client.name,
       industry: successCase.Industry.name,
       projectType: successCase.ProjectType.name,
       referrer: successCase.Contact.name,
       date: successCase.startdate + " " + successCase.finishdate,
      };
      });

      setData(data);
    }
  
    fetchData();
  }, []);

  return (
    <Container maxWidth='l' sx={{ bgcolor: '#ffffff' }}>
      <div id="TITLE">
        <img src='/globant_logo.png' alt='' width='190' height='60' alignItem='center' />
        <BasicTitle basictitle={"Success cases"} />
      </div>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              height: '20rem',
              marginTop: '2rem',
              width: { xs: '100%', md: '100%' },
            }}
          ><FilterMainScreen /></Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box sx={{ textAlign: 'center', marginTop: '1rem' }}>
            <Link to="/layout2">
              <CreateButton />
            </Link>
          </Box>
        </Grid>
      </Grid>

      <div id="TABLE">
        <Box sx={{ height: '21.8rem', mt: '2rem', marginTop: '7rem' }} >
          <DataTable rows={data} />
        </Box>
      </div>
    </Container>
  );
}

export default MainScreen;
