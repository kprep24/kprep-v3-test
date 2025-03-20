import SendInvitation from "@/helpers/email/sendInvitation";
import { NextRequest } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
    try {


        const reqBody = await request.json();
        const { firstName, role, url, email } = reqBody;
        const { data, error } = await resend.emails.send({
            from: "admin@kprep.in",
            to: email,
            subject: "Join as a Member",
            react: SendInvitation({
                firstName,
                role,
                token: url,
            }),
        });


        if (error) {
            return Response.json({ error }, { status: 500 });
        }

        return Response.json(data);
    } catch (error) {
        return Response.json({ error }, { status: 500 });
    }
}