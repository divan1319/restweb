import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repository";

export interface GetTodoI{
    execute(id:number):Promise<TodoEntity>
}

export class GetTodo implements GetTodoI{

    constructor(
        private readonly repository:TodoRepository
    ){}
    execute(id:number): Promise<TodoEntity> {
        return this.repository.findById(id)
    }
    
}