import { redirect } from "@sveltejs/kit";

export const load = ({ params }: { params: { identifier: string } }) => {
    const identifier = params.identifier;
    redirect(307, `${identifier}/records`);
};