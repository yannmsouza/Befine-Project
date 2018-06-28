import UsersController from '../controllers/users';

const users = new UsersController();

export default function (application) {

    application.route('/').get((res) => {
            console.log('ok ok');
            res.status(200).json({'ok': 'ok'});
    });
    
    //Cadastro Usuario
    application.route('/user').post((req, res) => {
        console.log('cadastro ok');
        users.register(req, res);
    });

    // Rota para Recuperar Dados dos Usuarios
    application.get('/users',  (req, res) =>  {
        console.log('busca ok');
        users.returnAll(req, res);
    });

    // Rota para Recuperar Dados do Usuario pelo ID
    application.get('/user/:idUser', (req, res) => {
        //console.log('chegou aqui get');
        users.returnUser(req, res);
        
    });

}