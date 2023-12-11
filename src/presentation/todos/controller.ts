import { Request, Response } from "express"

const todos = [
    {id:1,text:'Buy lechita',completedAt:new Date()},
    {id:2,text:'Buy huevitos',completedAt:null}
]

export class TodosController{

    ///DI
    constructor(){

    }

    public getTodos =(req:Request,res:Response)=>{
        return res.json(todos)
    }

    public getTodoById = (req:Request,res:Response)=>{
        const id = Number(req.params.id)
        if(isNaN(id)) return res.status(400).json({error:"ID argumnt is invalid"})
        const todo = todos.find(todo => todo.id === id)
        
        if(!todo){
            res.status(404).json({message:'Todo not found'})
        }

        res.status(200).json(todo)
        
    }

    public createTodo = (req:Request,res:Response)=>{
        const {text} = req.body

        if(!text) return res.status(400).json({error:"Text property is required"})

        const newTodo = {
            id:todos.length+1,
            text:text,
            completedAt:null
        }
        todos.push(newTodo)

        res.json(newTodo)
    }

    public updateTodo = (req:Request,res:Response)=>{
        
        const id = Number(req.params.id)
        if(isNaN(id)) return res.status(400).json({error:"ID argumnt is invalid"})
        
        const todo = todos.find(todo => todo.id === id)
        if(!todo) return res.status(404).json({error:"Todo not found"})

        const {text,completedAt} = req.body

        todo.text = text || todo.text

        

        res.json(todo)
    }

    public deleteTodo = (req:Request,res:Response)=>{
        const id = Number(req.params.id)
        if(isNaN(id)) return res.status(400).json({error:"ID argumnt is invalid"})
        
        const todo = todos.find(todo => todo.id === id)
        if(!todo) return res.status(404).json({error:"Todo not found"})

        todos.splice(todos.indexOf(todo),1)

        res.json(todo)
    }
}