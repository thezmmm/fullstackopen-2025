import {useState} from "react";
import {HealthCheckEntry} from "../../types";
import patientService from "../../services/patients";
import {v4 as uuidv4} from 'uuid';

type HealthCheckFormProps = {
    patientId: string;
    setNotification: (message: string) => void;
}

const HealthCheckForm = ({patientId,setNotification}: HealthCheckFormProps) => {

    const [formData, setFormData] = useState<HealthCheckEntry>({
        id: uuidv4(),
        date: '',
        type: 'HealthCheck',
        specialist: '',
        description: '',
        healthCheckRating: 0,
        diagnosisCodes: []
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        try{
            patientService.addEntry(patientId, formData);
        }catch (error: unknown) {
            if (error instanceof Error) {
                setNotification(`Error adding entry: ${error.message}`);
            } else {
                setNotification("Unknown error occurred while adding entry");
            }

            setTimeout(() => setNotification(""), 5000);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <div>
                    <label>Date:</label>
                    <input type="date" name="date" value={formData.date} onChange={handleChange}/>
                </div>
                <div>
                    <label>Specialist:</label>
                    <input type="text" name="specialist" value={formData.specialist} onChange={handleChange}/>
                </div>
                <div>
                    <label>Description:</label>
                    <input type="text" name="description" value={formData.description} onChange={handleChange}/>
                </div>
                <div>
                    <label>Health Check Rating (0-3):</label>
                    <input type="number" name="healthCheckRating" min="0" max="3" value={formData.healthCheckRating}
                           onChange={handleChange}/>
                </div>
                <div>
                    <label>Diagnosis Codes (comma separated):</label>
                    <input type="text" name="diagnosisCodes" value={formData.diagnosisCodes.join(',')}
                           onChange={(e) => {
                               setFormData({
                                   ...formData,
                                   diagnosisCodes: e.target.value.split(',').map(code => code.trim())
                               });
                           }}
                    />
                </div>
            </div>
            <button type="submit">Submit</button>
        </form>
    )
}

export default HealthCheckForm;