const { ApolloServer, gql } = require("apollo-server");
const Sequelize = require("sequelize");

require("dotenv").config({ path: "../.env" });

const sequelize = new Sequelize(
  `postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${
    process.env.DB_HOST
  }:5432/${process.env.DB}`,
  {
    ssl: true,
    dialectOptions: {
      ssl: true
    }
  }
);

const Framework = sequelize.define("frameworks", {
  name: {
    type: Sequelize.STRING
  },
  git: {
    type: Sequelize.STRING
  }
});

const typeDefs = gql`
  type Framework {
    id: String
    name: String
    git: String
  }

  type Query {
    frameworks: [Framework]
  }
`;

const resolvers = {
  Query: {
    frameworks: () => Framework.findAll()
  }
};
const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
