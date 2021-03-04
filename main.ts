scene.setBackgroundColor(9)
let mySprite = sprites.create(img`
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
controller.moveSprite(mySprite)
