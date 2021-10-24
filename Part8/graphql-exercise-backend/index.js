require("dotenv").config();
const { ApolloServer, gql,  UserInputError, AuthenticationError } = require('apollo-server')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid');

const Author = require('./models/Author')
const Book = require('./models/Book')
const User = require('./models/User')
 
const MONGODB_URI = process.env.MONGODB_URI
const JWT_SECRET = process.env.SECRET_KEY
console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })


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
    title: 'The Demon',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

const typeDefs = gql`
type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
}

type Book {
    title: String!
    published: Int!
    author: Author
    id: ID!
    genres: [String]!
}
type User {
  username: String!
  favouriteGenre: String!
  id: ID!
}
type Token {
  value: String!
}

type Query {
    authorCount:Int!
    allAuthors:[Author!]!
    findAuthor(name: String!):Author
    bookCount:Int!
    allBooks:[Book!]!
    allBooksByCategory(genre:String!, author:String!):[Book!]!
    findBook(title:String!): Book
    me: User
  }

  type Mutation {
    addBook(
    title: String!
    published: Int!
    author: String!
    genres: [String]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author 
    createUser(
      username: String!
      favouriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token  
  }
`

const resolvers = {
  Query: {
    authorCount: async () => {
    try {
      return Author.collection.countDocuments()
       
     } catch (error) {
       throw new UserInputError(error.message, {
         invalidArgs: args,
       })
     }
    },
    allAuthors: async (root, args) => {
      try {
       return await Author.find({})
        
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    
    },
    findAuthor: async(root, args) =>{ 
      try {
      return await Author.findOne({ name: args.name })
       
     } catch (error) {
       throw new UserInputError(error.message, {
         invalidArgs: args,
       })
     }
    }
   ,
    allBooksByCategory: async (root, args) => 
    {
      try {
      return await Book.find({ genres: args.genre, "author.name": args.author}  )
       
     } catch (error) {
       throw new UserInputError(error.message, {
         invalidArgs: args,
       })
     }
    },
    allBooks:()=> async (root, args) => {
      try {
       return await Book.find({})
        
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    
    },
    findBook:async (root, args) =>
    { 
      try {
      return await Book.findOne({ title: args.title })
       
     } catch (error) {
       throw new UserInputError(error.message, {
         invalidArgs: args,
       })
     }
    }

  }
  ,
    Author:{
      bookCount:async (root) =>{
      try {
        const booksByAuthor= await Book.find({ "author.name": root.author})
        return booksByAuthor.length  
         } catch (error) {
           throw new UserInputError(error.message, {
             invalidArgs: args,
           })
         }
      }
    }
,
  Mutation: {
    addBook: (root, args) => {
      if (!books.find(book => book.author===(args.author))) {
        console.log("We are here finally")
       let author = {
        "name": args.author,
        "born": null,
        "bookCount": 1
       }
      authors = authors.concat(author);
      let bookToAdd = { ...args, id:uuidv4() }
      books = books.concat(bookToAdd)
        console.log("books when author is not given",books)
        return bookToAdd
        }
      else{
      let book = { ...args, id:uuidv4() }
       books = books.concat(book)
        console.log("books when author is given",books)
        return book
      }
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({name: args.name})
      
      author.born =args.setBornTo

      try {
       await author.save()
       return author
      }
      catch(error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    }       
    
  },
}
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id).populate('friends')
      return { currentUser }
    }
  }
})
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
