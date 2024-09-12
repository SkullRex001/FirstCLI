import inquirer from "inquirer";
import { connectToDB , disconnectDB } from "../db/connectDB.js";
import Todos from "../schema/TodoSchema.js";
import ora from "ora";
import chalk from "chalk";
import { selectTodo } from "./deleteTask.js";

const updateObject = async (todo)=>{
        try {
            const update = await inquirer.prompt([
                {name: 'name', message: 'Update the name?', type: 'input', default: todo.name},
                {name: 'detail', message: 'Update the Description?', type: 'input', default: todo.detail},
                {name: 'status', message: 'Update the status', type: 'list', choices: ['pending', 'completed'], default: todo.status}
            ])

            return update;
            
        } catch (error) {
            console.log(chalk.redBright('Error: '), error.message);
        
        }
}

const updateTask = async ()=>{
    try {
        const ID = await selectTodo();
        await connectToDB();
        const spinner = ora('Finding the todo...');
        spinner.color = 'green';
        spinner.start();
        const todo = await Todos.findById(ID.code);
        spinner.stop();
        spinner.clear();

        if(!todo){
            console.log(chalk.redBright('Error: '), "Todo not found");
        }
        else{
            console.log(chalk.blueBright('Update!!\n'));
            const newTodo = await updateObject(todo);
            const spinner = ora('Updating todos');
            spinner.color = 'green';
            spinner.start();
            await Todos.findByIdAndUpdate(todo._id , newTodo , {runValidators: true})
            spinner.stop()
            console.log(chalk.greenBright('Todo updated.'))

        }
        await disconnectDB()
        
    } catch (error) {

        console.log(chalk.redBright('Error: '), error.message);
        process.exit(1);
        
    }
}

export default updateTask;