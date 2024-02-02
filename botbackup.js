const { Telegraf, session } = require('telegraf');
const extractUrls = require("extract-urls");
const { isNull } = require('util');
require ('dotenv').config();
const bot = new Telegraf(process.env.TOKEN)
//const firebase = require('firebase');
// Importa la biblioteca de Firebase solo con la parte 'app'
const admin = require('firebase-admin');
const serviceAccount = require('../bot/serviceAccountKey.json');

// Inicializa Firebase con tu configuración
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://botbd-36a17-default-rtdb.firebaseio.com' // Asegúrate de reemplazar esto con la URL de tu base de datos en tiempo real
});


//import { initializeApp } from "firebase/app";
//import { initializeApp } from 'firebase/app';
//import { getDatabase } from 'firebase/database';
/*
// Inicializa Firebase con tu configuración
const firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID
};


// Inicializa Firebase con tu configuración
const firebaseConfig = {
  apiKey: "AIzaSyDtf9Di4M0ivdrjmQ0dStdmsLjmT1JOh-M",
  authDomain: "botbd-36a17.firebaseapp.com",
  projectId: "botbd-36a17",
  storageBucket: "botbd-36a17.appspot.com",
  messagingSenderId: "371750466252",
  appId: "1:371750466252:web:fc72f3dcf996489fcf0869"
};


consolelog(firebaseConfig);

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const collectionRef = db.collection('usuariosBot');
consolelog(collectionRef);
*/


//const LocalSession = require('telegraf-session-local')

/*
// Habilitar sesiones
bot.use((new LocalSession({ database: 'example_db.json' })).middleware())
// Inicio del Bot y Saludos
bot.on('text', (ctx, next) => {
  ctx.session.counter = ctx.session.counter || 0
  ctx.session.counter++
  ctx.replyWithMarkdownV2(`Counter updated, new value: \`${ctx.session.counter}\``)
  return next()
})
bot.command('/stats', (ctx) => {
  ctx.replyWithMarkdownV2(`Database has \`${ctx.session.counter}\` messages from @${ctx.from.username || ctx.from.id}`)
})

bot.command('/remove', (ctx) => {
  ctx.replyWithMarkdownV2(`Removing session from database: \`${JSON.stringify(ctx.session)}\``)
  // Setting session to null, undefined or empty object/array will trigger removing it from database
  ctx.session = null
})
*/
///////////////////////////////////////////

// Array de IDs de usuarios permitidos
const usuariosPermitidos = ['6508486309', 'id_usuario2', 'id_usuario3'];
// Verificar si el usuario tiene permisos
async function usuarioPermitido(userId) {
  // Obtén todos los datos de la colección
  //const data = await collectionRef.get();
  return usuariosPermitidos.includes(String(userId));
}

////////////////////////////////////////////



bot.start((ctx) => {

  ctx.reply(`Hola, Soy ${'*Kenny*'}, tu asistente para buscar informes, elige una opción \n \n ${'*1-*'} Rescatar un informe usando el ${'*RUT*'}: /rut \n ${'*2-*'}.Para recibir los datos de contacto :  /contacto \n ${'*3-*'}.Para registrar su número y recibir informes:  /registrar`,{parse_mode : "Markdown"});
  

})

bot.hears(['hola', 'HOLA', 'hOLA', 'hols', 'Hola', 'Hoa', 'ola', 'Ola'], (ctx) => {

  ctx.reply(`Hola, Soy ${'*Kenny*'}, tu asistente para buscar informes, elige una opción \n \n ${'*1-*'} Rescatar un informe usando el ${'*RUT*'}: /rut \n ${'*2-*'}.Para recibir los datos de contacto :  /contacto \n ${'*3-*'}.Para registrar su número y recibir informes:  /registrar`,{parse_mode : "Markdown"});
  bot.use((ctx, next) => {
    var OPTION = ctx.message.text;
    console.log(OPTION); // ""
    if (OPTION == 1 && OPTION.length < 2) {
            ctx.reply('Hola!, utilice el comando /rut');
           
        }
        if (OPTION == 2 && OPTION.length < 2) {

          ctx.reply(`Puedes enviarnos un correo a citometriahggb@gmail.com o llamarnos a +56 41220533`);
          
        }

            if (OPTION == 3 && OPTION.length < 2) {

              ctx.reply(`Bienvenido ${ctx.from.first_name} ${ctx.from.last_name}, Para el registro envíe su nombre, correo y numero de id al número de id al correo a citometriahggb@gmail.com para validar el registro; \n\n Su número es:  @${ctx.from.id}`)
             
            }
      //fin 
       ctx.state.users = 75;
    next(ctx); //next is passed because we can modify data
  })
 
});

