import org.eclipse.swt.SWT;
import org.eclipse.swt.graphics.Region;
import org.eclipse.swt.layout.FillLayout;
import org.eclipse.swt.widgets.Button;
import org.eclipse.swt.widgets.Display;
import org.eclipse.swt.widgets.Event;
import org.eclipse.swt.widgets.Listener;
import org.eclipse.swt.widgets.Shell;

public class CustomControlDemo {

	static int[] circle(int r, int offsetX, int offsetY) {
		int[] polygon = new int[8 * r + 4];
		// x^2 + y^2 = r^2
		for (int i = 0; i < 2 * r + 1; i++) {
			int x = i - r;
			int y = (int) Math.sqrt(r * r - x * x);
			polygon[2 * i] = offsetX + x;
			polygon[2 * i + 1] = offsetY + y;
			polygon[8 * r - 2 * i - 2] = offsetX + x;
			polygon[8 * r - 2 * i - 1] = offsetY - y;
		}
		return polygon;
	}

	public static void main(String[] args) {
		final Display display = new Display();

		final Shell shell = new Shell(display);
		shell.setText("Regions on a Control");
		shell.setLayout(new FillLayout());
		shell.setBackground(display.getSystemColor(SWT.COLOR_DARK_RED));

		Button b2 = new Button(shell, SWT.PUSH);
		b2.setText("Button with Regions");

		// define a region that looks like a circle with two holes in ot
		Region region = new Region();
		region.add(circle(67, 87, 77));
		region.subtract(circle(20, 87, 47));
		region.subtract(circle(20, 87, 113));

		// define the shape of the button using setRegion
		b2.setRegion(region);
		b2.setLocation(100, 50);

		b2.addListener(SWT.Selection, new Listener() {
			@Override
			public void handleEvent(Event e) {
				shell.close();
			}
		});

		shell.setSize(200, 200);
		shell.open();

		while (!shell.isDisposed()) {
			if (!display.readAndDispatch())
				display.sleep();
		}
		region.dispose();
		display.dispose();
	}

}