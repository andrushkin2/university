SELECT distinct
    employee.vocation, employee.lastName, employee.passportId, count(serviceEmployeeHash.serviceId) as servicesCount
FROM
    employee,
    vocation,
    serviceEmployeeHash
WHERE
	employee.vocation = vocation.id and employee.passportId = serviceEmployeeHash.employeeId
    
group by employee.passportId;


SELECT 
    vocation.*, COUNT(T.servicesCount)
FROM
    vocation,
    employee,
    (SELECT 
			count(serviceEmployeeHash.serviceId) as servicesCount
		FROM
			employee,
			vocation,
			serviceEmployeeHash
		WHERE
			employee.vocation = vocation.id and employee.passportId = serviceEmployeeHash.employeeId
			
		group by employee.passportId) as T
WHERE
    vocation.id = employee.vocation
GROUP BY vocation.id;