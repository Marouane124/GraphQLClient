import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_COMPTE } from '../queries';
import './css/AddCompte.css';

const AddCompte = () => {
  const [solde, setSolde] = useState('');
  const [type, setType] = useState('COURANT');  
  const [dateCreation, setDateCreation] = useState('');
  const [addCompte] = useMutation(ADD_COMPTE);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!solde || !type || !dateCreation) {
      alert('Please fill in all fields.');
      return;
    }
  
    
    try {
      const result = await addCompte({
        variables: {
          compte: {
            solde: parseFloat(solde),
            type 
          },
        },
      });
  
      alert('Compte créé avec succes.');
      console.log(result);
      setSolde('');
      setType('COURANT');
      setDateCreation('');
      window.location.reload();
    } catch (error) {
      console.error('Error saving compte:', error);
      alert('Error saving compte: ' + error.message);
      
      console.error('Detailed error: ', error);
      if (error.graphQLErrors) {
        error.graphQLErrors.forEach((err) => console.error(err));
      }
      if (error.networkError) {
        console.error('Network error: ', error.networkError);
      }
    }
  };
  

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-center">Ajouter un Compte</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="solde" className="block text-sm font-medium text-gray-700">Solde</label>
            <input
              type="number"
              id="solde"
              value={solde}
              onChange={(e) => setSolde(e.target.value)}
              className="mt-1 block custom-width p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="mt-1 block custom-width p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="COURANT">COURANT</option>
              <option value="EPARGNE">EPARGNE</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="dateCreation" className="block text-sm font-medium text-gray-700">Date Creation</label>
            <input
              type="date"
              id="dateCreation"
              value={dateCreation}
              onChange={(e) => setDateCreation(e.target.value)}
              className="mt-1 block custom-width p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="custom-width bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none transition-colors duration-300"
          >
            Add Compte
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCompte;
