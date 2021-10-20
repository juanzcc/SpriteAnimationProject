import img from "./img.js"

export default class SpriteAnimation{
    images = []
    constructor(fileNameTemplate, numberOfImages, timerCount, state, stopAtEnd) {
        for(let i=1; i<numberOfImages; i++){
            const image = img(fileNameTemplate.replace('?', i))
            this.images.push(image)
        }
        this.timerCount = timerCount
        this.timerCountDefault = this.timerCount
        this.imageIndex = 0
        this.state = state
        this.stopAtEnd = stopAtEnd
    }

    isfor(state){
        return this.state === state
    }

    reset(){ //resetar para a imagem inicial
        this.imageIndex = 0
    }

    getImage(){
        this.#setImageIndex()
        return this.images[this.imageIndex]
    }

    #setImageIndex(){
        this.timerCount--
        if(this.timerCount <= 0 && !this.#shouldStop()){ //para fazer a imagem trocar
            this.timerCount = this.timerCountDefault
            this.imageIndex++
            if(this.imageIndex >= this.images.length){ //para nao sumir a imagem depois de trocar todas
                this.imageIndex = 0
            }
        }
    }

    #shouldStop(){ //para parar na ultima sprite da animação de morte
        return this.stopAtEnd && this.imageIndex === this.images.length - 1;
    }
}