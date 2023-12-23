import { GraphQLError } from "graphql";
import { ClientModelType } from "../db/client.ts";
import { JourneyModelType, JourneyModel } from "../db/journey.ts";

export const Client = {
    travels: async (parent: ClientModelType): Promise<JourneyModelType[]> => {
      const travels = await JourneyModel.find({ client: parent._id });
      return travels;
    },
  };