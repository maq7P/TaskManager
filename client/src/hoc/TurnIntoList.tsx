const TurnIntoList = (
    text: any
): string => {
    console.log('это Пришло: ', text);
        if(text.trim() === '') return '<ul><li></li></ul>'

        let testEmpty = text
        testEmpty = testEmpty.replace(/<div>|<br>|<\/div>/g, '')
        console.log('Это empty: ', !!testEmpty, testEmpty);
        
        if(!testEmpty) return '<ul><li></li></ul>'

        text = text
        .replace(/<div>/g, '<li>')
        .replace(/<\/div>/g, '</li>')
    
    return (
        `<ul>${text}</ul>`
    )
}

export default TurnIntoList