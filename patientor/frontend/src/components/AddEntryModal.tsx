import { Alert, InputLabel, Button, Dialog, DialogContent, DialogTitle, Divider, Grid, MenuItem, Select, SelectChangeEvent, TextField, Box, Chip } from "@mui/material";

import { Diagnosis, Discharge, type Entry , EntryWithoutId, HealthCheckRating, SickLeave} from "../types";
import React, { useState } from "react";
import { assertNever } from "../utils/helper";

interface Props {
    modalVisible: boolean;
    setModalVisible: (b:boolean)=> void;
    addEntry: (entry: EntryWithoutId) => void;
    error: string;
    diagnoses: Diagnosis[];
}

interface typeEntry {
    name: string;
    value: Entry['type']
}
const typeList : typeEntry[] = [{
    value: "Hospital",
    name: "Hospital"
},
{
    value: "OccupationalHealthcare",
    name: "Occupational Healthcare"
},
{
    value: "HealthCheck",
    name: "Health Check"
}];


export const AddEntryModal = ({modalVisible, setModalVisible,addEntry, error, diagnoses}: Props) => {
    const [type, setType] = useState<Entry['type']>(typeList[0].value);
    const [description, setDescription] = useState<string>('');
    const [date,setDate ] =useState<string>(new Date().toISOString().split('T')[0]);
    const [specialist, setSpecialist] =useState<string>('');
    const [diagnosisCodes, setDiagnosisCodes] =useState<Array<Diagnosis['code']> >([]);
    const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating >(0);
    const [discharge,setDischarge] = useState<Discharge>({date:new Date().toISOString().split('T')[0], criteria:''});
    const [employerName, setEmployerName] = useState<string>('');
    const [sickLeave, setSickLeave] =useState<SickLeave>({
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date().toISOString().split('T')[0]
    });

    const addEntryHandler = (e:React.SyntheticEvent) =>{
        e.preventDefault();
        const base ={description, date,specialist,diagnosisCodes};
        const newEntry :EntryWithoutId = (()=>{
            switch(type){
                case "HealthCheck":{
                    return {...base, type:"HealthCheck", healthCheckRating: healthCheckRating};
 
                }
                case "Hospital":{
                    return {...base, type: "Hospital", discharge};
                }
                case "OccupationalHealthcare":{
                    return {...base, type:"OccupationalHealthcare",employerName, sickLeave};
                }
                default :{
                    return assertNever(type);
                }
            }
        })();

        addEntry(newEntry);

    };

    const diagnosisCodesChange = (e: SelectChangeEvent<Array<Diagnosis['code']>>) => {
        const value = e.target.value;
        setDiagnosisCodes(
            typeof value === "string"?value.split(','):value
        );
    };
    return (
    <Dialog fullWidth={true} open={modalVisible} onClose={() => setModalVisible(false)}>
        <DialogTitle>Add a new patient</DialogTitle>
        <Divider />
        <DialogContent>
            {error !== '' && <Alert severity="error">{error}</Alert>}
                <div>
                    <form onSubmit={addEntryHandler}>
                        <Select
                            label="Type"
                            fullWidth
                            value={type}
                            onChange={(e:SelectChangeEvent<Entry['type']>)=>{
                                console.log('type changed ',e.target.value);
                                setType(e.target.value);}
                            }
                            style={{marginBottom:"3px"}}
                        >
                        {typeList.map(item =>
                        <MenuItem
                            key={item.name}
                            value={item.value}
                        >
                            {item.name
                        }</MenuItem>
                        )}
                        </Select>
                        <TextField
                            label="Description"
                            fullWidth 
                            value={description}
                            onChange={({ target }) => setDescription(target.value)}
                            style={{marginBottom:"3px"}}
                        />
                        <TextField
                            label="Specialist"
                            fullWidth
                            value={specialist}
                            onChange={({ target }) => setSpecialist(target.value)}
                            style={{marginBottom:"3px"}}
                        />
                        <TextField
                            type= "date"
                            label="Date"
                            fullWidth
                            value={date}
                            onChange={({ target }) => setDate(target.value)}
                            style={{marginBottom:"3px"}}
                        />
                        <InputLabel id="diagnosis-codes-label">Diagnosis codes</InputLabel>
                        <Select
                            labelId="diagnosis-codes-label"
                            fullWidth
                            multiple
                            value={diagnosisCodes}
                            onChange={diagnosisCodesChange}
                            style={{marginBottom:"3px"}}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                    <Chip key={value} label={value} />
                                ))}
                                </Box>
                            )}
                        >
                            {diagnoses.map((item) => (
                                <MenuItem 
                                key={item.code}
                                value={item.code}
                                >
                                {item.code} - {item.name}
                                </MenuItem>
                            ))}
                        </Select>
                        <Divider sx={{ marginY: 2 }} />
                        {type === "HealthCheck" &&  
                        <Select
                            label="Health check rating"
                            fullWidth
                            value={healthCheckRating}
                            onChange={(e:SelectChangeEvent<HealthCheckRating>)=>{
                                setHealthCheckRating(e.target.value);}
                            }
                            style={{marginBottom:"3px"}}
                        >
                        {Object.entries(HealthCheckRating).map(([key,value]) =>
                        <MenuItem
                            key={key}
                            value={value}
                        >
                            {value} - {key}
                        </MenuItem>
                        )}
                        </Select>
                        }
                        {type === "OccupationalHealthcare" &&
                        <>
                        <TextField
                            label="EmployerName"
                            fullWidth 
                            value={employerName}
                            onChange={({ target }) => setEmployerName(target.value)}
                            style={{marginBottom:"3px"}}
                        />
                        <TextField
                            type= "date"
                            label="Start date"
                            fullWidth
                            value={sickLeave.startDate}
                            onChange={({ target }) => setSickLeave({...sickLeave,startDate:target.value})}
                            style={{marginBottom:"3px"}}
                        />
                        <TextField
                            type= "date"
                            label="End date"
                            fullWidth
                            value={sickLeave.endDate}
                            onChange={({ target }) => setSickLeave({...sickLeave,endDate:target.value})}
                            style={{marginBottom:"3px"}}
                        />
                        </>
                        }
                        {type === "Hospital" &&
                        <>
                        <TextField
                            type= "date"
                            label="Discharge"
                            fullWidth
                            value={discharge.date}
                            onChange={({ target }) => setDischarge({...discharge,date:target.value})}
                            style={{marginBottom:"3px"}}
                        />
                        <TextField
                            label="Criteria"
                            fullWidth 
                            value={discharge.criteria}
                            onChange={({ target }) => setDischarge({...discharge, criteria:target.value})}
                            style={{marginBottom:"3px"}}
                        />
                        </>
                        }


                        <Grid container justifyContent="space-between" sx={{ marginTop: 2 }}>
                        <Grid size="auto">
                            <Button
                            color="secondary"
                            variant="contained"
                            type="button"
                            onClick={()=>setModalVisible(false)}
                            >
                            Cancel
                            </Button>
                        </Grid>
                        <Grid size="auto">
                            <Button
                            type="submit"
                            variant="contained"
                            >
                            Add
                            </Button>
                        </Grid>
                        </Grid>
                    </form>
                    </div>
        </DialogContent>
    </Dialog>
    );
};
