import img from "./img.js" //importanto o script para gerar a img
import Player from './Player.js' //importanto o script do player

const canvas = document.getElementById("canvas")

const ctx = canvas.getContext('2d')
//verificando as escalas da tela
canvas.width = 1000
canvas.height = 650 

const background = img("bg.png") //colocando a img em uma variavel
const player = new Player()

function game() {
    ctx.drawImage(background, 0, 0, 2000, 1143, 0, 0,2000/1.5,1143/1.5) //chamando a img
    player.draw(ctx) //colocando personagem
}


setInterval(game,1000/60)