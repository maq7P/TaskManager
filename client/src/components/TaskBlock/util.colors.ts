export const defineBgColor = (
        isCompited: boolean, isExpired: boolean, isCancel: boolean
    ): string  => {
    if(isCompited) return '#d1fac4'
    if(!isExpired && !isCancel) return '#fac4c4'
    return '#dbdbdb'
  }
export const defineAvatartSimbol = (
        isCompited: boolean, isExpired: boolean, 
        isCancel: boolean, isWating: boolean
    ): string  => {
    if(isCompited) return '✓'
    if(isCancel) return '✖'
    if(!isExpired) return '!'
    if(isWating) return '⌛'
    return '🚀'
}
export const defineIndicatorColor = (
        isCompited: boolean, isExpired: boolean, 
        isCancel: boolean,
    ): string  => {
    if(isCompited) return 'green'
    if(!isExpired && !isCancel) return 'red'
    return 'grey'
}
export const defineStatusColor = (
        isCompited: boolean, isCancel: boolean
    ): string  => {
    if(isCompited) return 'green'
    if(isCancel) return 'red'
    return 'black'
}