//los ... en el nombre de este archivo indica que todo lo que este en este folder va a pasar por este archivo
// funciona como un tipo de modulo de configuracion de angular o Next, es como un tipo de middleware

import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import Credentials from 'next-auth/providers/credentials';
import { dbUsers } from "@/db";

export const authOptions = {
  // Custon provider
  // https://www.udemy.com/course/nextjs-fh/learn/lecture/30960824#content
  // un custon prover agregado de esta forma agrega el email and password input a la pagina por defecto de next auth
  // literalmente la funcion auithorize puede retornar cualquier cosa y solo se considera null cuando fallo
  providers: [
    Credentials({
      name: 'Custom Login',
      credentials: {
        email: { label: 'Correo:', type: 'email', placeholder: 'correo@google.com' },
        password: { label: 'Contraseña:', type: 'password', placeholder: 'Contraseña' },
      },
      async authorize(credentials) {
        console.log({ credentials })
        return await dbUsers.checkUserEmailPassword(credentials!.email, credentials!.password) as any;

      }
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
  ],


  callbacks: {
    // se dispara cuando se realiza un accion

    // se dispara cuando se gnera un nuevo JWT (esto pasa antes de crear la session)
    async jwt({ token, account, user }: { token: any, account: any, user: any }) {
      if (account) {
        token.accessToken = account.access_token;
        // permite interceptar y modificar el token
        switch (account.type) {
          // si el usuario tien un proveedor externo, este metodo busca por su email o username su  info y la agrega al token
          case 'oauth':
            token.user = await dbUsers.oAUthToDbUser(user?.email || '', user?.name || '');
            break;

          case 'credentials':
            token.user = user;
            break;
        }

      }

      return token;
    },

     // se dispara cuando se crea una session (esto pasa despues de crear el JWT)
    async session({ session, token, user } : { session: any, token: any, user: any }) {
      // agrega esta informacion  a la session que es la que tenemos cuando tomamos el context del session
      session.accessToken = token.accessToken;
      session.user = token.user;

      return session;
    }

  }
}

export default NextAuth(authOptions)