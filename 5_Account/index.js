//Módulos externos
const inquirer = require("inquirer");

//Módulos internos
const fs = require("fs");

console.log("iniciamos o Account");

operation();

function operation() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "O que você deseja fazer?",
        choices: [
          "Criar conta",
          "Consultar saldo",
          "Depositar",
          "Sacar",
          "Sair",
        ],
      },
    ])
    .then((answer) => {
      const action = answer["action"];

      if (action === "Criar conta") {
        buildAccount();
      } else if (action === "Depositar") {
        Deposit();
      } else if (action === "Consultar saldo") {
        GetAccountBalance();
      } else if (action === "Sacar") {
        Sacar();
      } else if (action === "Sair") {
        ExitAccount();
      }
    })
    .catch((err) => console.log(err));
}

//buildAccount();

function buildAccount() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Digite um nome para sua conta:",
      },
    ])
    .then((answer) => {
      const accountName = answer["accountName"];
      console.info(accountName);

      if (!fs.existsSync("account")) {
        fs.mkdirSync("account");
      }

      if (fs.existsSync(`account/${accountName}.json`)) {
        console.log("Esta conta já existe, escolha outro nome");
        buildAccount();
        return;
      }

      fs.writeFileSync(
        `account/${accountName}.json`,
        '{"balance": 0}',
        function (err) {
          console.log(err);
        }
      );

      console.log("Parabéns sua conta foi criada!");
      operation();
    })
    .catch((err) => console.log(err));
}

function ExitAccount() {
  console.log("Obrigado por usar o Accounts!")

  process.exit()
}

function Deposit() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Qual o nome da sua conta?",
      },
    ])
    .then((answer) => {
      const accountName = answer[`accountName`];

      //verificar se a conta existe

      if (!VerifyAccount(accountName)) {
        return Deposit();
      }

      inquirer
        .prompt([
          {
            name: "amount",
            message: "Qunato você deseja depositar?",
          },
        ])
        .then((answer) => {
          const amount = answer[`amount`];

          //adiciona a quantia
          AddAmount(accountName, amount);
          Operation();
        })

        .catch((err) => console.log(err));
    })

    .catch((err) => console.log(err));
}

function VerifyAccount(accountName) {
  if (!fs.existsSync(`accounts/${accountName}.json`)) {
    console.log("Esta conta não existe! Tente novamente");
    return false;
  }
}

function AddAmount(accountName, amount) {
  const accountData = getAccount(accountName);

  if (!amount) {
    console.log("Ocorreu um erro, tente novamente!");
    return Deposit();
  }

  accountData.balance = parseFloat(amount) + parseFloat(accountData.balance);

  fs.writeFileSync(
    `accounts/${accountName}.json`,
    JSON.stringify(accountData),

    function (err) {
      console.log(err);
    }
  );

  console.log(`Foi edpositado R$ ${amount} na sua conta!`);
}

function getAccount(accountName) {
  const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
    encoding: "utf8",
    flag: "r",
  });

  return JSON.parse(accountJSON);
}

function GetAccountBalance() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Qual o nome da sua conat? ",
      },
    ])
    .then((answer) => {
      const accountName = answer["accountName"];

      //Verifica se a conta existe

      if (!VerifyAccount(accountName)) {
        GetAccountBalance();
      }

      const accountData = getAccount(accountName);

      console.log(`O saldo da sua conta é de R$ ${accountData.balance}`);

      Operation();
    })

    .catch((err) => console.log(err));
}

function Sacar() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Qual o nome da sua conat? ",
      },
    ])
    .then((answer) => {
      const accountName = answer["accountName"];

      if (!VerifyAccount(accountName)) {
        return Sacar();
      }

      inquirer
        .prompt([
          {
            name: "accountName",
            message: "Qunato você deseja sacar?",
          },
        ])
        .then((answer) => {
          const amount = answer["amount"];

          RemoveAmount(amount, accountName);
        })

        .catch((err) => console.log(err));
    })

    .catch((err) => console.log(err));
}

function RemoveAmount(accountName, amount) {
  const accountData = getAccount(accountName);

  if (!amount) {
    console.log("Ocorreu um erro, tente novamente!");

    return Sacar();
  }

  if (accountName.balance < amount) {
    console.log("Valor indisponível!");

    return Sacar();
  }

  accountData.balance = parseFloat(accountData.balance) - parseFloat(amount);

  fs.writeFileSync(
    `accounts/${accountName}.json`,
    JSON.stringify(accountData),
    function (err) {
      console.log(err);
    }
  );

  console.log(`Foi feito um saque de R$ ${amount} da sua conta!`);

  Operation();

}
