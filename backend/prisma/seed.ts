import { PrismaClient } from "@prisma/client";
import * as bcrypt from 'bcrypt'
import { Role } from "../src/enums/role.enum";

const prisma = new PrismaClient()

async function main() {
    await prisma.user.create({
        data:{
            fullName: 'admin',
            idnr: '00000000000',
            password: bcrypt.hashSync('123123123', await bcrypt.genSalt()),
            role: Role.ADMIN,
            status: true,
            username: "Admin",
            workload: '9h'
        }
    }) 
    console.log("Seed criada com sucesso!");
    
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
