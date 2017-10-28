library IEEE;
use IEEE.STD_LOGIC_1164.all;


ENTITY hohoh IS
	port (P1, P2, P3, P4: in STD_LOGIC;
 	     C1, C2 : out STD_LOGIC;
 	     C4 : inout STD_LOGIC);
END hohoh ;

ARCHITECTURE ha OF hohoh IS
	signal A1, A4, A2, A6, A3, A5: STD_LOGIC;
BEGIN
	A1 <= P4 XOR P1 after 5 NS;
	A4 <= NOT P3	 after 1 NS;
	A2 <= P3 NOR A1 after 3 NS;
	A6 <= A4 NAND P2 after 2 NS;
	C4 <= NOT (A6 AND (P2 OR A4 OR P4)) after 5 NS;
	A3 <= NOT C4 after 1 NS;
	A5 <= NOT (A3 AND (A2 OR (P4 AND P2))) after 4 NS;
	C2 <= NOT (A5 AND (A3 OR P2 OR P1)) after 5 NS;
	C1 <= NOT P1 after 1 NS;
END ha;

