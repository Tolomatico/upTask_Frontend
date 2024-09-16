import { Link, Navigate, useNavigate, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getFullProjectDetails} from "@/services/ProjectApi"
import AddTaskModal from "@/components/tasks/addTasksModal"
import TaskList from "@/components/tasks/TaskList"
import EditTaskData from "@/components/tasks/EditTaskData"
import TaskModalDetails from "@/components/tasks/TaskModalDetails"
import { useAuth } from "@/hooks/useAuth"
import { isManager } from "@/utils/policies"
import { useMemo } from "react"


export default function ProjectDetailsView() {

    const { data: user, isLoading: authLoading } = useAuth()
    const navigate = useNavigate()

    const params = useParams()
    const projectId = params.projectId!


    const { data, isLoading, isError } = useQuery({
        queryKey: ["project", projectId],
        queryFn: () => getFullProjectDetails(projectId),
        retry: false,


    })

    const canEdit=useMemo(()=> data?.manager ===user?._id  ,[data,user])



    if (isError) return <Navigate to="/404" />
    if (isLoading && authLoading) return "Cargando..."
    if (data && user)
        return (
            <>

                <h1 className="text-5xl font-black">{data.projectName}</h1>
                <p className="text-2xl font-light text-gray-500 mt-5">{data.description}</p>
                <nav className="my-5 flex gap-3">

                    {
                        isManager(data.manager, user._id) && (
                            <>  <button
                                type="button"
                                className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white
                text-xl font-bold cursor-pointer transition-colors"
                                onClick={() => navigate("?newTask=true")}
                            >
                                Agregar Tarea
                            </button>
                                <Link
                                    to={`team`}
                                    className="bg-purple-600 hover:bg-purple-700 px-10 py-3 text-white
                text-xl font-bold cursor-pointer transition-colors"
                                >
                                    Colaboradores
                                </Link>
                            </>
                        )
                    }


                </nav>
                <TaskList 
                canEdit={canEdit}
                tasks={data.tasks} />
                <AddTaskModal />
                <EditTaskData />
                <TaskModalDetails />
            </>
        )
}

