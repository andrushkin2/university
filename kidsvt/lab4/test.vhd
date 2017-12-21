entity TEST_Test is
end;
library IEEE;
use IEEE.STD_LOGIC_1164.all;
architecture BENCH of TEST_Test is
  component hohoh
    port (PRL, CLRL, CLK, J, KL: in STD_LOGIC;
 	     D1, D2 : inout STD_LOGIC);
  end component;
  signal PRL, CLRL, CLK, J, KL, D1, D2: STD_LOGIC;
begin
  PRL <= '0', '0' after 100 NS, '1' after 200 NS, '1' after 300 NS, '1' after 400 NS, '1' after 500 NS, '1' after 600 NS, '1' after 700 NS, '1' after 800 NS, '1' after 900 NS, '1' after 1000 NS, '1' after 1100 NS;
  CLRL <= '1', '0' after 100 NS, '0' after 200 NS, '1' after 300 NS, '1' after 400 NS, '1' after 500 NS, '1' after 600 NS, '1' after 700 NS, '1' after 800 NS, '1' after 900 NS, '1' after 1000 NS, '1' after 1100 NS;
  CLK <= '1', '1' after 100 NS, '0' after 200 NS, '0' after 300 NS, '1' after 400 NS, '0' after 500 NS, '1' after 600 NS, '0' after 700 NS, '1' after 800 NS, '0' after 900 NS, '1' after 1000 NS, '0' after 1100 NS;
  J <= '1', '0' after 100 NS, '1' after 200 NS, '1' after 300 NS, '0' after 400 NS, '0' after 500 NS, '1' after 600 NS, '0' after 700 NS, '0' after 800 NS, '1' after 900 NS, '1' after 1000 NS, '0' after 1100 NS;
  KL <= '1', '0' after 100 NS, '1' after 200 NS, '1' after 300 NS, '0' after 400 NS, '1' after 500 NS, '0' after 600 NS, '1' after 700 NS, '1' after 800 NS, '1' after 900 NS, '1' after 1000 NS, '0' after 1100 NS;

M: hohoh port map (PRL, CLRL, CLK, J, KL, D1, D2);
end BENCH;
