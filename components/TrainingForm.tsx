
import React, { useState } from 'react';
import { Training } from '../types';
import { TRAINING_TYPES } from '../constants';

interface TrainingFormProps {
  onAddTraining: (training: Omit<Training, 'id'>) => void;
}

const TrainingForm: React.FC<TrainingFormProps> = ({ onAddTraining }) => {
  const [type, setType] = useState(TRAINING_TYPES[0]);
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [hours, setHours] = useState<number | ''>('');
  const [attendee, setAttendee] = useState('');
  const [error, setError] = useState('');

  const clearForm = () => {
    setType(TRAINING_TYPES[0]);
    setName('');
    setDate('');
    setHours('');
    setAttendee('');
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!type || !name || !date || hours === '' || !attendee) {
      setError('Todos los campos son obligatorios.');
      return;
    }
    if (hours <= 0) {
      setError('Las horas deben ser un número positivo.');
      return;
    }

    onAddTraining({ type, name, date, hours: Number(hours), attendee });
    clearForm();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      <div>
        <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tipo de Capacitación</label>
        <select
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="mt-1 block w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
        >
          {TRAINING_TYPES.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nombre de la Capacitación</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Fecha</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mt-1 block w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="hours" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Horas</label>
        <input
          type="number"
          id="hours"
          value={hours}
          onChange={(e) => setHours(e.target.value === '' ? '' : Number(e.target.value))}
          min="0.1"
          step="0.1"
          className="mt-1 block w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="attendee" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nombre del Asistente</label>
        <input
          type="text"
          id="attendee"
          value={attendee}
          onChange={(e) => setAttendee(e.target.value)}
          className="mt-1 block w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
        />
      </div>
      <div className="flex items-center justify-between pt-4">
        <button
          type="button"
          onClick={clearForm}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-secondary hover:bg-secondary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-hover"
        >
          Limpiar
        </button>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-hover"
        >
          Agregar
        </button>
      </div>
    </form>
  );
};

export default TrainingForm;
