import { projectID } from './config.js';
const web3 = new Web3(new Web3.providers.HttpProvider(`https://ropsten.infura.io/v3/${projectID}`));
export { web3 };