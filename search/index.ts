import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    message: string
}
// si se llama al enpoint de search y se manda sin un query
export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    res.status(400).json({ message: 'Debe de especificar el query de búsqueda' })
}