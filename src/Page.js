const { MessageEmbed } = require('discord.js');
const { MessageActionRow } = require('discord-buttons');
const Button = require('./Button');
/**
 * A Page that the Menu will be able to display
 */

class Page {

    /**
     * 
     * @param {String} name The name of the page
     * @param {String|MessageEmbed} content The content of the page
     * @param {Button[]} buttons The buttons that will be displayed with the page, if any.
     */

    constructor(name, content, buttons) {
        this.name = name;
        this.content = content;
        this.buttons = buttons;
    }

    /**
     * Create the object to fit the send function correctly
     * @returns {Object}
     */
    toObject() {
        let object = {};
        if (typeof this.content === 'string') object.content = this.content;
        else object.embed = this.content;
        const row = new MessageActionRow({
            components: this.buttons
        })
        object.components = [ row ];
        return object;
    }
}

module.exports = Page;