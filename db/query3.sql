(SELECT 
    MAX(T.soPopular)
FROM
    (SELECT 
        COUNT(event.clientId) AS soPopular, event.serviceId
    FROM
        event
    GROUP BY event.serviceId) as T) as T2;

