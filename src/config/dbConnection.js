import mongoClient from 'mongodb';

export default function (){

    mongoClient.connect('mongodb://befine-admin:befine123@ds237700.mlab.com:37700/banco-befine')
    .then(conn => global.conn = conn.db('banco-befine'),
    () => {
        console.log('conexao realizada');
    })
    .catch(err => console.log(err));
}

