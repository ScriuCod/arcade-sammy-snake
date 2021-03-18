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
    fruitsPlaceOnMap()
    info.changeScoreBy(1)
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
function fruitsPlaceOnMap () {
    let sprFruits: Image[] = []
    sprNewFruit = sprites.create(sprFruits[randint(0, sprFruits.length - 1)], SpriteKind.Food)
    sprNewFruit.setPosition(0, 0)
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    snakeSetDirection("right")
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    snakeSetDirection("down")
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    otherSprite.destroy()
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
})
function snakeAdvance () {
    if (sprites.readDataString(sprSnake, "direction") == "up") {
        sprSnake.y += -10
    } else if (sprites.readDataString(sprSnake, "direction") == "down") {
        sprSnake.y += 10
    } else if (sprites.readDataString(sprSnake, "direction") == "right") {
        sprSnake.x += 10
    } else if (sprites.readDataString(sprSnake, "direction") == "left") {
        sprSnake.x += -10
    }
}
let sprSnake: Sprite = null
let sprNewFruit: Sprite = null
scene.setBackgroundColor(9)
snakeCreate()
snakeSetDirection("right")
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
game.onUpdateInterval(sprites.readDataNumber(sprSnake, "speed"), function () {
    snakeAdvance()
})
