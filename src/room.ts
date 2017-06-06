/**
 * Class Room - a room in an adventure game.
 *
 * This class is part of the "Zorld of Wuul" application. 
 * "Zorld of Wuul" is a very simple, text based adventure game.  
 *
 * A "Room" represents one location in the scenery of the game.  It is 
 * connected to other rooms via exits.  The exits are labelled north, 
 * east, south, west.  For each direction, the room stores a reference
 * to the neighboring room, or null if there is no exit in that direction.
 * 
 * @author  Michael Kölling, David J. Barnes and Bugslayer
 * @version 2017.03.30
 */
class Room {
    description : string;
    items: Array<Item> = [];
    out : Printer;


    northExit : Room;
    southExit : Room;
    eastExit : Room;
    westExit : Room;

    /**
     * Create a room described "description". Initially, it has
     * no exits. "description" is something like "a kitchen" or
     * "an open court yard".
     * @param description The room's description.
     */
    constructor(description : string) {
        this.description = description;
    }
    /**
     * Define the exits of this room.  Every direction either leads
     * to another room or is null (no exit there).
     * @param north The north exit.
     * @param east The east east.
     * @param south The south exit.
     * @param west The west exit.
     */
    setExits(north : Room, east : Room, south : Room, west : Room) : void {
        if(north != null) {
            this.northExit = north;
        }
        if(east != null) {
            this.eastExit = east;
        }
        if(south != null) {
            this.southExit = south;
        }
        if(west != null) {
            this.westExit = west;
        }
    }

    /*
    *   Get items from the room
    */ 

    getItem(index : number) : Item {
        return this.items[index];
    }

    /*
    *   Get items from the room
    */ 


     public findItemByItemNumber(itemNumber : number) : Item
    {
        for (let item of this.items) // iterate through all items
        {
            if (item.itemNumber == itemNumber) {
                return item; // found item
            }
        }
        return null; // item not found
    }

      public findItemByItemNumberAndGrabItemDescription(itemNumber : number) : string
    {
        for (let item of this.items) // iterate through all items
        {
            if (item.itemNumber == itemNumber) {
                var n = item.description.toString();
                return n; // found item
            }
        }
        return null; // item not found
    }
            

    setItem(newItem : Item) {
        this.items.push(newItem)
    }

  public removeItemByItemNumber(itemNumber : number)
    {
        let item = this.findItemByItemNumber(itemNumber);
        if (item != null)
        {
            let indexOfItemInArray = this.items.indexOf(item); // find position of item object in items array
            this.items.splice(indexOfItemInArray, 1); // remove from array
        }
    }

}

 

