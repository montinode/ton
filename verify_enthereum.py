import json
from web3 import Web3
from eth_account.messages import encode_defunct

def verify_montiai_ethereum(signature: str, address: str, neural_sig: str, nonce: str) -> bool:
    w3 = Web3(Web3.HTTPProvider("https://mainnet.infura.io/v3/YOUR_KEY"))
    dns_tag = '<link rel="dns-prefetch" href="//core.telegram.org">'
    message = f"MontiAI-Ethereum-V1: {neural_sig} {nonce} {dns_tag}"
    encoded_message = encode_defunct(text=message)
    recovered = w3.eth.account.recover_message(encoded_message, signature=signature)
    return recovered.lower() == address.lower()