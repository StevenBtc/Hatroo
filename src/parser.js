/**
 * This class is part of the "Zorld of Wuul" application.
 * "Zorld of Wuul" is a very simple, text based adventure game.
 *
 * This parser reads user input and tries to interpret it as an "Adventure"
 * command. Every time it is called it reads a line from the terminal and
 * tries to interpret the line as a two word command.
 *
 * The parser has a set of known command words. It checks user input against
 * the known commands, and invokes a relevant method on the Game object.
 *
 * @author  Michael Kölling, David J. Barnes and Bugslayer
 * @version 2017.03.30
 */
var Parser = (function () {
    /**
     * Creates the parser object.
     *
     * @param game the game object to prse commands for
     * @param input the HTMLInputElement to parse the value from
     */
    function Parser(game, input) {
        var _this = this;
        this.game = game;
        this.input = input;
        input.onkeyup = function (e) {
            if (e.keyCode == 13 && _this.game.isOn) {
                // Invoke parse method wehen user pressed enter
                var command = _this.input.value;
                _this.game.out.println(command);
                _this.parse(command.split(" "));
                _this.input.value = ""; // clears the input element 
                _this.game.out.print(">");
            }
        };
    }
    /**
     * Parses the specified words and invokes the corresponding method
     * on the game object.
     *
     * @param words an array of words to parse
     */
    Parser.prototype.parse = function (words) {
        var wantToQuit = false;
        var params = words.slice(1);
        switch (words[0]) {
            case "":
                // Do nothing when user enters nothing 
                break;
            case "help":
                wantToQuit = this.game.printHelp(params);
                break;
            case "go":
                wantToQuit = this.game.goRoom(params);
                break;
            case "quit":
                wantToQuit = this.game.quit(params);
                break;
            default:
                // print an error when command is not known
                wantToQuit = this.game.printError(params);
        }
        if (wantToQuit) {
            this.input.disabled = true;
            this.game.gameOver();
        }
    };
    return Parser;
}());
