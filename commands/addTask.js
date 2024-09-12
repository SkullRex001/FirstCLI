import inquirer from "inquirer";
import { connectToDB , disconnectDB } from "../db/connectDB.js";
import Todos from "../schema/TodoSchema.js";
import ora from "ora";
import chalk from "chalk";

const input = async()=>{
    const answer = await inquirer.prompt([
        {name : 'name' , message : 'Enter name of the task' , type : 'input'},
        {
            name : 'detail' , message : 'Enter the details ' , type : 'input'
        }
    ])
    return answer;
}



const askQuestion = async()=>{
    const todoArray = [];
    let keepTakingInput = true;
    while(keepTakingInput){
        const userRes = await input();
        todoArray.push(userRes);
        const addMoreTask = await inquirer.prompt([{name : 'confirm' , message : 'Do you want to add more task' , type : 'confirm'}])
        if(!addMoreTask.confirm){
            break;
        }
    }
    return todoArray;
}


const addTask = async ()=>{
    try {
        const userRes = await askQuestion();
        await connectToDB();
        let spinner = ora('Saving todos');
        spinner.color = 'gray';
        spinner.start();
       await Todos.insertMany(userRes);
        spinner.stop();
        console.log(
            chalk.greenBright('Created the todos!\n')
        );
        await disconnectDB();
        
    } catch (error) {
        console.log('Something went wrong, Error: ', error)
        process.exit(1)
    }
}

export default addTask;