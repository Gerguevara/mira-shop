import type { NextApiRequest, NextApiResponse } from 'next';
import { jwt } from '@/utils';
import { User } from '@/db-models';
import { db } from '@/db';



type Data = 
| { message: string }
| {
    token: string;
    user: {
        email: string;
        name: string;
        role: string;
    }
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch( req.method ) {
        case 'GET':
            return checkJWT(req, res)

        default:
            res.status(400).json({
                message: 'Bad request'
            })
    }
}

// enpoint para verificar la veracidad del token tomado de las cookies

const checkJWT = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const { token = ''  } = req.cookies;

    let userId = '';

    try {
        userId = await jwt.isValidToken( token );

    } catch (error) {
        return res.status(401).json({
            message: 'Token de autorización no es válido'
        })   
    }


    await db.connect();
    // recupera toda la info del usuario tomando el id del token varificado
    // util cuando se hace refresh del navegador
    const user = await User.findById( userId ).lean();
    await db.disconnect();

    if ( !user ) {
        return res.status(400).json({ message: 'No existe usuario con ese id' })
    }

    const { _id, email, role, name } = user;

    // retorna un nuevo token
    return res.status(200).json({
        token: jwt.signToken( _id, email ),
        user: {
            email, 
            role, 
            name
        }
    })


}