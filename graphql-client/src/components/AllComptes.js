import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_COMPTES, DELETE_COMPTE } from '../queries';
import './css/AllComptes.css';  

const AllComptes = () => {
  const { loading, error, data } = useQuery(GET_COMPTES);
  const [deleteCompte] = useMutation(DELETE_COMPTE);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { count, sum, average } = data.totalSolde || {};

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');  
    const day = String(today.getDate()).padStart(2, '0'); 
    return `${year}-${month}-${day}`;
  };

  const handleDelete = async (id) => {
    try {
      await deleteCompte({
        variables: { id },
        refetchQueries: [{ query: GET_COMPTES }],
      });
    } catch (err) {
      console.error('Error deleting compte:', err);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Liste des comptes</h1>

      <div className="total-solde">
        <h2>Total Solde: {sum || 0}</h2>
        <h3>Nombre des comptes: {count || 0}</h3>
        <h3>Solde moyen: {average || 0}</h3>
      </div>

      <table className="table">
        <thead>
          <tr className="table-header">
            <th className="table-cell table-cell-center">ID</th>
            <th className="table-cell table-cell-center">Solde</th>
            <th className="table-cell table-cell-center">Date Creation</th>
            <th className="table-cell table-cell-center">Type</th>
            <th className="table-cell table-cell-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.allComptes.map((compte) => (
            <tr key={compte.id} className="table-row">
              <td className="table-cell table-cell-center">{compte.id}</td>
              <td className="table-cell table-cell-center">{compte.solde}</td>
              <td className="table-cell table-cell-center">{getTodayDate()}</td> 
              <td className="table-cell table-cell-center">{compte.type}</td>
              <td className="table-cell table-cell-center table-action">
                <button
                  onClick={() => handleDelete(compte.id)}
                  className="button"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllComptes;
