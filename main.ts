namespace SpriteKind {
    export const Tail = SpriteKind.create()
}
function FruitPlaceRandom (fruit: Image, randomX: number, randomY: number) {
    sprNewFruit = sprites.create(fruit, SpriteKind.Food)
    sprNewFruit.setPosition(randomX - randomX % 10 - 5, randomY - randomY % 10 - 5)
}
function snakeSetDirection (direction: string) {
    sprites.setDataString(sprSnake, "direction", direction)
    if (direction == "up") {
        transformSprites.rotateSprite(sprSnake, 270)
    } else if (direction == "down") {
        transformSprites.rotateSprite(sprSnake, 90)
    } else if (direction == "right") {
        transformSprites.rotateSprite(sprSnake, 0)
    } else if (direction == "left") {
        transformSprites.rotateSprite(sprSnake, 180)
    }
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    snakeSetDirection("up")
})
sprites.onDestroyed(SpriteKind.Food, function (sprite) {
    info.changeScoreBy(1)
    FruitPlaceRandom([img`
        . . . . 7 . . . . . 
        . . 5 5 5 5 4 . . . 
        . 5 5 d 5 5 4 4 . . 
        5 5 d 5 5 5 5 4 4 . 
        5 d 5 5 5 5 5 4 4 . 
        5 5 5 5 5 5 5 4 4 . 
        5 5 5 5 5 5 5 4 4 . 
        . 5 5 5 5 5 4 4 . . 
        . . 5 5 5 4 4 . . . 
        . . . 5 4 4 . . . . 
        `, img`
        . . 7 . . . . . . . 
        . . 7 7 . 7 . 7 . . 
        . . . 7 7 7 7 . . . 
        . . 2 2 2 2 2 2 . . 
        . 2 2 4 2 2 2 2 2 . 
        . 2 2 2 2 2 2 2 2 . 
        . . 2 2 2 2 4 2 . . 
        . . 2 2 4 2 2 2 . . 
        . . . 2 2 2 2 . . . 
        . . . . 2 2 . . . . 
        `, img`
        . . . . 7 . . . . . 
        . . 9 9 9 9 6 . . . 
        . 9 9 d 9 9 6 6 . . 
        9 9 d 9 9 9 9 6 6 . 
        9 d 9 9 9 9 9 6 6 . 
        9 9 9 9 9 9 9 6 6 . 
        9 9 9 9 9 9 9 6 6 . 
        . 9 9 9 9 9 6 6 . . 
        . . 9 9 9 6 6 . . . 
        . . . 9 6 6 . . . . 
        `][randint(0, 2)], randint(10, 170), randint(10, 120))
    tailAddSegment(sprites.create(img`
        . . . . . . . . . . 
        . . 4 4 4 4 4 4 . . 
        . 4 . . . . . . 4 . 
        . 4 . . . . . . 4 . 
        . 4 . . . . . . 4 . 
        . 4 . . . . . . 4 . 
        . 4 . . . . . . 4 . 
        . 4 . . . . . . 4 . 
        . . 4 4 4 4 4 4 . . 
        . . . . . . . . . . 
        `, SpriteKind.Tail))
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Tail, function (sprite, otherSprite) {
    game.over(false)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    tailAddSegment(sprites.create(img`
        . . . . . . . . . . 
        . . 4 4 4 4 4 4 . . 
        . 4 . . . . . . 4 . 
        . 4 . . . . . . 4 . 
        . 4 . . . . . . 4 . 
        . 4 . . . . . . 4 . 
        . 4 . . . . . . 4 . 
        . 4 . . . . . . 4 . 
        . . 4 4 4 4 4 4 . . 
        . . . . . . . . . . 
        `, SpriteKind.Tail))
})
function snakeCreate () {
    sprSnake = sprites.create(img`
        . . . 2 2 2 2 2 . . 
        . 2 2 4 4 4 4 4 2 . 
        2 4 4 4 4 4 4 4 4 2 
        4 4 4 1 1 1 1 1 4 2 
        4 4 1 1 1 f f 1 4 2 
        4 4 1 1 1 f f 1 4 2 
        4 4 4 1 1 1 1 1 4 2 
        2 4 4 4 4 4 4 4 4 2 
        . 2 2 4 4 4 4 4 2 . 
        . . . 2 2 2 2 2 . . 
        `, SpriteKind.Player)
    sprites.setDataString(sprSnake, "direction", "right")
    sprites.setDataNumber(sprSnake, "speed", 200)
}
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    snakeSetDirection("left")
})
function tailAddSegment (segment: Sprite) {
    sprTail.push(segment)
    sprTail[sprTail.length - 1].setPosition(snakeBodyPositions[sprTail.length - 1][0], snakeBodyPositions[sprTail.length - 1][1])
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    snakeSetDirection("right")
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    snakeSetDirection("down")
})
function fruitCreate () {
    console.logValue("fruitPlaceRandom At", 0)
    FruitPlaceRandom([img`
        . . . . 7 . . . . . 
        . . 5 5 5 5 4 . . . 
        . 5 5 d 5 5 4 4 . . 
        5 5 d 5 5 5 5 4 4 . 
        5 d 5 5 5 5 5 4 4 . 
        5 5 5 5 5 5 5 4 4 . 
        5 5 5 5 5 5 5 4 4 . 
        . 5 5 5 5 5 4 4 . . 
        . . 5 5 5 4 4 . . . 
        . . . 5 4 4 . . . . 
        `, img`
        . . 7 . . . . . . . 
        . . 7 7 . 7 . 7 . . 
        . . . 7 7 7 7 . . . 
        . . 2 2 2 2 2 2 . . 
        . 2 2 4 2 2 2 2 2 . 
        . 2 2 2 2 2 2 2 2 . 
        . . 2 2 2 2 4 2 . . 
        . . 2 2 4 2 2 2 . . 
        . . . 2 2 2 2 . . . 
        . . . . 2 2 . . . . 
        `, img`
        . . . . 7 . . . . . 
        . . 5 5 5 5 4 . . . 
        . 5 5 d 5 5 4 4 . . 
        5 5 d 5 5 5 5 4 4 . 
        5 d 5 5 5 5 5 4 4 . 
        5 5 5 5 5 5 5 4 4 . 
        5 5 5 5 5 5 5 4 4 . 
        . 5 5 5 5 5 4 4 . . 
        . . 5 5 5 4 4 . . . 
        . . . 5 4 4 . . . . 
        `][randint(0, 2)], randint(10, 170), randint(10, 120))
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    otherSprite.destroy()
})
function snakeAdvance (direction: string, x: number, y: number) {
    snakeBodyPositions.unshift([x, y])
    if (sprites.readDataString(sprSnake, "direction") == "up") {
        sprSnake.y += -10
    } else if (sprites.readDataString(sprSnake, "direction") == "down") {
        sprSnake.y += 10
    } else if (sprites.readDataString(sprSnake, "direction") == "right") {
        sprSnake.x += 10
    } else if (sprites.readDataString(sprSnake, "direction") == "left") {
        sprSnake.x += -10
    }
    for (let index = 0; index <= sprTail.length - 1; index++) {
        sprTail[index].setPosition(snakeBodyPositions[index][0], snakeBodyPositions[index][1])
    }
}
let sprSnake: Sprite = null
let sprNewFruit: Sprite = null
let snakeBodyPositions: number[][] = []
let sprTail: Sprite[] = []
scene.setBackgroundColor(13)
snakeCreate()
snakeSetDirection("right")
fruitCreate()
sprTail = []
snakeBodyPositions = []
game.onUpdateInterval(sprites.readDataNumber(sprSnake, "speed"), function () {
    snakeAdvance(sprites.readDataString(sprSnake, "direction"), sprSnake.x, sprSnake.y)
})
