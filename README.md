## Pretend Blockchain

The following code creates a really silly and pretend blockchain that doesn't really do anything other than keep track of balances and demonstrate how each subsequent block contains a pointer to the previous block and the previous block's hash.

### Installation

1. Clone the repo
````
git clone https://github.com/asieke/blockchain.git
````

2. Run the installer
````
cd blockchain
npm install
````

3. Run the code
````
node index.js
````

4. Mess around with the variables.

The following code creates a new blockchain and adds a few blocks.  You can print it out to see a really snazzy console visual of your blockchain.
(note: the @ -> transaction represents the creation of new coins, they have to come from somewhere!)

```javascript
let blockchain = new Blockchain();

let block = new Block(2);
block.addTransaction('A','B',20);
block.addTransaction('A','C',20);
blockchain.addBlock(block);

let block2 = new Block(3);
block2.addTransaction('B','D',10);
block2.addTransaction('A','C',5);
block2.addTransaction('C','D',10);
blockchain.addBlock(block2);


console.clear();
blockchain.print();
console.log("Balances: ");
console.log(blockchain.getBalances());
```

#### Notes

There isn't any validation (yet) so balances can go negative and you could theoretically tamper with old blocks :)