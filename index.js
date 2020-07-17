const displayedFalse = (id) => {
    document.getElementById(id).disabled = false;
}

const createNewAccount = () => {
    let password = document.getElementById("password").value
    console.log(password)
    if (password == "") {
        window.alert("Enter a password.")
    } else {
        let account = web3.eth.accounts.create();
        console.log(account)
        let keystore = web3.eth.accounts.encrypt(account.privateKey, password)
        console.log(keystore)
        let blob = new Blob([JSON.stringify(keystore)], { "type": "application/json" });
        let url = URL.createObjectURL(blob);
        document.getElementById("download").href = url;
        document.getElementById("saveYourPrivateKey").value = account.privateKey;
    }
}

// document.getElementById("saveYourAddress").addEventListener("click", function () {
//     let privateKey = document.getElementById("saveYourPrivateKey").value;
//     let account = web3.eth.accounts.privateKeyToAccount(privateKey);

//     importAccount(account);
// })

const unlockWithKey = () => {
    let privateKey = document.getElementById("inputKey").value;
    if (!privateKey.match(/^[0-9A-Fa-f]{64}$/)) {
        alert("Enter the private key.");
    } else {
        let account = web3.eth.accounts.privateKeyToAccount("0x" + privateKey);
        document.getElementById('account_address').innerText = account.address;//反映
        document.getElementById('private_key').innerText = privateKey;//反映
        web3.eth.getBalance(account.address).then((balance) => {
            document.getElementById('eth_balance').innerText = Math.round(web3.utils.fromWei(balance, 'ether') * 100) / 100 + ' ETH';//反映
        })
        // localStorage.setItem('privateKey', privateKey);
        // document.getElementById("sendETH").className = "";
    }
}

const generateTx = async () => {
    let addressFrom = document.getElementById('account_address').innerText;
    let addressTo = document.getElementById("toAddress").value;
    let value = document.getElementById("value").value;
    let gasPrice = document.getElementById("gasPrice").value;
    let gasLimit = document.getElementById("gasLimit").value;
    let privateKey = document.getElementById('private_key').innerText;
    let nonce = await web3.eth.getTransactionCount(addressFrom);
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

    //     let transaction = new ethereumjs.Tx(rawTransaction);
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