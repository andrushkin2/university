import org.eclipse.swt.SWT;
import org.eclipse.swt.layout.GridLayout;
import org.eclipse.swt.widgets.Button;
import org.eclipse.swt.widgets.Composite;
import org.eclipse.swt.widgets.Control;
import org.eclipse.swt.widgets.Display;
import org.eclipse.swt.widgets.Event;
import org.eclipse.swt.widgets.Listener;
import org.eclipse.swt.widgets.Shell;

public class LayoutDemo {

	public static void main(String[] args) {
		Display display = new Display();
		final Shell shell = new Shell(display);
		shell.setLayout(new GridLayout());
		final Composite c = new Composite(shell, SWT.NONE);
		GridLayout layout = new GridLayout();
		layout.numColumns = 3;
		c.setLayout(layout);
		for (int i = 0; i < 10; i++) {
			Button b = new Button(c, SWT.PUSH);
			b.setText("Button " + i);
		}

		Button b = new Button(shell, SWT.PUSH);
		b.setText("add a new button at row 2 column 1");
		final int[] index = new int[1];
		b.addListener(SWT.Selection, new Listener() {
			@Override
			public void handleEvent(Event e) {
				Button s = new Button(c, SWT.PUSH);
				s.setText("Special " + index[0]);
				index[0]++;
				Control[] children = c.getChildren();
				s.moveAbove(children[3]);
				shell.layout(new Control[] { s });
			}
		});

		shell.open();
		while (!shell.isDisposed()) {
			if (!display.readAndDispatch())
				display.sleep();
		}
		display.dispose();
	}

}
