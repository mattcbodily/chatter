create table if not exists chat_users (
    user_id serial primary key,
    first_name varchar(50) not null,
    last_name varchar(50) not null,
    email varchar(250) not null,
    password varchar(250) not null
);