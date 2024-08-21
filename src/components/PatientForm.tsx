import { useForm } from "react-hook-form";
import { Errors } from "./Error";
import { DraftPatient } from "../types";
import { usePatientStore } from "../store/store";
import { useEffect } from 'react';

export function PatientForm() {
  const addPatient= usePatientStore((state)=>state.addPatient);
  const activeId= usePatientStore((state)=>state.activeId);
  const patients= usePatientStore((state)=>state.patients);
  const updatePatient= usePatientStore((state)=>state.updatePatient);
 
  
  const {
    register,
    handleSubmit,setValue,
    formState: { errors },reset
  } = useForm<DraftPatient>();

  useEffect(() => {
    if(activeId){
      const patient= patients.filter((patient)=> patient.id === activeId)[0];
      setValue('name',patient.name);
      setValue('caretaker',patient.caretaker);
      setValue('date',patient.date);
      setValue('email',patient.email);
      setValue('symptoms',patient.symptoms);   

    }
    
      
  
  }, [activeId])


  const registerPatient = (data: DraftPatient) => {
    if(activeId){
      updatePatient(data);
      
    }else {

      addPatient(data);
    }
    reset();
  
  };

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center">Seguimiento Paciente   </h2>

      <p className="text-lg mt-5 text-center mb-10">
        Añade Pacientes y {""}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>

      <form
        className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
        noValidate
        onSubmit={handleSubmit(registerPatient)}
      >
        <div className="mb-5">
          <label htmlFor="name" className="text-sm uppercase font-bold">
            Paciente
          </label>
          <input
            id="name"
            className="w-full p-3  border border-gray-100"
            type="text"
            placeholder="Nombre del Paciente"
            {...register("name", {
              required: "Nombre del paciente es Obligatorio",
            })}
          />
          {errors.name && <Errors>{errors.name?.message}</Errors>}
        </div>

        <div className="mb-5">
          <label htmlFor="caretaker" className="text-sm uppercase font-bold">
            Propietario
          </label>
          <input
            id="caretaker"
            className="w-full p-3  border border-gray-100"
            type="text"
            placeholder="Nombre del Propietario"
            {...register("caretaker", {
              required: "El propietario del paciente es Obligatorio",
            })}
          />
          {errors.caretaker && <Errors>{errors.caretaker?.message}</Errors>}
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="text-sm uppercase font-bold">
            Email
          </label>
          <input
            id="email"
            className="w-full p-3  border border-gray-100"
            type="email"
            placeholder="Email de Registro"
            {...register("email", {
              required: "El Email es Obligatorio",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Email No Válido",
              },
            })}
          />
          {errors.email && <Errors>{errors.email?.message}</Errors>}
        </div>

        <div className="mb-5">
          <label htmlFor="date" className="text-sm uppercase font-bold">
            Fecha Alta
          </label>
          <input
            id="date"
            className="w-full p-3  border border-gray-100"
            type="date"
            {...register("date", {
              required: "La fecha de alta es Obligatorio",
            })}
          />
          {errors.date && <Errors>{errors.date?.message}</Errors>}
        </div>

        <div className="mb-5">
          <label htmlFor="symptoms" className="text-sm uppercase font-bold">
            Síntomas
          </label>
          <textarea
            id="symptoms"
            className="w-full p-3  border border-gray-100"
            placeholder="Síntomas del paciente"
            {...register("symptoms", {
              required: "Los sintomas son obligatorios Obligatorio",
            })}
          />
          {errors.symptoms && <Errors>{errors.symptoms?.message}</Errors>}
        </div>

        <input
          type="submit"
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
          value="Guardar Paciente"
        />
      </form>
    </div>
  );
}
