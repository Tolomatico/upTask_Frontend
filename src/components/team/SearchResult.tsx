import { addUserToProject } from "@/services/TeamApi"
import { TeamMember } from "@/types/index"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"

type SearchResultProps={
    user:TeamMember
    reset:()=>void
}


export default function SearchResult({user,reset}:SearchResultProps) {

    const navigate=useNavigate()
    const params=useParams()
    const projectId=params.projectId!
    const queryClient=useQueryClient()
    const {mutate}=useMutation({
        mutationFn:addUserToProject,
        onError:(error)=>{
            toast.error(error.message)
        },
        onSuccess:(data)=>{
            toast.success(data)
            reset()
            queryClient.invalidateQueries({queryKey: ["projectTeam", projectId]})
            navigate(location.pathname,{replace:true})
            
        }
    })

    const addMember=(id:TeamMember["_id"])=>{
       const data={
        projectId,
        id
       }
       mutate(data)
    }

  return (
    <>
    <p className="mt-10 text-center font-bold">Resultado:</p>
    <div className="flex justify-between items-center">
        <p >{user.name}</p>
        <button 
        onClick={()=>addMember(user._id)}
        className="text-purple-600 hover:bg-purple-100 cursor-pointer px-10 py-3 font-bold ">
            Agregar al proyecto
        </button>
    </div>
    </>
  )
}
