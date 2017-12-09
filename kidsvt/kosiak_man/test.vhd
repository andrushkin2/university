entity TEST_Test is
end;
library IEEE;
use IEEE.STD_LOGIC_1164.all;
architecture BENCH of TEST_Test is
  component hohoh
    port (		P1, P2, P3, P4:in STD_LOGIC;
    		C1, C2 :out STD_LOGIC;
    		C4: inout STD_LOGIC);
  end component;
  signal P1, P2, P3, P4, C1, C2, C4: STD_LOGIC;
begin
  P1 <= '1', '0' after 100 NS, '0' after 200 NS, '0' after 300 NS, '0' after 400 NS, '0' after 500 NS, '0' after 600 NS, '1' after 700 NS, '1' after 800 NS;
  P2 <= '0', '1' after 100 NS, '0' after 200 NS, '0' after 300 NS, '1' after 400 NS, '0' after 500 NS, '1' after 600 NS, '0' after 700 NS, '0' after 800 NS;
  P3 <= '0', '0' after 100 NS, '1' after 200 NS, '0' after 300 NS, '1' after 400 NS, '1' after 500 NS, '1' after 600 NS, '0' after 700 NS, '1' after 800 NS;
  P4 <= '0', '1' after 100 NS, '0' after 200 NS, '0' after 300 NS, '0' after 400 NS, '1' after 500 NS, '1' after 600 NS, '1' after 700 NS, '0' after 800 NS;
  M: hohoh port map (P1, P2, P3, P4, C1, C2, C4);
end BENCH;
