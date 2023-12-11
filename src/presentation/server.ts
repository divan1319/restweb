import express, { Router } from "express"

interface OptionsI{
    port:number
    routes:Router
    public_path?:string
}

export class Server{

    private app = express()
    private readonly port: number
    private readonly publicPath:string
    private readonly routes: Router

    constructor(options:OptionsI){
        const {port,routes ,public_path='public'} = options
        this.port = port
        this.publicPath = public_path
        this.routes = routes
    }

    async start(){

        ///Midleware
        
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended:true}))

        this.app.use(express.static('public'))

        //-----------Routes-----
        this.app.use(this.routes)


        this.app.listen(this.port,()=>{
            console.log(`server runing on port :${this.port}`)
        })
    }
}