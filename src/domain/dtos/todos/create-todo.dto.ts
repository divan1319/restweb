export class CreateTodoDTO{

    private constructor(
        public readonly text:string,
        public readonly completedAt:Date = new Date(),
    ){}


    static create(props:{[key:string]:any}): [string?,CreateTodoDTO?]{

        const {text} = props

        if(!text) return ['Text is required']

        return [undefined,new CreateTodoDTO(text)]
    }
}