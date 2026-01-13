import {useState} from "react";
import {OccupationalHealthcareEntry} from "../../types";
import patientService from "../../services/patients";
import {v4 as uuidv4} from "uuid";

type OccupationalFormProps = {
    patientId: string;
};

const OccupationalHealthcareForm = ({patientId}: OccupationalFormProps) => {
    const [formData, setFormData] = useState<OccupationalHealthcareEntry>({
        id: uuidv4(),
        type: "OccupationalHealthcare",
        date: "",
        specialist: "",
        description: "",
        employerName: "",
        diagnosisCodes: [],
        sickLeave: {
            startDate: "",
            endDate: "",
        },
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSickLeaveChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            sickLeave: {
                ...formData.sickLeave,
                [name]: value,
            }
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
                    <label>Employer Name:</label>
                    <input
                        type="text"
                        name="employerName"
                        value={formData.employerName}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Sick Leave Start:</label>
                    <input
                        type="date"
                        name="startDate"
                        value={formData.sickLeave?.startDate || ""}
                        onChange={handleSickLeaveChange}
                    />
                </div>
                <div>
                    <label>Sick Leave End:</label>
                    <input
                        type="date"
                        name="endDate"
                        value={formData.sickLeave?.endDate || ""}
                        onChange={handleSickLeaveChange}
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

export default OccupationalHealthcareForm;
