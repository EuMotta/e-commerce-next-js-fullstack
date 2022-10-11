import bcrypt from 'bcryptjs'
const data = {
    users: [
        {
            name: 'José Antonio Motta',
            email: 'adminnfTrade@example.com',
            password: bcrypt.hashSync('12345678'),
            isAdmin: true,
        },
        {
            name: 'Milena',
            email: 'usernfTrade@example.com',
            password: bcrypt.hashSync('12345678'),
            isAdmin: false,
        },
    ],
    products: [
        {
            name: 'The girl with the firefly',
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
            name: 'Dodo hide the seek',
            image: '/img/produto02.png',
            slug: 'produto-02',
            category: "NFT",
            price: 110.00,
            description: 'É um produto incrível',
            rating: 4.5,
            numReviews: 10,
            countInStock: 3,
            publisher: 'Gustavo'
        },
        {
            name: 'Synthwave Painting',
            image: '/img/produto03.png',
            slug: 'produto-03',
            category: "NFT",
            price: 120.00,
            description: 'É um produto incrível',
            rating: 4.5,
            numReviews: 10,
            countInStock: 500,
            publisher: 'Louis'
        },
        {
            name: 'Spider Eyes Modern Art',
            image: '/img/produto04.png',
            slug: 'produto-04',
            category: "NFT",
            price: 130.00,
            description: 'É um produto incrível',
            rating: 4.5,
            numReviews: 10,
            countInStock: 3,
            publisher: 'Oliver Sanchez'
        },
        {
            name: 'Liquid Forest Princess',
            image: '/img/Produto05.png',
            slug: 'produto-05',
            category: "NFT",
            price: 140.00,
            description: 'É um produto incrível',
            rating: 4.5,
            numReviews: 10,
            countInStock: 3,
            publisher: 'Mary tipper'
        },
        {
            name: 'Colorful Abstract Painting',
            image: '/img/produto06.png',
            slug: 'produto-06',
            category: "NFT",
            price: 150.00,
            description: 'É um produto incrível',
            rating: 4.5,
            numReviews: 10,
            countInStock: 3,
            publisher: 'Zoe Stiffler'
        },
        {
            name: 'Colorful Abstract',
            image: '/img/produto07.png',
            slug: 'produto-07',
            category: "NFT",
            price: 150.00,
            description: 'É um produto incrível',
            rating: 4.5,
            numReviews: 10,
            countInStock: 3,
            publisher: 'Mike Anderson'
        },
        {
            name: 'The girl with the firefly',
            image: '/img/produto08.png',
            slug: 'produto-08',
            category: "NFT",
            price: 150.00,
            description: 'É um produto incrível',
            rating: 4.5,
            numReviews: 10,
            countInStock: 0,
            publisher: 'Maik'
        },
    ]
}

export default data