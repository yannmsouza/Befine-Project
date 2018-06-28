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
                var routines = docs.routines
                if (err) {
                    res.status(500).json({ error: err });
                } else {
                    res.status(200).json({'user': docs});
                }
            
            }
        )
    });

} 