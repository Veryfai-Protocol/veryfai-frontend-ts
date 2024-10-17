export const abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      }
    ],
    name: "Staked",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "reward",
        type: "uint256"
      }
    ],
    name: "Withdrawn",
    type: "event"
  },
  {
    inputs: [],
    name: "annualInterestRate",
    outputs: [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "calculateReward",
    outputs: [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "stake",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [{ "internalType": "address", "name": "", "type": "address" }],
    name: "stakes",
    outputs: [
      { internalType: "uint256", "name": "amount", "type": "uint256" },
      { internalType: "uint256", "name": "timestamp", "type": "uint256" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "totalStaked",
    outputs: [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  { stateMutability: "payable", "type": "receive" }
] as const
