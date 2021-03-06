/**
 * This class is part of the "Hatroo" application. 
 * "Hatroo" is a very simple, text based adventure game.  
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
 * @author  Michael Kölling, David J. Barnes and Bugslayer and Steven :)
 * @version 2017.03.30
 */
class Game {
    parser : Parser;
    out : Printer;
    currentRoom : Room;
    isOn : boolean; 
    item : Item;
    itemNumber : string;
    inventory: Array<Item> = [];

    /**
     * Create the game and initialise its internal map.
     */
    constructor(output: HTMLElement, input: HTMLInputElement) {
        this.parser = new Parser(this, input);
        this.out = new Printer(output);
        this.isOn = true;
        this.createRooms();
        this.printWelcome();
    }

    /**
     * Create all the rooms and link their exits together.
     */
    createRooms() : void {
        // create the rooms
        let bedroom = new Room("in your bedroom, it's a mess.");
        let hallway = new Room("in the hallway, pictures of your family adorn the walls.");
        let attic = new Room("in the attic, it smells like spiders in here.");
        let bathroom = new Room("in the bathroom, a huge turd has fallen out of the toilet.");
        let livingRoom = new Room("in the living room, dr. Phil's new show about pimping cars is on.");
        let kitchen = new Room("in the kitchen, your wife is screaming at the vegetables.");
        let backyard = new Room("in the backyard, the weeds have grown so tall a family of orangutans could start living in them.");
        let secretLab = new Room("in the secret lab, pretty sure there might be a pair of X-ray glasses or laserguns in here.");
        let outside = new Room("outside, a pack of dogs is simultaneously shitting in your yard.");
        let neighbourLawn = new Room("in your neighbour's front lawn, Dinkleberg is sitting on a lawn chair. Dinkleberrrrrg.");
        let neighbourLivingRoom = new Room("in your neighbour's living room, dr. Phil's show is still on, the pimped car is looking pretty bangin'");
        let neighbourBedroom = new Room("in your neighbour's bedroom, the neighbour's wife is mad at you for some reason. Something about you not being allowed in here.");
        let gunStore = new Room("in the gun store, there are alot of rooty tooty point-n-shooties for sale");
        let car = new Room("in the car, whereto, guv'na?");
        let homelessShelter = new Room("at the homeless shelter, there are a fuckton of homeless people asking for change.");
        let airport = new Room("at the airport, you should get on a plane and leave.");
        let alley = new Room("in the alley behind the airport, there are only a few homeless here.");

        // initialise room exits
        bedroom.setExits(null, hallway, null, null);
        hallway.setExits(attic, bathroom, livingRoom, bedroom);
        attic.setExits(null, null, hallway, null);
        bathroom.setExits(null, null, null, hallway);
        livingRoom.setExits(hallway, backyard, outside, kitchen);
        kitchen.setExits(null, livingRoom, null, null);
        backyard.setExits(null, secretLab, null, livingRoom);
        secretLab.setExits(null, null, null, backyard);
        outside.setExits(livingRoom, car, gunStore, neighbourLawn);
        neighbourLawn.setExits(null, outside, neighbourLivingRoom, null);
        neighbourLivingRoom.setExits(neighbourLawn, null, neighbourBedroom, null);
        neighbourBedroom.setExits(neighbourLivingRoom, null, null, null);
        gunStore.setExits(outside, null, null, null);
        car.setExits(null, airport, homelessShelter, outside);
        homelessShelter.setExits(car, null, null, null);
        airport.setExits(null, alley, null, car);
        alley.setExits(null, null, null, airport);

        // spawn player in bedroom
        this.currentRoom = bedroom;

        //test inv
        this.inventory.push(new Item(0, 'Airplane ticket to Hawaii'));
      

        //test item in room

        bedroom.setItem(new Item(1, 'Computer'));

    }

    /**
     * Print out the opening message for the player.
     */
    printWelcome() : void {
        this.out.println();
        this.out.println("Rise and shine!");
        this.out.println("Get to airport and leave to win!");
        this.out.println("Type 'help' for a list of commands you can use.");
        this.out.println();
        this.out.println("You are " + this.currentRoom.description);
        this.out.print("Exits: ");
        if(this.currentRoom.northExit != null) {
            this.out.print("north ");
        }
        if(this.currentRoom.eastExit != null) {
            this.out.print("east ");
        }
        if(this.currentRoom.southExit != null) {
            this.out.print("south ");
        }
        if(this.currentRoom.westExit != null) {
            this.out.print("west ");
        }
        this.out.println();
        this.out.print(">");
    }

    gameOver() : void {
        this.isOn = false;
        this.out.println("Thank you for playing.  Good bye.");
        this.out.println("Hit F5 to restart the game");
    }

