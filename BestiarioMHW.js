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

//[IT] Comando per solo admin, se non si è admin ritorna una stringa che dice che non sei admin, preso il mio Id tramite un bot 
//[EN] Command admino only, if you are not the admin it returns a string that says that you are not the admin, I took my id using a bot
bot.command('admin', acl((ctx) => {
    if (adminIds == ctx.message.chat.id) //[IT] Controlla se adminIds corrisponde all'id dell'utente in chat //[EN] Controls if the adminIds and the id of the user from the chat are corresponding
        ctx.reply("You are the admin, welcome sir")
    else
        ctx.reply("You are not the admin, Shame on you")
}));

//[IT] Parte quando si fa /start, invia un messaggio di benvenuto //[EN] Starts when we do /start, it sends a welcome message
bot.start((ctx) => {
    const start = "Hello, I'll be your guide for the monsters of Monster Hunter World!\nWhat is your request?";
    ctx.reply(start);
});

//[IT] Parte quando si fa /help, invia un messaggio con i vari comandi //[EN] Starts when we do /help, it sends a message with the commands
bot.help((ctx) => {
    const help = "You can search for single monster using the command /monster [Monster name]\n Other commands are:\n\n /elements to see the lsit of the elements" +
        "\n /statuses to see the list of the statuses" + "\n /monsters to see a list of the monsters" + "\n /locations to see the list of the locations" + "\n /randompicture to generate a picture of a monster";
    ctx.reply(help);
});

//[IT] Parte quando si fa /elements, invia una lista degli elementi presenti in gioco //[EN] Starts when we do /elements, it sends a list of the elements in the game
bot.command('elements', (ctx) => {
    ctx.reply("The elemental blights included in this world are: ");
    for (let i = 0; i < elementi.length; i++) //[IT] Uso let così da non creare una variabile globale //[EN] I use let to create a non global variable
        ctx.reply(elementi[i]); //[IT] Con il for vado a creare un let i inizializzato a 0 che continua ad incrementarsi di 1 per la lunghezza dell'array elementi, per ogni ciclo stampa elementi[i]
    //[EN] Using the for I create a i let type initialized to 0 that continuous to increment of 1 for the length of the elements array, for every cycle it sends elementi[i]
});

//[IT] Parte quando si fa /statuses, invia una lista degli effetti di stati presenti in gioco //[EN] Starts when we do /statuses, it sends a list of the statuses in the game
bot.command('statuses', (ctx) => {
    ctx.reply("The statuses included in this world are: ");
    for (let i = 0; i < status.length; i++)
        ctx.reply(status[i]);
});

//[IT] Parte quando si fa /locations, invia una lista delle varie zone di caccia presenti in game //[EN] Starts when we do /locations, it sends a list of the locations in game
bot.command('locations', (ctx) => {
    ctx.reply("The locations in this world are: ");
    for (let i = 0; i < locations.length; i++)
        ctx.reply(locations[i]);
});

//[IT] Parte quando si fa /monsters, invia una lista con i nomi dei mostri presenti nel JSON //[EN] Starts when we do /monsters, it sends a list of the monsters names in the JSON
bot.command('monsters', (ctx) => {
    ctx.reply("The monsters that we have note of are: \n");
    for (let i = 0; i < mostri.monsters.length; i++) //[IT] Come gli altri comandi, ma questa volta vado a prendere i dati da un var json che ho chiamato mostri, dove è prensente l'array monsters in cui prendo solo il nome //[EN] Like the other commands, but this time a take the data from a var json named mostri
        ctx.reply(mostri.monsters[i].Name);
});

//[IT] Parte quando si fa /randompicture, invia una foto il cui link è nel JSON //[EN] Starts when we do /randompicture, it sends a picture taking the link from the JSON
bot.command('randompicture', (ctx) => {
    var r = Math.floor(Math.random() * mostri.monsters.length); //[IT] Genero un numero random tra 0 e la lunghezza di monsters associandolo a r //[EN] Creating a random number between 0 and the length of monsters associating it to r
    bot.telegram.sendPhoto(ctx.chat.id, mostri.monsters[r].Picture); //[IT] Invio una foto presente nel json all'elemento monsters[r] //[EN] sends a picture in the json from monster[r]
});

//[IT] Parte quando si fa /monster [NomeMostro], invia i dati del mostro selezionato //[EN] Starts when we do /monster [MonsteName], it sends data from the selected monster 
bot.command("monster", (ctx) => {
    let input = ctx.message.text; //[IT] Il messaggio scritto dall'utente viene preso e messo nella var input //[EN] The message wrote from the user is gonna be initialiazed in var input
    let inputArray = input.split(" "); //[IT] Divido il /monster dal nome del mostro creando un array di 2 elementi //[EN] Divide the /monster from the name of the monstercreating an array of 2 elements
    let message = "";

    if (inputArray.length != 1) {
        inputArray.shift(); //[IT] Rimuove il primo elemento dell'array, ovvero /monster //[EN] Removes the first element of the array, that is /monster
        message = inputArray.join(" "); //[IT] Rende l'array una stringa //[EN] Converts the array into a string
    }

    for (let i = 0; i < mostri.monsters.length; i++) {
        if (mostri.monsters[i].Name == message) { //[IT] Controlla se esiste il mostro nel json //[EN] Controls if the monster exists in the json
            ctx.replyWithPhoto({ url: mostri.monsters[i].Picture }, { //[IT] Risponde con un messaggio unico contenente foto, descrizione, elemento e status debole //[EN] Sends a message with a picture, descrpition, element and status
                caption: mostri.monsters[i].Description +
                    "\n \n" + "Weak element: " + mostri.monsters[i].WeakElement +
                    "\n \n" + "Weak stauts: " + mostri.monsters[i].WeakStatus
            });
        }
    }
});

bot.launch();