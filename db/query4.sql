SELECT DISTINCT
    vocation.name as vocationName,
    service.name as serviceName
FROM
    employee,
    vocation,
    service,
    serviceEmployeeHash
WHERE
    employee.vocation = vocation.id
        AND employee.passportId = serviceEmployeeHash.employeeId
        AND serviceEmployeeHash.serviceId = service.id
GROUP BY employee.vocation, service.name;

