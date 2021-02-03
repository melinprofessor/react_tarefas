export interface Tarefa {
    id?: number;
    titulo: string;
    descricao: string;
    status: 'pendente' | 'finalizado'
}