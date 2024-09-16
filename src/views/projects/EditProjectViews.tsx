import { getProjectById } from "@/services/ProjectApi"
import { useQuery } from "@tanstack/react-query"
import { Navigate, useParams } from "react-router-dom"
import EditProjectForm from "./EditProjectForm"

export default function EditProjectViews() {

    const  params=useParams()
    const projectId=params.projectId!


    const {data,isLoading,isError}=useQuery({
        queryKey:["editProject",projectId],
        queryFn:()=>getProjectById(projectId),
        retry:false

    })


if(isError) return <Navigate to="/404"/>
if(isLoading) return "Cargando..." 
if(data) return <EditProjectForm data={data} projectId={projectId}/>
}
