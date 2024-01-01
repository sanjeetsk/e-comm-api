export default class UserModal{
    constructor(id, name, email, password, type){
        this.id=id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.type = type;
    }

    static SignUp(name, email, password, type){
        const newUser = new UserModal(
            users.length + 1,
            name,
            email,
            password,
            type
        );
        users.push(newUser);
        return newUser;
    }

    static Signin(email, password){
        let newUser = users.find(user => user.email == email && user.password == password)
        return newUser;
    }

    static getAll(){
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
    }
]