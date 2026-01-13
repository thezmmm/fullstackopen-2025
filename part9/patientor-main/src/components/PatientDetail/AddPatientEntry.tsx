import {useState} from "react";
import HealthCheckForm from "./HealthCheckForm";
import HospitalForm from "./HospitalForm";
import OccupationalHealthcareForm from "./OccupationalHealthcareForm";

type addPatientEntryProps = {
    patientId: string;
    setNotification: (message: string) => void;
}

const AddPatientEntry = ({patientId,setNotification}:addPatientEntryProps) => {
    const [tab, setTab] = useState<'HealthCheck' | 'Hospital' | 'OccupationalHealthcare'>('HealthCheck');
    return (
        <div>
            <h3>Add New Entry</h3>
            <div>
                <button onClick={() => setTab('HealthCheck')}>Health Check</button>
                <button onClick={() => setTab('Hospital')}>Hospital</button>
                <button onClick={() => setTab('OccupationalHealthcare')}>Occupational Healthcare</button>
            </div>
            <div>
                {tab === 'HealthCheck' && <HealthCheckForm patientId={patientId} setNotification={setNotification}/>}
                {tab === 'Hospital' && <HospitalForm patientId={patientId} setNotification={setNotification}/>}
                {tab === 'OccupationalHealthcare' && <OccupationalHealthcareForm patientId={patientId} setNotification={setNotification}/>}
            </div>
        </div>
    )
}

export default AddPatientEntry;