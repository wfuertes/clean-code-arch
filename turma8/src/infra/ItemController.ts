import express from "express";
import Catalog from "../application/Catalog";

export default class ItemController {
    public readonly router: express.Router;

    constructor(private readonly catalog: Catalog) {
        this.router = express.Router();
        this.router.get('/items/catalog', async (_req, res) => {
            const items = await this.catalog.list();
            res.status(200).send(items);
        });
    }
}