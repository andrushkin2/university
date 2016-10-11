package sample;

import javafx.scene.layout.Pane;

/**
 * Created by kosiak_man on 11.10.16.
 */
public class BackendTable extends DialogShield {
    private Table table;
    BackendTable(Pane parentPane) {
        super(parentPane, true);
        this.table = new Table(this.pane);
        this.table.show();
        this.hide();
    }
}
