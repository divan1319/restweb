import { Request, Response } from "express"
import { prisma } from "../../data/postgres"
import { CreateTodoDTO, UpdateTodoDTO } from "../../domain/dtos"


export class TodosController{

    ///DI
    constructor(){

    }

    public getTodos = async(req:Request,res:Response)=>{
        const todos = await prisma.todo.findMany()

        res.json(todos)
    }

    public getTodoById = async (req:Request,res:Response)=>{
        const id = Number(req.params.id)
        if(isNaN(id)) return res.status(400).json({error:"ID argumnt is invalid"})
        
        const todo = await prisma.todo.findFirst({
            where:{id}
        })
        
        if(!todo){
            res.status(404).json({message:'Todo not found'})
        }

        res.status(200).json(todo)
        
    }

    public createTodo = async (req:Request,res:Response)=>{
        
        const [error,createTodoDto] = CreateTodoDTO.create(req.body)
        
        if(error) return res.status(400).json({error})

        //grabacion de datos
        const todo = await prisma.todo.create({
            data:createTodoDto!
        })


        res.json(todo)
    }

    public updateTodo =  async(req:Request,res:Response)=>{
        
        const id = Number(req.params.id)
        const [error,updateTodoDto] = UpdateTodoDTO.create({
            ...req.body,id
        })
        
        if(error) return res.status(400).json(error)

        const todo = await prisma.todo.findFirst({
            where:{
                id
            }
        })
        //todos.find(todo => todo.id === id)
        if(!todo) return res.status(404).json({error:"Todo not found"})


        const updateTodo = await prisma.todo.update({
            where:{id},
            data:updateTodoDto!.values
        })

        

        res.json(updateTodo)
    }

    public deleteTodo = async (req:Request,res:Response)=>{
        const id = Number(req.params.id)
        if(isNaN(id)) return res.status(400).json({error:"ID argumnt is invalid"})
        
        const todo = await prisma.todo.findFirst({
            where:{
                id
            }
        })

        if(!todo) return res.status(404).json({error:"Todo not found"})

        const deletedTodo = await prisma.todo.delete({
            where:{id}
        })

        res.json({todo,deletedTodo})
    }
}