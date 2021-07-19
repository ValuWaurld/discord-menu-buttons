<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li><a href="#about-the-project">Description</a></li>
    <li><a href="#getting-started">Getting Started</a></li>
    <li>
        <a href="#documentation">Documentation</a>
        <ul><a href="#menu">Menu</ul>
        <ul><a href="#button">Button</ul>
    </li>
    <li><a href="#examples">Examples</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- DESCRIPTION -->
## Description

### A life-changing  module for beginners

This module will easily permit you to build customizable messages menus with buttons.



<!-- GETTING STARTED -->
## Getting Started

### Installation

  ```sh
  npm install discord.js
  npm install discord-buttons
  npm install discord-menu-buttons
  ```

  discord.js v12.5.3

  discord-buttons v4.0.0



<!-- DOCUMENTATION -->
## Documentation

### Menu

```js
const menu = new Menu(channel, target, pages, time, deleted);
```

#### Properties

**channel (TextChannel | DMChannel)** - The channel where the Menu will be initialized.

**target (Snowflake)** - The target of the Menu, if any.

**pages (Object[])** - The Pages of the Menu.

**pages.name (String)** - The name of the page.

**pages.content (String | MessageEmbed)** - The content of the page.

**pages.buttons (Button[])** - The buttons of the page.

**time (Number)** - The time, in milliseconds, after which the Menu will be closed if not any clicking are valid.

**deleted (Boolean)** - If the Menu will be deleted after the stored time.

#### Functions

**start() <Menu>** - Start the menu.

**async awaitButtons() (Promise<void>)** - Await for a valid button to be pressed by the authorized user(s).

**updateMenu(page) (void)** - Update the Menu with the given page number.

**--- page (Number)** - The number of the page.

**stop(force) (void)** - Stop the Menu and delete it if has been forced or initialized.

**--- force (Boolean)** - Overwrite the initialized value deleted.

### Button

```js
const button = new Button();
```

#### Functions

**setFunction(fn) (void)** - The function that will be executed when the button will be clicked, if any.

**--- fn(button, menu) (Function)** - The function using the collected button and the menu as parameters.

**------ button (MessageButton)** - The received [button](https://discord-buttons.js.org/events/clickbutton).

**------ menu (Menu)** - The started Menu.

#### Personnalized ID

You can setID() a special ID on your Button, which will be recognized by the module.

**previous** - Go the the previous page, if possible.

**next** - Go to the next page, if possible.

**start** - Go to the first page.

**end** - Go to the last page.

**function** - Launch the added function.

**delete** - Delete the Menu.

**stop** - Stop the Menu and delete it if it has been initialized.

#### discord-buttons

For [all the others functions](https://discord-buttons.js.org/constructors/messagebutton), you need to take a look at the documentation of the [discord-buttons](https://www.npmjs.com/package/discord-buttons) module.



<!-- EXAMPLES -->
## Examples

### Basic Usage

```js
const { MessageEmbed } = require('discord.js');
const { Menu, Button } = require('discord-menu-buttons');

const next = new Button()
            .setLabel("▶")
            .setID("next")
            .setStyle("blurple");
const stop = new Button()
             .setLabel('⛔')
             .setID('stop')
             .setStyle('red');
const previous = new Button()
                .setLabel("◀")
                .setID("previous")
                .setStyle("blurple");

const buttons = [ previous, stop, next ];
const pages = [
    { name: '1', content: new MessageEmbed().setDescription('Page one.'), buttons: buttons },
    { name: '2', content: new MessageEmbed().setDescription('Page two.'), buttons: buttons },
    { name: '3', content: new MessageEmbed().setDescription('Page three.'), buttons: buttons }
]

const menu = new Menu(message.channel, message.author.id, pages, null, false);
menu.start();
```

### setFunction(button, menu) Usage

```js
const love = (button, menu) => {
    button.message.react("❤");
    menu.stop(false);
}

const button = new Button()
               .setLabel("Click me !")
               .setFunction(love)
               .setStyle("red")
               .setID('function');

const pages = [{
    name: "love", content: "Wanna be loved?", buttons: [ button ]
}]

new Menu(message.channel, message.author.id, pages, null, false).start();
```



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact

**Discord** - ValuWaurld#7720

**Email** - val0u74mc@gmail.com