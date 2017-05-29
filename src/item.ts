class Item {
    description : string;

    /*
    * Constructor for objects of class Item
    */
    constructor(newdescription : string) {
        // initialise instance variables
        this.description = newdescription;
    }

    getDescription() : string {
        return this.description;
    }
}