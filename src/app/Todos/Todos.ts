export class Todo
{
    id: number;
    titulo: string;
    completado: boolean;
    usuario : {
        id: number;
        nombre: string;
        username: string;
        address: string;
    }
}
