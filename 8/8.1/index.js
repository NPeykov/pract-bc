import { UserInputError, ApolloServer, gql } from 'apollo-server'
import Book from './models/book.js'
import Author from './models/author.js'
import User from './models/user.js'
import jwt from 'jsonwebtoken'
import './db.js'

const THE_SECRET = ':)'

let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  {
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

const typeDefs = gql`
	type Book {
    title: String!
    published: Int!
    author: String! 
    genres: [String!]!
    id: ID!
	}
	
	type Author {
    name: String!
		bookCount: Int!
    born:	Int 
    id: ID!
	}

  type User {
    username: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
		bookCount: Int!
		authorCount: Int!
		allBooks(author: String): [Book]
		allAuthors: [Author]!
    me: User!
  }

	type Mutation {
		addBook(
			title: String!,
			author: String!,
			published: Int!,
			genres: [String]!
		): Book!
    createUser(
      username: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
	}
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (!args.author) {
        return await Book.find({})
      }
      return await Book.find({ author: args.author })
    },
    allAuthors: async () => await Author.find({}),
    me: (root, args, context) => context.currentUser
  },

  Author: {
    bookCount: (root) => books.filter(book => book.author === root.name).length
  },

  Mutation: {
    addBook: async (root, args) => {
      const exists = await Author.findOne({ name: args.author })
      if (!exists) {
        const newAuthor = new Author({ name: args.author })
        await newAuthor.save()
      }
      const newBook = new Book({ ...args })
      await newBook.save()
      return newBook
    },
    createUser: async (root, args) => {
      const user = new User({ ...args })
      return await user.save()
    },
    login: async (root, { username, password }) => {
      const user = await User.findOne({ username })
      if (!user || password !== "123456") throw new UserInputError('wrong credentials')

      const userToDecode = { username: user.username, id: user._id }

      return { value: jwt.sign(userToDecode, THE_SECRET) }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) { 
      const decodedToken = jwt.verify(auth.substring(7), THE_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser } 
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
