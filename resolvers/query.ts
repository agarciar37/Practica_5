import { GraphQLError } from "graphql";
import { ClientModelType, ClientModel } from "../db/client.ts";
import { DriverModelType, DriverModel } from "../db/driver.ts";
import { JourneyModelType, JourneyModel } from "../db/journey.ts";

export const Query = {
    clients : async (): Promise<ClientModelType[]> => {
        const clients = await ClientModel.find().exec()
        return clients
    },

    client : async (_: unknown, args: {id :string}): Promise<ClientModelType> => {
        const client = await ClientModel.findById(args.id)
        if (!client){
            throw new GraphQLError(`No client found with id ${args.id}`,{
                extensions : {code : "NO_CLIENT_FOUND"}
            })
        }
        return client
    },

    journeys : async (): Promise<JourneyModelType[]> => {
        const journeys = await JourneyModel.find().exec()
        return journeys
    },

    journey : async (_: unknown, args: {id :string}): Promise<JourneyModelType> => {
        const journey = await JourneyModel.findById(args.id)
        if (!journey){
            throw new GraphQLError(`No journey found with id ${args.id}`,{
                extensions : {code : "NO_JOURNEY_FOUND"}
            })
        }
        return journey
    },

    drivers : async (): Promise<DriverModelType[]> => {
        const drivers = await DriverModel.find().exec()
        return drivers
    },

    driver : async (_: unknown, args: {id :string}): Promise<DriverModelType> => {
        const driver = await DriverModel.findById(args.id)
        if (!driver){
            throw new GraphQLError(`No driver found with id ${args.id}`,{
                extensions : {code : "NO_DRIVER_FOUND"}
            })
        }
        return driver
    }
}