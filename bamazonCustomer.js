var inquirer = require("inquirer");
var connection = require("./sql.js");
var figlet = require('figlet');
var chalk = require("chalk"); 

appLoad();


function appLoad(){
   
    connection.query("SELECT * FROM products", function(err, res) {
        // console.log(chalk.blueBright("==============================================="));
        if (err) {
            console.log(err);
        };
        
        for (var i = 0; i < res.length; i++) {
            console.log(("\n"+res[i].item_id +" ").substring(0,2) +"||" + (res[i].product_name+ "         ").substring(0,12) + "|| $" + res[i].price );
        };
        buyPrompt(res);
    })
    
}

function buyPrompt(res){
    // console.log("\n");
    // console.log("\n");
    // console.log("\n");
    // console.log("\n");
    inquirer.prompt([
        {
            type: "input",
            message: "Enter the ID number of the product you would like to buy: ",
            name: "product",
            validate: validate
        },
        {
            type: "input",
            message: "How many?",
            name: "quantity",
            validate: validate
        }
        ]).then(function(input) {
            if (input.product === "0" || input.quantity === "0") {
                noItem = true;
            }
            else{noItem=false;}
            var total = (input.quantity * res[input.product].price);
            console.log("");
            if (!noItem) {
                inquirer.prompt([
                    {
                        type: "list",
                        message: chalk.red("Are you sure? ") +  "Items Total:" + chalk.yellow(" $" + total),
                        choices: ["Yes", "No"],
                        name: "confirm"
                    }
                    ]).then(function(sure) {
                        if (sure.confirm === "Yes") {

                            confirmPur(input);
                        }else {
                            quit();
                        };
                    });
            }else {
                quit();
            };
})}
function validate(num) {
    var reg = /^\d+$/;
    return reg.test(num) || "Entry should be a number!";
};
function quit(){
    console.log("");
    inquirer.prompt([
        {
            type: "list",
            message: "That was an invalid input?\nWould you like to quit?",
            choices: ["Yes", "No"],
            name: "done"
        }
        ]).then(function(input) {
            if (input.done === "Yes") {
                figlet('GOOD BYE!', function(err, data) {
                    if (err) {
                        console.log('Something went wrong...');
                        console.dir(err);
                        return;
                    }
                    console.log(chalk.green(data));
                });
                connection.end();
            }else {
                appLoad();
            };
        });

};
