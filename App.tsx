
import React, { useState, useEffect } from 'react';
import { Training } from './types';
import TrainingForm from './components/TrainingForm';
import TrainingTable from './components/TrainingTable';

const App: React.FC = () => {
  const [trainings, setTrainings] = useState<Training[]>(() => {
    try {
      const savedTrainings = localStorage.getItem('trainings');
      return savedTrainings ? JSON.parse(savedTrainings) : [];
    } catch (error) {
      console.error("Could not parse trainings from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('trainings', JSON.stringify(trainings));
  }, [trainings]);

  const addTraining = (training: Omit<Training, 'id'>) => {
    const newTraining: Training = {
      ...training,
      id: crypto.randomUUID(),
    };
    setTrainings(prevTrainings => [...prevTrainings, newTraining]);
  };

  const deleteTraining = (id: string) => {
    setTrainings(prevTrainings => prevTrainings.filter(t => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary">Registro de Capacitaciones</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Agregue y gestione las capacitaciones de su equipo.</p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6">
              <h2 className="text-2xl font-semibold mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">Nueva Capacitación</h2>
              <TrainingForm onAddTraining={addTraining} />
            </div>
          </div>
          <div className="lg:col-span-2">
             <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 h-full">
                <h2 className="text-2xl font-semibold mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">Registros Actuales</h2>
                <TrainingTable trainings={trainings} onDeleteTraining={deleteTraining} />
             </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
