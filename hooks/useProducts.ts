import useSWR, { SWRConfiguration } from 'swr';
import { IProduct } from '@/components/interfaces/product';



// const fetcher = (...args: [key: string]) => fetch(...args).then(res => res.json());

export const useProducts = (url: string, config: SWRConfiguration = {} ) => {

    // const { data, error } = useSWR<IProduct[]>(`/api${ url }`, fetcher, config );
    const { data, error } = useSWR<IProduct[]>(`/api${ url }`, config );

    return {
        products: data || [],
        isLoading: !error && !data,
        isError: error
    }

}

//SWR tiene un provider en _app de configuracion global de fetcher para no tener que pasarlo siempre aqui (ahi va el refreshInterval), 
//la configuracion puede ser personalizada pero es opcional

// useSWR intenamente implementa un useEfect asi que al destruir el componente se limpian los intervals de revalidacion u otros listener