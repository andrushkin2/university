package mvc;

import java.awt.EventQueue;

import mvc.controllers.SimpleController;

public class MVCDemoApp {

	public static void main(String[] args) {

		EventQueue.invokeLater(new Runnable() {
			@Override
			public void run() {
				SimpleController controller = new SimpleController();
				controller.control();
			}
		});
	}
}
