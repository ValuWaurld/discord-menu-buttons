const { MessageButton } = require('discord-buttons');

/**
 * A Button the Page will be able to handle
 */
class Button extends MessageButton {

    constructor(data = {}) {
        super(data);
    }

    /**
     * The function that will be executed when the button will be clicked, if any.
     */
    setFunction(fn) {
        this.function = fn;
        return this;
    }

}

module.exports = Button;