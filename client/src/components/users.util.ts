export const activePriority = (
    priorities: object[], 
    priority_title: string| undefined)
: any => (priorities.filter((priority: any) => priority.title === priority_title))[0]

export const activeResponsible = (
    responibles: object[], 
    responible_id: number | string)
: any => (responibles.filter((responible: any) => responible.id === responible_id))[0]