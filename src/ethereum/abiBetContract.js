export const abiBet = [
    {
        inputs: [],
        stateMutability: 'nonpayable',
        type: 'constructor',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'user',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'date',
                type: 'uint256',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'input',
                type: 'uint256',
            },
            {
                indexed: false,
                internalType: 'uint8',
                name: 'multiplier',
                type: 'uint8',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'prize',
                type: 'uint256',
            },
            {
                indexed: false,
                internalType: 'bool',
                name: 'winner',
                type: 'bool',
            },
        ],
        name: 'Bet',
        type: 'event',
    },
    {
        inputs: [
            {
                internalType: 'bool',
                name: 'even',
                type: 'bool',
            },
        ],
        name: 'bet',
        outputs: [
            {
                internalType: 'bool',
                name: 'winner',
                type: 'bool',
            },
        ],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        name: 'betHist',
        outputs: [
            {
                internalType: 'address',
                name: 'user',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'date',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'input',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'multiplier',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'prize',
                type: 'uint256',
            },
            {
                internalType: 'bool',
                name: 'winner',
                type: 'bool',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: '_numBet',
                type: 'uint256',
            },
        ],
        name: 'getHistory',
        outputs: [
            {
                components: [
                    {
                        internalType: 'address',
                        name: 'user',
                        type: 'address',
                    },
                    {
                        internalType: 'uint256',
                        name: 'date',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'input',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'multiplier',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'prize',
                        type: 'uint256',
                    },
                    {
                        internalType: 'bool',
                        name: 'winner',
                        type: 'bool',
                    },
                ],
                internalType: 'struct Bets.TxBet',
                name: '',
                type: 'tuple',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'getLastNumLatestPrice',
        outputs: [
            {
                internalType: 'int256',
                name: '',
                type: 'int256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'getLatestPrice',
        outputs: [
            {
                internalType: 'int256',
                name: '',
                type: 'int256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'numBet',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
];
