import {useState} from "react";
import {HospitalEntry} from "../../types";
import patientService from "../../services/patients";
import {v4 as uuidv4} from "uuid";

type HospitalFormProps = {
    patientId: string;
};

const HospitalEntryForm = ({patientId}: HospitalFormProps) => {
    const [formData, setFormData] = useState<HospitalEntry>({
        id: uuidv4(),
        type: "Hospital",
        date: "",
        specialist: "",
        description: "",
        diagnosisCodes: [],
        discharge: {
            date: "",
            criteria: "",
        },
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleDischargeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            discharge: {
                ...formData.discharge,
                [name]: value,
            },
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        patientService.addEntry(patientId, formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <div>
                    <label>Date:</label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Specialist:</label>
                    <input
                        type="text"
                        name="specialist"
                        value={formData.specialist}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <input
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Discharge Date:</label>
                    <input
                        type="date"
                        name="date"
                        value={formData.discharge.date}
                        onChange={handleDischargeChange}
                    />
                </div>
                <div>
                    <label>Discharge Criteria:</label>
                    <input
                        type="text"
                        name="criteria"
                        value={formData.discharge.criteria}
                        onChange={handleDischargeChange}
                    />
                </div>
                <div>
                    <label>Diagnosis Codes (comma separated):</label>
                    <input
                        type="text"
                        value={formData.diagnosisCodes.join(",")}
                        onChange={(e) => {
                            setFormData({
                                ...formData,
                                diagnosisCodes: e.target.value
                                    .split(",")
                                    .map((code) => code.trim()),
                            });
                        }}
                    />
                </div>
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default HospitalEntryForm;
