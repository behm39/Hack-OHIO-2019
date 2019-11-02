create table if not exists ROOT (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    val TEXT TYPE UNIQUE NOT NULL
); 

create table if not exists NODE (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    root INTEGER NOT NULL,
    val TEXT NOT NULL,
    count INTEGER NOT NULL,
    parent INTEGER NOT NULL,
    
    FOREIGN KEY (root) REFERENCES ROOT(id),
    FOREIGN KEY (parent) REFERENCES NODE(id)
);