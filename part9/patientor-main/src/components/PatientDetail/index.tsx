import {Patient} from "../../types";
import {useEffect, useState} from "react";
import { Diagnosis } from "../../types";
import diagnosisService from "../../services/diagnosis";
import AddPatientEntry from "./AddPatientEntry";

type PatientDetailProps = {
    patient:Patient;
}

const PatientDetail = ({patient}:PatientDetailProps) => {

    const[diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

    useEffect(() => {
        const fetchDiagnoses = async () => {
            const data = await diagnosisService.getDiagnoses();
            setDiagnoses(data)
        };
        void fetchDiagnoses();
    },[])

    if (!patient) return <div>Patient not found</div>;

    return (
        <div>
            <h2>{patient.name}</h2>
            ssn: {patient.ssn} <br/>
            occupation: {patient.occupation}<br/>
            <AddPatientEntry patientId={patient.id} />
            <h3>entries</h3>
            {patient.entries.map(entry => (
                <div>
                    <div key={entry.id}>
                        <p>{entry.date} {entry.description}</p>
                    </div>
                    <div>
                        {entry.diagnosisCodes &&
                            <ul>
                                {entry.diagnosisCodes.map(code => (
                                    <li key={code}>{code} {diagnoses?.find(d=>d.code===code)?.name}</li>
                                ))}
                            </ul>
                        }
                    </div>
                    <div>
                        <strong>diagnosed by {entry.specialist}</strong>
                    </div>
                </div>
                ))}
        </div>
    )
}

export default PatientDetail;