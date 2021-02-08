interface ListItem {
    id: number
}

export const scrollProgress = (callback: (progress: number) => void):void => {
    const scrollHeight = document.body.clientHeight
    const progressScroll = window.pageYOffset
    const viewPart = window.innerHeight
    
    callback(Math.round((progressScroll + viewPart) / scrollHeight * 100))
    if(progressScroll === 0){
        callback(0)
    }
}

// yyyy/mm/dd msk time zone
const msk = '3'
export const today = (format: string = msk): string | Date => {
    //console.log(addToDate(new Date('2021-02-03 21:45:19')), 'MYYY');
    
    return addToDate(new Date().toJSON()).slice(0,10).replace(/-/g,'/')
}

export const normalizeServerDate = (
        date: Date | string | number
    ): string => {
    return reverseString(new Date(date)
        .toLocaleDateString('ru-RU'), '.', '-')
}

// check defrence with date and return if now less deadline
export const isDeadlinePositive = (deadline: Date | string ): boolean => {
    const dead = Date.parse(JSON.stringify(deadline))
    let now: any = normalizeServerDate(new Date(today()))
    now = Date.parse(JSON.stringify(now))
    if(dead - now >= 0){
        return true
    } else return false
}
export const addToDate = (
    date: string | Date, hours = msk, day = '0', month= '0', year = '0'
): string => {
    const intF1 = (e: Date): string  => {
        return e.getFullYear() 
        + "-" + ('0' + (e.getMonth() + 1)).slice(-2) 
        + "-" + ('0' + e.getDate()).slice(-2)
        + "-" + ('0' + e.getHours()).slice(-2)
    }
    const D = new Date(date)
    D.setFullYear(D.getFullYear() + parseFloat(year), D.getMonth() + parseFloat(month), D.getDate() + parseFloat(day));

    return intF1(D)
}

export function reverseString(
        str: string, 
        splitBy?: string,
        joinBy?: string
    ): string {
    return str.split(`${splitBy}`).reverse().join(`${joinBy}`);
}
export const maxSimbols = (str: string, max: number): string => {
    if(str.length < 15) return str
    return str.slice(0, max) + '...'
}
export const decorateDate = (date: string | Date) => {
    let t = new Date(date)
    
    const Year = t.getFullYear();
    const Month = t.getMonth();
    const Day = t.getDate();
    const fMonth = 
    ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    return `${Day} ${fMonth[Month - 1]} ${Year}`
}
export const cutSimbols = (str: string ): string => {
    return str.replace(/[_-]/, ' ')
}
// export const sortByDate = (arrayOfDate: object[]) => {
//     arrayOfDate.sort(function(a,b){
//         return new Date(b.date) - new Date(a.date);
//     });
// }
