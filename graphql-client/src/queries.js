import { gql } from '@apollo/client';

export const GET_COMPTES = gql`
  query {
    allComptes {
      id
      solde
      dateCreation
      type
    }
    totalSolde {
      count  
      sum    
      average 
    }
  }
`;

export const GET_COMPTE_BY_ID = gql`
  query GetCompteById($id: ID!) {
    compteById(id: $id) {
      id
      solde
      dateCreation
      type
    }
  }
`;

export const ADD_COMPTE = gql`
  mutation SaveCompte($compte: CompteRequest) {
    saveCompte(compte: $compte) {
      id
      solde
      dateCreation
      type
    }
  }
`;

export const DELETE_COMPTE = gql`
  mutation DeleteById($id: ID!) {
    deleteById(id: $id)
  }
`;
