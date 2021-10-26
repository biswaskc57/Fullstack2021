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
    author: Author!
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
        const author = await Author.find({name: args.author})
       return await Book.find({ genres: args.genre, author}).populate("author")
      
       
     } catch (error) {
       throw new UserInputError(error.message, {
         invalidArgs: args,
       })
     }
    },
    allBooks: async (root, args) => {
      try {
       return await Book.find({}).populate("author")     
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    
    },
    findBook:async (root, args) =>
    { 
      try {
      return await (await Book.findOne({ title: args.title })).populate("author")
       
     } catch (error) {
       throw new UserInputError(error.message, {
         invalidArgs: args,
       })
     }
    }
    ,
    me: (root, args, context) => {
      return context.currentUser
    }
  }
  
  ,
    Author:{
      bookCount:async (root) =>{
      try {
        const author = await Author.find({name: root.name})
        return await Book.find({author}).populate("author") 
         } catch (error) {
           throw new UserInputError(error.message, {
             invalidArgs: root,
           })
         }
      }
    }
  , 
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
  
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }
    try
      {
      const authorProvided= await Author.findOne({ name: args.author})
     
      if (!authorProvided) {
        let author = new Author({
          "name": args.author,
          "born": null,
          "bookCount": 1,
          "id":uuidv4()
         })
       
        let bookToAdd = new Book({ 
          "title": args.title,
          "published": args.published,
          "author": author,
          "genres": args.genres,
          "id":uuidv4() })

        if(args.author.length>=4){
          await bookToAdd.save()
        }
        await author.save()
 
      return bookToAdd
    }

      else{
      const author = await Author.findOne({ name: args.author})

      let bookToAdd = new Book({ 
        "title": args.title,
        "published": args.published,
        "author": author,
        "genres": args.genres,
        "id":uuidv4() })
      await bookToAdd.save()

      let authorToAddBookCount = {
        "name": author.name,
        "born": author.born ,
        "bookCount": author.bookCount+ 1
       }
       await Author.findByIdAndUpdate(author.id, authorToAddBookCount, { new: true })
 
        return bookToAdd
      }
    }
    catch (error) {
      throw new UserInputError(error.message, {
        invalidArgs: args,
      })
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
    }, 
    createUser: (root, args) => {
      const user = new User({ username: args.username })
  
      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
  
      if ( !user || args.password !== 'secret' ) {
        throw new UserInputError("wrong credentials")
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, JWT_SECRET) }
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
        .findById(decodedToken.id)
      return { currentUser }
    }
  }
})
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
