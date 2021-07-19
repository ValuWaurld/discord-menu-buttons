const { DMChannel, TextChannel, MessageEmbed } = require('discord.js');
const Page = require('./Page');
const Button = require('./Button');
const channelPermissions = ['SEND_MESSAGES', 'EMBED_LINKS'];

/**
 * The Menu that will be displayed
 */

class Menu {

    /**
     * 
     * @param {DMChannel|TextChannel} channel The channel where the Menu will be initialized.
     * @param {String|null} target The target of the Menu, if any.
     * @param {Object[]} pages The Pages of the Menu.
     * @param {String} pages.name The name of the page.
     * @param {String|MessageEmbed} pages.content The content of the page.
     * @param {Button[]} pages.buttons The buttons of the page.
     * @param {Number} time The time, in milliseconds, after which the Menu will be closed if not any clicking are valid.
     * @param {Boolean} deleted If the Menu will be deleted after the stored time.
     */
    constructor(channel, target, pages, time = 2 * 60 * 1000, deleted = true) {
        this.channel = channel;
        this.target = target;
        this.setPages(pages);
        this.time = time;
        this.deleted = deleted;
    }

    /**
     * Add a page to the Menu using an object 
     */
    addPage(page) {
        this.pages.push(new Page(page.name, page.content, page.buttons));
    }

    /**
     * Add multiple pages to the Menu using an array of objects
     */
    addPages(pages) {
        for (const page of pages) {
            this.addPage(page);
        }
    }

    /**
     * Overwrite the existing pages of the Menu using an array of objects
     */
    setPages(pages) {
        this.pages = [];
        this.addPages(pages);
    }

    /**
     * Start the Menu
     */
    start() {
        if (!this.pages[0]) return new Error("[discord-menu-buttons] You are trying to start an empty Menu. Please retry with at least one page in it.");
        this.current = this.pages[0];
        this.page = 1;

        if (!this.channel) {
            this.channel.client.users.cache.get(target).createDM()
            .then(channel => this.channel = channel);
        }
        if (this.channel.type === 'dm') {
            this.channel.send(this.current.toObject())
            .then(message => {
                this.message = message;
                this.awaitButtons();
            })
            .catch(() => console.log("[discord-menu-buttons] The User you are trying to send the Menu to has his DM blocked."));
        } else {
            if (channelPermissions.some(p => !this.channel.permissionsFor(this.channel.client.user.id).has(p))) return new Error("[discord-menu-buttons] Your bot does not have one of the following permissions: " + channelPermissions.join(" | "));
            this.channel.send(this.current.toObject())
            .then(message => {
                this.message = message;
                this.awaitButtons();
            })
            .catch(err => console.log("[discord-menu-buttons] An error has occured while trying to send the Menu into the desired channel.\n", err));
        }

        return this;
    }

    /**
     * Await for a valid button to be pressed by the authorized user(s)
     */
    async awaitButtons() {
        const filter = button => this.target ? this.target === button.clicker.user.id : true;
        const button = (await this.message.awaitButtons(filter, { time: this.time, max: 1})).first();
        if (!button) this.stop();
        else {
            const buttonData = this.current.buttons.find(b => b.custom_id === button.id);
            if (!button.reply.has) button.reply.defer().catch(() => {});
            switch (button.id) {
                case "previous":
                    if (this.page > 1) this.updateMenu(this.page-1);
                    break;
                case "next":
                    if (this.page < this.pages.length) this.updateMenu(this.page+1);
                    break;
                case "start":
                    if (this.page !== 1) this.updateMenu(1);
                    break;
                case "end":
                    if (this.page !== this.pages.length) this.updateMenu(this.pages.length);
                    break;
                case "function":
                    buttonData.function(button, this);
                    break;
                case "delete":
                    this.stop(true);
                    break;
                case "stop":
                    this.stop();
                    break;
            }
        }
    }

    /**
     * Update the Menu with the given page number
     */
    updateMenu(page) {
        this.page = page;
        this.current = this.pages[page-1];
        this.message.edit(this.current.toObject());
        this.awaitButtons();
    }

    /**
     * Stop the Menu and delete it, if forced or initialized
     */
    stop(force) {
        if (force === false || force === true) this.deleted = force;
        if (!this.deleted) {
            const object = this.current.toObject();
            object.components[0].components = object.components[0].components.map(b => {
                b.disabled = true;
                return b;
            })
            this.message.edit(object);
        }
        else if (!this.message.deleted) this.message.delete();
    }
}

module.exports = Menu;