export const formatName = (name)=>{
    name = name.trim()
    name = name.split(" ")

    let newName = '';
    name.map((text)=>{
        if(text.length > 0){
            let firstChar = text.substring(0,1).toUpperCase()
            let restChars = text.substring(1,text.length)
            newName+= firstChar+restChars+" "
        } 
    })
    return newName.trim()
}