import VideosController from '../controllers/videos';

const videos = new VideosController();

import path from 'path';
import fs from 'fs';
import mongodb from 'mongodb';



export default function(application){

    //Usuario envia Video
    application.route('/user/:idUser/videos').post((req, res) => {
        const uploadsPath = './uploads';

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
        console.log('stream videos');
        videos.streamVideos(req, res);
    });


}