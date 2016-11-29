SELECT 
    serviceemployeehash.employeeId,
    employee.firstName,
    employee.lastName,
    serviceemployeehash.serviceId,
    service.name AS serviceName
FROM
    mydb.serviceemployeehash,
    mydb.service,
    mydb.employee
WHERE
    serviceemployeehash.serviceId = service.id
        AND serviceemployeehash.employeeId = employee.passportId
ORDER BY employeeId