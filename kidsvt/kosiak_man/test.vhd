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
  P1 <= '1', '0' after 10 NS, '1' after 20 NS, '1' after 30 NS, '0' after 40 NS, '0' after 50 NS, '0' after 60 NS, '1' after 70 NS, '0' after 80 NS;
  P2 <= '0', '1' after 10 NS, '0' after 20 NS, '1' after 30 NS, '0' after 40 NS, '0' after 50 NS, '1' after 60 NS, '0' after 70 NS, '0' after 80 NS;
  P3 <= '0', '0' after 10 NS, '1' after 20 NS, '1' after 30 NS, '0' after 40 NS, '1' after 50 NS, '1' after 60 NS, '0' after 70 NS, '1' after 80 NS;
  P4 <= '0', '1' after 10 NS, '0' after 20 NS, '0' after 30 NS, '0' after 40 NS, '0' after 50 NS, '1' after 60 NS, '1' after 70 NS, '1' after 80 NS;
  M: hohoh port map (P1, P2, P3, P4, C1, C2, C4);
end BENCH;
