import { addRepatedQuestion, getRepeatedQuestions } from "@/services/reapted.services";
import { Hono } from "hono";



export const repeatedQna = new Hono();

repeatedQna.post('/add', async (c) => {
    const body = await c.req.parseBody();
    await addRepatedQuestion(body, c);
    return c.json({ message: 'Done' }, 201)
}).get("/", async (c) => {
    const repeatedQuestions = await getRepeatedQuestions();
    // console.log("THIS", repeatedQuestions)
    return c.json({ repeatedQuestions }, 200)
})
