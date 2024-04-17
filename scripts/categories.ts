const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main(){
    try {
        await database.category.createMany({
            data:[
                {name:"Computer Science"},
                {name:"Machine Learning"},
                {name:"Mathematic"},
                {name:"Artificial Intelligence"},
                {name:"Chemistry"},
            ]
        })
    } catch (error) {
        console.log("error in categories",error)
    } finally{
        await database.$disconnect()
    }
}

main()