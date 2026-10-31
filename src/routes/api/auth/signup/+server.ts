export interface SignUpForm {
    user_login: string;
    user_password: string;
    email: string;
    signup_field_data: {
        field_id: number;
        value: string;
    }[];
}

const BP_ENDPOINT = "http://localhost/www/atlanize/wp-json/buddypress/v1/signup";

export const POST = async ({ request }: { request: Request }) => {
    const body = await request.json() as SignUpForm;
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