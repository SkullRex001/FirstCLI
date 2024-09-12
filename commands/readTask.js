import { connectToDB , disconnectDB } from "../db/connectDB.js";
import Todos from "../schema/TodoSchema.js";
import chalk from "chalk";
import ora from "ora";


const readTask = async ()=>{
    try {
        await connectToDB();
        let spinner = ora('Getting all todos');
        spinner.color = "green";
        spinner.start();
        const todos = await Todos.find();
        spinner.stop();

        if(todos.length === 0){
            console.log(chalk.blueBright('No todos found!'));
        }
        else{
            todos.forEach(todo =>{
                console.log(
                    chalk.cyanBright('Todo Id: ') + todo._id + '\n' + 
                    chalk.blueBright('Name: ') + todo.name + '\n' + 
                    chalk.yellowBright('Description: ') + todo.detail + '\n'
                )
            })
        }

        await disconnectDB()
        
    } catch (error) {
        console.log(chalk.redBright('Error: '), error.message);
        process.exit(1)
    }
}

export default readTask;