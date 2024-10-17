import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 1) Creating a new user
async function main(
  username: string,
  password: string,
  firstName: string,
  lastName: string
) {
  const newUser = await prisma.user.create({
    data: {
      username,
      password,
      firstName,
      lastName
    },
    select: {
        id: true,
        password: true
    }
  });

  console.log(newUser);
}

// main("arjun0303@gmail.com", "arjun@123", "Arjun", "M");

// _______________________________________________________________________________________

// 2) Updating the existing user details

async function updateUser(username: string, firstName: string, lastName: string) {
    const updateStatus = await prisma.user.update({
        where: {
            username
        },
        data: {
            firstName,
            lastName
        }
    });

    if (updateStatus) {
        console.log("Update successful!");
    }
}

// updateUser("vmb0101@gmail.com", "Varun M", "Bharadwaj");

// _______________________________________________________________________________________

// 3) Getting the users details

async function getUser(username: string) {
    const userInfo = await prisma.user.findFirst({
        where: {
            username
        }
    });
    console.log(userInfo);
}

getUser("sid0202@gmail.com");