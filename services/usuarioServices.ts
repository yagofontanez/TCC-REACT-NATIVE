import api from '../api/api';

export interface Usuario {
    ID: string;
    NOME: string;
    SOBRENOME: string;
    EMAIL: string;
    TELEFONE: string;
    SENHA: string;
  }

export const updateUsuario = async (id: string, usuario: Partial<Omit<Usuario, 'ID'>>): Promise<Usuario> => {
    const response = await api.put(`/usuarios/${id}`, usuario);
    return response.data;
  };