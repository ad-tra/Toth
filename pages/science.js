import Head from 'next/head'
import Passage from "../components/Passage"

export  default function (){
    return (
        <>
        <Head>
            <title>SAT Science  Passages - TOTH</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Passage />
        </>
        )
}