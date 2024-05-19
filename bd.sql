

create table cat_usuario(
    id int auto_increment primary key,
    correo varchar(100),
    whatsapp varchar(25),
    nombre varchar(30),
    app varchar(30),
    apm varchar(30),
    tutor varchar(35),
    grado varchar(2),
);

create table cat_test(
    id int auto_increment primary key,
    nombre varchar(100),
    nivel varchar(1)
    elabora varchar(100)
);

create table cat_pregunta(
    id int auto_increment primary key,
    preg varchar(50),
    id_test int,
    img varchar(250),
    foreign key(id_test) references cat_test(id)
);

create table cat_respuesta(
    id int auto_increment primary key,
    resp varchar(100),
    img varchar(250),
    id_preg int,
    correcto boolean,
    foreign key(id_preg) references cat_pregunta(id)
);

create table rel_alumno_pregres(
    id int auto_increment primary key,
    id_usuario int,
    id_resp int,
    fecha timestamp null,
    intento int
);

create table cat_mensajes(
    id int auto_increment primary key,
    asunto varchar(35),
    cuerpo text,
    fecha timestamp null
    tipo int
);



