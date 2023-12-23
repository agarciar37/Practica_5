import { GraphQLError } from "graphql"
import mongoose from "mongoose"
import { ClientModelType, ClientModel } from "../db/client.ts";
import { DriverModel, DriverModelType } from "../db/driver.ts";
import { JourneyModel, JourneyModelType } from "../db/journey.ts";

export const Mutation = {
    //Cuando se crea un cliente solamente se le puede pasar el name y el email
    createClient: async(
        _: unknown,
        args: { name: string; email: string },
    ): Promise<ClientModelType> => {
        // Validación de formato de email
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(args.email)) {
            throw new GraphQLError("Please enter a valid email");
        }

        // Validación de email único
        const existingClient = await ClientModel.findOne({ email: args.email });
        if (existingClient) {
            throw new GraphQLError("Email already exists");
        }

        const client = {
            name: args.name,
            email: args.email,
        }
        const newClient = await ClientModel.create(client)
        return newClient
    },

    //crear conductor
    createDriver: async(
        _: unknown,
        args: { name: string; email: string; username: string },
    ): Promise<DriverModelType> => {
        // Validación de formato de email
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(args.email)) {
            throw new GraphQLError("Please enter a valid email");
        }

        // Validación de email único
        const existingDriver = await DriverModel.findOne({ email: args.email });
        if (existingDriver) {
            throw new GraphQLError("Email already exists");
        }

        // Validación de username único
        const existingUsername = await DriverModel.findOne({ username: args.username });
        if (existingUsername) {
            throw new GraphQLError("Username already exists");
        }

        const driver = {
            name: args.name,
            email: args.email,
            username: args.username,
        }

        const newDriver = await DriverModel.create(driver)
        return newDriver
    },

    //eliminar cliente (si se elimina el cliente se eliminan sus viajes)
    deleteClient: async(
        _: unknown,
        args: { id: string },
    ): Promise<ClientModelType> => {
        const { id } = args;

        // Eliminar el cliente y sus viajes asociados
        const deletedClient = await ClientModel.findByIdAndDelete(id);
        if (!deletedClient) {
            throw new GraphQLError("Client not found");
        }

        // Eliminar los viajes asociados al cliente
        await JourneyModel.deleteMany({ clientID: id });

        return deletedClient;
    },
    

    //eliminar conductor (si se elminina el conductor se eliminan sus viajes)
    deleteDriver: async(
        _: unknown,
        args: { id: string },
    ): Promise<DriverModelType> => {
        const { id } = args;

        // Eliminar el conductor y sus viajes asociados
        const deletedDriver = await DriverModel.findByIdAndDelete(id);
        if (!deletedDriver) {
            throw new GraphQLError("Driver not found");
        }

        // Eliminar los viajes asociados al conductor
        await JourneyModel.deleteMany({ driverID: id });

        return deletedDriver;
    },

    //obtener todos los clientes
    getClients: async(): Promise<ClientModelType[]> => {
        const clients = await ClientModel.find()
        return clients
    },

    //obtener todos los conductores
    getDrivers: async(): Promise<ClientModelType[]> => {
        const drivers = await ClientModel.find()
        return drivers
    },

    addCard : async (
        _: unknown,
        args: {
            id : string,
            number : string,
            money : string,
            cvv : string,
            expiration : string
        }
    ): Promise<ClientModelType> => {
        const card = {
            number : args.number,
            money : args.money,
            cvv : args.cvv,
            expiration : args.expiration
        }
        const client = await ClientModel.findByIdAndUpdate(args.id,{$push : {cards : card}})
        if (!client){
            throw new GraphQLError(`No client found with id ${args.id}`,{
                extensions : {code : "NO_CLIENT_FOUND"}
            })
        }
        return client
    },

    deleteCard : async (
        _: unknown,
        args: {id : string}
    ): Promise<ClientModelType> => {
        const client = await ClientModel.findByIdAndUpdate(args.id,{$pop : {cards : 1}})
        if (!client){
            throw new GraphQLError(`No client found with id ${args.id}`,{
                extensions : {code : "NO_CLIENT_FOUND"}
            })
        }
        return client
    },

    //crear viaje
    createJourney: async(
        _: unknown,
        args: { driver: string; client: string; origin: string; destination: string; date: string; seats: number; price: number; status: string; passengers: string[] },
    ): Promise<JourneyModelType> => {

        const journey = {
            driver: args.driver,
            client: args.client,
            origin: args.origin,
            destination: args.destination,
            date: args.date,
            seats: args.seats,
            price: args.price,
            status: args.status,
            passengers: args.passengers,
        }
        const newJourney = await JourneyModel.create(journey)
        return newJourney
    },

    //terminar viaje (cuando se termina un viaje, este no se eleminina, solo se cambia el estado a "finalizado")
    endJourney: async(
        _: unknown,
        args: { id: string },
    ): Promise<JourneyModelType> => {
        const { id } = args;

        // Actualizar el estado del viaje a "finalizado"
        const endedJourney = await JourneyModel.findByIdAndUpdate(
            id,
            { state: "finished" },
            { new: true } // Devolver el documento actualizado
        );

        if (!endedJourney) {
            throw new GraphQLError("Journey not found");
        }

        return endedJourney;
    },

}