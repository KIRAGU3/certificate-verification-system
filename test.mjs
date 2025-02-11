import Web3 from 'web3';

// Connect to Ganache
const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));

// Function to send a test transaction
async function sendTransaction() {
    try {
        const accounts = await web3.eth.getAccounts();
        console.log("Available Accounts:", accounts);

        if (accounts.length < 2) {
            console.error("Not enough accounts to send a transaction.");
            return;
        }

        const txReceipt = await web3.eth.sendTransaction({
            from: accounts[0], // Sender
            to: accounts[1],   // Receiver
            value: web3.utils.toWei('1', 'ether') // Sending 1 Ether
        });

        console.log("Transaction Successful:", txReceipt);
    } catch (error) {
        console.error("Error sending transaction:", error);
    }
}

// Get the latest block number before the transaction
web3.eth.getBlockNumber().then((block) => {
    console.log("Current Block Number:", block);
    sendTransaction().then(() => {
        // Get the latest block number after the transaction
        web3.eth.getBlockNumber().then((newBlock) => {
            console.log("Updated Block Number:", newBlock);
        });
    });
});
