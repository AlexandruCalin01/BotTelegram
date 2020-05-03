const Telegraf = require('telegraf');
const { acl } = require('telegraf');
const adminIds = 229526751;
const bot = new Telegraf('854467088:AAFuRrRVQPGUuApqi-MqzLn7O_NeSPRBu0E');
var elementi = ["Fireblight", "Waterblight", "Iceblight", "Thunderblight", "Dragonblight"];
var status = ["Poison", "Stun", "Paralysis", "Sleep", "Blastlight", "Bleeding"];
var locations = ["Ancient Forest", "Coral Higlands", "Wildspire Waste", "Rotten Vale", "Elder's Recess"];
let mostri = {
    "monsters": [
        { "Name": "Nergigante", "Description": "A terrible elder dragon that appears when other elders are in the vicinity. Its penchant for destruction is well documented. ", "WeakElement": "Thunderblight", "WeakStatus": "Blastlight", "Picture": "https://monsterhunterworld.wiki.fextralife.com/file/Monster-Hunter-World/nergigante-large-monster-hunter-world-mhw.jpg" },
        { "Name": "Diablos", "Description": "The apex monster of the Wildspire Waste. A menacing, territorial beast that lurks underground. Loud noises will cause it to lunge out of the sand in search of prey. ", "WeakElement": "Iceblight", "WeakStatus": "Paralysis", "Picture": "https://i4.ytimg.com/vi/NwFX9I69uss/maxresdefault.jpg" },
        { "Name": "Anjanath", "Description": "The Anjanath patrol the Ancient Forest looking for its favourite meal, Aptonoth. This belligerent mosnter will attack anything without the slightest provocation.", "WeakElement": "Waterblight", "WeakStatus": "Paralysis", "Picture": "https://images.everyeye.it/img-articoli/monster-hunter-world-guida-come-trovare-affrontare-anjanath-v13-37141.jpg" },
        { "Name": "Odogaron", "Description": "A terrifying monster that scours the Rotten Vale for carrion. Its highly aggressive nature means that anything, be it monster or man, is a potential meal.", "WeakElement": "Iceblight", "WeakStatus": "Paralysis", "Picture": "https://monsterhunterworld.wiki.fextralife.com/file/Monster-Hunter-World/odogaron-monster-hunter-world-large-monster.jpg" },
        { "Name": "Tobi-Kadachi", "Description": "A fanged wyvern that flies among the trees of the Ancient Forest. Its penchant to brush against the ground and the trees as it moves around builds up static electricity within its fur.", "WeakElement": "Waterblight", "WeakStatus": "Poison", "Picture": "https://i.ytimg.com/vi/w3HP9ces31c/maxresdefault.jpg" }

    ]
};

//Comando per solo admin, se non si è admin riotnr una stringa che dice che non sei admin, preso il mio Id tramite un bot 
bot.command('admin', acl((ctx) => {
    if (adminIds == ctx.message.chat.id)
        ctx.reply("Sono l'admin")
    else
        ctx.reply("Non sei l'admin, Shame on you")
}));

//Parte quando si fa /start, invia un messaggio di benvenuto
bot.start((ctx) => {
    const start = "Hello, I'll be your guide for the monsters of Monster Hunter World!\nWhat is your request?";
    ctx.reply(start);
});

//Parte quando si fa /help, invia un messaggio con i vari comandi
bot.help((ctx) => {
    const help = "You can search for single monster using the command /monster [Monster name]\n Other commands are:\n\n /elements to see the lsit of the elements" +
        "\n /statuses to see the list of the statuses" + "\n /monsters to see a list of the monsters" + "\n /locations to see the list of the locations" + "\n /randompicture to generate a picture of a monster";
    ctx.reply(help);
});

//Parte quando si fa /elements, invia una lista degli elementi presenti in gioco
bot.command('elements', (ctx) => {
    ctx.reply("The elemental blights included in this world are: ");
    for (let i = 0; i < elementi.length; i++) //Uso let così da non creare una variabile globale
        ctx.reply(elementi[i]);
});

//Parte quando si fa /statuses, invia una lista degli effetti di stati presenti in gioco
bot.command('statuses', (ctx) => {
    ctx.reply("The statuses included in this world are: ");
    for (let i = 0; i < status.length; i++)
        ctx.reply(status[i]);
});

//Parte quando si fa /locations, invia una lista delle varie zone di caccia presenti in game
bot.command('locations', (ctx) => {
    ctx.reply("The locations in this world are: ");
    for (let i = 0; i < locations.length; i++)
        ctx.reply(locations[i]);
});

//Parte quando si fa /monsters, invia una lista con i nomi dei mostri presenti nel JSON
bot.command('monsters', (ctx) => {
    ctx.reply("The monsters that we have note of are: \n");
    for (let i = 0; i < mostri.monsters.length; i++)
        ctx.reply(mostri.monsters[i].Name);
});

//Parte quando si fa /randompicture, invia una foto il cui link è nel JSON
bot.command('randompicture', (ctx) => {
    var r = Math.floor(Math.random() * mostri.monsters.length);
    bot.telegram.sendPhoto(ctx.chat.id, mostri.monsters[r].Picture);
});

//Parte quando si fa /monster [NomeMostro], invia i dati del mostro selezionato
bot.command("monster", (ctx) => {
    let input = ctx.message.text;
    let inputArray = input.split(" ");
    let message = "";

    if (inputArray.length != 1) {
        inputArray.shift();
        message = inputArray.join(" ");
    }

    for (let i = 0; i < mostri.monsters.length; i++) {
        if (mostri.monsters[i].Name == message) {
            ctx.replyWithPhoto({ url: mostri.monsters[i].Picture }, {
                caption: mostri.monsters[i].Description +
                    "\n \n" + "Weak element: " + mostri.monsters[i].WeakElement +
                    "\n \n" + "Weak stauts: " + mostri.monsters[i].WeakStatus
            });
        }
    }
});

bot.launch();