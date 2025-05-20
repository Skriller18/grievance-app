import React from 'react';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import GrievanceForm from './components/GrievanceForm';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            borderRadius: '10px',
            background: '#FFF',
            color: '#333',
          },
          success: {
            iconTheme: {
              primary: '#0d8ddc',
              secondary: '#FFFFFF',
            },
          },
        }}
      />
      <div className="container mx-auto px-4 py-12">
        <Header />
        <div className="max-w-md mx-auto">
          <GrievanceForm />
        </div>
      </div>
    </div>
  );
}

export default App;