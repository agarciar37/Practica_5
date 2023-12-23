import mongoose from "mongoose"
import { Journey } from "../types.ts"

const Schema = mongoose.Schema

const JourneySchema = new Schema(
    {
        driverID: { type: Schema.Types.ObjectId, required: true },
        clientID: { type: Schema.Types.ObjectId, required: true },
        origin: { type: String, required: true },
        destination: { type: String, required: true },
        date: { type: Date, required: true },
        seats: { type: Number, required: true },
        price: { type: Number, required: true },
        status: { type: String, required: true },
    }
)

//verificar driverID
JourneySchema.path("driverID").validate(async(driverID: string) => {
    const driverIDCount = await mongoose.models.Journey.countDocuments({ driverID })
    return !driverIDCount
}, "DriverID already exists")

//verificar clientID
JourneySchema.path("clientID").validate(async(clientID: string) => {
    const clientIDCount = await mongoose.models.Journey.countDocuments({ clientID })
    return !clientIDCount
}, "ClientID already exists")

//verificar que el status sea valido
JourneySchema.path("status").validate((status: string) => {
    const statusRegex = /STARTED|CANCELED|FINISHED/
    return statusRegex.test(status)
}, "Please enter a valid status")

//verificar el precio minimo 5 
JourneySchema.path("price").validate((price: number) => {
    return price >= 5
}, "Please enter a valid price")

export type JourneyModelType = mongoose.Document & Omit<Journey, "_id"> & {
    driverID: mongoose.Types.ObjectId
    clientID: mongoose.Types.ObjectId

}
export const JourneyModel = mongoose.model<JourneyModelType>("Journey", JourneySchema)