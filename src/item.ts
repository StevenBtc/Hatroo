class Item
{
     itemNumber : number;
     description : string;

    constructor(newnumber : number, newdescription : string)
    {
        this.itemNumber = newnumber;
        this.description = newdescription;
    }

    getDescription() : string {
        return this.description;
    }

    getNumber() : string 
    {
        return this.description + " (" + this.itemNumber + ")";
    }
}