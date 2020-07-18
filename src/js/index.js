import { web3 } from "./connect.js";

// ダブルクオテーションから使う

const getById = (id) => {
    return document.getElementById(id)
}

const displayedFalse = (id) => {
    getById(id).disabled = false;
}

const createNewAccount = () => {
    const password = getById("password").value
    if (!password) {
        window.alert("Enter a password.")
    } else {
        const account = web3.eth.accounts.create();
        // keystoreは未実装
        // const keystore = web3.eth.accounts.encrypt(account.privateKey, password)
        // const blob = new Blob([JSON.stringify(keystore)], { "type": "application/json" });
        // getById("download").href = URL.createObjectURL(blob);
        getById("saveYourPrivateKey").value = account.privateKey;
    }
}

const unlockWithKey = () => {
    const privateKey = document.getElementById("inputKey").value;
    if (!privateKey.match(/^[0-9A-Fa-f]{64}$/)) {
        alert("Enter the private key.");
    } else {
        const account = web3.eth.accounts.privateKeyToAccount("0x" + privateKey);
        getById("account_address").innerText = account.address;
        getById("private_key").innerText = privateKey;
        web3.eth.getBalance(account.address).then((balance) => {
            getById("eth_balance").innerText = `${Math.round(web3.utils.fromWei(balance, "ether") * 100) / 100} ETH`;
        })
    }
}


const generateTx = async () => {
    const addressFrom = getById("account_address").innerText;
    const addressTo = getById("toAddress").value;
    const value = getById("value").value;
    const gasPrice = getById("gasPrice").value;
    const gasLimit = getById("gasLimit").value;
    const privateKey = getById("private_key").innerText;
    const nonce = await web3.eth.getTransactionCount(addressFrom);
    console.log(nonce)

    // 修正③④　uint → unit
    //      dropdownBtnForTx → dropdown-toggle
    // let unit = document.querySelector(".dropdown-toggle").textContent;

    // // 修正⑤⑥　uint → unit
    // // == → ===
    // if (unit === "Rinkeby ETH") {
    //     let nonce = await web3.eth.getTransactionCount(addressFrom);
    //     let rawTransaction = {
    //         nonce: web3.utils.toHex(nonce),
    //         gasPrice: web3.utils.toHex(gasPrice),
    //         gasLimit: web3.utils.toHex(gasLimit),
    //         to: addressTo,
    //         value: web3.utils.toHex(web3.utils.toWei(value, "ether")),
    //         data: "0x",
    //     }
    //     //rawTransactionを表示

    const rawTransaction = {
        nonce: web3.utils.toHex(nonce),
        gasPrice: web3.utils.toHex(gasPrice),
        gasLimit: web3.utils.toHex(gasLimit),
        to: addressTo,
        value: web3.utils.toHex(web3.utils.toWei(value, "ether")),
        data: "0x",
    }
    const transaction = new ethereumjs.Tx(rawTransaction);
    console.log(transaction)
    //     privateKey = new ethereumjs.Buffer.Buffer(privateKey.substr(2), "hex");
    //     transaction.sign(privateKey);
    //     let serializeTx = transaction.serialize();
    //     let signedTransaction = "0x" + serializeTx.toString("hex");
    //     //signedTransactionを表示
    //     document.getElementById("rawTransaction").value = JSON.stringify(rawTransaction);
    //     document.getElementById("signedTransaction").value = signedTransaction;
    // } else {
    //     //修正⑦ "ASK" → unit
    //     const contractAddress = document.getElementById(unit).getAttribute("contractAddress");
    //     erc20Contract.options.address = contractAddress;
    //     console.log(contractAddress)
    //     //修正⑧⑨ "ASK" →　unit
    //     //decimal → decimals
    //     const decimals = document.getElementById(unit).getAttribute("decimals");
    //     console.log(document.getElementById(unit))
    //     console.log(decimals)
    //     value = value * (10 ** decimals);
    //     console.log(value)


    //     const estimateGas = await erc20Contract.methods.transfer(addressTo, value.toString()).estimateGas({ from: addressFrom })
    //         .then((gasAmount) => {
    //             return gasAmount;
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    //     console.log(estimateGas);

    //     if (gasLimit < estimateGas) {
    //         alert(estimateGas + '以上にgasLimitを設定しましょう')
    //     }

    //     let data = erc20Contract.methods.transfer(addressTo, value.toString()).encodeABI();
    //     let nonce = await web3.eth.getTransactionCount(addressFrom);
    //     let rawTransaction = {
    //         nonce: web3.utils.toHex(nonce),
    //         gasPrice: web3.utils.toHex(gasPrice),
    //         gasLimit: web3.utils.toHex(gasLimit),
    //         //修正⑩ "addressTo" → contractAddress
    //         to: contractAddress,
    //         data: data
    //     }

    //     let transaction = new ethereumjs.Tx(rawTransaction);
    //     privateKey = new ethereumjs.Buffer.Buffer(privateKey.substr(2), "hex");
    //     transaction.sign(privateKey);
    //     let serializeTx = transaction.serialize();
    //     let signedTransaction = "0x" + serializeTx.toString("hex");

    //     //rawTransactionを表示
    //     //signedTransactionを表示
    //     document.getElementById("rawTransaction").value = JSON.stringify(rawTransaction);
    //     document.getElementById("signedTransaction").value = signedTransaction;
    //}
}

const test = () => {
    console.log('test')
}