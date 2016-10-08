import java.awt.EventQueue;

import javax.swing.JFrame;

public class EventDemo {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		EventQueue.invokeLater(new Runnable() {
			public void run() {

				ButtonFrame btnFrame = new ButtonFrame();
				btnFrame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
				btnFrame.setVisible(true);
			}
		});
	}
}
