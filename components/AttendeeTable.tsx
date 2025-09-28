import React from 'react';
import type { Attendee } from '../types.ts';

interface AttendeeTableProps {
  attendees: Attendee[];
}

const AttendeeTable: React.FC<AttendeeTableProps> = ({ attendees }) => {
  const formatTimestamp = (isoString: string) => {
    return new Date(isoString).toLocaleString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-600">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">Nombre y Apellido</th>
            <th scope="col" className="px-6 py-3">Número de ID</th>
            <th scope="col" className="px-6 py-3">Fecha de Registro</th>
            <th scope="col" className="px-6 py-3">Firma</th>
          </tr>
        </thead>
        <tbody>
          {attendees.length === 0 ? (
            <tr className="bg-white border-b">
              <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                Aún no hay registros de asistencia.
              </td>
            </tr>
          ) : (
            attendees.map((attendee) => (
              <tr key={attendee.id} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{attendee.name}</td>
                <td className="px-6 py-4">{attendee.idNumber}</td>
                <td className="px-6 py-4">{formatTimestamp(attendee.timestamp)}</td>
                <td className="px-6 py-4">
                  <img
                    src={attendee.signature}
                    alt={`Firma de ${attendee.name}`}
                    className="h-12 w-24 object-contain bg-gray-100 p-1 rounded-md border"
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AttendeeTable;