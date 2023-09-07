import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { jwt } from '@/utils';
import { db } from '@/db';
import { User } from '@/db-models';


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
        case 'POST':
            return loginUser(req, res)

        default:
            res.status(400).json({
                message: 'Bad request'
            })
    }
}

const loginUser = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const { email = '', password = ''  } = req.body;

    await db.connect();
    const user = await User.findOne({ email });
    await db.disconnect();

    //varificar que el usuario si exista
    if ( !user ) {
        return res.status(400).json({ message: 'Correo o contraseña no válidos - EMAIL' })
    }
    
    // si el usuario existe verifica su password
    if ( !bcrypt.compareSync( password, user.password! ) ) {
        return res.status(400).json({ message: 'Correo o contraseña no válidos - Password' })
    }

    // si todo esta bien le firma el token
    const { role, name, _id } = user;

    const token = jwt.signToken( _id, email );
    
    // responde el token
    return res.status(200).json({
        token, //jwt
        user: {
            email, role, name
        }
    })


}