const getById = (id) => {
    return document.getElementById(id)
}

const displayedFalse = (id) => {
    getById(id).disabled = false;
}

window.addEventListener('load', function () {
    web3.eth.getGasPrice().then(gasPrice => {
        getById("gasPrice").value = gasPrice;
    })
})

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
    let value = getById("value").value;
    const gasPrice = getById("gasPrice").value;
    const gasLimit = getById("gasLimit").value;
    const privateKey = getById("private_key").innerText;
    const unit = getById("typeOfTx").innerText;

    if (unit === "ETH") {
        const nonce = await web3.eth.getTransactionCount(addressFrom);
        const rawTx = {
            nonce: web3.utils.toHex(nonce),
            gasPrice: web3.utils.toHex(gasPrice),
            gasLimit: web3.utils.toHex(gasLimit),
            to: addressTo,
            value: web3.utils.toHex(web3.utils.toWei(value, "ether")),
            data: "0x"
        }
        const tx = new ethereumjs.Tx(rawTx);
        const bufferedPrivateKey = new ethereumjs.Buffer.Buffer(privateKey, "hex");
        tx.sign(bufferedPrivateKey);
        const serializeTx = tx.serialize();
        const signedTx = `0x${serializeTx.toString("hex")}`
        getById("rawTransaction").value = JSON.stringify(rawTx);
        getById("signedTransaction").value = signedTx;

    } else if (unit === "ERC20") {
        const contractAddress = getById("ERC20ContractAddress").value;
        let decimals = getById("decimals").value;
        const address = addressFrom;
        decimals = Number(decimals);
        value = value * (10 ** decimals);
        erc20Contract.options.address = contractAddress;
        // erc20Contract.methods.balanceOf(address).call()
        //     .then(value => {
        //         console.log(value)
        //     })
        const estimateGas = await erc20Contract.methods.transfer(addressTo, value.toString()).estimateGas({ from: addressFrom })
            .then((gasAmount) => {
                return gasAmount;
            })
            .catch(function (error) {
                console.log(error);
            });
        if (gasLimit < estimateGas) {
            alert(estimateGas + '以上にgasLimitを設定しましょう');
        }
        const data = erc20Contract.methods.transfer(addressTo, value.toString()).encodeABI();
        const nonce = await web3.eth.getTransactionCount(addressFrom);
        const rawTx = {
            nonce: web3.utils.toHex(nonce),
            gasPrice: web3.utils.toHex(gasPrice),
            gasLimit: web3.utils.toHex(gasLimit),
            to: contractAddress,
            data: data
        }
        const tx = new ethereumjs.Tx(rawTx);
        const bufferedPrivateKey = new ethereumjs.Buffer.Buffer(privateKey, "hex");
        tx.sign(bufferedPrivateKey);
        const serializeTx = tx.serialize();
        const signedTx = `0x${serializeTx.toString("hex")}`
        getById("rawTransaction").value = JSON.stringify(rawTx);
        getById("signedTransaction").value = signedTx;
    }
}

const sendTx = () => {
    const signedTx = getById("signedTransaction").value;
    console.log(signedTx);
    web3.eth.sendSignedTransaction(signedTx)
        .on("transactionHash", (hash) => {
            console.log(hash);
        })
        .on("receipt", (receipt) => {
            console.log(receipt);
        })
        .on("error", (error) => {
            console.log(error)
        })
}

const changeDropdown = (token_type) => {
    getById("typeOfTx").innerText = token_type;
}

const test = () => {
    console.log(getById("typeOfTx").innerText);
}