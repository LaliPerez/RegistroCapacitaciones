
import React from 'react';
import { TableIcon } from './icons.tsx';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md mb-8">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex items-center">
        <TableIcon className="h-8 w-8 text-blue-600 mr-3" />
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Registro de Asistencia a Capacitación
        </h1>
      </div>
    </header>
  );
};

export default Header;