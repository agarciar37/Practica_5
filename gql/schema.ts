export const typeDefs = `#graphql

    type Card {
        number: String!
        cvv: String!
        expirity: String!
        money: Float!
    }
    type Client {
        id: ID!
        name: String!
        email: String!
        cards: [Card!]!
        travels: [Journey!]!
    }

    type Driver {
        id: ID!
        name: String!
        email: String!
        username: String!
        travels: [Journey!]!
    }

    type Journey {
        id: ID!
        driver: Client!
        client: Driver!
        origin: String!
        destination: String!
        date: String!
        seats: Int!
        price: Float!
        status: Status!
        passengers: [Client!]!
    }

    enum Status {
        STARTED
        CANCELED
        FINISHED
    }

    type Query {
        clients: [Client!]!
        drivers: [Driver!]!
        journeys: [Journey!]!
        client(id: ID!): Client!
        driver(id: ID!): Driver!
        journey(id: ID!): Journey!
    }

    type Mutation{
        createClient(name: String!, email: String!, cards: [String!]!, travels: [String!]!): Client!
        createDriver(name: String!, email: String!, username: String!, travels: [String!]!): Driver!
        deleteClient(id: ID!): Client!
        deleteDriver(id: ID!): Driver!
        getClients: [Client!]!
        getDrivers: [Driver!]!
        addCard(clientId: ID!, card: CardInput!): Client!
        deleteCard(id: ID!, card: String!): Client!
        createJourney(driver: String!, client: String!, origin: String!, destination: String!, date: String!, seats: Int!, price: Float!, status: String!, passengers: [String!]!): Journey!
        getJourneys: [Journey!]!
        endJourney(id: ID!): Journey!
    }

    input CardInput {
        number: String!
        cvv: String!
        expirity: String!
        money: Float!
    }
`