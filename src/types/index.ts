import { z } from "zod"

// auth & users //

const authSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    current_password: z.string(),
    password: z.string(),
    password_confirmation: z.string(),
    token: z.string()
})

type Auth = z.infer<typeof authSchema>

export type UserLoginForm = Pick<Auth, "email" | "password">
export type UserRegistrationForm = Pick<Auth, "name" | "email" | "password" | "password_confirmation">
export type ConfirmToken = Pick<Auth, "token">
export type RequestConfirmationCodeForm = Pick<Auth, "email">
export type ForgotPasswordForm = Pick<Auth, "email">
export type NewPasswordForm = Pick<Auth, "password" | "password_confirmation">
export type UpdateCurrentPassword = Pick<Auth, "current_password" | "password" | "password_confirmation">
export type checkPasswordForm = Pick<Auth, "password">
// Users //

export const userSchema = authSchema.pick({
    name: true,
    email: true,

}).extend({
    _id: z.string()
})

export type User = z.infer<typeof userSchema>
export type UserProfileForm = Pick<User, "name" | "email">



// Notes //

const NoteSchema = z.object({
    _id: z.string(),
    content: z.string(),
    createdBy: userSchema,
    task: z.string(),
    createdAt: z.string()
})

export type Note = z.infer<typeof NoteSchema>
export type NoteFormData = Pick<Note, "content">





// Tasks //

export const taskStatusSchema = z.enum(["pending", "onHold", "inProgress", "underReview", "completed"])
export type taskStatus = z.infer<typeof taskStatusSchema>

export const TaskSchema = z.object({
    _id: z.string(),
    name: z.string(),
    project: z.string(),
    status: taskStatusSchema,
    description: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    completedBy: z.array(z.object({
        _id: z.string(),
        user: userSchema,
        status: taskStatusSchema
    })), notes: z.array(NoteSchema.extend({
        createdBy: userSchema
    }))

})
export const taskProjectSchema=TaskSchema.pick({
    _id:true,
    name:true,
    description:true,
    status:true
})
export type Task = z.infer<typeof TaskSchema>
export type TaskFormData = Pick<Task, "name" | "description">
export type TaskProject=z.infer<typeof taskProjectSchema>



// Projects //

export const projectSchema = z.object({
    _id: z.string(),
    projectName: z.string(),
    clientName: z.string(),
    description: z.string(),
    manager: z.string(userSchema.pick({ _id: true })),
    tasks: z.array(taskProjectSchema),
    team:z.array(z.string(userSchema.pick({_id:true})))
})

export const editProjectSchema = projectSchema.pick(
    {
        projectName:true,
        clientName: true,
        description: true,
    }
)
export const dashboardProjectSchema = z.array(
    projectSchema.pick({
        _id: true,
        projectName: true,
        clientName: true,
        description: true,
        manager: true
    })
)

export type Project = z.infer<typeof projectSchema>
export type ProjectFormData = Pick<Project, "clientName" | "projectName" | "description">

// Team //

const teamMembersSchema = userSchema.pick({
    name: true,
    email: true,
    _id: true
})
export const teamMembersSchemaArray = z.array(teamMembersSchema)
export type TeamMember = z.infer<typeof teamMembersSchema>
export type TeamMemberForm = Pick<TeamMember, "email">
