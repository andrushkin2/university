SELECT 
    service.*
FROM
    service
WHERE
    service.id NOT IN (SELECT DISTINCT
            serviceEmployeeHash.serviceId
        FROM
            serviceEmployeeHash)
        AND service.id NOT IN (SELECT DISTINCT
            event.serviceId
        FROM
            event);
