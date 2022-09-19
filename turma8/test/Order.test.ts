import Cpf from "../src/Cpf";
import Item from "../src/Item";
import Order from "../src/Order";

test('Deve criar um pedido com 3 itens (com descrição, preço e quantidade)', () => {
    const cpf = Cpf.of('013.955.728-87');
    const order = new Order(cpf);
    order.addItem(new Item('TV40 HDR', 5000), 1);
    order.addItem(new Item('PS5 Slim', 4000), 1);
    order.addItem(new Item('Sound System', 3000), 1);
    expect(order.items).toHaveLength(3);
});