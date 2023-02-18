import Web3 from 'web3';
import { AbiItem } from 'web3-utils';

const collectionAddress = '0x...'; // collection的合约地址

const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/your-project-id'));

// 获取collection中所有NFT的持有者地址
async function getCollectionOwners(): Promise<string[]> {
  const owners: string[] = [];

  // 获取collection中NFT的总销售数量
  const contract = new web3.eth.Contract(collectionAbi as AbiItem[], collectionAddress);
  const totalSupply = await contract.methods.totalSupply().call();

  // 遍历所有NFT，查询持有者地址
  for (let i = 0; i < totalSupply; i++) {
    const tokenId = await contract.methods.tokenByIndex(i).call();
    const owner = await contract.methods.ownerOf(tokenId).call();
    owners.push(owner);
  }

  return owners;
}

// 使用示例
getCollectionOwners().then((owners) => {
  console.log('Collection owners:', owners);
}).catch((err) => {
  console.error('Error:', err);
});

