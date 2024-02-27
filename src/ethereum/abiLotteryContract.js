export const abiLotteryFactory = [ 
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "numTicket",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "winner",
				"type": "address"
			}
		],
		"name": "LotteryResult",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_numLottery",
				"type": "uint256"
			}
		],
		"name": "_initTickets",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "balance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_ticketNumber",
				"type": "uint256"
			}
		],
		"name": "buyTicket",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256[]",
				"name": "_ticketNumberList",
				"type": "uint256[]"
			}
		],
		"name": "buyTicketList",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "changeRandomInit",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_numLottery",
				"type": "uint256"
			}
		],
		"name": "getHistory",
		"outputs": [
			{
				"components": [
					{
						"internalType": "contract ILotteryTickets",
						"name": "lotteryTickets",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "winner",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "winnerNum",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "lotteryPrize",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "initDate",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "endDate",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "prize",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "soldTicketAmt",
						"type": "uint256"
					},
					{
						"internalType": "bool[101]",
						"name": "soldTicketList",
						"type": "bool[101]"
					}
				],
				"internalType": "struct ILotteryStruct.lottery",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "init_random",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "isLotteryOpened",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "lotteryPlayed",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "maxNumTickets",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "numLottery",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_price",
				"type": "uint256"
			}
		],
		"name": "setTicketPriceForNextLottery",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "testLottery",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "ticketPrice",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "ticketPriceForNextLottery",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "wthdBalance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	}
];

export const abiLotteryStorage = [
	{
		"inputs": [
			{
				"internalType": "contract ILotteryFactory",
				"name": "_lotteryFactory",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "actualTicketsForSale",
		"outputs": [
			{
				"internalType": "bool[101]",
				"name": "",
				"type": "bool[101]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getPendingTime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "lotteryFactory",
		"outputs": [
			{
				"internalType": "contract ILotteryFactory",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint8",
				"name": "_from",
				"type": "uint8"
			},
			{
				"internalType": "uint8",
				"name": "_to",
				"type": "uint8"
			}
		],
		"name": "lotteryHistory",
		"outputs": [
			{
				"components": [
					{
						"internalType": "contract ILotteryTickets",
						"name": "lotteryTickets",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "winner",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "winnerNum",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "lotteryPrize",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "initDate",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "endDate",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "prize",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "soldTicketAmt",
						"type": "uint256"
					},
					{
						"internalType": "bool[101]",
						"name": "soldTicketList",
						"type": "bool[101]"
					}
				],
				"internalType": "struct ILotteryStruct.lottery[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "ticketListByOwner",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_numLottery",
				"type": "uint256"
			}
		],
		"name": "ticketsForSale",
		"outputs": [
			{
				"internalType": "bool[101]",
				"name": "",
				"type": "bool[101]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
