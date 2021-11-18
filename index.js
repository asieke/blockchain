var crypto = require('crypto');

class Block {
  constructor(id = null, prevHash = null, transactions = []) {
    this.id = id;
    this.transactions = transactions;
    this.prevHash = prevHash
    this.prevBlock = null;
    this.updateHash();
  }

  addTransaction(from, to, amount) {
    this.transactions.push({
      from: from,
      to: to,
      amount: amount
    })
    this.updateHash();
  }

  updateHash() {
    this.currentHash = crypto.createHash('sha256').update(JSON.stringify(this)).digest('hex');
  }

  print(){
    console.log("====================");
    console.log("|| id:    " + this.id);
    console.log("|| pID:   " + (this.prevBlock!==null ? this.prevBlock.id : "null"));
    console.log("|| pHash: " + this.prevHash);
    console.log(this.transactions.map(x => "|| " + x.from + " -> " + x.amount + " -> " + x.to).join("\n"));
    console.log("|| this:  " + this.currentHash);
    console.log("====================");
  }
}

class Blockchain {
  constructor() {
    //create genesis block
    let temp = new Block(1);
    temp.addTransaction('@','A', 50);
    this.size = 1;
    this.blocks = [temp];
    this.currentHash = temp.currentHash;
  }

  getHead() {
    return this.blocks[this.size-1];
  }

  addBlock(block) {
    block.prevBlock = this.blocks[this.size-1];
    block.prevHash = this.blocks[this.size-1].currentHash;
    this.blocks[this.size] = block;
    this.size++;
  }

  print() {
    this.blocks.forEach((x) => x.print())
  }

  getBalances() {
    let balances = {};
    for(let i = 0; i < this.blocks.length; i++){
      for(let k = 0; k < this.blocks[i].transactions.length; k++){
        if (balances[this.blocks[i].transactions[k].to] === undefined) {
          balances[this.blocks[i].transactions[k].to] = 0;
        }
        balances[this.blocks[i].transactions[k].to] += this.blocks[i].transactions[k].amount;
        if (balances[this.blocks[i].transactions[k].from] === undefined) {
          balances[this.blocks[i].transactions[k].from] = 0;
        }
        balances[this.blocks[i].transactions[k].from] -= this.blocks[i].transactions[k].amount;
      }
    }
    return balances;
  }
}

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


