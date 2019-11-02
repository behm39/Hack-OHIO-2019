create table if not exists NODE (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    val TEXT NOT NULL,
    count INTEGER NOT NULL,
    parent INTEGER, -- if parent == NULL, we're a root
    FOREIGN KEY (parent) REFERENCES NODE(id)
);