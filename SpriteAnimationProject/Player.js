import PlayerStates from "./PlayerStates.js" //importando os status do player
import SpriteAnimation from "./SpriteAnimation.js"

export default class Player{
    constructor(){ //constructor para o player
        this.state = PlayerStates.idle
        this.#createAnimations()
        document.addEventListener("keydown", this.#keydown)
        document.addEventListener("keyup", this.#keyup)
    } 

    draw(ctx){
        this.#setState()
        const animation = this.animations.find((animation)=>animation.isfor(this.state))
        
        const image = animation.getImage()

        const x= 50 //qual parte da tela vai aparecer direita > ou < esquerda
        let y = 170 //qual parte da tela vai aparecer cima /\ ou \/ baixo 
        ctx.drawImage(image, x, y) //colocando a imagem do player na tela
    }

    #setState(){ //coloca a animação
        if(this.deadPressed){
            this.state = PlayerStates.dead
        }
        else if (this.jumpPressed){
            this.state = PlayerStates.jump
        }
        else if (this.runPressed && this.rightPressed){ //quando apertar os dois botões
            this.state = PlayerStates.run
        } 
        else if(this.rightPressed){ //se apertar a seta para direita vai começar a andar
            this.state = PlayerStates.walk
        }
        else{
            this.state = PlayerStates.idle //quando soltar a tecla para de andar e volta pra imagem idle
        }
    }

    #createAnimations(){ //onde cria as animaçõs
        this.idleAnimation = new SpriteAnimation("Idle (?).png", 9,6,PlayerStates.idle)
        this.walkAnimation = new SpriteAnimation("Walk (?).png", 10,6,PlayerStates.walk)
        this.runAnimation = new SpriteAnimation("Run (?).png", 8,6,PlayerStates.run)
        this.jumpAnimation = new SpriteAnimation("Jump (?).png", 12,6,PlayerStates.jump)
        this.deadAnimation = new SpriteAnimation("Dead (?).png", 8,10,PlayerStates.dead, true)
    
        this.animations = [
            this.idleAnimation,
            this.walkAnimation,
            this.runAnimation,
            this.jumpAnimation,
            this.deadAnimation,
        ] //array para guardar todas animações
    }

    #keydown = (event) => { //apertar o botão
        switch (event.code){ //setas para apertar
            case "ArrowRight":
                this.rightPressed = true
                break
            case "ShiftLeft":
                this.runPressed = true
                break
            case "Space":
                this.jumpPressed = true
                break
            case "KeyD":
                this.deadPressed = true;
                break;
            case "KeyR":
                this.deadPressed = false;
                this.deadAnimation.reset();
                break;
        }
    }

    #keyup = (event) => { //parar de apertar o botão
        switch (event.code){
            case "ArrowRight":
                this.rightPressed = false
                break
            case "ShiftLeft":
                this.runPressed = false
                break
            case "Space":
                this.jumpPressed = false
                break
        }
    }
}