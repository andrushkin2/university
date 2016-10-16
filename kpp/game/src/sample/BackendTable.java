package sample;

import javafx.geometry.Bounds;
import javafx.scene.layout.Pane;

/**
 * Created by kosiak_man on 11.10.16.
 */
public class BackendTable extends DialogShield {
    private Table table;
    BackendTable(Pane parentPane) {
        super(parentPane, true);
        this.pane.setLayoutX(0);
        this.table = new Table(this.pane);
        this.table.show();
    }
    public Bounds getTableBounds() {
        return this.table.getBounds();
    }
}
