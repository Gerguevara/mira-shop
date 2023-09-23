import bcrypt from 'bcryptjs';
import { User } from '@/db-models';
import { db } from './';


// verifica las crendenciales del usuario si son correctas lo retorna si  no lo son retorna null
export const checkUserEmailPassword = async (email: string, password: string) => {

    await db.connect();
    const user = await User.findOne({ email });
    await db.disconnect();

    if (!user) {
        return null;
    }

    if (!bcrypt.compareSync(password, user.password!)) {
        return null;
    }

    const { role, name, _id } = user;

    return {
        _id,
        email: email.toLocaleLowerCase(),
        role,
        name,
    }
}


// Esta función crea o verifica el usuario de OAuth que utiliza un proveedor externo
export const oAUthToDbUser = async (oAuthEmail: string, oAuthName: string) => {

    await db.connect();
    const user = await User.findOne({ email: oAuthEmail });
    // si lo encuentra, lo retorna
    if (user) {
        await db.disconnect();
        const { _id, name, email, role } = user;
        return { _id, name, email, role };
    }

    // si no lo encuentra, lo crea
    const newUser = new User({ email: oAuthEmail, name: oAuthName, password: '@', role: 'client' });
    await newUser.save();
    await db.disconnect();

    const { _id, name, email, role } = newUser;
    return { _id, name, email, role };

}