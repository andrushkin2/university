library IEEE;
use IEEE.STD_LOGIC_1164.all;


ENTITY hohoh IS
	port (PRL, CLRL, CLK, J, KL: in STD_LOGIC;
 	     D1, D2 : inout STD_LOGIC);
END hohoh ;

ARCHITECTURE ha OF hohoh IS
	signal A1, A2, B1, C1, C2, C3: STD_LOGIC;
BEGIN
	A1 <= C3 AND CLRL AND J AND D2 after 4 NS;
	A2 <= CLRL AND KL AND D1 after 2 NS;
	B1 <= A1 OR A2 after 2 NS;
	C1 <= NOT(PRL AND B1 AND C2) after 3 NS;
	C2 <= NOT(C1 AND CLRL AND CLK) after 3 NS;
	C3 <= NOT(C2 AND CLK AND B1) after 3 NS;
	D1 <= NOT(PRL AND C2 AND D2) after 3 NS;
	D2 <= NOT(D1 AND C3 AND CLRL) after 3 NS;
END ha;
