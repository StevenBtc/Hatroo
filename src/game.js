/**
 * This class is part of the "Zorld of Wuul" application.
 * "Zorld of Wuul" is a very simple, text based adventure game.
 *
 * Users can walk around some scenery. That's all. It should really be
 * extended to make it more interesting!
 *
 * To play this game, create an instance of this class and call the "play"
 * method.
 *
 * This main class creates and initialises all the others: it creates all
 * rooms, creates the parser and starts the game.  It also evaluates and
 * executes the commands that the parser returns.
 *
 * @author  Michael Kölling, David J. Barnes and Bugslayer
 * @version 2017.03.30
 */
var Game = (function () {
    /**
     * Create the game and initialise its internal map.
     */
    function Game(output, input) {
        this.parser = new Parser(this, input);
        this.out = new Printer(output);
        this.isOn = true;
        this.createRooms();
        this.printWelcome();
    }
    /**
     * Create all the rooms and link their exits together.
     */
    Game.prototype.createRooms = function () {
        // create the rooms
        var outside = new Room("outside the main entrance of the university");
        var theater = new Room("in a lecture theater");
        var pub = new Room("in the campus pub");
        var lab = new Room("in a computing lab");
        var office = new Room("in the computing admin office");
        // initialise room exits
        outside.setExits(null, theater, lab, pub);
        theater.setExits(null, null, null, outside);
        pub.setExits(null, outside, null, null);
        lab.setExits(outside, office, null, null);
        office.setExits(null, null, null, lab);
        // spawn player outside
        this.currentRoom = outside;
    };
    /**
     * Print out the opening message for the player.
     */
    Game.prototype.printWelcome = function () {
        this.out.println();
        this.out.println("Welcome to the Zorld of Wuul!");
        this.out.println("Zorld of Wuul is a new, incredibly boring adventure game.");
        this.out.println("Type 'help' if you need help.");
        this.out.println();
        this.out.println("You are " + this.currentRoom.description);
        this.out.print("Exits: ");
        if (this.currentRoom.northExit != null) {
            this.out.print("north ");
        }
        if (this.currentRoom.eastExit != null) {
            this.out.print("east ");
        }
        if (this.currentRoom.southExit != null) {
            this.out.print("south ");
        }
        if (this.currentRoom.westExit != null) {
            this.out.print("west ");
        }
        this.out.println();
        this.out.print(">");
    };
    Game.prototype.gameOver = function () {
        this.isOn = false;
        this.out.println("Thank you for playing.  Good bye.");
        this.out.println("Hit F5 to restart the game");
    };
    /**
     * Print out error message when user enters unknown command.
     * Here we print some erro message and a list of the
     * command words.
     *
     * @param params array containing all parameters
     * @return true, if this command quits the game, false otherwise.
     */
    Game.prototype.printError = function (params) {
        this.out.println("I don't know what you mean...");
        this.out.println();
        this.out.println("Your command words are:");
        this.out.println("   go quit help");
        return false;
    };
    /**
     * Print out some help information.
     * Here we print some stupid, cryptic message and a list of the
     * command words.
     *
     * @param params array containing all parameters
     * @return true, if this command quits the game, false otherwise.
     */
    Game.prototype.printHelp = function (params) {
        if (params.length > 0) {
            this.out.println("Help what?");
            return false;
        }
        this.out.println("You are lost. You are alone. You wander");
        this.out.println("around at the university.");
        this.out.println();
        this.out.println("Your command words are:");
        this.out.println("   go quit help");
        return false;
    };
    /**
     * Try to go in one direction. If there is an exit, enter
     * the new room, otherwise print an error message.
     *
     * @param params array containing all parameters
     * @return true, if this command quits the game, false otherwise.
     */
    Game.prototype.goRoom = function (params) {
        if (params.length == 0) {
            // if there is no second word, we don't know where to go...
            this.out.println("Go where?");
            return;
        }
        var direction = params[0];
        // Try to leave current room.
        var nextRoom = null;
        switch (direction) {
            case "north":
                nextRoom = this.currentRoom.northExit;
                break;
            case "east":
                nextRoom = this.currentRoom.eastExit;
                break;
            case "south":
                nextRoom = this.currentRoom.southExit;
                break;
            case "west":
                nextRoom = this.currentRoom.westExit;
                break;
        }
        if (nextRoom == null) {
            this.out.println("There is no door!");
        }
        else {
            this.currentRoom = nextRoom;
            this.out.println("You are " + this.currentRoom.description);
            this.out.print("Exits: ");
            if (this.currentRoom.northExit != null) {
                this.out.print("north ");
            }
            if (this.currentRoom.eastExit != null) {
                this.out.print("east ");
            }
            if (this.currentRoom.southExit != null) {
                this.out.print("south ");
            }
            if (this.currentRoom.westExit != null) {
                this.out.print("west ");
            }
            this.out.println();
        }
        return false;
    };
    /**
     * "Quit" was entered. Check the rest of the command to see
     * whether we really quit the game.
     *
     * @param params array containing all parameters
     * @return true, if this command quits the game, false otherwise.
     */
    Game.prototype.quit = function (params) {
        if (params.length > 0) {
            this.out.println("Quit what?");
            return false;
        }
        else {
            return true; // signal that we want to quit
        }
    };
    return Game;
}());
