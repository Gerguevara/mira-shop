import { IProduct } from '@/components/interfaces/product';
import { db } from '@/db';
import { Product } from '@/db-models';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data =
    | { message: string }
    | IProduct[]

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {

        case 'GET':
            return searchProducts(req, res)

        default:
            return res.status(400).json({
                message: 'Bad request'
            });
    }


}

const searchProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    let { q = '' } = req.query;

    if (q.length === 0) {
        return res.status(400).json({
            message: 'Debe de especificar el query de búsqueda'
        })
    }

    q = q.toString().toLowerCase();

    await db.connect();
    const products = await Product.find({
        // dado que en el schema se agrego el campo de text en title  y tags va a buscar en esos campos al utilizar
        $text: { $search: q }
    })
        .select('title images price inStock slug -_id')
        .lean();


    await db.disconnect();

    return res.status(200).json(products);
}

// El operador $text en Mongoose es una característica que permite realizar búsquedas de texto completo en campos de texto
// de un documento en MongoDB. Para usar el operador $text,
//  es necesario definir índices de texto en los campos en los que deseas realizar búsquedas de texto completo.
//  En tu código, has declarado un índice de texto en los campos title y tags en el esquema de tu modelo.

// El índice de texto en Mongoose te permite realizar búsquedas eficientes y rápidas en los campos de
// texto específicos que se han indexado. Al realizar una búsqueda de texto completo, MongoDB utiliza
// este índice para optimizar la consulta y encontrar coincidencias en los campos de texto especificados
