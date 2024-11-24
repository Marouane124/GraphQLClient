import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_COMPTE_BY_ID } from '../queries';
import './css/CompteById.css';

const CompteById = () => {
  const [compteId, setCompteId] = useState('');
  const [fetchCompte, setFetchCompte] = useState(null);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [getCompteById, { data, loading, error }] = useLazyQuery(GET_COMPTE_BY_ID, {
    variables: { id: compteId },
    onCompleted: (data) => setFetchCompte(data.compteById),
  });

  const handleFetchCompte = () => {
    if (compteId) {
      setIsButtonClicked(true);
      getCompteById();
      setIsButtonClicked(false);
    }
  };

  const handleInputChange = (e) => {
    setCompteId(e.target.value);
  };

  if (isButtonClicked && data && fetchCompte !== data.compteById) {
    setFetchCompte(data.compteById);
  }

  return (
    <div className="container">
      <div className="text-center mb-6">
        <h1 className="title">Fetch Compte by ID</h1>
      </div>

      <div className="flex justify-center items-center min-h-screen mt-8">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Enter Compte ID"
            value={compteId}
            onChange={handleInputChange}
            className="search-input"
          />
          <button onClick={handleFetchCompte} className="fetch-button">
            Fetch Compte
          </button>
        </div>
      </div>

      {loading && (
        <div className="flex justify-center mt-4">
          <span className="text-gray-600">Loading...</span>
        </div>
      )}

      {error && (
        <div className="flex justify-center mt-4">
          <span className="text-red-600">Error: {error.message}</span>
        </div>
      )}

      {fetchCompte && (
        <div className="mt-6 p-6 bg-white rounded-lg shadow-xl">
          <table className="table">
            <thead className="table-header">
              <tr>
                <th className="table-header-cell">ID</th>
                <th className="table-header-cell">Solde</th>
                <th className="table-header-cell">Type</th>
                <th className="table-header-cell">Date Creation</th>
              </tr>
            </thead>
            <tbody>
              <tr className="table-row">
                <td className="table-cell">{fetchCompte.id}</td>
                <td className="table-cell">{fetchCompte.solde}</td>
                <td className="table-cell capitalize">{fetchCompte.type}</td>
                <td className="table-cell">{new Date(fetchCompte.dateCreation).toLocaleDateString()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CompteById;
