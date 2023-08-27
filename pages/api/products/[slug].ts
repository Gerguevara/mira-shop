import type { NextApiRequest, NextApiResponse } from 'next'
import { IProduct } from '@/interfaces/product';
import { db } from '@/db';
import { Product } from '@/db-models';


type Data = 
| { message: string }
| IProduct;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    
    switch( req.method ) {
        case 'GET':
            return getProductBySlug(req, res);

        default:
            return res.status(400).json({
                message: 'Bad request'
            })
    }

}
//devuelve un producto por su slug con su informacion completa, si el slug no va entra al otro enpoint general

async function getProductBySlug(req: NextApiRequest, res: NextApiResponse<Data>) {

    await db.connect();
    const { slug } = req.query;
    const product = await Product.findOne({ slug }).lean();
    await db.disconnect();

    if( !product ) {
        return res.status(404).json({
            message: 'Product not found'
        })
    }

    return res.json( product );


}