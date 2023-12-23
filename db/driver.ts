import mongoose from "mongoose"
import { Driver } from "../types.ts"

const Schema = mongoose.Schema

const DriverSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        username: { type: String, required: true, unique: true },
        travelsID: [{ type: Schema.Types.ObjectId, required: true, ref: "Journey" }]
    }
)

//verificar que el email no se repita y este en el formato correcto
DriverSchema.path("email").validate(async(email: string) => {
    const emailCount = await mongoose.models.Driver.countDocuments({ email })
    return !emailCount
}, "Email already exists")

//verificar que el email esta en el formato correcto
DriverSchema.path("email").validate((email: string) => {
    const emailRegex = /\S+@\S+\.\S+/
    return emailRegex.test(email)
}, "Please enter a valid email")

//verificar que el username no se repita
DriverSchema.path("username").validate(async(username: string) => {
    const usernameCount = await mongoose.models.Driver.countDocuments({ username })
    return !usernameCount
}, "Username already exists")

export type DriverModelType = mongoose.Document & Omit<Driver, "_id"> & {
    travelsID: Array<mongoose.Types.ObjectId>

}
export const DriverModel = mongoose.model<DriverModelType>("Driver", DriverSchema)