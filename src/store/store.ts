import { create } from "zustand";
import { DraftPatient, Patient } from "../types";
import { v4 as uuid4 } from "uuid";
import { devtools, persist } from "zustand/middleware";

type PatientState = {
  patients: Patient[];
  activeId: Patient["id"];
  addPatient: (data: DraftPatient) => void;
  deletePatient: (id: Patient["id"]) => void;
  getPatientById: (id: Patient["id"]) => void;
  updatePatient: (data: DraftPatient) => void;
};
const createPatient = (patient: DraftPatient): Patient => {
  return {
    id: uuid4(),
    ...patient,
  };
};
export const usePatientStore = create<PatientState>()(
  devtools(
    persist(
      (set) => ({
        patients: [],
        activeId: "",
        addPatient: (data: DraftPatient) => {
          const newPatient = createPatient(data);

          set((state) => ({
            patients: [...state.patients, newPatient],
          }));
        },
        deletePatient: (id: Patient["id"]) => {
          set((state) => ({
            patients: state.patients.filter((patient) => patient.id !== id),
          }));
        },
        getPatientById: (id) => {
          set(() => ({
            activeId: id,
          }));
        },
        updatePatient: (data) => {
          set((state) => ({
            patients: state.patients.map((patient) =>
              patient.id === state.activeId
                ? { id: state.activeId, ...data }
                : patient
            ),
            activeId: "",
          }));
        },
      }),
      {
        name: "patient-storage"
      }
    )
  )
);
