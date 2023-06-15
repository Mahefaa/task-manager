import Head from "next/head";
import {useRouter} from "next/router";
import {InferGetServerSidePropsType} from "next";
import {reformat} from "@/utils";
import {useEffect, useMemo, useState} from "react";

/**
 Calculates the time difference between the server time and client time.
 @param {Date} serverTime - The server time.
 @param {Date} clientTime - The client time.
 @returns {string} The time difference in the format "{days} days, {hours} hours, {minutes} minutes, {seconds} seconds".
 */
const calculateTimeDifference = (serverTime: Date, client: Date) => {
    const serverTimeDiff = client.getTime() - serverTime.getTime();
    const timeDiff = new Date(serverTimeDiff);
    const days = timeDiff.getUTCDate() - 1;
    const hours = timeDiff.getUTCHours();
    const minutes = timeDiff.getUTCMinutes();
    const seconds = timeDiff.getUTCSeconds();

    return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`
};


export default function Home({serverTime}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const router = useRouter();
    //parseServerTime and resolve IDE issue stating that it might affect useEffect behaviour
    const parsedServerTime = useMemo(() => new Date(Date.parse(serverTime)), [serverTime]);
    const moveToTaskManager = () => {
        router.push("/tasks");
    }
    const formattedDate = reformat(parsedServerTime);
    const [timeDifference, setTimeDifference] = useState("");
    useEffect(() => {
        //only set time difference when client side is OK
        const clientTime = new Date()
        setTimeDifference(calculateTimeDifference(parsedServerTime, clientTime))
    }, [parsedServerTime])

    return (
        <>
            <Head>
                <title>Web 2 - Exam TD</title>
                <meta name="description" content="Just an exam"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main>
                <h1>The easiest exam you will ever find</h1>
                <div>
                    {/* Display here the server time (DD-MM-AAAA HH:mm)*/}
                    <p>
                        Server time:{" "}
                        <span className="serverTime">{formattedDate}</span>
                    </p>

                    {/* Display here the time difference between the server side and the client side */}
                    <p>
                        Time diff:{" "}
                        <span className="serverTime">{timeDifference || "Calculating ... "}</span>
                    </p>
                </div>

                <div>
                    <button onClick={moveToTaskManager}>Go to task manager</button>
                </div>
            </main>
        </>
    );
}

export async function getServerSideProps() {
    const serverTime = new Date();

    return {
        props: {
            //transform to string otherwise it will not be serializable
            serverTime: serverTime.toString(),
        },
    };
}
