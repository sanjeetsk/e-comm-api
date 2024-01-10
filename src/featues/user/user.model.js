import { getDb } from "../../confing/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

export default class UserModal {
    constructor(name, email, password, type, id) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.type = type;
        this._id = id;
    }

    static getAll() {
        return users;
    }
}

let users = [
    {
        id: 1,
        name: "SellerUser",
        email: "seller@gmail.com",
        password: "Seller1234",
        type: "seller",
    },
    {
        id: 2,
        name: "CustomerUser",
        email: "customer@gmail.com",
        password: "Customer1234",
        type: "customer",
    }
]