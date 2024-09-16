import api from "@/lib/axios"
import { isAxiosError } from "axios"
import { Note, NoteFormData, Project, Task } from "../types"

type NoteApi={
    formdata:NoteFormData
    projectId:Project["_id"]
    taskId:Task["_id"]
    noteId:Note["_id"]
}


export async function createNote({projectId,taskId,formdata}:Pick<NoteApi,"projectId" | "taskId" |"formdata">) {
    try {

        const url = `/projects/${projectId}/tasks/${taskId}/notes`
        const { data } = await api.post<string>(url, formdata)
        return data

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function deleteNote({projectId,taskId,noteId}:Pick<NoteApi,"projectId" | "taskId" |"noteId">) {
    try {

        const url = `/projects/${projectId}/tasks/${taskId}/notes/${noteId}`
        const { data } = await api.delete<string>(url)
        return data

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}