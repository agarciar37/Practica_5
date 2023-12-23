import { GraphQLError } from "graphql";
import { ClientModelType, ClientModel } from "../db/client.ts";
import { DriverModelType, DriverModel } from "../db/driver.ts";
import { JourneyModelType } from "../db/journey.ts";

export const Journey = {
    driver: async (parent: JourneyModelType): Promise<DriverModelType> => {
      const driver = await DriverModel.findById(parent.driver).exec();
      if (!driver) {
        throw new GraphQLError(`No driver found with id ${parent.driver}`, {
          extensions: { code: "NO_DRIVER_FOUND" },
        });
      }
      return driver;
    },
    
    client: async (parent: JourneyModelType): Promise<ClientModelType> => {
      const client = await ClientModel.findById(parent.client).exec();
      if (!client) {
        throw new GraphQLError(`No client found with id ${parent.client}`, {
          extensions: { code: "NO_CLIENT_FOUND" },
        });
      }
      return client;
    },
  };