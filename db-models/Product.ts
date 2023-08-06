import { IProduct } from '@/components/interfaces/product';
import mongoose, { Schema, model, Model } from 'mongoose';



const productSchema = new Schema({
    description: { type: String, required: true },
    images: [{ type: String }],
    inStock: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 },
    sizes: [{
        type: String,
        enum: {
            values: ['XS','S','M','L','XL','XXL','XXXL'],
            message: '{VALUE} no es un tamaño válido'
        }
    }],
    //usar unique true automaticamente crea un index
    slug: { type: String, required: true, unique: true },
    tags: [{ type: String }],
    title: { type: String, required: true },
    type: {
        type: String,
        enum: {
            values: ['shirts','pants','hoodies','hats'],
            message: '{VALUE} no es un tipo válido'
        }
    },
    gender: {
        type: String,
        enum: {
            values: ['men','women','kid','unisex'],
            message: '{VALUE} no es un genero válido'
        }
    }
},{
    // maneja automaticamente las fechas de creacion, edicion
    timestamps: true
});

//Manualmente crear un indice, para buscar por titulo y tags
productSchema.index({ title: 'text', tags: 'text' });

// si no existe el modelo lo va a crear
const Product: Model<IProduct> = mongoose.models.Product || model('Product', productSchema );


export default Product;