    /**
     * Print out error message when user enters unknown command.
     * Here we print some error message and a list of the 
     * command words.
     * 
     * @param params array containing all parameters
     * @return true, if this command quits the game, false otherwise.
     */
    printError(params : string[]) : boolean {
        this.out.println("I don't know what you mean...");
        this.out.println();
        this.out.println("Your command words are:");
        this.out.println("look go quit help hatroo inventory");
        return false;
    }

    /**
     * Print out some help information.
     * Here we print some stupid, cryptic message and a list of the 
     * command words.
     * 
     * @param params array containing all parameters
     * @return true, if this command quits the game, false otherwise.
     */
    printHelp(params : string[]) : boolean {
        if(params.length > 0) {
            this.out.println("Help what?");
            return false;
        }
        this.out.println("Let me help you out.");
        this.out.println();
        this.out.println("Your command words are:");
        this.out.println("'go' you can use this to move about.");
        this.out.println("'quit', if you want to quit the game.");
        this.out.println("'help', list all of your command words.");
        this.out.println("'look', regain your bearings.");
        this.out.println("'inventory', check your inventory.");
        this.out.println("'leave', fly away");
        this.out.println("'hatroo'");
        return false;
    }

    /** 
     * Try to go in one direction. If there is an exit, enter
     * the new room, otherwise print an error message.
     * 
     * @param params array containing all parameters
     * @return true, if this command quits the game, false otherwise.
     */
    goRoom(params : string[]) : boolean {
        if(params.length == 0) {
            // if there is no second word, we don't know where to go...
            this.out.println("Go where?");
            return;
        }

        let direction = params[0];

        // Try to leave current room.
        let nextRoom = null;
        switch (direction) {
            case "north" : 
                nextRoom = this.currentRoom.northExit;
                break;
            case "east" : 
                nextRoom = this.currentRoom.eastExit;
                break;
            case "south" : 
                nextRoom = this.currentRoom.southExit;
                break;
            case "west" : 
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
            if(this.currentRoom.northExit != null) {
                this.out.print("north ");
            }
            if(this.currentRoom.eastExit != null) {
                this.out.print("east ");
            }
            if(this.currentRoom.southExit != null) {
                this.out.print("south ");
            }
            if(this.currentRoom.westExit != null) {
                this.out.print("west ");
            }
            this.out.println();
        }
        return false;
    }

     /** 
     * Pick up item
     * 
     * @param params array containing all parameters
     * @return true, if this command quits the game, false otherwise.
     */
    pickUpItem(params : string[]) : boolean {
        if(params.length === 0) {
            // if there is no second word, we don't know what to pick up...
            this.out.println("Get what?");
            console.log('Missing a second word');
            return false;
        }

    let item = this.currentRoom.findItemByItemNumberAndGrabItemDescription;

        if (item === null) {
           this.out.println("That item is not here!");
            return false;
        } else {
            //not working as intended yet because it creates a new item instead of pushing existing item
            this.inventory.push(new Item(1, 'Computer'));
            this.currentRoom.removeItemByItemNumber;
            this.out.println("Picked up item");
            return false;
        }
    }

    
    
    /** 
     * "Quit" was entered. Check the rest of the command to see
     * whether we really quit the game.
     * 
     * @param params array containing all parameters
     * @return true, if this command quits the game, false otherwise.
     */
    quit(params : string[]) : boolean {
        if(params.length > 0) {
            this.out.println("Quit what?");
            return false;
        }
        else {
            return true;  // signal that we want to quit
        }
    }

    printDescription(params : string[]) : boolean {

            this.out.println("You look around. you are " + this.currentRoom.description);
            return false;
    }

    printHatroo(params : string[]) : boolean {

            this.out.println("Bless you!");
            return false;
    }

    printCleanUp(params : string[]) : boolean {

            this.out.println("lol nah");
            return false;
    }

    printBitcoin(params : string[]) : boolean {

            this.out.println("Fuck yeah.");
            return false;
    }

    //get description of items in inventory

     printInventory(params : Item[]) : boolean {

            if(this.inventory.length > 0) {
                this.out.print("You open your backpack, it contains:");
                this.out.println();
                this.out.println();
                this.inventory.forEach(item => {
                    this.out.println('- ' + item.getDescription() + '\n');
                });
                this.out.println();
            } else {
                this.out.println("If you stare into the backpack long enough the backpack stares back at you. Your backpack is empty.");
            }
            return false;
        }

           //get description of the items in a room

      printRoomItems(params : Item[]) : boolean {

            if(this.currentRoom.items.length > 0) {
                    this.out.println("You look around and see:");
                this.currentRoom.items.forEach(items => {
                    this.out.print('- ' + items.description + '\n');
                    this.out.println();
                });
                this.out.println();
            } else {
                this.out.print("There is nothing here");
            }
            return false;
        }
    
}
        

    

    
