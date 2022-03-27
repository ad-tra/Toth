import Head from 'next/head'
import Passage from "../components/Passage"

export default function Literature(){
    return (
        <>
        <Head>
            <title>SAT Literature Passages - TOTH</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Passage topic = "literature"/>
        </>
    )
}