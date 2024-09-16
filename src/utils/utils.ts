export function formatDate(dateString: string): string {
    const date = new Date(dateString)
    const formated=new Intl.DateTimeFormat("es-ES",{
        year:"numeric",
        month:"long",
        day:"numeric"
    })

    return formated.format(date)
}