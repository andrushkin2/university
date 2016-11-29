DELETE FROM event;

INSERT into event (date, holeId, clientId, serviceId, emplyeeId ) 
	SELECT distinct '2016-11-29 14:00:00' as date, 1 as holeId, 111111 as clientId, 1 as serviceId, 111115 as emplyeeId
		FROM serviceemployeehash 
			WHERE exists(select * from serviceemployeehash where serviceId = 1 and employeeId = 111115)
				AND exists(select * from hole where number = 1)
                AND exists(select * from client where passportId = 111111);