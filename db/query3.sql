SELECT 
    service.id, service.name, service.comment
FROM
    service
WHERE
    service.id = (SELECT 
            MAX(T.soPopular) AS popularServiceId
        FROM
            (SELECT 
                COUNT(event.clientId) AS soPopular,
                    event.serviceId AS service
            FROM
                event
            GROUP BY event.serviceId) AS T);

