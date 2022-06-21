import React from 'react';

export interface AuthContextInterface {
  // expiresAt: number | null;
  // token: string | null;
  // isAuthenticated: boolean;
  register: (data: string) => void;
  login: (data: string) => void;
  logout: () => void;
}

export const authContextDefaults: AuthContextInterface = {
  // expiresAt: null,
  // token: null,
  // isAuthenticated: false,
  login: (data) => null,
  register: (data) => null,
  logout: () => null
};

export const AuthContext = React.createContext<AuthContextInterface>(
  authContextDefaults
);