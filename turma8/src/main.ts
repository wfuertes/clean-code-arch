import express from "express";
import Item from "./domain/entities/Item";
import Catalog from "./application/Catalog";
import Checkout from "./application/Checkout";
import Dimension from "./domain/entities/Dimension";
import ItemController from "./infra/ItemController";
import OrderController from "./infra/OrderController";
import GetOrdersByCpf from "./application/GetOrdersByCpf";
import ShippingCost from "./application/ShippingCost";
import OrderPreview from "./application/OrderPreview";
import InMemoryRepositoryFactory from "./infra/database/InMemoryRepositoryFactory";
import GetOrderByCode from "./application/GetOrdersByCode";
import PostalCode from "./domain/entities/PostalCode";
import Coordinate from "./domain/entities/Coordinate";

const app = express();
app.use(express.json());

const repositoryFactory = new InMemoryRepositoryFactory();

repositoryFactory.createItemRepository().save(new Item('1', 'Guitarra', 1000, new Dimension(30, 100, 15, 3)));
repositoryFactory.createItemRepository().save(new Item('2', 'Cubo', 500, new Dimension(50, 50, 30, 5)));
repositoryFactory.createItemRepository().save(new Item('3', 'Gabos', 100, new Dimension(10, 20, 2, 1)));

repositoryFactory.createPostalCodeRepository().save(new PostalCode('01251000', 'Rua Cardoso de Almeida 1690', 'Sumare', 'SP', new Coordinate(-23.5443440, -46.6733857)));
repositoryFactory.createPostalCodeRepository().save(new PostalCode('65095110', 'Travessa Deputado João Alberto', 'Tibiri', 'MA', new Coordinate(-2.5391099, -44.2828999)));

const orderPreview = new OrderPreview(repositoryFactory);
const checkout = new Checkout(repositoryFactory);
const listOrders = new GetOrdersByCpf(repositoryFactory);
const getOrderByCode = new GetOrderByCode(repositoryFactory);
const shippingCost = new ShippingCost(repositoryFactory);
const orderController = new OrderController(orderPreview, checkout, listOrders, getOrderByCode, shippingCost);

const catalog = new Catalog(repositoryFactory);
const itemsController = new ItemController(catalog);

app.use(orderController.router);
app.use(itemsController.router);

app.listen(3000, () => console.log("Server started on port 3000"));