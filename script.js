var start = null
var end = null
var running = false
class Button {
    constructor(id, text, parent) {
        this.id = id
        this.htmlElement = this.createButton(id, text, parent)
        this.styleButton()
        if (id === "homeButton" || id === "dijkstraButton" || id === "astarButton") this.htmlElement.addEventListener("click", this.clickEvent.bind(this))
        else if (id === "wallButton") {
            this.htmlElement.addEventListener("click", this.clickWallEvent.bind(this.htmlElement))
        }
        else {
            this.htmlElement.addEventListener("mousedown", this.mousedownEvent.bind(this.htmlElement))
            this.htmlElement.addEventListener("mouseup", this.mouseupEvent.bind(this.htmlElement))
        }
        if (id === "startButton") this.htmlElement.addEventListener("click", this.clickStartEvent)
        else if (id === "clearButton") this.htmlElement.addEventListener("click", this.clickClearEvent)
        else if (id === "resetButton") this.htmlElement.addEventListener("click", this.clickResetEvent)
    }
    createButton(id, text, parent) {
        let button = document.createElement("div")
        button.appendChild(document.createTextNode(text))
        button.setAttribute("id", id)
        parent.appendChild(button)
        return button
    }
    styleButton() {
        this.htmlElement.style.textAlign = "center"
        this.htmlElement.style.display = "flex"
        this.htmlElement.style.alignItems = "center"
        this.htmlElement.style.width = "70px"
        this.htmlElement.style.height = "70px"
        this.htmlElement.style.padding = "10px"
        this.htmlElement.style.borderRadius = "50%"
        this.htmlElement.style.background = "#e0e0e0"
        this.htmlElement.style.boxShadow = "5px 5px 9px #c5c5c5, -5px -5px 9px #fbfbfb"
        this.htmlElement.style.fontFamily = "Blanka"
        this.htmlElement.style.fontSize = "16px"
        this.htmlElement.style.color = "#dddddd"
        this.htmlElement.style.textShadow = "2px 2px 4px #020202, -2px -2px 4px #ffffff"
    }
    clickEvent() {
        if (running === false) {
            // Push button effect
            document.getElementById("homeButton").style.boxShadow = "5px 5px 10px #c5c5c5, -5px -5px 10px #fbfbfb"
            document.getElementById("dijkstraButton").style.boxShadow = "5px 5px 10px #c5c5c5, -5px -5px 10px #fbfbfb"
            document.getElementById("astarButton").style.boxShadow = "5px 5px 10px #c5c5c5, -5px -5px 10px #fbfbfb"
            this.htmlElement.style.boxShadow = "inset 5px 5px 10px #c5c5c5, inset -5px -5px 10px #fbfbfb"
            //Hide and show content
            if (this.id === "homeButton") {
                document.getElementById("homeDiv").style.display = "flex"
                document.getElementById("algoDiv").style.display = "none"
                document.getElementById("interface").style.display = "none"
            } else {
                document.getElementById("homeDiv").style.display = "none"
                document.getElementById("algoDiv").style.display = "flex"
                document.getElementById("interface").style.display = "block"
            }
        }
    }
    mousedownEvent() {
        if (running === false) this.style.boxShadow = "inset 5px 5px 9px #c5c5c5, inset -5px -5px 9px #fbfbfb"
    }
    mouseupEvent() {
        if (running === false) this.style.boxShadow = "5px 5px 9px #c5c5c5, -5px -5px 9px #fbfbfb"
    }
    clickWallEvent() {
        if (running === false) {
            if (this.style.boxShadow === "rgb(197, 197, 197) 5px 5px 9px, rgb(251, 251, 251) -5px -5px 9px") this.style.boxShadow = "inset 5px 5px 9px #c5c5c5, inset -5px -5px 9px #fbfbfb"
            else this.style.boxShadow = "5px 5px 9px #c5c5c5, -5px -5px 9px #fbfbfb"
        }
    }
}

