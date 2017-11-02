
library IEEE;
use IEEE.STD_LOGIC_1164.all;
ENTITY N IS
	port(
	A: in STD_LOGIC;
	F: out STD_LOGIC);
END N;
ARCHITECTURE Arch_N OF N IS
Begin
	F <= NOT A after 1 ns;

END Arch_N;

library IEEE;
use IEEE.STD_LOGIC_1164.all;
ENTITY NA2 IS
	port(
	A, B: in STD_LOGIC;
	F: out STD_LOGIC);
END NA2;
ARCHITECTURE Arch_NA2 OF NA2 IS
Begin
	F <= A NAND B after 2 ns;

END Arch_NA2;

library IEEE;
use IEEE.STD_LOGIC_1164.all;
ENTITY NO2 IS
	port(
	A,B: in STD_LOGIC;
	F: out STD_LOGIC
	);	
END NO2;
ARCHITECTURE Arch_NO2 OF NO2 IS
BEGIN
	F <= NOT(A OR B) after 3 ns;
END Arch_NO2;

library IEEE;
use IEEE.STD_LOGIC_1164.all;
ENTITY NEX2 IS
	port(
	A,B: in STD_LOGIC;
	F: out STD_LOGIC
	);	
END NEX2;
ARCHITECTURE Arch_NEX2 OF NEX2 IS
BEGIN
	F <= A XOR B after 5 NS;
END Arch_NEX2;

library IEEE;
use IEEE.STD_LOGIC_1164.all;
ENTITY NAO3 IS
	port(
	A,B,C,D: in STD_LOGIC;
	F: out STD_LOGIC
	);	
END NAO3;
ARCHITECTURE Arch_NAO3 OF NAO3 IS
BEGIN
	F <= NOT (A AND (B OR C OR D)) after 5 NS;
END Arch_NAO3;

library IEEE;
use IEEE.STD_LOGIC_1164.all;
ENTITY NAOA2 IS
	port(
	A,B,C,D: in STD_LOGIC;
	F: out STD_LOGIC
	);	
END NAOA2;
ARCHITECTURE Arch_NAOA2 OF NAOA2 IS
BEGIN
	F <= NOT (A AND (B OR (C AND D))) after 4 NS;
END Arch_NAOA2;


library IEEE;
use IEEE.STD_LOGIC_1164.all;

ENTITY hohoh IS
	port (P1, P2, P3, P4: in STD_LOGIC;
 	     C1, C2 : out STD_LOGIC;
 	     C4 : inout STD_LOGIC);
END hohoh ;
ARCHITECTURE ha OF hohoh IS

component N
port(
	A: in STD_LOGIC;
	F: out STD_LOGIC);
end component;

component NEX2
port(
	A,B: in STD_LOGIC;
	F: out STD_LOGIC);
end component;

component NA2
port(
	A,B: in STD_LOGIC;
	F: out STD_LOGIC);
end component;

component NO2
port(
	A,B: in STD_LOGIC;
	F: out STD_LOGIC);
end component;

component NAO3
port(
	A,B,C,D: in STD_LOGIC;
	F: out STD_LOGIC);
end component;

component NAOA2
port(
	A,B,C,D: in STD_LOGIC;
	F: out STD_LOGIC);
end component;

signal A1, A4, A2, A6, A3, A5: STD_LOGIC;
BEGIN
	sA1: NEX2 port map (P4, P1, A1);
	sA4: N port map (P3, A4);
	sA2: NO2 port map (P3, A1, A2);
	sA6: NA2 port map (A4, P2, A6);
	sC4: NAO3 port map (A6, P2, A4, P4, C4);
	sA3: N port map (C4, A3);
	sA5: NAOA2 port map (A3, A2, P4, P2, A5);
	sC2: NAO3 port map (A5, A3, P2, P1, C2);
	sC1: N port map (P1, C1);
END ha;
