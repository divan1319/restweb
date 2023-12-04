import express from "express"

interface OptionsI{
    port:number
    public_path?:string
}

export class Server{

    private app = express()
    private readonly port: number
    private readonly publicPath:string

    constructor(options:OptionsI){
        const {port,public_path='public'} = options
        this.port = port
        this.publicPath = public_path
    }

    async start(){

        this.app.use(express.static('public'))




        this.app.listen(this.port,()=>{
            console.log(`server runing on port :${this.port}`)
        })
    }
}