package mvc.models;

import java.util.ArrayList;
import java.util.List;

public class SimpleModel {
	private int x;
	private List<ChangeListener> lstnrs = new ArrayList<>();

	public SimpleModel() {
		x = 0;
	}

	public SimpleModel(int x) {
		this.x = x;
	}

	public void incrX() {
		x++;
		for (ChangeListener lx : lstnrs) lx.onChange(); //4: содержимое изменилось
		//lstnrs.forEach(ChangeListener::onChange);
	}

	public int getX() {
		return x;
	}
	
	public void subscribe(ChangeListener lstnr) {
		this.lstnrs.add(lstnr);
	}
	
	public interface ChangeListener {
		void onChange();
	}
}
