import React from 'react'

const toHTML = (component: string): any => {
    // if(component.match(/<div><br><\/div>/g)){
    //     console.log('НУ попали');
    //     component = component.replace(/<div><br><\/div>/g, ' ')
    // }
    if(component.match(/&nbsp;/g)){
        component = component.replace(/&nbsp;/g, ' ')
    }
    if(component.match(/<ul>/g)){
        component = component.replace(/<ul>|<\/ul>/g, '').trim()
        component = component.replace(/<li>/g, '').trim()
        component = component.replace(/<\/li>/g, '<br>').trim()
        let arrComp = component.split('<br>')
        
        return (
            <div>
                {arrComp.map((item, i) => {
                    if(item.length){
                        return <div key={item}>{item}</div>
                    }
                })}
            </div>
        )
    }
    if(component.match(/<div>/g)){
        component = component.replace(/<div>/g, '<br>').trim()
        component = component.replace(/<\/div>/g, '').trim()
        let arrComp = component.split('<br>')

        return (
            <>
                {arrComp.map((item) => {
                    if(item.length){
                        return <div key={item}>{item}</div>
                    }
                })}
            </>
        )
    }
    return component.trim().replace(/<\/?[^>]+(>|$)/g, "");
}

export default toHTML
