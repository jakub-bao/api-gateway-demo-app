import {insertUser} from "@dhis2-app/test-data";

// import users from "./mixedUsers.json";

const users = require('./mixedUsers.json');

users.forEach(u=>{
    insertUser(u);
});