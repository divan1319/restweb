import { CreateTodoDTO } from "../../dtos";
import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repository";

export interface CreateTodoI{
    execute(dto:CreateTodoDTO):Promise<TodoEntity>
}

export class CreateTodo implements CreateTodoI{

    constructor(
        private readonly repository:TodoRepository
    ){}
    execute(dto: CreateTodoDTO): Promise<TodoEntity> {
        return this.repository.create(dto)
    }
    
}