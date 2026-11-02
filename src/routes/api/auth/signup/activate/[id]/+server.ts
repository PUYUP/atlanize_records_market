export const PUT = async ({ params }: { params: { id: string } }) => {
    const BP_ENDPOINT = `http://localhost/www/atlanize/wp-json/buddypress/v1/signup/activate/${params.id}`;
    const signupRes = await fetch(BP_ENDPOINT, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
    const data = await signupRes.json();
    return Response.json(data);
}