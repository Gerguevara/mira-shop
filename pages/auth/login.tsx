
import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '@/components/layout';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { AuthContext } from '@/context/auth';
import { ErrorOutline } from '@mui/icons-material';
import { validations } from '@/utils';
import { useForm } from 'react-hook-form';


type FormData = {
    email: string,
    password: string,
};



const LoginPage = () => {

    const router = useRouter();
    const { loginUser } = useContext(AuthContext);

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [showError, setShowError] = useState(false);

    const onLoginUser = async ({ email, password }: FormData) => {
        // se esconde porque es un nuevo intento, si no igual despues de 3 segundos se va el error
        setShowError(false);

        const isValidLogin = await loginUser(email, password);

        if (!isValidLogin) {
            setShowError(true);
            setTimeout(() => setShowError(false), 3000);
            return;
        }



           // Todo: navegar a la pantalla que el usuario estaba, TOMANDO LOS QUERY PARAMS QUE SON AGHREGADOS 
           //  DESDE DA CLICK AL BOTON DE LOGIN EN EL SIDE MENU (ESTE TOMA LA URL Y LA AGREGA COMO UN QUERY PARAM QUE NO AFECTA LA RUTA PERO SE GUARDA)
           //Y ASI SABE CONDE REDIRIGIR AL USUARIO
           const destination = router.query.p?.toString() || '/';
           //REPLACE PARA REMOVERLO DEL HISTORIAL
           router.replace(destination);

    }

    return (
        <AuthLayout title={'Ingresar'}>
            <form onSubmit={handleSubmit(onLoginUser)} noValidate>
                <Box sx={{ width: 350, padding: '10px 20px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant='h1' component="h1">Iniciar Sesión</Typography>
                            <Chip
                                label="No reconocemos ese usuario / contraseña"
                                color="error"
                                icon={<ErrorOutline />}
                                className="fadeIn"
                                sx={{ display: showError ? 'flex' : 'none', my: 2  }}
                            />
                        </Grid>

                        <Grid item xs={12} sx={{ my: 2} }>
                            <TextField
                                type="email"
                                label="Correo"
                                variant="filled"
                                fullWidth
                                {...register('email', {
                                    required: 'Este campo es requerido',
                                    validate: validations.isEmail

                                })}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />

                        </Grid>
                        <Grid item xs={12}  sx={{ my: 2}}>
                            <TextField
                                label="Contraseña"
                                type='password'
                                variant="filled"
                                fullWidth
                                {...register('password', {
                                    required: 'Este campo es requerido',
                                    minLength: { value: 6, message: 'Mínimo 6 caracteres' }
                                })}
                                error={!!errors.password}
                                helperText={errors.password?.message}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                color="secondary"
                                className='circular-btn'
                                size='large'
                                fullWidth
                                disabled={showError}
                                >
                                Ingresar
                            </Button>
                        </Grid>

                        <Grid item xs={12} display='flex' justifyContent='end'>
                             {/* envia como un ternario el callback url a donde el usuario debe volver */}
                            <Link sx={{ cursor: 'pointer' }}  href={ router.query.p ? `/auth/register?p=${ router.query.p }`: '/auth/register' } >
                                ¿No tienes cuenta?
                            </Link>

                        </Grid>
                    </Grid>
                </Box>
            </form>
        </AuthLayout>
    )
}

export default LoginPage

//Tip
//noValidate desactiva las validaciones de los formularios por el lado de html como email 




// User de ReactHookForm  https://www.udemy.com/course/nextjs-fh/learn/lecture/30947240#notes

// 1 se envuelve el formulario en una tiqueta <form>

// 2 register hace un bind de el inmputo con el state del formulario, al dar submit la data es tomada de lo que se ha registrado con este hook de RHF

// 3 register tambien le indica a state de input seleccionado las validaciones que desean aplicarsele, tiene la opcion de pasar autmaticamente el mensaje
// desde la validacion y el input que fallo

//4 Los inputs de materiar tiene propos  para manejar errores  error={!!errors.password} para decirle que propiedad booleana indica que hay un error
// es cambiara el estio a un texto y danger , la doble nmegacion es inportante porque con eso se tranforma en valor booleano ya que esto es un objeto
// helperText={errors.password?.message} indica el mensaje de error que se va a mostrar en el input

// 5 {errors.password?.message verifica la primera validacion si es requerida, sino hace la segunda validacion pero la prioridad es que sea requerido
 

///6 la validacion de credenciales es hecha por el backend y tiene su propio chip de error para mostrar al usuario pq no es un error de formato