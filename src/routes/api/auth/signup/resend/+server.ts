export interface SignupResend {
    id: number;
}

const BP_ENDPOINT = "http://localhost/www/atlanize/wp-json/buddypress/v1/signup/resend";

export const POST = async ({ request }: { request: Request }) => {
    const body = await request.json() as SignupResend;
    const signupRes = await fetch(BP_ENDPOINT, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
    const data = await signupRes.json();
    return Response.json(data);
}