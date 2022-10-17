create database maverik;

create table orders
(
    id         varchar(38) not null,
    cpf        varchar(38) not null,
    created_at date        not null,
    primary key (id)
);

create index orders_cpf_idx on orders (created_at);

create table items
(
    item_id   varchar(38)    not null,
    price     decimal(14, 2) not null,
    width_cm  int            not null,
    height_cm int            not null,
    depth_cm  int            not null,
    weight_kg int            not null,
    primary key (item_id)
);

create table order_items
(
    order_id  varchar(38)    not null,
    item_id   varchar(38)    not null,
    price     decimal(14, 2) not null,
    quantity  int            not null,
    width_cm  int            not null,
    height_cm int            not null,
    depth_cm  int            not null,
    weight_kg int            not null,
    primary key (order_id, item_id)
);