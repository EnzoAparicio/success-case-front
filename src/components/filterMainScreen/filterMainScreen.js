import { Autocomplete, TextField, InputAdornment } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import FormInfoInput from "../BasicFormInfo";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import Grid from "@mui/system/Unstable_Grid/Grid";
import SelectListClients from "../selectListClients/selectListClients";
import MultipleSelect from "../selectListIndustry";
import SelectListProjectType from "../selectListProjectType/selectListProjectType";
import { margin } from '@mui/system';
import { getClients, getIndustries, getProyectsTypes, getContacts } from "../../services/successCaseServerCalls";
import { useState } from 'react';
import { useEffect } from 'react';
import { AccountCircle } from "@mui/icons-material";
import NextButton from '../button/nextButton';
import SearchButton from '../button/searchButton';
import { Box, MenuItem, OutlinedInput, Select, FormControl } from "@mui/material";



function FilterMainScreen() {

    const [clients, setClients] = useState([]);
    
    const [clientSelected, setClientSelected] = useState(null);

    const [type, setProjectType] = useState([]);

    const [typeSelected, setTypeSelected] = useState(null);

    const [industries, setIndustries] = useState([]);

    const [industrySelected, setIndustrySelected] = useState(null);

    const [contact, setContact] = useState([]);

    const [contactSelected, setContactSelected] = useState(null);

    const [dateFrom, setDateFrom] = useState();

    const [dateTo, setDateTo] = useState();

    useEffect(() => {
        if (dateTo < dateFrom && dateTo !== null) {
            alert("El valor Seleccionado es menor a la fecha inicial")
            setDateTo(null)
        }

    }, [dateTo])

    useEffect(() => {
        if (dateTo < dateFrom && dateFrom !== null) {
            alert("El valor Seleccionado es mayor a la fecha final")
            setDateFrom(null)
        }

    }, [dateFrom])

    useEffect(() => {
        getClients().then((result) => {
            setClients(result);
        });
        getProyectsTypes().then((result) => {
            setProjectType(result);
        });
        getIndustries().then((result) => {
            setIndustries(result);
        });
        getContacts().then((result) => {
            setContact(result);
        });
    }, [])

    return (
        <div>
            <Grid containerInput
                sx={{ width: "inherit", position: "relative" }}>
                <Grid item xs={12}>
                    {(clients.length > 0) && (<SelectListClients options={clients} value={clientSelected} onChange={setClientSelected}> </SelectListClients>)}
                </Grid>

                <Grid item xs={12}>
                    <MultipleSelect options={industries} value={industrySelected} onChange={setIndustrySelected}> </MultipleSelect>
                </Grid>

                <Grid item xs={12}>
                    <SelectListProjectType options={type} value={typeSelected} onChange={setTypeSelected}> </SelectListProjectType>
                </Grid> 

                <Grid item xs={12}>

                </Grid>


                <Grid item xs={12}>
                    <FormInfoInput
                        marginRight={'4rem'}
                        customStyleClass={"form-margin"}
                        label={"Date from"}
                        width={"18.5rem"}
                        customInput={
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="From"
                                    value={dateFrom}
                                    onChange={(newValue) => setDateFrom(newValue)}
                                />

                            </LocalizationProvider>
                        }
                    ></FormInfoInput>
                </Grid>
                <Grid item xs={12}>
                    <FormInfoInput
                        marginRight={'5.5rem'}
                        customStyleClass={"form-margin"}
                        label={"Date to"}
                        width={"18.5rem"}
                        customInput={
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="To"
                                    value={dateTo}
                                    onChange={(newValue) => setDateTo(newValue)}
                                />
                            </LocalizationProvider>
                        }
                    ></FormInfoInput>
                </Grid>

                <Grid item xs={12}>
                    <FormInfoInput
                        id="projectContactsAutoComplete"
                        marginRight={'1.2rem'}
                        customStyleClass={"form-margin"}
                        label={"Project contact"}
                        customInput={
                            <FormControl sx={{ m: 1, width: 300 }}>
                                <Select
                                    labelId="projectContactsAutoComplete-label"
                                    id="projectContact"
                                    value={contactSelected}
                                    onChange={(newValue) => {
                                        setContactSelected(newValue.target.value);
                                    }}
                                    input={<OutlinedInput label="Name" />}
                                >
                                    {contact.map((item) => (
                                        <MenuItem
                                            key={item.id}
                                            value={item.id}
                                        >
                                            {item.name + " " + item.surName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        }
                    ></FormInfoInput>


                </Grid>

            </Grid>

            <Grid item xs={12} md={3} xl={4}>
                <Box sx={{ textAlign: 'center', marginTop: '1rem' }}>
                    {/* <Link to="/layout2"> */}
                        <button onClick={() => {console.log("CLient=", clientSelected, "\nIndustry=", industrySelected, "\nType=", typeSelected, "\ndateFrom=", dateFrom, "\ndateTo=", dateTo, "\nContact=", contactSelected)}}>

                        </button>
                    {/* </Link> */}
                </Box>
            </Grid>

{/* getSuccessCasesByFilter */}

        </div>
    );
}
export default FilterMainScreen