// Datos de contacto
bot.hears(['contacto','Contacto','/contacto','CONTACTO', 'cONTACTO' ], (ctx) => {

  ctx.reply(`Puedes enviarnos un correo a citometriahggb@gmail.com o llamarnos a +56 41220533`);
});

bot.hears(['informe','Informe'], ctx => {
  ctx.reply('Para rescatar un informe debe introducir el comando /rut y seguir las instrucciones: ');
})

bot.on('sticker', ctx => {
  ctx.reply('wow, a mi también me gustan los stickers')
})

// Comando contacto
bot.command(['contacto','Contacto','/contacto','CONTACTO', 'cONTACTO' ], (ctx) => {

  ctx.reply(`Puedes enviarnos un correo a citometriahggb@gmail.com o llamarnos a +56 41220533`);

});

// Comando registrar
bot.command(['registrar','Registrar','/registrar','REGISTRAR', 'rEGISTRAR' ], (ctx) => {

  ctx.reply(`Bienvenido ${ctx.from.first_name} ${ctx.from.last_name}, Para el registro envíe su nombre, correo y numero de id al número de id al correo a citometriahggb@gmail.com para validar el registro; \n\n Su número es:  @${ctx.from.id}`)

});

/// comando RUT, busqueda de informes

bot.command(['Rut', 'rut', 'RUT'], (ctx) => {
  if (!usuarioPermitido(ctx.from.id)) {
    ctx.reply('No tienes permisos para ejecutar este comando.');
    return;
  }else{
  ctx.reply('Ingrese el RUT del paciente (sin puntos y con guón): ');
  bot.use((ctx, next) => {

    var RUT = ctx.message.text.match(/[0-9kK-]/g);
    if(!Array){
      console.log(RUT+'no'); // ""
    }
    console.log(RUT); // ""
    if (RUT && RUT.length > 6) {
      var RUTj = RUT?.join().replace(/,/g, "");
      console.log(RUTj); // ""


      var RUT64 = Buffer.from(RUTj).toString('base64');
      //ctx.reply(RUT);
      // next();
      var http = require('http');
      var httpget = 'http://citometria.royalwebhosting.net/bot.php?rut=' + RUT64;
      //ctx.reply(httpget);

      http.get(httpget, res => {
        let data = [];
        var headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
        console.log('Status Code:', res.statusCode);
        console.log('Date in Response header:', headerDate);

        res.on('data', chunk => {
          data.push(chunk);
        });

        res.on('end', () => {
          console.log('Response ended: ');
          ////////////////////////////////////
          var parsedDatarut = Buffer.concat(data);
          console.log(parsedDatarut);

          //decodedBuffer = Buffer.from(parsedData).toString('base64');
          function decodeBase64(encodedString) {
            return atob(encodedString);
          }
          var decodedStringrut = decodeBase64(parsedDatarut);

          //const decodedString = decodeBase64(encodedString);
          console.log(decodedStringrut);
          var users = JSON.parse(decodedStringrut);
          //////var users = JSON.parse(Buffer.concat(data).toString());
          // Select a specific user's name and email:
          // Assuming extractUrls is defined elsewhere

          for (let i = 0; i < users.length; i++) {
            var nLabrut = users[i].nLab;
            var fecharut = users[i].fecha;
            var inforut = users[i].info;
            if (nLabrut == null) {

              ctx.reply(`El paciente no ha sido encontrado. \n contactese con el laboratorio`);
            } else {

              if (inforut == null || inforut == 'undefined') {

                ctx.reply(`El Informe ${nLabrut} fecha, ${fecharut}  está pendiente. \n Contactese con el laboratorio`);
              } else {
                var urlrut = inforut.toString();
                var text = extractUrls(urlrut);
                console.log(text);
                // Assuming ctx.reply is defined for message sending
                ctx.reply(`Descargue el informe ${nLabrut} fecha, ${fecharut}  en el siguiente enlace: [Informe](${text})`,{parse_mode : "Markdown"});

              }
            }
          }
          ///ctx.reply(users);

        });
      }).on('error', err => {
        console.log('Error: ', err.message);
      });
    }
    //fin 
        ctx.state.users = 75;
    next(ctx); //next is passed because we can modify data
  })
}
  
})


// iniciar el bot
bot.launch()
bot.start();

