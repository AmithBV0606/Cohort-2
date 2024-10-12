// 1) Unions : Let’s say you want to print the id of a user, which can be a number or a string.

type StringOrNum = string | number;

function getId(id: StringOrNum) {
    console.log(`ID : ${id}`);
}

getId(100);
getId(`101`);

// 2) Intersections : What if you want to create a type that has every property of multiple types/ interfaces

type Employee = {
    name : string;
    startDate : Date;
}

interface Manager {
    name : string;
    department : string;
}

type teamLead = Employee & Manager;

// Object creation using the type teanLead
const TeamLead: teamLead = {
    name: "harkirat",
    startDate: new Date(),
    department: "Software developer"
  };