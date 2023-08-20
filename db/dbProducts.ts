import { db } from './';
import { Product } from '@/db-models';
import { IProduct } from '@/components/interfaces/product';




export const getProductBySlug = async( slug: string ): Promise<IProduct | null> => {

    await db.connect();
    const product = await Product.findOne({ slug }).lean();
    await db.disconnect();

    if ( !product ) {
        return null;
    }
    //para hacer automaticamente la serializacion de forma practica usar mejor JSON.parse
    return JSON.parse( JSON.stringify( product ) );
}

interface ProductSlug {
    slug: string;
}
export const getAllProductSlugs = async(): Promise<ProductSlug[]>  => {
// este metodo  no se preocupa por la serializacion porque es utilizado por getStatiticPath
// el cual solo utiliza el slug , entonces solo eso se le manda, ademas con -id le decimos que no lo mande

    await db.connect();
    const slugs = await Product.find().select('slug -_id').lean();
    await db.disconnect();

    return slugs;
}

export const getProductsByTerm = async ( term:string): Promise<IProduct[]> => {
    
    //utilizado para la busqueda
    term = term.toString().toLowerCase();

    await db.connect();
    const products = await Product.find({
        $text: { $search: term }
    })
    .select('title images price inStock slug -_id')
    .lean();

    await db.disconnect();

    return products;
}


export const getAllProducts = async(): Promise<IProduct[]> => {

    await db.connect();
    const products = await Product.find().lean();
    await db.disconnect();

//para hacer automaticamente la serializacion de forma practica usar mejor JSON.parse
// generalmente se utiliza cuando se va ocupar el id , entonces esto hace la conversion automatica
    return JSON.parse( JSON.stringify( products ) );
}

