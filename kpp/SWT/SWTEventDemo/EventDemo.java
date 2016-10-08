import org.eclipse.swt.SWT;
import org.eclipse.swt.widgets.Display;
import org.eclipse.swt.widgets.Event;
import org.eclipse.swt.widgets.Listener;
import org.eclipse.swt.widgets.Shell;

public class EventDemo {

	public static void main(String[] args) {
		Display display = new Display();
		Shell shell = new Shell(display);
		shell.setSize(100, 100);
		shell.addListener(SWT.MouseEnter, new Listener() {
			@Override
			public void handleEvent(Event e) {
				System.out.println("ENTER");
			}
		});
		shell.addListener(SWT.MouseExit, new Listener() {
			@Override
			public void handleEvent(Event e) {
				System.out.println("EXIT");
			}
		});
		shell.addListener(SWT.MouseHover, new Listener() {
			@Override
			public void handleEvent(Event e) {
				System.out.println("HOVER");
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



