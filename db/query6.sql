SET @ids = (SELECT 
	service.id as ids
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
            event));
            
		
DELETE FROM service 
WHERE
    service.id IN (@ids);
