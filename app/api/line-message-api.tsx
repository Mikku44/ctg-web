import type { ActionFunctionArgs } from "react-router";
import type { BookingModel } from "~/models/booking";


export async function action({ request }: ActionFunctionArgs) {

    const CHANNEL_ACCESS_TOKEN = process.env.LINE_MESSAGE_API_KEY

    const data = await request.json();

    if (data) {
        const res = await fetch("https://api.line.me/v2/bot/message/push", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${CHANNEL_ACCESS_TOKEN}`,
            },
            body: JSON.stringify({
                to: "C1559676f63543d15a5c1f5bb52180c49",
                messages: [
                    {
                        type: "text",
                        text: data.text,
                    },
                ],
            }),
        });
        return res;
    }else {
        return new Response("Error, No booking data found" , {status : 400})
    }
}