import mongoose from "mongoose";
import ora from "ora";
import chalk from "chalk";
import dotenv from 'dotenv';
dotenv.config({path : '../.env'});



// const fakeLoading = ()=> {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         resolve('Loading complete');
//       }, 3000);
//     });
//   }


export async function connectToDB() {
    try {
        const spinner = ora("Connecting to the Database...\n");
        spinner.color = "green";
        spinner.start();
        // await fakeLoading()
        await mongoose.connect(process.env.db);
        spinner.stop();
        console.log(chalk.greenBright('Database connected!'));

    } catch (error) {
        console.log(chalk.redBright('Error : ') , error.message);   
        process.exit(1)      
    }
    
}

export async function disconnectDB() {
    try {
        await mongoose.disconnect();
        console.log(chalk.greenBright('Disconnected from the database.'))
        
    } catch (error) {
        console.log(chalk.redBright('Error: '), error);
        process.exit(1) 
    }
}