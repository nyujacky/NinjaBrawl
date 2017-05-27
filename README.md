## NinjaBrawl

[Live Demo](https://nyujacky.github.io/NinjaBrawl)

NinjaBrawl is a 2D game where two players play against each other and try to shoot each other down. The game ends when either one of the characters is shot down.

## Features and Implementation

### Players

Player versus player is accomplished through a single player class, where separate instances of the player are created and given a unique id. They each have their own parameters, such as `xStartPos`, `yStartPos`, and `faceDirection`.

### Attacks

Each player has their own attacks, made each time the button is pressed, through CreateJS. The attack class creates a separate instance each time the button is pressed, in this case, a `shuriken` is created, unique to a player's `id`.



## Future Directions for the Project

### Lives
### Customizable Characters
### Add obstacles for characters to move around
