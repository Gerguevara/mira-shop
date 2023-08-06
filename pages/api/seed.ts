import { db, seedDatabase } from '@/db';
import { Product } from '@/db-models';
import type { NextApiRequest, NextApiResponse } from 'next'


type Data = { message: string }

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

   if(req.method === 'POST'){
    if (  process.env.NODE_ENV === 'production'){
        return res.status(401).json({ message: 'No tiene acceso a este API'});
    }

    await db.connect();
    await Product.deleteMany();
    await Product.insertMany( seedDatabase.initialData.products );
    await db.disconnect();
    res.status(200).json({ message: 'Database successfully restarted' });
    return
   }
   res.status(200).json({ message: 'Method not allowed' });
}