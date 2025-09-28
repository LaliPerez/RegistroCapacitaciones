
import React, { useState, useRef } from 'react';
import type { Attendee, SignatureCanvasRef } from '../types.ts';
import SignatureCanvas from './SignatureCanvas.tsx';
import { UserIcon, IdCardIcon, PlusIcon } from './icons.tsx';

interface AddAttendeeFormProps {
  onAdd: (attendee: Attendee) => void;
}

const AddAttendeeForm: React.FC<AddAttendeeFormProps> = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [error, setError] = useState('');
  const signatureCanvasRef = useRef<SignatureCanvasRef>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const signature = signatureCanvasRef.current?.getSignature();

    if (!name.trim() || !idNumber.trim() || !signature) {
      setError('Por favor, complete todos los campos y proporcione su firma.');
      return;
    }

    const newAttendee: Attendee = {
      id: Date.now().toString(),
      name: name.trim(),
      idNumber: idNumber.trim(),
      signature,
      timestamp: new Date().toISOString(),
    };

    onAdd(newAttendee);

    // Reset form
    setName('');
    setIdNumber('');
    signatureCanvasRef.current?.clear();
    setError('');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Añadir Nuevo Asistente</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <UserIcon className="h-5 w-5 mr-2 text-gray-500" />
              Nombre y Apellido
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Ej. Juan Pérez"
            />
          </div>
          <div>
            <label htmlFor="idNumber" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <IdCardIcon className="h-5 w-5 mr-2 text-gray-500" />
              Número de ID
            </label>
            <input
              type="text"
              id="idNumber"
              value={idNumber}
              onChange={(e) => setIdNumber(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Ej. 12.345.678"
            />
          </div>
        </div>

        <SignatureCanvas ref={signatureCanvasRef} />
        
        {error && <p className="text-sm text-red-600">{error}</p>}
        
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Agregar Asistencia
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAttendeeForm;