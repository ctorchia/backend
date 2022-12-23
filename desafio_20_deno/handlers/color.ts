export const colors = [];

export const createColor = async (ctx) => {
    const body = ctx.request.body({ type: "form" });
    const value = body.value;
    const color = (await value).get("color");
    if (color == "undefined" || color == ""){
        ctx.response.redirect("/");
        return;
    } else{
        colors.push(color);
    }
    ctx.response.redirect("/");
}