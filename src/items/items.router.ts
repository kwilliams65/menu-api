/**
 * Required External Modules and Interfaces
 */

import express, { Request, Response } from "express";
import * as ItemService from "./items.service";
import { BaseItem, Item } from "./item.interface";

/**
 * Router Definition
 */

export const itemsRouter = express.Router();

/**
 * Controller Definitions
 */

// GET items

itemsRouter.get('/', async (req: Request, res: Response) => {
    try {
        const items: Item[] = await ItemService.findAll();

        res.status(200).json(items);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

// GET items/:id

itemsRouter.get("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    try {
        const item: Item = await ItemService.find(id);

        if (item) {
            res.status(200).json(item);
        } else {
            res.status(404).send("Item not found");
        }
    } catch (e) {
        res.status(500).send(e.message);
    }
});

// POST items

itemsRouter.post("/", async (req: Request, res: Response) => {
    try {
        const item: BaseItem = req.body;

        const resultItem = ItemService.create(item);

        res.status(201).json(resultItem);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

// PUT items/:id

itemsRouter.put("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    try {
        const itemUpdate: Item = req.body;

        const existingItem = await ItemService.find(id);

        if (existingItem) {
            const item: Item | null = await ItemService.update(id, req.body);

            if (!item) {
                res.status(404).send("Item not found");
            } else {
                res.status(200).json(item);
            }
        } else {
            const newItem = await ItemService.create(itemUpdate);

            res.status(201).json(newItem);
        }
    }
    catch (e) {
        res.status(500).send(e.message)
    }
});

// DELETE items/:id

itemsRouter.delete("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    try {
        await ItemService.remove(id);

        res.sendStatus(204);
    } catch (e) {
        res.status(500).send(e.message);
    }
});
