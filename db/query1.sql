SELECT DISTINCT
    *
FROM
    employee
WHERE
    employee.passportId IN (SELECT DISTINCT
            event.emplyeeId AS id
        FROM
            event,
            employee
        WHERE
            employee.passportId = event.emplyeeId
                AND event.clientId = 111111)