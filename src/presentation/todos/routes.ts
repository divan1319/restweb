import { Router } from "express"
import { TodosController } from "./controller"
import { TodoDatasourceImpl } from "../../infrastructure/datasource/todo.datasource-impl"
import { TodoRepositoryImpl } from "../../infrastructure/repositories/todo.repository-impl"


export class TodosRoutes{
    static get routes():Router{
        const router = Router()

        const datasource = new TodoDatasourceImpl()
        const todoRepository = new TodoRepositoryImpl(datasource)

        const todocontroller = new TodosController(todoRepository)
        
        router.get('/', todocontroller.getTodos)
        router.get('/:id', todocontroller.getTodoById)
        router.post('/',todocontroller.createTodo)
        router.put('/:id', todocontroller.updateTodo)
        router.delete('/:id',todocontroller.deleteTodo)

        return router
    }

}