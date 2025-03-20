import { createFormulaSheet, getFormulaSheetByYear, getFormulaSheets, getPDF, IGetSheet } from "@/services/formulaSheet.services";
import { F_TYPE, SubjectYear } from "@prisma/client";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";



export const formulaSheet = new Hono()
    .post("/admin", async (c) => {
        try {
            const body = await c.req.parseBody();
            await createFormulaSheet(body, c);
            return c.json({ message: "successfully added" }, 201);
        } catch (error: any) {
            console.log(error)
            throw new HTTPException(500, { message: error.message || "Internal Server Error" })
        }
    })
    .get("/admin", async (c) => {
        try {
            const query = await c.req.query();
            const formulaSheets = await getFormulaSheets({ page: query.page, offset: query.offset, subjectId: query.subjectId, type: query.type as F_TYPE });
            return c.json({ formulaSheets }, 200);
        } catch (error: any) {
            console.log(error.message)
            throw new HTTPException(500, { message: error.message || "Internal Server Error" })
        }
    })
    .get("/", async (c) => {
        try {
            const query = await c.req.query();
            const formulaSheets = await getFormulaSheetByYear(query.year as SubjectYear);
            const data = formulaSheets.find(formula => {
                if (formula.Formula.length > 0) {
                    return formula.Formula;
                }
            });
            return c.json({ formulaSheets: data }, 200);
        } catch (error: any) {
            console.log(error.message)
            throw new HTTPException(500, { message: error.message || "Internal Server Error" })
        }
    })
    .get("/get-pdf", async (c) => {
        try {
            const query = await c.req.query();
            const url = await getPDF(query.pdfId);
           
            return c.json({ url }, 200);
        } catch (error: any) {
            console.log(error.message)
            throw new HTTPException(500, { message: error.message || "Internal Server Error" })
        }
    })