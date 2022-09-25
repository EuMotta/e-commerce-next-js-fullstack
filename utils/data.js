import bcrypt from 'bcryptjs'
const data = {
    users: [
        {
            name: 'José Antonio Motta',
            email: 'admin@example.com',
            password: bcrypt.hashSync('123456'),
            isAdmin: true,
        },
        {
            name: 'Milena',
            email: 'user@example.com',
            password: bcrypt.hashSync('123456'),
            isAdmin: false,
        },
    ],
    products: [
        {
            name: 'Produto 1',
            image: '/img/produto01.png',
            slug: 'produto-01',
            category: "NFT",
            price: 100.00,
            description: 'É um produto incrível',
            rating: 4.5,
            numReviews: 10,
            countInStock: 1,
            publisher: 'José Antonio'
        },
        {
            name: 'Produto 2',
            image: '/img/produto02.png',
            slug: 'produto-02',
            category: "NFT",
            price: 110.00,
            description: 'É um produto incrível',
            rating: 4.5,
            numReviews: 10,
            countInStock: 3,
            publisher: 'José Antonio'
        },
        {
            name: 'Produto 3',
            image: '/img/produto03.png',
            slug: 'produto-03',
            category: "NFT",
            price: 120.00,
            description: 'É um produto incrível',
            rating: 4.5,
            numReviews: 10,
            countInStock: 500,
            publisher: 'José Antonio'
        },
        {
            name: 'Produto 4',
            image: '/img/produto04.png',
            slug: 'produto-04',
            category: "NFT",
            price: 130.00,
            description: 'É um produto incrível',
            rating: 4.5,
            numReviews: 10,
            countInStock: 3,
            publisher: 'José Antonio'
        },
        {
            name: 'Produto 5',
            image: '/img/Produto05.png',
            slug: 'produto-05',
            category: "NFT",
            price: 140.00,
            description: 'É um produto incrível',
            rating: 4.5,
            numReviews: 10,
            countInStock: 3,
            publisher: 'José Antonio'
        },
        {
            name: 'Produto 6',
            image: '/img/produto06.png',
            slug: 'produto-06',
            category: "NFT",
            price: 150.00,
            description: 'É um produto incrível',
            rating: 4.5,
            numReviews: 10,
            countInStock: 3,
            publisher: 'José Antonio'
        },
    ]
}

export default data