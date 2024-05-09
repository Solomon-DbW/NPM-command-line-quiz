#!/usr/bin/env node

// /*
// /$$$$$$$$ /$$$$$$ / $$$$$$$ / $$$$$$$$ / $$$$$$ / $$ / $$ / $$$$$$ / $$$$$$$ / $$
// | $$_____/|_  $$_/| $$__  $$| $$_____/ /$$__  $$| $$  | $$|_  $$_/| $$__  $$|__/
// | $$        | $$  | $$  \ $$| $$      | $$  \__/| $$  | $$  | $$  | $$  \ $$ /$$  /$$$$$$
// | $$$$$     | $$  | $$$$$$$/| $$$$$   |  $$$$$$ | $$$$$$$$  | $$  | $$$$$$$/| $$ /$$__  $$
// | $$__/     | $$  | $$__  $$| $$__/    \____  $$| $$__  $$  | $$  | $$____/ | $$| $$  \ $$
// | $$        | $$  | $$  \ $$| $$       /$$  \ $$| $$  | $$  | $$  | $$      | $$| $$  | $$
// | $$       /$$$$$$| $$  | $$| $$$$$$$$|  $$$$$$/| $$  | $$ /$$$$$$| $$ /$$  | $$|  $$$$$$/
// |__/      |______/|__/  |__/|________/ \______/ |__/  |__/|______/|__/|__/  |__/ \______/
// */

import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";

let playerName;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
    const rainbowTitle = chalkAnimation.rainbow(
        "Who Wants To Be A Millionaire? \n"
    );

    await sleep();
    rainbowTitle.stop();

    console.log(`
    ${chalk.bgBlue("HOW TO PLAY")} 
    I am a process on your computer.
    If you get any question wrong I will be ${chalk.bgRed("unalived")}
    So get all the questions right...

  `);
}

async function handleAnswer(isCorrect) {
    const spinner = createSpinner("Checking answer...").start();
    await sleep();

    if (isCorrect) {
        spinner.success({
            text: `Nice work ${playerName}. That's the correct answer`,
        });
    } else {
        spinner.error({ text: `💀💀💀 GAME OVER, you lose ${playerName}!` });
        process.exit(1);
    }
}

async function askName() {
    const answers = await inquirer.prompt({
        name: "player_name",
        type: "input",
        message: "What is your name?",
        default() {
            return "Player";
        },
    });

    playerName = answers.player_name;
}

function winner() {
    console.clear();
    figlet(`Congrats , ${playerName} !\n $ 1 , 0 0 0 , 0 0 0`, (err, data) => {
        console.log(gradient.pastel.multiline(data) + "\n");

        console.log(
            chalk.green(
                `\n\nUNTIL WE MEET AGAIN`
            )
        );
        process.exit(0);
    });
}

async function question1() {
    const answers = await inquirer.prompt({
        name: "question_1",
        type: "list",
        message: "What's 9 + 10? \n",
        choices: [
            "21",
            "19",
            "910",
            "10011",
        ],
    });

    return handleAnswer(answers.question_1 === "21");
}

async function question2() {
    const answers = await inquirer.prompt({
        name: "question_2",
        type: "list",
        message: 'What is the capital of the UK? \n',
        choices: [
            "London",
            "Londinium",
            "Durban",
            "Manila"
        ],
    });
    return handleAnswer(answers.question_2 === "London");
}

async function question3() {
    const answers = await inquirer.prompt({
        name: "question_3",
        type: "list",
        message: `What language can English people speak? \n`,
        choices: [
            "English",
            "French",
            "Spanish",
            "Afrikaans",
        ],
    });

    return handleAnswer(answers.question_3 === "English");
}

async function question4() {
    const answers = await inquirer.prompt({
        name: "question_4",
        type: "list",
        message: "What is π? \n",
        choices: [
            "3.14159",
            "Circumference/Diameter",
            "🥧",
            "All of the above",
        ],
    });
    return handleAnswer(answers.question_4 === "Circumference/Diameter");
}

async function question5() {
    const answers = await inquirer.prompt({
        name: "question_5",
        type: "list",
        message:
            "What is 1**0? \n",
        choices: [
            "1",
            "0",
            "10",
            "1010",
        ],
    });

    return handleAnswer(answers.question_5 === "1");
}

// Run it with top-level await
console.clear();
await welcome();
await askName();
await question1();
await question2();
await question3();
await question4();
await question5();
winner();
