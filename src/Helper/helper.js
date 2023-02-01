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


export const secondsToTimestamp= (seconds)=>{
    seconds = Math.floor(seconds);
    let h = Math.floor(seconds / 3600);
    let m = Math.floor((seconds - (h * 3600)) / 60);
    let s = seconds - (h * 3600) - (m * 60);
    
    // FORMATTING FOR SINGLE DIGIT
    h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;
    return h + ':' + m + ':' + s;
  }