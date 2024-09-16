import { isAxiosError } from "axios"
import { UpdateCurrentPassword, UserProfileForm } from "../types"
import api from "@/lib/axios"



export const changeProfile=async(formData:UserProfileForm)=> {
    try {

        const url = `/auth/profile`
        const { data } = await api.put<string>(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}



export const changePassword=async(formData:UpdateCurrentPassword)=> {
    try {

        const url = `/auth/update-password`
        const { data } = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}