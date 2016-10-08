import java.awt.FlowLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;
import java.awt.event.WindowListener;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JTextField;

public class ActionDemo extends JFrame implements ActionListener {
	JTextField text = new JTextField(20);
	JButton b;
	private int numClicks = 0;

	public static void main(String[] args) {
		ActionDemo myWindow = new ActionDemo("Clicks counter");
		myWindow.setSize(350, 100);
		myWindow.setVisible(true);
	}

	public ActionDemo(String title) {

		super(title);
		setLayout(new FlowLayout());
		WindowListener lstnr = new Terminator();
		addWindowListener(lstnr);
		b = new JButton("Click me");
		add(b);
		add(text);
		b.addActionListener(this);
	}

	public void actionPerformed(ActionEvent e) {
		numClicks++;
		text.setText("Button Clicked " + numClicks + " times");
	}

	// public void windowClosing(WindowEvent e) {
	// dispose();
	// System.exit(0);
	// }
	//
	// public void windowOpened(WindowEvent e) {
	// }
	//
	// public void windowActivated(WindowEvent e) {
	// }
	//
	// public void windowIconified(WindowEvent e) {
	// }
	//
	// public void windowDeiconified(WindowEvent e) {
	// }
	//
	// public void windowDeactivated(WindowEvent e) {
	// }
	//
	// public void windowClosed(WindowEvent e) {
	// }

	class Terminator extends WindowAdapter {

		public void windowClosing(WindowEvent e) {
			dispose();
			System.exit(0);
		}
	}
}