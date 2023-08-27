import { IProduct } from '@/interfaces/product'
import { SHOP_CONSTANTS, db } from '@/db'
import { Product } from '@/db-models'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data =
    | { message: string }
    | IProduct[]

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return getProducts(req, res)

        default:
            return res.status(400).json({
                message: 'Bad request'
            })
    }
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { gender = 'all' } = req.query;

    let condition = {};

    if (gender !== 'all' && SHOP_CONSTANTS.validGenders.includes(`${gender}`)) {
        condition = { gender };
    }

    await db.connect();
    // trae solo title images price inStock slug 
    //-_id el menos es para que no aparezca el id
    //.lean() para quesolo traiga propiedades de javascript y no de mongo
    const products = await Product.find(condition).select('title images price inStock slug -_id').lean();

    await db.disconnect();

    return res.status(200).json(products);

}