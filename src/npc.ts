/**
 * Class Npc - an entity such as a player or npc in an adventure game.
 *
 * This class is part of the "Hatroo" application. 
 * "Hatroo" is a very simple, text based adventure game.  
 *
 * An "Npc" represents an NPC in the scenery of the game.  It is 
 * placed in a room. 
 * 
 * @author  Steven
 */
class Npc {
    name : string;

    npcLocation : Game;
    isAlive : boolean;

     /**
     * Create the npc.
     */
    
    constructor(name : string) {
        this.name = name;
    }

    /**
     * Define the location of this npc.
     * @param location The location of the npc.
     */

    setLocation(location : Game) : void {
       if (location != null) { 
           this.npcLocation = location;
       }
    }

  
}






