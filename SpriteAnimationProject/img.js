export default function img(file){
    const img = new Image()
    img.src = 'img/'+file
    return img
}