class Navbar {
    constructor(parent) {
        this.htmlElement = this.createNavbar(parent)
        this.styleNavbar()
        this.addButtons(["homeButton", "dijkstraButton", "astarButton"],["\u00A0\u00A0\u00A0Home", "Dijkstra", "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0A*"])
    }
    createNavbar(parent) {
        var navbar = document.createElement("div")
        parent.appendChild(navbar)
        return navbar
    }
    styleNavbar(){
        this.htmlElement.style.display = "flex"
        this.htmlElement.style.flexDirection = "row"
        this.htmlElement.style.fontSize = "22px"
        this.htmlElement.style.gap = "50px"
        this.htmlElement.style.alignSelf = "center"
    }
    addButtons(ids, text) {
        for (let i = 0; i < text.length; i++){
            var button = new Button(ids[i], text[i], this.htmlElement)
            if (i === 0) button.htmlElement.style.boxShadow = "inset 5px 5px 10px #c5c5c5, inset -5px -5px 10px #fbfbfb"
        }
    }
}

class Header {
    constructor(parent) {
        this.htmlElement = this.createHeader(parent)
        this.styleHeader()
        this.paragraph = this.createParagraph()
        this.navbar = new Navbar(this.htmlElement)
    }
    createHeader(parent) {
        var header = document.createElement("div")
        parent.appendChild(header)
        return header
    }
    styleHeader() {
        this.htmlElement.style.display = "flex"
        this.htmlElement.style.flexDirection = "column"
    }
    createParagraph() {
        var par = document.createElement("p")
        this.htmlElement.appendChild(par)
        var text = document.createTextNode("Algorithm ⚛ Visualizer")
        par.appendChild(text)
        par.style.marginTop = "50px"
        par.style.fontFamily = "Blanka"
        par.style.fontSize = "4em"
        par.style.color = "#dddddd"
        par.style.textShadow = "3px 3px 5px black, -3px -3px 5px #ffffff"
        par.style.wordSpacing = "1em"
        par.style.letterSpacing = "0.5em"
        par.style.alignSelf = "center"
        par.style.textAlign = "center"
        return par
    }
}
class Div {
    constructor(id, parent) {
        this.htmlElement = this.createDiv(id, parent)
        this.styleDiv()
        this.parent = parent
    }
    createDiv(id, parent) {
        let div = document.createElement("div")
        div.setAttribute("id", id)
        parent.appendChild(div)
        return div
    }
    styleDiv() {
        this.htmlElement.style.display = "flex"
        this.htmlElement.style.flexDirection = "row"
        this.htmlElement.style.width = "1000px"
        this.htmlElement.style.height = "500px"
        this.htmlElement.style.borderRadius = "0"
        this.htmlElement.style.backgroundColor = "#e0e0e0"
        this.htmlElement.style.boxShadow = "inset 10px 10px 16px #c7c7c7, inset -10px -10px 16px #f9f9f9"
    }
}
class HomeDiv extends Div {
    constructor(id, parent) {
        super(id, parent)
        this.createImage()
        this.createParagraph()
    }
    createImage() {
        let utilDiv = document.createElement("div")
        this.htmlElement.appendChild(utilDiv)
        utilDiv.style.width = "300px"
        utilDiv.style.height = "450px"
        utilDiv.style.position = "relative"
        utilDiv.style.top = "25px"
        utilDiv.style.marginLeft = "25px"
        let image = document.createElement("img")
        utilDiv.appendChild(image)
        image.setAttribute("src", "images/brain.png")
        image.style.maxWidth = "100%"
        image.style.boxShadow = "0 0 8px 8px #e0e0e0 inset"
    }
    createParagraph() {
        let utilDiv = document.createElement("div")
        this.htmlElement.appendChild(utilDiv)
        utilDiv.style.display = "flex"
        utilDiv.style.flexDirection = "column"
        utilDiv.style.justifyContent = "space-evenly"
        utilDiv.style.width = "600px"
        utilDiv.style.textAlign = "justify"
        utilDiv.style.fontFamily = "Nunito"
        let text = document.createTextNode("\u00A0\u00A0\u00A0\u00A0\u00A0The concept of algorithm has existed since antiquity. Arithmetic algorithms, such as a division algorithm, were used by ancient Babylonian mathematicians c. 2500 BC and Egyptian mathematicians c. 1550 BC. Greek mathematicians later used algorithms in 240 BC in the sieve of Eratosthenes for finding prime numbers, and the Euclidean algorithm for finding the greatest common divisor of two numbers. Arabic mathematicians such as al-Kindi in the 9th century used cryptographic algorithms for code-breaking, based on frequency analysis.")
        let par = document.createElement("p")
        par.appendChild(text)
        utilDiv.appendChild(par)
        text = document.createTextNode("\u00A0\u00A0\u00A0\u00A0\u00A0In mathematics and computer science, an algorithm is a finite sequence of well-defined instructions, typically used to solve a class of specific problems or to perform a computation.")
        par = document.createElement("p")
        par.appendChild(text)
        utilDiv.appendChild(par)
        text = document.createTextNode("\u00A0\u00A0\u00A0\u00A0\u00A0In contrast, a heuristic is an approach to problem solving that may not be fully specified or may not guarantee correct or optimal results, especially in problem domains where there is no well-defined correct or optimal result.")
        par = document.createElement("p")
        par.appendChild(text)
        utilDiv.appendChild(par)
    }
}
class Cell {
    constructor(parent, ij) {
        this.htmlElement = document.createElement("div")
        parent.appendChild(this.htmlElement)
        this.styleCell()
        this.ij = ij
        this.visited = false
        this.wall = false
        this.parent = null
        this.totalCost = 0
        this.distanceToGoal = 0
    }
    styleCell() {
        this.htmlElement.setAttribute("class", "cells")
        this.htmlElement.style.display = "inline-block"
        this.htmlElement.style.width = "30px"
        this.htmlElement.style.height = "30px"
        this.htmlElement.style.margin = "2px"
        this.htmlElement.style.borderRadius = "16px"
        this.htmlElement.style.backgroundColor = "#e0e0e0"
        this.htmlElement.style.boxShadow = "6px 6px 12px #bebebe, -6px -6px 12px #ffffff"
        this.htmlElement.addEventListener("click", this.click.bind(this))
        this.htmlElement.addEventListener("mouseover", this.hover.bind(this))
        this.htmlElement.addEventListener("mouseout", this.leave.bind(this))
    }
    click() {
        if (running === false) {
            var keyframes = [
                {transform: 'scale(1.2)'},
                {transform: 'scale(0.8)'},
                {transform: 'scale(1)'}]
            var timing = {duration: 900, easing: 'ease-out', iterations: 1}
            if (start === null && this.wall === false && this !== end) {
                start = this
                this.htmlElement.style.backgroundColor = "#b63838"
            } else if (end === null && this.wall === false && this !== start) {
                end = this
                this.htmlElement.style.backgroundColor = "teal"
            } else if (start === this) {
                start = null
                this.htmlElement.style.backgroundColor = "#e0e0e0"
            } else if (this === end) {
                end = null
                this.htmlElement.style.backgroundColor = "#e0e0e0"
            } else if (this.wall === true) {
                this.wall = false
                this.htmlElement.style.backgroundColor = "#e0e0e0"
            } else if (this !== start && this !== end && this.wall === false) {
                this.wall = true
                this.htmlElement.style.backgroundColor = "#da8a67"
            }
            this.htmlElement.animate(keyframes, timing)
        }
    }
    hover(){
        if (running === false) {
            if (document.getElementById("wallButton").style.boxShadow === "rgb(197, 197, 197) 5px 5px 9px, rgb(251, 251, 251) -5px -5px 9px") {
                this.htmlElement.style.boxShadow = "inset 6px 6px 12px #bebebe, inset -6px -6px 12px #ffffff"
            } else {
                if (this !== start && this !== end && this.wall !== "#da8a67"){
                    this.htmlElement.style.backgroundColor = "#da8a67"
                    this.wall = true
                }
            }
            var keyframes = [
                {transform: 'scale(1.2)'},
                {transform: 'scale(0.8)'},
                {transform: 'scale(1)'}]
            var timing = {duration: 900, easing: 'ease-out', iterations: 1}
            this.htmlElement.animate(keyframes, timing)
        }
    }
    leave() {
        if (running === false) this.htmlElement.style.boxShadow = "6px 6px 12px #bebebe, -6px -6px 12px #ffffff"
    }
}
class AlgoDiv extends Div {
    constructor(id, parent) {
        super(id, parent)
        this.cells = []
        this.createMatrix()
    }
    createMatrix() {
        var utilDiv = document.createElement("div")
        this.htmlElement.appendChild(utilDiv)
        utilDiv.style.position = "relative"
        utilDiv.style.left = "50px"
        utilDiv.style.top = "50px"
        utilDiv.style.height = "400px"
        utilDiv.style.width = "900px"
        utilDiv.style.backgroundColor = "#e0e0e0"
        for (let i = 0; i < 11; i++) {
            for (let j = 0; j < 26; j++) {
                this.cells.push(new Cell(utilDiv, [i,j]))
            }
        }
    }
}

