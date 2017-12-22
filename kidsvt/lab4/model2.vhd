
library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity lab4_3 is
    port (PRL, CLRL, CLK, J, KL: in STD_LOGIC;
 	     D1, D2 : inout STD_LOGIC);
end lab4_3;

architecture V1 of lab4_3 is
signal tempD1, tempD2: STD_LOGIC;

begin
	process (PRL, CLRL, CLK, J, KL, D1, D2)
	  begin
		assert not(PRL='1' and CLRL='1' and CLK'event and CLK='1' and J'event and KL'event) report "Error :(" severity error;

		if (PRL='1' and CLRL='1') then
			if (CLK'event and CLK='1' and J='0' and KL='0') then
				tempD1 <= '0';
				tempD2 <= '1';
			elsif (CLK'event and CLK='1' and J='1' and KL='0') then
				tempD1 <= not D1;
				tempD2 <= not D2;
			elsif (CLK'event and CLK='1' and J='0' and KL='1') then
				tempD1 <= D1;
				tempD2 <= D2;
			elsif (CLK'event and CLK='1' and J='1' and KL='1') then
				tempD1 <= '1';
				tempD2 <= '0';
			else
				tempD1 <= D1;
				tempD2 <= D2;
			end if;
		elsif (PRL='0' and CLRL='1') then
			tempD1 <= '1';
			tempD2 <= '0';
		elsif (PRL='1' and CLRL='0') then
			tempD1 <= '0';
			tempD2 <= '1';
		else
			tempD1 <= '1';
			tempD2 <= '1';
		end if;
	end process;

	D1 <= tempD1;
	D2 <= tempD2;
end V1;
