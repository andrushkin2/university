CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8;
CREATE TABLE IF NOT EXISTS `mydb`.`client` (
    `passportId` INT NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(45) NOT NULL,
    `lastName` VARCHAR(45) NOT NULL,
    PRIMARY KEY (`passportId`),
    UNIQUE INDEX `passportId_UNIQUE` (`passportId` ASC)
);
CREATE TABLE IF NOT EXISTS `mydb`.`vocation` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `id_UNIQUE` (`id` ASC),
    UNIQUE INDEX `name_UNIQUE` (`name` ASC)
);
CREATE TABLE IF NOT EXISTS `mydb`.`employee` (
    `passportId` INT NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(45) NOT NULL,
    `lastName` VARCHAR(45) NOT NULL,
    `vocation` INT NOT NULL,
    PRIMARY KEY (`passportId`),
    UNIQUE INDEX `passportId_UNIQUE` (`passportId` ASC),
    INDEX `fk_employee_employee_idx` (`vocation` ASC),
    CONSTRAINT `fk_employee_employee` FOREIGN KEY (`vocation`)
        REFERENCES `mydb`.`vocation` (`id`)
        ON DELETE NO ACTION ON UPDATE NO ACTION
);
CREATE TABLE IF NOT EXISTS `mydb`.`service` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NOT NULL,
    `comment` VARCHAR(250) NULL,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `id_UNIQUE` (`id` ASC)
);  
CREATE TABLE IF NOT EXISTS `mydb`.`serviceEmployeeHash` (
    `serviceId` INT NOT NULL,
    `employeeId` INT NOT NULL,
    INDEX `fk_serviceId_idx` (`serviceId` ASC),
    INDEX `fk_employeeId_idx` (`employeeId` ASC),
    PRIMARY KEY (`serviceId` , `employeeId`),
    CONSTRAINT `fk_serviceId` FOREIGN KEY (`serviceId`)
        REFERENCES `mydb`.`service` (`id`)
        ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT `fk_employeeId` FOREIGN KEY (`employeeId`)
        REFERENCES `mydb`.`employee` (`passportId`)
        ON DELETE NO ACTION ON UPDATE NO ACTION
);
CREATE TABLE IF NOT EXISTS `mydb`.`hole` (
    `number` INT NOT NULL AUTO_INCREMENT,
    `comment` VARCHAR(250) NULL,
    PRIMARY KEY (`number`),
    UNIQUE INDEX `id_UNIQUE` (`number` ASC)
);
CREATE TABLE IF NOT EXISTS `mydb`.`event` (
    `date` DATETIME NOT NULL,
    `clientId` INT NOT NULL,
    `serviceId` INT NOT NULL,
    `holeId` INT NOT NULL,
    `emplyeeId` INT NOT NULL,
    `comment` VARCHAR(250) NULL,
    PRIMARY KEY (`clientId` , `serviceId` , `holeId` , `emplyeeId` , `date`),
    INDEX `fk_serviceId_idx` (`serviceId` ASC),
    INDEX `fk_holeId_idx` (`holeId` ASC),
    INDEX `fk_clientId_idx` (`clientId` ASC),
    INDEX `fk_emplyeeId_idx` (`emplyeeId` ASC),
    CONSTRAINT `fk_clientIdEvent` FOREIGN KEY (`clientId`)
        REFERENCES `mydb`.`client` (`passportId`)
        ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT `fk_serviceIdEvent` FOREIGN KEY (`serviceId`)
        REFERENCES `mydb`.`service` (`id`)
        ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT `fk_emplyeeIdEvent` FOREIGN KEY (`emplyeeId`)
        REFERENCES `mydb`.`employee` (`passportId`)
        ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT `fk_holeIdEvent` FOREIGN KEY (`holeId`)
        REFERENCES `mydb`.`hole` (`number`)
        ON DELETE NO ACTION ON UPDATE NO ACTION
)  ENGINE=INNODB