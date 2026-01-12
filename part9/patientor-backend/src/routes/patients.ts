import express from "express";
import patientService from "../services/patientService";
import {PatientSchema} from "../type/Patient";

const router = express.Router();

router.get("/", (_req, res) => {
    res.send(patientService.getNonSensitivePatients());
});

router.post("/", (req, res) => {
    try {
        const newPatient = PatientSchema.parse(req.body);
        if (!newPatient)
            throw new Error("Invalid patient data");
        const addPatient = patientService.addPatient(newPatient);
        res.json(addPatient);
    } catch (e: unknown) {
        let errorMessage = "Something went wrong.";
        if (e instanceof Error) {
            errorMessage += " Error: " + e.message;
        }
        res.status(400).send(errorMessage);
    }
})

export default router;