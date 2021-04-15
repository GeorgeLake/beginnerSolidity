from web3.auto import w3
import sys
import time

t = time.process_time()

MAXINT = sys.maxsize
target = 4

for nonce in range(0, MAXINT):
    acct = w3.eth.account.create("change me" + str(nonce))
    if nonce % 10000 == 0:
        print(nonce, " . time passed:", time.process_time() - t)
    if acct.address.startswith("0x" + "0"*int(target)):
        print("ADDR:   ", acct.address)
        print ("SECRET: ", acct.privateKey.hex())
        print("after ", nonce, "iterations")
        exit()
