import VideosController from '../controllers/videos';

const videos = new VideosController();

import path from 'path';
import fs from 'fs';
import mongodb from 'mongodb';


const uploadsPath = './uploads';
export default function(application){

    //Usuario envia Video
    application.route('/user/:idUser/videos').post((req, res) => {

        // console.log(req.files);
        var date = new Date();

        let timeStamp  = date.getTime();

        var nameVideo = req.files.file.name;
        var fieldname = req.params.idUser+'_'+timeStamp+'_'+nameVideo;
        var pathVideo = fieldname;

        var saveTo = path.join(uploadsPath, path.basename(fieldname));
        console.log('video ok 1 ' +saveTo);

        fs.createWriteStream(saveTo).end((err) => {
            if(err){
                res.status(500).json({'error': err});
            } else {
                global.conn.collection('users', (err, collection) => {
                    collection.update( 
                        { _id: mongodb.ObjectId(req.params.idUser) },
                        {$push : {
                                videos: {
                                    path: pathVideo,
                                    title: nameVideo
                                }

                            }
                        },
                        {},
                        (err, records) => {
                            if(err) {
                                res.status(500).json({'error': err});
                            } else {
                                res.status(200).json({'status': 'successful video insertion'});
                            }

                        }
                    )
                })

                // res.status(200).json({'status': 'successful video insertion'});
            }
        })
    });

    // Rota para Retorno da Lista de Videos do Usuario
    application.get('/user/:idUser/videos', (req, res) => {
        console.log('list videos');
        
        global.conn.collection('users').find(mongodb.ObjectId(req.params.idUser)).toArray(
            (err, docs) => {
                if (err) {
                    res.status(500).json({ error: err });
                } else {
                    console.log(docs);
                    var user = docs;
                    let us = user[0];
                    res.status('200').json({videos : us.videos});
                }
            }           
        );    
    });
    // Rota para Stream de Video
    application.get('/user/:idUser/video/:title', (req, res) => {
        global.conn.collection('users').find(mongodb.ObjectId(req.params.idUser)).toArray(
            (err, docs) => {
                if (err) {
                    res.status(500).json({ error: err });
                } else {
                    var user = docs;
                    let videos = user[0].videos;
                    var video;
                    videos.forEach(element => {
                        if(element.title == req.params.title){
                            video = element;
                        }
                    });
                    if(video){
                        res.writeHead(200, { 'Content-Type': 'video/mp4' });

                        // console.log(uploadsPath+'/'+video.path);

                        var rs = fs.createReadStream(uploadsPath+'/'+video.path);
                
                        rs.pipe(res);
                    } else {
                        res.status('404').json({'error': 'Video Not Found'});
                    }
                    
                    }        }          
        );
    });





}