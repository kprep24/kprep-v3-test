import jwt from "jsonwebtoken";

type IInvitationToken = {
    email: string;
}

interface IInvitationPayload extends jwt.JwtPayload {
    email: string;
}


//

const { ADMIN_INVITATION_TOKEN, ADMIN_INVITATION_EXPIRY } = process.env;

export const createInvitationToken = (payload: IInvitationToken) => {
    const { email } = payload;
    if (!ADMIN_INVITATION_TOKEN || !ADMIN_INVITATION_EXPIRY) {
        throw new Error("Missing required environment variables");
    }
    try {
        return jwt.sign({ email }, ADMIN_INVITATION_TOKEN as jwt.Secret, { expiresIn: "15m" } as jwt.SignOptions);
    } catch (error) {
        throw new Error("Error while creating token");
    }
}



export const verifyInvitationToken = (token: string): IInvitationPayload => {
    try {
        return jwt.verify(token, ADMIN_INVITATION_TOKEN!) as IInvitationPayload;
    } catch (error) {
        throw new Error("Error while verifying token");
    }
}

