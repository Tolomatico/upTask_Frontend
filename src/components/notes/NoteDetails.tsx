import { useAuth } from "@/hooks/useAuth"
import { deleteNote } from "@/services/NoteApi"
import { Note } from "@/types/index"
import { formatDate } from "@/utils/utils"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useMemo } from "react"
import { useLocation, useParams } from "react-router-dom"
import { toast } from "react-toastify"

type NoteDetailsProps = {
    note: Note
}

export default function NoteDetails({ note }: NoteDetailsProps) {

    const { data, isLoading } = useAuth()
    const canDelete = useMemo(() => data?._id === note.createdBy._id, [data])

    const location=useLocation()
    const queryParams=new URLSearchParams(location.search)
    const taskId=queryParams.get("viewTask")!
    const params=useParams()
    const projectId=params.projectId!
    const queryclient=useQueryClient()

    const {mutate}=useMutation({
        mutationFn:deleteNote,
        onError:(error)=>{
            toast.error(error.message)
        },
        onSuccess:(data)=>{
            queryclient.invalidateQueries({queryKey:["task",taskId]})
            toast.success(data)
        }
 } )

  

    if (isLoading) return "Cargando..."
    return (
        <div className="p-3 flex justify-between items-center">
            <div>
                <p>
                    {note.content} por: <span className="font-bold">{" "}{note.createdBy.name}</span>
                </p>

                <p className="text-sm text-gray-500">
                    {formatDate(note.createdAt)}
                </p>
            </div>
            {
                canDelete &&
                <button
                type="button"
                className="bg-red-400 hover:bg-red-500 p-2 text-xs text-white font-bold cursor-pointer transition-colors" 
                onClick={()=>mutate({projectId,taskId,noteId:note._id})}
                >Eliminar</button>
            }

        </div>

    )
}
