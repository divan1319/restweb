import { Request, Response } from "express"
import { prisma } from "../../data/postgres"
import { CreateTodoDTO, UpdateTodoDTO } from "../../domain/dtos"
import { TodoRepository } from "../../domain"


export class TodosController{

    ///DI
    constructor(
        private readonly todoRepository:TodoRepository
    ){}

    public getTodos = async(req:Request,res:Response)=>{
        const todos = await this.todoRepository.getAll()
        console.log({todos})
        res.json(todos)
    }

    public getTodoById = async (req:Request,res:Response)=>{
        const id = Number(req.params.id)
        try {
            const todo = await this.todoRepository.findById(id)
            res.status(200).json(todo)
        } catch (error) {
            res.status(400).json(error)
        }
        
    }

    public createTodo = async (req:Request,res:Response)=>{
        
        const [error,createTodoDto] = CreateTodoDTO.create(req.body)
        
        if(error) return res.status(400).json({error})

        const todo = await this.todoRepository.create(createTodoDto!)



        res.status(200).json(todo)
    }

    public updateTodo =  async(req:Request,res:Response)=>{
        
        const id = Number(req.params.id)
        const [error,updateTodoDto] = UpdateTodoDTO.create({
            ...req.body,id
        })
        
        if(error) return res.status(400).json(error)

        const updateTodo = await this.todoRepository.updateById(updateTodoDto!)
        res.json(updateTodo)
    }

    public deleteTodo = async (req:Request,res:Response)=>{
        const id = Number(req.params.id)

        const deletedTodo = await this.todoRepository.deleteById(id)
        res.json(deletedTodo)
    }
}