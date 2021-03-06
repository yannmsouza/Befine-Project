
import path from 'path';
import os from 'os';
import fs from 'fs';
import mongodb from 'mongodb';


import Busboy from 'busboy';



const uploadsPath = './uploads';

class VideosController {

    sendVideos(req, res){
        ///Nao Esta Funcionando - Busboy
        var busboy = new Busboy({headers: req.headers});

        busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
            console.log('video ok 0');

            var saveTo = path.join(uploadsPath, path.basename(fieldname)+'.mp4');
            console.log('video ok 1 ' +saveTo);

            file.pipe(fs.createWriteStream(saveTo));
        });

        busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated) {
            console.log('Field [' + fieldname + ']: value: ' + inspect(val));
        });

        busboy.on('finish', function() {

            console.log(req.body);

            var saveTo = path.join(''+uploadsPath, path.basename(''+fieldname)+'.mp4');
            console.log('video ok 1 ' +saveTo);

            file.pipe(fs.createWriteStream(saveTo));

            res.writeHead(200, { 'Connection': 'close' });
            res.end("That's all folks!!");
        });    
        
        return req.pipe(busboy);
    }



    streamVideos(req, res){
        // Nao Utilizado
        console.log('aqui videos stream');

        global.conn.collection('users').find(mongodb.ObjectId(req.params.idUser)).toArray(
            (err, docs) => {
                if (err) {
                    res.status(500).json({ error: err });
                } else {
                    console.log(docs);
                    var user = docs;

                    let us = user[0];
                    console.log(us);

                    res.status('200').json({videos : us.videos});
                    //Realizar consulta, encontrar videos

                    // res.writeHead(200, { 'Content-Type': 'video/mp4' });

                    // var rs = fs.createReadStream(uploadsPath+'/cat.mp4');
                    
                    // rs.pipe(res);
                }
            }           
        );    

        


    }



}

export default VideosController;