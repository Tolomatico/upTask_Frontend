import { NoteFormData } from "@/types/index"
import { useForm } from "react-hook-form"
import ErrorMessage from "../ErrorMessage"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createNote } from "@/services/NoteApi"
import { toast } from "react-toastify"
import { useLocation, useParams } from "react-router-dom"

export default function AddNotesForm() {

    const location=useLocation()
    const queryParams=new URLSearchParams(location.search)
    const taskId=queryParams.get("viewTask")!
    const params=useParams()
    const projectId=params.projectId!
    const queryclient=useQueryClient()

    const initialValues :NoteFormData= {
        content: ""
    }

    const { register, handleSubmit,reset, formState: { errors } } = useForm({ defaultValues: initialValues })
  
    const {mutate}=useMutation({
        mutationFn:createNote,
        onError:(error)=>{
            toast.error(error.message)
        },
        onSuccess:(data)=>{
            queryclient.invalidateQueries({queryKey:["task",taskId]})
            toast.success(data)
            reset()
        }
    })



    const handleCreateNote=(formdata:NoteFormData)=>{

        const data={
            projectId,
            taskId,
            formdata
        }
        mutate(data)
        
    }

    return (
        <form
            onSubmit={handleSubmit(handleCreateNote)}
            className="space-y-3"
            noValidate

        >
            <div className="flex flex-col gap-2">
                <label className="font-bold" htmlFor="content">Crear Nota</label>
                <input
                    type="text"
                    id="content"
                    className="w-full p-3 border border-gray-300"
                    {...register("content",{
                        required:"El contenido de la nota es obligatorio"
                    })}
              />

              { errors.content && (
                <ErrorMessage>{errors.content.message}</ErrorMessage>
              )}
            </div>

            <input
                type="submit"
                value="Crear Nota"
                className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full text-white cursor-pointer font-black p-2"
            />
        </form>
    )
}

