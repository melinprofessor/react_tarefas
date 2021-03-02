import axios from 'axios';
import { Tarefa } from '../entidade/Tarefa';

const instance = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 1000,
});

export const get = async(id: string | number): Promise<Tarefa> => {
    try {
        const {data} = await instance.get<Tarefa>(`/tarefas/${id}`)
        return data;
    } catch (error) {
        return error;
    }
}

export const getTarefas = async(): Promise<Tarefa[]> => {
    try {
        const {data} = await instance.get<Tarefa[]>('/tarefas')
        return data;
    } catch (error) {
        return error;
    }
}

export const addTarefa = async(tarefa: Tarefa) => {
    try {
        const {data} = await instance.post<Tarefa>('/tarefas', tarefa)
        return data;
    } catch (error) {
        return error
    }
}

export const atualizaTarefa = async(tarefa: Tarefa) => {
    try {
        const {data} = await instance.put<Tarefa>(`/tarefas/${tarefa.id}`, tarefa)
        return data;
    } catch (error) {
        return error
    }
}