import axios from 'axios';
import { Tarefa } from '../entidade/Tarefa';

const instance = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 1000,
});


export const getTarefas = async(): Promise<Tarefa[]> => {
    try {
        const {data} = await instance.get<Tarefa[]>('/tarafas')
        return data;
    } catch (error) {
        return error;
    }
}

export const addTarefa = async(tarefa: Tarefa) => {
    try {
        const {data} = await instance.get<Tarefa[]>('/tarafas')
        return data;
    } catch (error) {
        
    }
}