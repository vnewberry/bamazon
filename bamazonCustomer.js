var inquirer = require("inquirer");
var connection = require("./sql.js");
var figlet = require("figlet");
var chalk = require("chalk");

appLoad();

function appLoad() {
  connection.query("SELECT * FROM products", function (err, res) {
    // console.log(chalk.blueBright("==============================================="));
    if (err) {
      console.log(err);
    }

    for (var i = 0; i < res.length; i++) {
      console.log(
        (res[i].item_id + " ").substring(0, 3) +
          "||" +
          (res[i].product_name + "         ").substring(0, 12) +
          "|| $" +
          res[i].price
      );
    }
    buyPrompt(res);
  });
}

function buyPrompt(res) {
  // console.log("\n");
  // console.log("\n");
  // console.log("\n");
  // console.log("\n");
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter the ID number of the product you would like to buy: ",
        name: "product",
        validate: validate,
      },
      {
        type: "input",
        message: "How many?",
        name: "quantity",
        validate: validate,
      },
    ])
    .then(function (input) {
      if (input.product === "0" || input.quantity === "0") {
          console.log(chalk.red("That was an invalid input"))
        quit("invalid");
      } else {
        noItem = false;
        var total = input.quantity * res[input.product-1].price;
        console.log("");

        inquirer
          .prompt([
            {
              type: "list",
              message:
                chalk.red("Are you sure? ") +
                "Items Total:" +
                chalk.yellow(" $" + total),
              choices: ["Yes", "No"],
              name: "confirm",
            },
          ])
          .then(function (sure) {
            if (sure.confirm === "Yes") {
              completePurchase(input);
            } else {
              quit("quit");
            }
          });
      }
      function completePurchase(item){
        var query = connection.query(
            "SELECT * FROM products WHERE ?", {item_id: item.product}, function(err, res) {
            if (err) {
                console.log(err);
            }else {
                // console.log(res[0].stock_quantity);
                if(res[0].stock_quantity>=item.quantity){
                    console.log("Your purchase will cost $"+total) ;
                    console.log("\n...processing order...") ;
                    updateQuantity(res,input); 
                    // console.log(res);
                }
                if(res[0].stock_quantity<item.quantity){
                console.log(chalk.red("Insufficient quantity!\nSelect a different quantity, item, or exit."))
                    quit("invalid");
            }
            };
            
        });
        }});
}
function validate(num) {
  var reg = /^\d+$/;
  return reg.test(num) || "Entry should be a number!";
}
function quit(arg) {
  console.log("");
  switch (arg) {
    case "invalid":
      inquirer
        .prompt([
          {
            type: "list",
            message: "Would you like to quit?",
            choices: ["Yes", "No"],
            name: "done",
          },
        ])
        .then(function (input) {
          if (input.done === "Yes") {
            figlet("GOOD BYE!", function (err, data) {
              if (err) {
                console.log("Something went wrong...");
                console.dir(err);
                return;
              }
              console.log(chalk.green(data));
            });
            connection.end();
          } else {
            appLoad();
          }
        });
      break;
    case "quit":
      figlet("GOOD BYE!", function (err, data) {
        if (err) {
          console.log("Something went wrong...");
          console.dir(err);
          return;
        }
        console.log(chalk.green(data));
      });
      connection.end();
      break;
    default:
      break;
  }
}
function updateQuantity(res,item){
// console.log("res"+res[0].stock_quantity,"item"+item.quantity+item.product);
       
    connection.query(
        "UPDATE products SET ? WHERE ?",
        [
            {
                stock_quantity: res[0].stock_quantity-item.quantity
            },
            {
                item_id:item.product
            }
        ],
        function(err,res){
            if(err) throw err;
            console.log(res.message);
            
        }
        
    )
    console.log(chalk.yellow.bold("\n" + item.quantity + " " + res[0].product_name + " Purchased! \nTotal: $" + item.quantity*res[0].price + "\n"));
    promptAgain();
}
function promptAgain(){
    inquirer
    .prompt([
      {
        type: "list",
        message: "Would you like to make another purchase?",
        choices: ["Yes", "No"],
        name: "again",
      },
    ])
    .then(function (input) {
      if (input.again === "Yes") {
        appLoad();
      } else {
        
        figlet("GOOD BYE!", function (err, data) {
            if (err) {
              console.log("Something went wrong...");
              console.dir(err);
              return;
            }
            console.log(chalk.green(data));
          });
          connection.end();
      }
    });
}

