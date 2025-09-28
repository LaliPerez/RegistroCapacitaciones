
import React from 'react';
import { Training } from '../types';
import TrashIcon from './icons/TrashIcon';

interface TrainingTableProps {
  trainings: Training[];
  onDeleteTraining: (id: string) => void;
}

const TrainingTable: React.FC<TrainingTableProps> = ({ trainings, onDeleteTraining }) => {
  if (trainings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 dark:text-gray-400">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p className="text-lg font-semibold">No hay capacitaciones registradas.</p>
        <p>Utilice el formulario para agregar una nueva.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="py-3 px-6">Tipo</th>
            <th scope="col" className="py-3 px-6">Nombre</th>
            <th scope="col" className="py-3 px-6">Fecha</th>
            <th scope="col" className="py-3 px-6">Horas</th>
            <th scope="col" className="py-3 px-6">Asistente</th>
            <th scope="col" className="py-3 px-6">
              <span className="sr-only">Acciones</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {trainings.map((training) => (
            <tr key={training.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
              <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">{training.type}</td>
              <td className="py-4 px-6">{training.name}</td>
              <td className="py-4 px-6">{training.date}</td>
              <td className="py-4 px-6">{training.hours}</td>
              <td className="py-4 px-6">{training.attendee}</td>
              <td className="py-4 px-6 text-right">
                <button
                  onClick={() => onDeleteTraining(training.id)}
                  className="p-2 rounded-full text-gray-500 hover:text-danger hover:bg-red-100 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Borrar capacitación"
                >
                  <TrashIcon />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TrainingTable;
