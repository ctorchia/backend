export const colors = [];

export const createColor = async (ctx) => {
    const body = ctx.request.body({ type: "form" });
    const value = body.value;
    const color = (await value).get("color");
    colors.push(color);
    ctx.response.redirect("/");
}