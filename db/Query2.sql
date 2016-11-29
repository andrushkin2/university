SELECT 
    *
FROM
    service
WHERE
    service.id NOT IN (SELECT DISTINCT
            service.id AS id
        FROM
            hole,
            event,
            service
        WHERE
            event.serviceId = id
                AND event.holeId = 1);

