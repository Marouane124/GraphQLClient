import React from 'react';
import { ApolloProviderWrapper } from './apollo';
import AllComptes from './components/AllComptes';
import CompteById from './components/CompteById';
import AddCompte from './components/AddCompte';
import './index.css';


function App() {
  return (
    <ApolloProviderWrapper>
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="max-w-4xl w-full p-6 bg-white shadow-md rounded-lg">
          <AddCompte />
          <AllComptes />
          <CompteById />
        </div>
      </div>
    </ApolloProviderWrapper>
  );
}

export default App;
