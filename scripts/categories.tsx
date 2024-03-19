const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main(){
    try {
        await database.category.createMany({
            data:[
                {name:"Computer Science"},
                {name:"Machience Learning"},
                {name:"Mathematic"},
                {name:"Artificial Intelligence"}
            ]
        })
    } catch (error) {
        console.log("error in categories")
    } finally{
        await database.$disconnect()
    }
}

main()