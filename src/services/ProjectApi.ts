import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { dashboardProjectSchema, editProjectSchema, Project, ProjectFormData, projectSchema } from "@/types/index";

export async function createProject(formData: ProjectFormData) {
    try {

        const { data } = await api.post<string>("/projects", formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }

    }

}


export async function getProjects() {


    try {

        const { data } = await api("/projects")
        const result = dashboardProjectSchema.safeParse(data)
        if (result.success) {
            return result.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }

    }

}


export async function getProjectById(id: Project["_id"]) {

    try {
        const { data } = await api(`/projects/${id}`)
        const result = editProjectSchema.safeParse(data)
        if (result.success) {
            return result.data
        }

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getFullProjectDetails(id: Project["_id"]) {

    try {
        const { data } = await api(`/projects/${id}`)
        const result = projectSchema.safeParse(data)
        if (result.success) {
            return result.data
        }

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

type ProjectIdType = {
    formData: ProjectFormData
    projectId: Project["_id"]
}

export async function updateProject({ formData, projectId }: ProjectIdType) {
    try {
        console.log(projectId)
        const { data } = await api.put(`/projects/${projectId}`, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }

    }

}


export async function deleteProject(id: Project["_id"]) {

    try {
        const { data } = await api.delete(`/projects/${id}`)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}
