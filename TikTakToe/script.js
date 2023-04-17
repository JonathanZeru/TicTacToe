let X_Class = 'x'
let Circle_Class = 'circle'
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
let circleTurn
const winnersMessage = document.querySelector('[data-winning-message-text]')
const winnersMessageElement = document.getElementsByClassName('winning-message')
const restart = document.getElementById('restartButton')
restart.addEventListener('click', startGame)
const Wining_Comb = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

startGame()
function startGame(){

    circleTurn = false
    cellElements.forEach(cell=>{
        cell.classList.remove(X_Class)
        cell.classList.remove(Circle_Class)
        cell.removeEventListener('click',handleClick)
        cell.addEventListener('click', handleClick, {once:true})
    })
    setBoardHoaverClass()
    winnersMessageElement.classList.remove('show')
}

function handleClick(e){
    const cell = e.target
    const currentClass = circleTurn ? Circle_Class : X_Class
    placeMark(cell,currentClass)
    if(checkWin(currentClass)){
        endGame(false)
    }
    else if(isDraw()){
        endGame(true)
    }
    else{
        swapTruns()
        setBoardHoaverClass()
    }
}


function placeMark(cell,currentClass){
    cell.classList.add(currentClass)
}

function swapTruns(){
    circleTurn = !circleTurn
}

function setBoardHoaverClass(){
    board.classList.remove(X_Class)
    board.classList.remove(Circle_Class)
    if(circleTurn){
        board.classList.add(Circle_Class)
    }
    else{
        board.classList.add(X_Class)
    }
}

function checkWin(currentClass){
return Wining_Comb.some(combination=>{
    return combination.every(index=>{
        return cellElements[index].classList.contains(currentClass)
    })
})
}
function endGame(draw){
    if(draw){
        alert( "Draw")
        startGame()
    }else{
        alert( `${circleTurn ? "O's" : "X's"} Wins!`)
        winnersMessage.innerText = `${circleTurn ? "X's" : "O's"} Wins!`
        startGame()
        
    }
    winnersMessageElement.classList.add('show')

}
function isDraw(){
    return [...cellElements].every(cell=>{
       return cell.classList.contains(X_Class) || 
        cell.classList.contains(Circle_Class)
    })
}