drop table if exists mydb.eventOfUser;

CREATE TABLE eventOfUser SELECT * FROM
    event
WHERE
    event.clientId = 111111;