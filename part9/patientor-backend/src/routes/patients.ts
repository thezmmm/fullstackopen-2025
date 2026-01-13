import express from "express";
import patientService from "../services/patientService";
import {PatientSchema} from "../type/Patient";

const router = express.Router();

router.get("/", (_req, res) => {
    res.send(patientService.getNonSensitivePatients());
});

router.get("/:id", (req, res) => {
    const patient = patientService.getPatientById(req.params.id);
    if (patient) {
        res.json(patient);
    } else {
        res.status(404).send("Patient not found");
    }
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

router.post("/:id/entries", (req, res) => {
    try {
        const patientId = req.params.id;
        const newEntry = req.body;
        const addedEntry = patientService.addEntryToPatient(patientId, newEntry);
        res.json(addedEntry);
    } catch (e: unknown) {
        let errorMessage = "Something went wrong.";
        if (e instanceof Error) {
            errorMessage += " Error: " + e.message;
        }
        res.status(400).send(errorMessage);
    }
});

export default router;