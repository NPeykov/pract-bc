import { AuthenticationError, UserInputError, ApolloServer, gql } from 'apollo-server'
import Book from './models/book.js'
import Author from './models/author.js'
import User from './models/user.js'
import jwt from 'jsonwebtoken'
import './db.js'

const THE_SECRET = ':)'

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
    bookCount: async (root) => {
      const books = await Book.find({ })
      return books.filter(book => book.author === root.name).length
    }
  },

  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if(!currentUser) throw new AuthenticationError('not authorized')

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
