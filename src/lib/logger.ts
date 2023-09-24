import chalk from "chalk";
/**
 * pc docs: https://github.com/alexeyraspopov/picocolors#readme
 */
const log = {
    info: (message: string, ...rest: any) =>
        console.log(chalk.blue(`[INFO][${message}]`), ...rest),
    warn: (message: string, ...rest: any) => {
        console.log(chalk.yellow(`[WARN][${message}]`), ...rest);
    },
    error: (message: string, ...rest: any) => {
        console.log(chalk.red(`[ERROR][${message}]`), ...rest);
    },
    auth: (message: string, ...rest: any) =>
        console.log(chalk.yellow(`[AUTH][${message}]`), ...rest),
};

export default log;
