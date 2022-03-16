const users = [
    {
        _id: '9f15216b-44c2-40d4-b3fe-cfe26ffd4f9e',
        firstName: 'Meruzh',
        lastName: 'Kiloyan',
        password: '$2b$10$uDFJTcb0t.nvmEGNrJX9HO22OaoJiVUWMT1uHUyg94tQwpm5tV6i2',
        email: 'meruzh@gmail.com',
        gender: "female",
        country: "Czech Republic",
        dateOfBirth: "13.06.1980",
        age: 19,
        role: 'admin',
        transactions: {
            income: [
                {
                    id: '0',
                    type: 'type',
                    accountId: 'id 1',
                    title: 'title',
                    description: 'description',
                    dateOfOperation: '21.12.2000',
                    category: 'IT',
                    currency: '$',
                    amount: '1000',
                    createdAt: 'Date now()',
                    updatedAt: 'Date now()'
                }
            ],
            expense: [
                {
                    id: '0',
                    type: 'type',
                    accountId: 'id 1',
                    title: 'title',
                    description: 'description',
                    dateOfOperation: '21.12.2000',
                    category: 'IT',
                    currency: '$',
                    amount: '1000',
                    createdAt: 'Date now()',
                    updatedAt: 'Date now()'
                }
            ]
        },
        accounts: [
            {
                id: '0',
                userId: '0',
                title: 'title',
                description: 'description',
                currency: '$',
                createdAt: 'Date now()',
                updatedAt: 'Date now()'
            }
        ]
    },
    {
        _id: 1,
        firstName: 'Todd',
        lastName: 'Schroeder',
        password: '$2b$10$iy7VIZK.OGK4tDyiFJqW6eSHOj6L1KQ9402aHBP5aY9jB9nKA.oYu',
        email: 'todd@gmail.com',
        gender: "female",
        country: "Czech Republic",
        dateOfBirth: "13.06.1980",
        age: 22,
        role: 'user',
        transactions: {
            income: [
                {
                    id: '1',
                    type: 'type',
                    accountId: 'id 1',
                    title: 'title',
                    description: 'description',
                    dateOfOperation: '21.12.2000',
                    category: 'IT',
                    currency: '$',
                    amount: '1000',
                    createdAt: 'Date now()',
                    updatedAt: 'Date now()'
                }
            ],
            expense: [
                {
                    id: '1',
                    type: 'type',
                    accountId: 'id 1',
                    title: 'title',
                    description: 'description',
                    dateOfOperation: '21.12.2000',
                    category: 'IT',
                    currency: '$',
                    amount: '1000',
                    createdAt: 'Date now()',
                    updatedAt: 'Date now()'
                }
            ]
        },
        accounts: [
            {
                id: '1',
                userId: '1',
                title: 'title',
                description: 'description',
                currency: '$',
                createdAt: 'Date now()',
                updatedAt: 'Date now()'
            }
        ]
    },
    {
        _id: 2,
        firstName: 'Montgomery',
        lastName: 'Schroeder',
        password: '$2b$10$Qo05Uq9kBl.wzX6eKuyKTe71/5D2B1hFMhamOmxo6oHr1V93RQR8u',
        email: 'mont@gmail.com',
        gender: "female",
        country: "Czech Republic",
        dateOfBirth: "13.06.1980",
        age: 24,
        role: 'user',
        transactions: {
            income: [
                {
                    id: '2',
                    type: 'type',
                    accountId: 'id 1',
                    title: 'title',
                    description: 'description',
                    dateOfOperation: '21.12.2000',
                    category: 'IT',
                    currency: '$',
                    amount: '1000',
                    createdAt: 'Date now()',
                    updatedAt: 'Date now()'
                }
            ],
            expense: [
                {
                    id: '2',
                    type: 'type',
                    accountId: 'id 1',
                    title: 'title',
                    description: 'description',
                    dateOfOperation: '21.12.2000',
                    category: 'IT',
                    currency: '$',
                    amount: '1000',
                    createdAt: 'Date now()',
                    updatedAt: 'Date now()'
                }
            ]
        },
        accounts: [
            {
                id: '2',
                userId: '2',
                title: 'title',
                description: 'description',
                currency: '$',
                createdAt: 'Date now()',
                updatedAt: 'Date now()'
            }
        ]
    },
    {
        _id: 3,
        firstName: 'Combs',
        lastName: 'Schroeder',
        password: '$2b$10$.hoBsXsnm.C7Ycy5LN/6Q.boohAbj0XHGosnDQwOuRncCJhLvchHm',
        email: 'combs@gmail.com',
        gender: "female",
        country: "Czech Republic",
        dateOfBirth: "13.06.1980",
        age: 25,
        role: 'user',
        transactions: {
            income: [
                {
                    id: '3',
                    type: 'type',
                    accountId: 'id 1',
                    title: 'title',
                    description: 'description',
                    dateOfOperation: '21.12.2000',
                    category: 'IT',
                    currency: '$',
                    amount: '1000',
                    createdAt: 'Date now()',
                    updatedAt: 'Date now()'
                }
            ],
            expense: [
                {
                    id: '3',
                    type: 'type',
                    accountId: 'id 1',
                    title: 'title',
                    description: 'description',
                    dateOfOperation: '21.12.2000',
                    category: 'IT',
                    currency: '$',
                    amount: '1000',
                    createdAt: 'Date now()',
                    updatedAt: 'Date now()'
                }
            ]
        },
        accounts: [
            {
                id: '3',
                userId: '3',
                title: 'title',
                description: 'description',
                currency: '$',
                createdAt: 'Date now()',
                updatedAt: 'Date now()'
            }
        ]
    },
    {
        id: 4,
        firstName: 'Burke',
        lastName: 'Schroeder',
        password: '$2b$10$y26W6lcJrnnvq4NnJNMfAuRj2tWGxbxIucaYgrHMR1TwwgapzOYAu',
        email: 'burke@gmail.com',
        gender: "female",
        country: "Czech Republic",
        dateOfBirth: "13.06.1980",
        age: 23,
        role: 'user',
        transactions: {
            income: [
                {
                    id: '4',
                    type: 'type',
                    accountId: 'id 1',
                    title: 'title',
                    description: 'description',
                    dateOfOperation: '21.12.2000',
                    category: 'IT',
                    currency: '$',
                    amount: '1000',
                    createdAt: 'Date now()',
                    updatedAt: 'Date now()'
                }
            ],
            expense: [
                {
                    id: '4',
                    type: 'type',
                    accountId: 'id 1',
                    title: 'title',
                    description: 'description',
                    dateOfOperation: '21.12.2000',
                    category: 'IT',
                    currency: '$',
                    amount: '1000',
                    createdAt: 'Date now()',
                    updatedAt: 'Date now()'
                }
            ]
        },
        accounts: [
            {
                id: '4',
                userId: '4',
                title: 'title',
                description: 'description',
                currency: '$',
                createdAt: 'Date now()',
                updatedAt: 'Date now()'
            }
        ]
    },
    {
        id: 5,
        firstName: 'Powell',
        lastName: 'Schroeder',
        password: '$2b$10$0OHt36ILgk7oAYB90yiF9ulC8pmqCBxDuJ7MvXzrSu8n8zfh6qX.C',
        email: 'powel@gmail.com',
        gender: "female",
        country: "Czech Republic",
        dateOfBirth: "13.06.1980",
        age: 24,
        role: 'user',
        transactions: {
            income: [
                {
                    id: '5',
                    type: 'type',
                    accountId: 'id 1',
                    title: 'title',
                    description: 'description',
                    dateOfOperation: '21.12.2000',
                    category: 'IT',
                    currency: '$',
                    amount: '1000',
                    createdAt: 'Date now()',
                    updatedAt: 'Date now()'
                }
            ],
            expense: [
                {
                    id: '5',
                    type: 'type',
                    accountId: 'id 1',
                    title: 'title',
                    description: 'description',
                    dateOfOperation: '21.12.2000',
                    category: 'IT',
                    currency: '$',
                    amount: '1000',
                    createdAt: 'Date now()',
                    updatedAt: 'Date now()'
                }
            ]
        },
        accounts: [
            {
                id: '5',
                userId: '6',
                title: 'title',
                description: 'description',
                currency: '$',
                createdAt: 'Date now()',
                updatedAt: 'Date now()'
            }
        ]
    }
]

export { users }