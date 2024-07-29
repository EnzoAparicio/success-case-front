import { Box, Container, Grid } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import DataTable from "../components/dataTable/dataTable";
import FilterMainScreen from "../components/filterMainScreen/filterMainScreen";
import BasicTitle from "../components/basicTitle/basicTitle";
import { getSuccessCase } from "../services/successCaseServerCalls";
import { CaseViewContextProvider } from "../context/casesView.context";
import LoginButton from "../components/button/LoginButton";
import LogoutButton from "../components/button/LogoutButton";
import { useAuth0 } from '@auth0/auth0-react';

function MainScreen() {

  const [data, setData] = useState([]);
  const { successCasesList, setSuccessCasesList } = useContext(
    CaseViewContextProvider
  );

  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [token, setToken] = useState(undefined);

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
    getSuccessCase().then(result => {
      setSuccessCasesList(result)
    })}
    else {
      setSuccessCasesList([])
      if (isAuthenticated){
        setToken(getAccessTokenSilently())
      }
    }
  }, [isAuthenticated, token]);

  useEffect(() => {
    if (successCasesList && successCasesList.length > 0) {
      const temp = successCasesList.map((successCase) => {
        return {
          id: successCase.id,
          client: successCase.Client.name,
          industry: successCase.Industry.name,
          projectType: successCase.ProjectType.name,
          referrer: successCase.Contact.name + " " + successCase.Contact.surName,
          date: successCase.startdate + " " + successCase.finishdate,
        };
      });
      setData(temp);
    }
  }, [successCasesList]);

  return (
    <Container maxWidth='l' sx={{ bgcolor: '#ffffff'}}>
      <div id='TITLE' style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
        <BasicTitle basictitle={"Success cases"} />
        <div style={{marginTop: '1rem', marginRight: '1rem'}}>
          <img src='/globant_logo.png' alt='' width='190' height='60'/>
        </div>
      </div>

      <Grid container spacing={2} xs={12}>
        <Box
          sx={{
            textAlign: 'center',
            marginTop: '2rem',
            width: { xs: '100%', md: '100%' },
          }}
        >
          <FilterMainScreen />
        </Box>
      </Grid>

      <div id="TABLE">
        <Box sx={{}} >
          <DataTable rows={data} />
        </Box>
      </div>
      <div>
        <LoginButton/>

        
        <LogoutButton/>
      </div>
    </Container>
  );
}

export default MainScreen;