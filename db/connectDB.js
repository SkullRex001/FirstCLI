import mongoose from "mongoose";
import ora from "ora";
import chalk from "chalk";

const fakeLoading = ()=> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('Loading complete');
      }, 3000);
    });
  }

export async function connectToDB() {
    try {
        const spinner = ora("Connecting to the Database...\n");
        spinner.color = "green";
        spinner.start();
        await fakeLoading()
        await mongoose.connect("mongodb://localhost:27017");
        spinner.stop();
        console.log(chalk.greenBright('Database connected!\n'));
    
        
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