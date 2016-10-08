import java.awt.Container;
import java.awt.EventQueue;

import javax.swing.JButton;
import javax.swing.JFrame;

public class FrameDemo {
	public static void main(String[] args) {
		EventQueue.invokeLater(new Runnable() {
			public void run() {
				
				JFrame frame = new JFrame();
				frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
				
				//frame.setLocation(500, 500);
				
				frame.setVisible(true);

				Container contentPane = frame.getContentPane();
				JButton btn = new JButton("Click me!");
				contentPane.add(btn);
				
				//frame.add(btn);
				frame.pack();
			}
		});
	}
}