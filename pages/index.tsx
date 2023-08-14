import { ShopLayout } from "@/components/layout"
import { ProductList } from "@/components/products"
import { FullScreenLoading } from "@/components/ui";
import { useProducts } from "@/hooks";
import { Typography } from "@mui/material"


export default function HomePage() {

  const { products, isLoading } = useProducts('/products');

  return (
    <ShopLayout title={'Mira-Shop - Home'} pageDescription={"Everything you'r finding"}>
        <Typography variant='h1' component='h1'>Tienda</Typography>
        <Typography variant='h2' sx={{ mb: 1 }}>Todos los productos</Typography>

        {
          isLoading
            ? <FullScreenLoading />
            : <ProductList products={ products } />
        }

    </ShopLayout>
  )
}
