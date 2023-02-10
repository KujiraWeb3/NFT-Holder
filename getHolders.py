import json
import requests
from web3 import Web3

def get_holders_count(contract_address, token_id):
    url = "https://api.etherscan.io/api?module=contract&action=getholders&address={}&contractaddress={}&sort=desc".format(contract_address, token_id)
    response = requests.get(url)
    data = json.loads(response.text)
    return int(data["result"][0]["holdersCount"])

contract_address = "0x742d35Cc6634C0532925a3b844Bc454e4438f44e"
token_id = "1"
holders_count = get_holders_count(contract_address, token_id)
print("The number of holders for NFT with token ID {} in contract {} is: {}".format(token_id, contract_address, holders_count))