class Main {
    constructor() {
        this.htmlElement = this.createMain()
        this.styleMain()
        this.homeDiv = new HomeDiv("homeDiv", this.htmlElement)
        this.algoDiv = new AlgoDiv("algoDiv", this.htmlElement)
        this.algoDiv.htmlElement.style.display = "none"
        this.addButtons(["startButton", "clearButton", "resetButton", "wallButton"],["\u00A0\u00A0\u00A0Start", "\u00A0\u00A0\u00A0Clear", "\u00A0\u00A0\u00A0Reset", "\u00A0\u00A0\u00A0Wall"])
    }
    addButtons(ids, text) {
        var utilDiv = document.createElement("div")
        utilDiv.setAttribute("id", "interface")
        utilDiv.style.display = "none"
        utilDiv.style.position = "relative"
        utilDiv.style.left = "50px"
        this.htmlElement.appendChild(utilDiv)
        for (let i = 0; i < text.length; i++) {
            var but = new Button(ids[i], text[i], utilDiv)
            but.htmlElement.style.marginTop = "30px"
            if (ids[i] === "startButton") but.htmlElement.addEventListener("click", this.startEvent.bind(this))
            if (ids[i] === "clearButton") but.htmlElement.addEventListener("click", this.clearEvent.bind(this))
            if (ids[i] === "resetButton") but.htmlElement.addEventListener("click", this.resetEvent.bind(this))
        }
    }
    createMain() {
        let main = document.createElement("div")
        document.body.append(main)
        return main
    }
    styleMain() {
        this.htmlElement.style.display = "flex"
        this.htmlElement.style.width = "100%"
        this.htmlElement.style.height = "100%"
        this.htmlElement.style.justifyContent = "center"
        this.htmlElement.style.alignItems = "center"
    }
    startEvent() {
        if (running === false) {
            if (document.getElementById("dijkstraButton").style.boxShadow === "rgb(197, 197, 197) 5px 5px 10px inset, rgb(251, 251, 251) -5px -5px 10px inset") {
                let visitedAndSolution = this.dijkstra()
                this.draw(visitedAndSolution[0], visitedAndSolution[1])
            } else if (document.getElementById("astarButton").style.boxShadow === "rgb(197, 197, 197) 5px 5px 10px inset, rgb(251, 251, 251) -5px -5px 10px inset") {
                let visitedAndSolution = this.astar()
                this.draw(visitedAndSolution[0], visitedAndSolution[1])
            }
        }
    }
    draw(cellsPath, cellsSolution){
        running = true
        var visitedKeyframes = [
            {transform: 'scale(1.3)', background: '#b63838'},
            {transform: 'scale(0.7)', background: '#de9595'},
            {transform: 'scale(1)', background: '#cd5c5c'}]
        var visitedEndKeyframes = [
            {transform: 'scale(1.3)'},
            {transform: 'scale(0.7)'},
            {transform: 'scale(1)'}]
        var solutionKeyframes = [
            {transform: 'scale(1.3)', background: '#38b6b6'},
            {transform: 'scale(0.7)', background: '#95dede'},
            {transform: 'scale(1)', background: '#5ccdcd'}]
        var solutionEndKeyframes = [
            {transform: 'scale(1.3)'},
            {transform: 'scale(0.7)'},
            {transform: 'scale(1)'}]
        var timing = {duration: 900, easing: 'ease-out', iterations: 1}
        var visitedIndex = 1
        var solutionIndex = 0
        var result = setInterval(function(){
            if (visitedIndex === cellsPath.length-1) {
                cellsPath[visitedIndex++].htmlElement.animate(visitedEndKeyframes, timing)
            }
            else {
                cellsPath[visitedIndex].htmlElement.style.backgroundColor = '#cd5c5c'
                cellsPath[visitedIndex++].htmlElement.animate(visitedKeyframes, timing)
            }
            if (visitedIndex === cellsPath.length) {
                clearInterval(result)
                let result2 = setInterval(function(){
                    if (solutionIndex === cellsSolution.length-1) {
                        cellsSolution[solutionIndex++].htmlElement.animate(solutionEndKeyframes, timing)
                    }
                    else {
                        cellsSolution[solutionIndex].htmlElement.style.backgroundColor = '#5ccdcd'
                        cellsSolution[solutionIndex++].htmlElement.animate(solutionKeyframes, timing)
                    }
                    if (solutionIndex === cellsSolution.length) {
                        clearInterval(result2)
                        running = false
                    }
                }, 100)
            }
        }, 100)
    }
    clearEvent() {
        if (running === false) {
            var timing = {duration: 500, easing: 'ease-out', iterations: 1}
            var cells = this.algoDiv.cells
            for (let j = 0; j < cells.length; j++) {
                if (cells[j].wall === false && cells[j] !== start && cells[j] !== end) {
                    var keyframes = [{background: "#e0e0e0"}]
                    cells[j].htmlElement.animate(keyframes, timing).addEventListener("finish", function () {
                        cells[j].htmlElement.style.backgroundColor = "#e0e0e0"
                    })
                }
                cells[j].visited = false
                cells[j].distanceToGoal = 0
            }
        }
    }
    resetEvent() {
        if (running === false) {
            var keyframes = [{background: "#e0e0e0"}]
            var timing = {duration: 500, easing: 'ease-out', iterations: 1}
            var cells = this.algoDiv.cells
            for (let j = 0; j < cells.length; j++) {
                if (cells[j].wall === true || cells[j] === start || cells[j] === end || cells[j].htmlElement.backgroundColor !== "#e0e0e0"){
                    cells[j].htmlElement.animate(keyframes, timing).addEventListener("finish", function () {
                        cells[j].htmlElement.style.backgroundColor = "#e0e0e0"
                        cells[j].wall = false
                    })
                }
                cells[j].visited = false
                cells[j].distanceToGoal = 0
            }
            start = null
            end = null
        }
    }
    dijkstra() {
        var flag = false
        // Init all cells with positive infinite excepting the starting cell
        var cells = this.algoDiv.cells
        var visitedCells = []
        var solutionCells = []
        var rows = 11
        var cols = 26
        for (let i = 0; i < cells.length; i++) {
            cells[i].totalCost = 99999
        }
        start.totalCost = 0
        var queue = [start]
        while (queue) {
            if (flag === true) break
            // Pop the min elements from the queue
            var currentNode = queue[0]
            var index = 0
            for (let i = 0; i < queue.length; i++) {
                if (queue[i].totalCost < currentNode.totalCost) {
                    index = i
                    currentNode = queue[i]
                }
            }
            queue.splice(index, 1)
            currentNode.visited = true
            visitedCells.push(currentNode)
            if (currentNode === end) {
                flag = true
                while (currentNode !== start && currentNode !== null) {
                    currentNode = currentNode.parent
                    solutionCells.push(currentNode)
                }
            }
            var neighbors = []
            var ij = currentNode.ij
            if (ij[0] > 0 && cells[(ij[0]-1)*cols + ij[1]].visited === false && cells[(ij[0]-1)*cols + ij[1]].wall === false) neighbors.push(cells[(ij[0]-1)*cols + ij[1]])
            if (ij[0] < 10 && cells[(ij[0]+1)*cols +ij[1]].visited === false && cells[(ij[0]+1)*cols +ij[1]].wall === false) neighbors.push(cells[(ij[0]+1)*cols +ij[1]])
            if (ij[1] > 0 && cells[ij[0]*cols + ij[1]-1].visited === false && cells[ij[0]*cols + ij[1]-1].wall === false) neighbors.push(cells[ij[0]*cols + ij[1]-1])
            if (ij[1] < 25 && cells[ij[0]*cols + ij[1]+1].visited === false && cells[ij[0]*cols + ij[1]+1].wall === false) neighbors.push(cells[ij[0]*cols + ij[1]+1])
            for (let i = 0; i < neighbors.length; i++) {
                if (currentNode.totalCost + 1 < neighbors[i].totalCost) {
                    neighbors[i].totalCost = currentNode.totalCost+1
                    neighbors[i].parent = currentNode
                }
                if (queue.includes(neighbors[i], 0) === false) queue.push(neighbors[i])
            }
        }
        return [visitedCells, solutionCells]
    }
    astar() {
        var flag = false
        // Init all cells with positive infinite excepting the starting cell
        var cells = this.algoDiv.cells
        var visitedCells = []
        var solutionCells = []
        var rows = 11
        var cols = 26
        for (let i = 0; i < cells.length; i++) {
            cells[i].totalCost = 99999
        }
        start.totalCost = 0
        var queue = [start]
        // Compute the distances
        for (let i = 0; i < cells.length; i++) {
            let xEndCell = end.htmlElement.getBoundingClientRect().left + window.scrollX
            let yEndCell = end.htmlElement.getBoundingClientRect().top + window.scrollY
            let xCurrentCell = cells[i].htmlElement.getBoundingClientRect().left + window.scrollX
            let yCurrentCell = cells[i].htmlElement.getBoundingClientRect().top + window.scrollY
            cells[i].distanceToGoal = Math.sqrt(Math.pow(xEndCell - xCurrentCell, 2)+Math.pow(yEndCell-yCurrentCell,2))
        }
        // Algorithm loop
        while (queue) {
            if (flag === true) break
            // Pop the min elements from the queue
            var currentNode = queue[0]
            var index = 0
            for (let i = 0; i < queue.length; i++) {
                if (queue[i].totalCost + queue[i].distanceToGoal < currentNode.totalCost + currentNode.distanceToGoal) {
                    index = i
                    currentNode = queue[i]
                }
            }
            queue.splice(index, 1)
            currentNode.visited = true
            visitedCells.push(currentNode)
            if (currentNode === end) {
                flag = true
                while (currentNode !== start && currentNode !== null) {
                    currentNode = currentNode.parent
                    solutionCells.push(currentNode)
                }
            }
            var neighbors = []
            var ij = currentNode.ij
            if (ij[0] > 0 && cells[(ij[0]-1)*cols + ij[1]].visited === false && cells[(ij[0]-1)*cols + ij[1]].wall === false) neighbors.push(cells[(ij[0]-1)*cols + ij[1]])
            if (ij[0] < 10 && cells[(ij[0]+1)*cols +ij[1]].visited === false && cells[(ij[0]+1)*cols +ij[1]].wall === false) neighbors.push(cells[(ij[0]+1)*cols +ij[1]])
            if (ij[1] > 0 && cells[ij[0]*cols + ij[1]-1].visited === false && cells[ij[0]*cols + ij[1]-1].wall === false) neighbors.push(cells[ij[0]*cols + ij[1]-1])
            if (ij[1] < 25 && cells[ij[0]*cols + ij[1]+1].visited === false && cells[ij[0]*cols + ij[1]+1].wall === false) neighbors.push(cells[ij[0]*cols + ij[1]+1])
            for (let i = 0; i < neighbors.length; i++) {
                if (currentNode.totalCost + 1 < neighbors[i].totalCost) {
                    neighbors[i].totalCost = currentNode.totalCost+1
                    neighbors[i].parent = currentNode
                }
                if (queue.includes(neighbors[i], 0) === false) queue.push(neighbors[i])
            }
        }
        return [visitedCells, solutionCells]
    }
}
class Footer {
    constructor() {
        this.htmlElement = this.createFooter()
        this.styleFooter()
    }
    createFooter() {
        let footer = document.createElement("div")
        let text = document.createTextNode("©2022 Chiper Adrian Gabriel")
        footer.appendChild(text)
        document.body.appendChild(footer)
        return footer
    }
    styleFooter(){
        this.htmlElement.style.marginTop = "50px"
        this.htmlElement.style.fontFamily = "Blanka"
        this.htmlElement.style.fontSize = "1em"
        this.htmlElement.style.color = "#e0e0e0"
        this.htmlElement.style.textShadow = "2px 2px 4px #020202, -2px -2px 4px #ffffff"
        this.htmlElement.style.wordSpacing = "1em"
        this.htmlElement.style.letterSpacing = "0.5em"
        this.htmlElement.style.textAlign = "center"
    }
}
class Page {
    constructor() {
        this.header = new Header(document.body)
        this.main = new Main(document.body)
        this.footer = new Footer(document.body)
        this.styleBody()
    }
    styleBody() {
        document.body.style.display = "flex"
        document.body.style.height = "95vh"
        document.body.style.flexDirection = "column"
        document.body.style.justifyContent = "space-between"
        document.body.style.backgroundColor = "#e0e0e0"
        document.body.style.cursor = "crosshair"
    }
}

var page = new Page()
