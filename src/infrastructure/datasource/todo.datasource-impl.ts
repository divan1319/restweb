import { prisma } from "../../data/postgres";
import { CreateTodoDTO, TodoDatasource, TodoEntity, UpdateTodoDTO } from "../../domain";

export class TodoDatasourceImpl implements TodoDatasource {
    async create(createTodoDto: CreateTodoDTO): Promise<TodoEntity> {
        //grabacion de datos
        const todo = await prisma.todo.create({
            data: createTodoDto!
        })

        return TodoEntity.fromObject(todo)
    }
    async getAll(): Promise<TodoEntity[]> {
        const todos = await prisma.todo.findMany()

        return todos.map(todo => TodoEntity.fromObject(todo))
    }
    async findById(id: number): Promise<TodoEntity> {
        const todo = await prisma.todo.findFirst({
            where: { id }
        })

        if (!todo) throw 'todo not found in db'

        return TodoEntity.fromObject(todo)
    }
    async updateById(updateTodoDto: UpdateTodoDTO): Promise<TodoEntity> {
        await this.findById(updateTodoDto.id)
        const updateTodo = await prisma.todo.update({
            where: { id: updateTodoDto.id },
            data: !updateTodoDto.values
        })

        return TodoEntity.fromObject(updateTodo)
    }
    async deleteById(id: number): Promise<TodoEntity> {
        await this.findById(id)
        const deletedTodo = await prisma.todo.delete({
            where: { id }
        })

        return TodoEntity.fromObject(deletedTodo)
    }

}