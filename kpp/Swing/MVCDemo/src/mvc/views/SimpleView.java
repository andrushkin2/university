package mvc.views;

import java.awt.BorderLayout;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.SwingConstants;

import mvc.models.SimpleModel;

public class SimpleView {
	private JFrame frame;
	private JLabel label;
	private JButton button;
	
	private SimpleModel model; 
	

	public SimpleView(String text) {
		frame = new JFrame("View");
		frame.getContentPane().setLayout(new BorderLayout());
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		frame.setSize(200, 200);
		frame.setLocation(500, 300);
		frame.setVisible(true);

		label = new JLabel(text);
		label.setHorizontalAlignment(SwingConstants.CENTER);
		
		frame.getContentPane().add(label, BorderLayout.CENTER);

		button = new JButton("Button");
		frame.getContentPane().add(button, BorderLayout.SOUTH);
	}

	public JButton getButton() {
		return button;
	}

	public void setText(String text) {
		label.setText(text);
	}
	
	public void setModel(SimpleModel model) {
		this.model = model;
		this.model.subscribe(new SimpleModel.ChangeListener() {
			@Override
			public void onChange() { 
				updateView();
			}
		});
		//this.model.subscribe(this::updateView);
	}
	
	
	public void updateView(){
		setText(Integer.toString(model.getX())); // 2: прочитать содержимое
	}
}
