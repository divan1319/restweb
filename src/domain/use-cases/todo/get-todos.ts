import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repository";

export interface GetTodosI{
    execute():Promise<TodoEntity[]>
}

export class GetTodos implements GetTodosI{

    constructor(
        private readonly repository:TodoRepository
    ){}
    execute(): Promise<TodoEntity[]> {
        return this.repository.getAll()
    }
    
}