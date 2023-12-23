import { GraphQLError } from "graphql";
import { DriverModelType } from "../db/driver.ts";
import { JourneyModelType, JourneyModel } from "../db/journey.ts";

export const Driver = {
    travels: async (parent: DriverModelType): Promise<JourneyModelType[]> => {
      const travels = await JourneyModel.find({ driver: parent._id });
      return travels;
    },
  };