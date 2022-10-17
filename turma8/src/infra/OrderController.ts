import express from "express";
import Checkout, { CheckoutInput, CheckoutItem } from "../application/Checkout";
import GetOrderByCode from "../application/GetOrdersByCode";
import GetOrdersByCpf from "../application/GetOrdersByCpf";
import OrderPreview from "../application/OrderPreview";
import ShippingCost, { ShippingCostInput } from "../application/ShippingCost";

export default class OrderController {
    public readonly router: express.Router;

    constructor(
        private readonly orderPreview: OrderPreview,
        private readonly checkout: Checkout,
        private readonly getOrdersByCpf: GetOrdersByCpf,
        private readonly getOrderByCode: GetOrderByCode,
        private readonly shippingCost: ShippingCost
    ) {
        this.router = express.Router();
        this.router.post('/orders/checkout', async (req, res) => {
            const checkoutInput: CheckoutInput = {
                cpf: req.body.cpf,
                date: new Date(),
                from: req.body.from,
                to: req.body.to,
                items: req.body.items as CheckoutItem[],
                ...(req.body.coupon && { coupon: req.body.coupon })
            };
            await this.checkout.execute(checkoutInput);
            res.status(201).send();
        });

        this.router.post('/orders/preview', async (req, res) => {
            const orderPreviewInput = {
                cpf: req.body.cpf,
                issueDate: new Date(),
                items: req.body.items
            };
            const orderPreviewOutput = await this.orderPreview.execute(orderPreviewInput);
            res.status(201).send(orderPreviewOutput);
        });

        this.router.get('/orders', async (req, res) => {
            const cpf = req.query.cpf as string;
            res.status(200).send(await this.getOrdersByCpf.execute(cpf));
        });

        this.router.get('/orders/:orderCode', async (req, res) => {
            const orderCode = req.params.orderCode as string;
            this.getOrderByCode.execute(orderCode).then(order => {
                if (!order) return res.status(404).send({ message: 'Order not found' });
                res.status(200).send(order);
            });
        });

        this.router.post('/orders/shipping-cost', async (req, res) => {
            const input: ShippingCostInput = {
                from: req.body.from,
                to: req.body.to,
                items: req.body.items,
            };
            const cost = await this.shippingCost.calculate(input);
            res.status(201).send({ cost });
        });
    }
}