import mongodb from 'mongodb';

export default function(application){

    //Usuario envia Rotina
    application.route('/user/:idUser/routines').post((req, res) => {
        global.conn.collection('users', (err, collection) => {
            collection.update( 
                { _id: mongodb.ObjectId(req.params.idUser) },
                {$push : {
                        routines: {
                            id_routine: new mongodb.ObjectId(),
                            title: req.body.title,
                            steps: req.body.steps
                        }

                    }
                },
                {},
                (err) => {
                    if(err) {
                        res.status(500).json({'error': err});
                    } else {
                        res.status(200).json({'status': 'successful routine insertion'});
                    }

                }
            )
            if(err){
                res.status(500).json({'error': err});
            }
        });
    
    
    });
    //Consulta Todas as Rotinas
    application.route('/user/:idUser/routines').get((req, res) => {
        global.conn.collection('users').find(
            mongodb.ObjectId(req.params.idUser)
        ).toArray(
            (err, docs) => {
                if (err) {
                    res.status(500).json({ error: err });
                } else {
                    var user = docs;
                    let routines = user[0].routines;
                    res.status(200).json({'routines': routines});
                }
            }
        )
    });


    //Consulta Todas as Rotinas
    application.route('/user/:idUser/routine/:idRoutine').get((req, res) => {
        global.conn.collection('users').find(
            mongodb.ObjectId(req.params.idUser)
        ).toArray(
            (err, docs) => {
                var user = docs;
                let routines = user[0].routines;
                var routine;

                var user = docs;
                let videos = user[0].videos;
                var video = videos[0];

                routines.forEach(element => {
                    if(element.id_routine == req.params.idRoutine){
                        routine = element;
                    }
                }); 

                if(routine){
                    res.status(200).json({
                        'routine': routine,
                        'video' : video
                });
                } else {
                    res.status(404).json({ error: err });                  
                }

                if (err) {
                    res.status(500).json({ error: err });
                } 
            
            }
        )
    });


} 