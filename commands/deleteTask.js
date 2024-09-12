import inquirer from "inquirer";
import { connectToDB , disconnectDB } from "../db/connectDB.js";
import Todos from "../schema/TodoSchema.js";
import ora from "ora";
import chalk from "chalk";

const selectTodo = async ()=>{
    try {
        const ID = await inquirer.prompt([
            {name : 'code' , message : 'Enter todo ID' , type : 'input'}
        ])
        ID.code = ID.code.trim();
        return ID;
        
    } catch (error) {
        console.log(chalk.redBright('Error: '), error.message);
    }
}


const deleteTask = async ()=>{
    try {
        const ID = await selectTodo();
        await connectToDB();
        let spinner = ora('Finding and deleting the todo...');
        spinner.color = 'green';
        spinner.start();
        const response =  await Todos.deleteOne({
            _id : ID.code
        });
        spinner.stop();
        spinner.clear();
        if(response.deletedCount === 0){
            console.log(chalk.redBright('Todo not found'));
        } else {
            console.log(chalk.greenBright('Deleted Successfully'));
        }
        await disconnectDB()

        
    } catch (error) {
        console.log(chalk.redBright('Error: '), error.message);
        process.exit(1);
    }
}

deleteTask();