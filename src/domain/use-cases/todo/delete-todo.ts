import { UpdateTodoDTO } from "../../dtos";
import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repository";

export interface DeleteTodoI{
    execute(id:number):Promise<TodoEntity>
}

export class DeleteTodo implements DeleteTodoI{

    constructor(
        private readonly repository:TodoRepository
    ){}
    execute(id: number): Promise<TodoEntity> {
        return this.repository.deleteById(id)
    }
    
}