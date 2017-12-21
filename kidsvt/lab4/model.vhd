

library IEEE;
use IEEE.STD_LOGIC_1164.all;
ENTITY A4 IS
	port(
	A, B, C, D: in STD_LOGIC;
	F: out STD_LOGIC);
END A4;
ARCHITECTURE Arch_A4 OF A4 IS
Begin
	F <= A AND B AND C AND D after 4 ns;

END Arch_A4;




library IEEE;
use IEEE.STD_LOGIC_1164.all;
ENTITY A3 IS
	port(
	A, B, C: in STD_LOGIC;
	F: out STD_LOGIC);
END A3;
ARCHITECTURE Arch_A3 OF A3 IS
Begin
	F <= A AND B AND C after 3 ns;

END Arch_A3;




library IEEE;
use IEEE.STD_LOGIC_1164.all;
ENTITY O2 IS
	port(
	A, B: in STD_LOGIC;
	F: out STD_LOGIC);
END O2;
ARCHITECTURE Arch_O2 OF O2 IS
Begin
	F <= A OR B after 2 ns;

END Arch_O2;




library IEEE;
use IEEE.STD_LOGIC_1164.all;
ENTITY NA3 IS
	port(
	A, B, C: in STD_LOGIC;
	F: out STD_LOGIC);
END NA3;
ARCHITECTURE Arch_NA3 OF NA3 IS
Begin
	F <= NOT (A AND B AND C) after 3 ns;

END Arch_NA3;




library IEEE;
use IEEE.STD_LOGIC_1164.all;

ENTITY hohoh IS
	port (PRL, CLRL, CLK, J, KL: in STD_LOGIC;
 	     D1, D2 : inout STD_LOGIC);
END hohoh ;
ARCHITECTURE ha OF hohoh IS

component A4
port(
	A, B, C, D: in STD_LOGIC;
	F: out STD_LOGIC);
end component;

component A3
port(
	A, B, C: in STD_LOGIC;
	F: out STD_LOGIC);
end component;

component O2
port(
	A, B: in STD_LOGIC;
	F: out STD_LOGIC);
end component;

component NA3
port(
	A, B, C: in STD_LOGIC;
	F: out STD_LOGIC);
end component;



signal A1, A2, B1, C1, C2, C3: STD_LOGIC;
BEGIN
	sA1: A4 port map (C3, CLRL, J, D2, A1);
	sA2: A3 port map (CLRL, KL, D1, A2);
	sB1: O2 port map (A1, A2, B1);
	sC1: NA3 port map (PRL, B1, C2, C1);
	sC2: NA3 port map (C1, CLRL, CLK, C2);
	sC3: NA3 port map (C2, CLK, B1, C3);
	sD1: NA3 port map (PRL, C2, D2, D1);
	sD2: NA3 port map (D1, C3, CLRL, D2);
END ha;
