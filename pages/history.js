import Head from 'next/head'
import Passage from "../components/Passage"

export default function History(){
    return (
        <>
                <Head>
            <title>History Passages - TOTH</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Passage />
        </>
    )
}