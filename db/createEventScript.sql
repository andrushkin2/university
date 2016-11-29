DELETE FROM event;

select @clientId:= 111111,  @holeId:= 1, @serviceId:= 1, @emplyeeId:= 111115, @date:= '2016-11-29 14:00:00';

INSERT into event (date, holeId, clientId, serviceId, emplyeeId ) 
	SELECT distinct @date as date, @holeId as holeId, @clientId as clientId, @serviceId as serviceId, @emplyeeId as emplyeeId
		FROM serviceemployeehash 
			WHERE exists(select * from serviceemployeehash where serviceId = @serviceId and employeeId = @emplyeeId)
				AND exists(select * from hole where number = @holeId)
                AND exists(select * from client where passportId = @clientId);
                
select @clientId:= 111111,  @holeId:= 1, @serviceId:= 4, @emplyeeId:= 111117, @date:= '2016-11-29 15:00:00';

INSERT into event (date, holeId, clientId, serviceId, emplyeeId ) 
	SELECT distinct @date as date, @holeId as holeId, @clientId as clientId, @serviceId as serviceId, @emplyeeId as emplyeeId
		FROM serviceemployeehash 
			WHERE exists(select * from serviceemployeehash where serviceId = @serviceId and employeeId = @emplyeeId)
				AND exists(select * from hole where number = @holeId)
                AND exists(select * from client where passportId = @clientId);

select @clientId:= 111111,  @holeId:= 1, @serviceId:= 4, @emplyeeId:= 111117, @date:= '2016-11-28 10:00:00';

INSERT into event (date, holeId, clientId, serviceId, emplyeeId ) 
	SELECT distinct @date as date, @holeId as holeId, @clientId as clientId, @serviceId as serviceId, @emplyeeId as emplyeeId
		FROM serviceemployeehash 
			WHERE exists(select * from serviceemployeehash where serviceId = @serviceId and employeeId = @emplyeeId)
				AND exists(select * from hole where number = @holeId)
                AND exists(select * from client where passportId = @clientId);

select @clientId:= 111111,  @holeId:= 5, @serviceId:= 4, @emplyeeId:= 111117, @date:= '2016-11-28 15:00:00';

INSERT into event (date, holeId, clientId, serviceId, emplyeeId ) 
	SELECT distinct @date as date, @holeId as holeId, @clientId as clientId, @serviceId as serviceId, @emplyeeId as emplyeeId
		FROM serviceemployeehash 
			WHERE exists(select * from serviceemployeehash where serviceId = @serviceId and employeeId = @emplyeeId)
				AND exists(select * from hole where number = @holeId)
                AND exists(select * from client where passportId = @clientId);
                
select @clientId:= 111111,  @holeId:= 6, @serviceId:= 2, @emplyeeId:= 111117, @date:= '2016-11-27 10:00:00';

INSERT into event (date, holeId, clientId, serviceId, emplyeeId ) 
	SELECT distinct @date as date, @holeId as holeId, @clientId as clientId, @serviceId as serviceId, @emplyeeId as emplyeeId
		FROM serviceemployeehash 
			WHERE exists(select * from serviceemployeehash where serviceId = @serviceId and employeeId = @emplyeeId)
				AND exists(select * from hole where number = @holeId)
                AND exists(select * from client where passportId = @clientId);

select @clientId:= 111111,  @holeId:= 5, @serviceId:= 4, @emplyeeId:= 111117, @date:= '2016-11-27 11:00:00';

INSERT into event (date, holeId, clientId, serviceId, emplyeeId ) 
	SELECT distinct @date as date, @holeId as holeId, @clientId as clientId, @serviceId as serviceId, @emplyeeId as emplyeeId
		FROM serviceemployeehash 
			WHERE exists(select * from serviceemployeehash where serviceId = @serviceId and employeeId = @emplyeeId)
				AND exists(select * from hole where number = @holeId)
                AND exists(select * from client where passportId = @clientId);
