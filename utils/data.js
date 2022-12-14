import bcrypt from 'bcryptjs'
const data = {
    users: [
        {
            name: 'José',
            lastName: 'Antonio Motta',
            image: '/imgUser/admin.png',
            email: 'adminnfTrade@example.com',
            password: bcrypt.hashSync('12345678'),
            isAdmin: true,
        },
        {
            name: 'Milena',
            lastName: 'Carolina Souza',
            image: '/imgUser/user.png',
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
            title:'Título do produto',
            gender:'Gênero do produto',
            category: "NFT",
            price: 100.00,
            description: 'É um produto incrível',
            rating: 4.5,
            numReviews: 10,
            countInStock: 1,
            publisher: 'José Antonio',
            sellCount: 0,
        },
        {
            name: 'Dodo hide the seek',
            image: '/img/produto02.png',
            slug: 'produto-02',
            title:'Título do produto',
            gender:'Gênero do produto',
            category: "NFT",
            price: 110.00,
            description: 'É um produto incrível',
            rating: 4.5,
            numReviews: 10,
            countInStock: 3,
            publisher: 'Gustavo',
            sellCount: 0,
        },
        {
            name: 'Synthwave Painting',
            image: '/img/produto03.png',
            slug: 'produto-03',
            title:'Título do produto',
            gender:'Gênero do produto',
            category: "NFT",
            price: 120.00,
            description: 'É um produto incrível',
            rating: 4.5,
            numReviews: 10,
            countInStock: 500,
            publisher: 'Louis',
            sellCount: 0,
        },
        {
            name: 'Spider Eyes Modern Art',
            image: '/img/produto04.png',
            slug: 'produto-04',
            title:'Título do produto',
            gender:'Gênero do produto',
            category: "NFT",
            price: 130.00,
            description: 'É um produto incrível',
            rating: 4.5,
            numReviews: 10,
            countInStock: 3,
            publisher: 'Oliver Sanchez',
            sellCount: 0,
        },
        {
            name: 'Liquid Forest Princess New',
            image: '/img/produto04.png',
            slug: 'produto-05',
            title:'Título do produto',
            gender:'Gênero do produto',
            category: "NFT",
            price: 140.00,
            description: 'É um produto incrível',
            rating: 4.5,
            numReviews: 10,
            countInStock: 3,
            publisher: 'Mary tipper',
            sellCount: 0,
        },
        {
            name: 'Colorful Abstract Painting',
            image: '/img/produto06.png',
            slug: 'produto-06',
            title:'Título do produto',
            gender:'Gênero do produto',
            category: "NFT",
            price: 150.00,
            description: 'É um produto incrível',
            rating: 4.5,
            numReviews: 10,
            countInStock: 3,
            publisher: 'Zoe Stiffler',
            sellCount: 0,
        },
        {
            name: 'Colorful Abstract',
            image: '/img/produto07.png',
            slug: 'produto-07',
            title:'Título do produto',
            gender:'Gênero do produto',
            category: "NFT",
            price: 150.00,
            description: 'É um produto incrível',
            rating: 4.5,
            numReviews: 10,
            countInStock: 3,
            publisher: 'Mike Anderson',
            sellCount: 0,
        },
        {
            name: 'The girl with the firefly',
            image: '/img/produto08.png',
            slug: 'produto-08',
            title:'Título do produto',
            gender:'Gênero do produto',
            category: "NFT",
            price: 150.00,
            description: 'É um produto incrível',
            rating: 4.5,
            numReviews: 10,
            countInStock: 0,
            publisher: 'Maik',
            sellCount: 0,
        },
    ]
}

export default data