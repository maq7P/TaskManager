const TurnIntoDiv = (
    text: any
): string => {
    console.log('Это пришло в div');
    
    text = text
        .replace(/<ul>|<\/ul>/g, '')
        .replace(/<li>/g, '<div>')
        .replace(/<\/li>/g, '</div>')
    console.log(text);
    if(text.trim() === '<div></div>'){
        return `
            
        `
    }
    return (
        `<div>
            ${text}
        </div>`
    )
}

export default TurnIntoDiv