            
drop table if exists mydb.employeeRate;

CREATE TABLE employeeRate (
    `rate` INT NOT NULL DEFAULT 0
) SELECT * FROM
    employee;




    
UPDATE employeeRate 
SET 
    rate = rate + 5
WHERE
    employeeRate.passportId = (
		SELECT 
            T.employee AS employeeId
        FROM
            (SELECT 
                COUNT(event.emplyeeId) AS soPopular,
                    event.emplyeeId AS employee
            FROM
                event
            GROUP BY event.emplyeeId DESC
            LIMIT 1) AS T);
            
            
