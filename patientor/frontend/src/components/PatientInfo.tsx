import { useParams } from "react-router-dom"
import { Diagnosis, Patient } from "../types"
import { Female } from "@mui/icons-material";
import { Male } from "@mui/icons-material";
import PatientsServices from "../services/patients"
import { useEffect, useState } from "react";
import { Button, Divider } from "@mui/material";
import type { Entry, EntryWithoutId } from "../types";
import { assertNever } from "../utils/helper";
import { HEALTHBAR_TEXTS } from "./HealthRatingBar";
import { AddEntryModal } from "./AddEntryModal";
import axios from "axios";


const entryStyle ={
    border: "2px solid black",
    borderRadius: '10px', 
    padding: '5px 12px 0px 10px',
    margin: "2px"
}

const EntryDetails = ({entry, diagnoses} : {entry: Entry, diagnoses: Diagnosis[]}) => {

    switch(entry.type){
        case "HealthCheck":{
            return <div style={entryStyle}>{entry.date} {entry.type}
                <p>{HEALTHBAR_TEXTS[entry.healthCheckRating]}</p>
                <p>{entry.description}</p>
                {entry.diagnosisCodes?.map(item => <p key={item}>{item} {diagnoses.find(diagnose => diagnose.code === item)?.name?? "No description"}</p>)}
                <p>diagnose by {entry.specialist}</p>
            </div>
        }
        case "Hospital":{
            return <div style={entryStyle}>{entry.date} {entry.type}
                <div>{entry.description}</div>
                {entry.diagnosisCodes?.map(item => <div key={item}>{item} {diagnoses.find(diagnose => diagnose.code === item)?.name?? "No description"}</div>)}
                <div>Discharged:{entry.discharge.date} {entry.discharge.criteria}</div>
                <div>diagnose by {entry.specialist}</div>
            </div>
        }
        case "OccupationalHealthcare": {
            return <div style={entryStyle}>{entry.date} {entry.type}
                {entry?.sickLeave &&(<p>Days off: from {entry.sickLeave.startDate} to {entry.sickLeave.endDate}</p>)}
                <p>{entry.description}</p>
                {entry.diagnosisCodes?.map(item => <p key={item}>{item} {diagnoses.find(diagnose => diagnose.code === item)?.name?? "No description"}</p>)}
                <p>diagnose by {entry.specialist}</p>
            </div>
        }
        default:
            assertNever(entry);
    }

}



export const PatientInfo = ({diagnoses}:{diagnoses: Diagnosis[]}) =>{
    const [patient, setPatient] =useState<Patient| null>(null)
    const params = useParams()
    const [modalVisible, setModalVisible] = useState<boolean>(false)
    const [error, setError] =useState<string>('')

    useEffect(() => {
        if (!(typeof params.id == "string")) return
        PatientsServices.getById(params.id).then(res => setPatient(res))
    }, [])
    
    /*const patient = patients.find(item => item.id === params.id)*/
    
    const addEntry = async (entry: EntryWithoutId) => {
        if (!patient) return
        try{
            const result = await PatientsServices.addEntry(patient.id as string, entry)
            console.log("added")
            console.log(result)
            setPatient({...patient, entries:patient.entries.concat(result)})
            setModalVisible(false)
        } catch (e:unknown){
            if (axios.isAxiosError(e)){
                console.log(e.response)
                setError(e.response?.data.message)
            } else {
                setError('Unknown Error')
            }
        }
    }

    if (!patient) {
        console.log('patioent doesnt exist qutting')
        return <h2>Patient does not exist</h2>
    }
    console.log('rendering patient')
    console.log(patient)
    return(
        
        <div>
            <h3 style={{fontSize: "30px", fontWeight:"bold"}}>{patient.name}{patient.gender=='male'?<Male/>:<Female/>}</h3>
            <p>snn: {patient.ssn}</p>
            <p>occupation: {patient.occupation}</p>
            <p>date of birth: {patient.dateOfBirth}</p>
            <Divider sx={{ marginY: 2 }} />
            {patient?.entries.map(item => 
                    <EntryDetails key={item.id} entry={item} diagnoses={diagnoses}/>
                )}
            <Divider sx={{ marginY: 2 }} />
            <Button variant="contained" onClick={()=> setModalVisible(true)}>add new entry</Button>
            <AddEntryModal modalVisible={modalVisible} setModalVisible={setModalVisible} addEntry={addEntry} error={error} diagnoses={diagnoses}/>
        </div>
    )
}