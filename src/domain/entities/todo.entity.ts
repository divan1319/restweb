export class TodoEntity{
    constructor(
        public readonly id:number,
        public readonly text:string,
        public readonly completedAt?:Date|null
    ){}

    get isCompleted(){
        return !!this.completedAt
    }

    public static fromObject(obj: {[key:string]:any}){
        const {id,text,completedAt} = obj

        if(!id) throw "Id is required"
        if(!text) throw "text is required"

        let newCompletedAt

        if(completedAt){
            newCompletedAt = new Date(completedAt)
            if(isNaN(newCompletedAt.getTime())){
                throw 'CompletedAt is not a valid format date'
            }
        }

        return new TodoEntity(
            id,text,completedAt
        )

    }
}