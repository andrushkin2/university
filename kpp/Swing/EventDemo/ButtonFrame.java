import java.awt.Color;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JPanel;

public class ButtonFrame extends JFrame {
	public class ColorAction implements ActionListener {
		private Color bckgColor;
		
		public ColorAction(Color c) {
				bckgColor = c;
		}

		@Override
		public void actionPerformed(ActionEvent e) { // тот самый единственный метод
			buttonPanel.setBackground(bckgColor);
		}
	}

	private JPanel buttonPanel;
	public static final int WIDTH = 200;
	public static final int HEIGHT = 200;

	public ButtonFrame() {
		setTitle("EventDemo");
		setSize(WIDTH, HEIGHT);

		JButton redButton = new JButton("Red");  // на диаграмме  - new JButton
		JButton yellowButton = new JButton("Yellow");
		JButton greenButton = new JButton("Green");

		buttonPanel = new JPanel();

		buttonPanel.add(redButton);
		buttonPanel.add(yellowButton);
		buttonPanel.add(greenButton);

		add(buttonPanel);
		
		ColorAction redAction = new ColorAction(Color.RED); // на диаграмма - new MyListener
		ColorAction yellowAction = new ColorAction(Color.YELLOW);
		ColorAction greenAction = new ColorAction(Color.GREEN);
		
		redButton.addActionListener(redAction); // на диаграмме так и называется
		yellowButton.addActionListener(yellowAction);
		greenButton.addActionListener(greenAction);

	}
}
