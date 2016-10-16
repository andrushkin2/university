package sample;

import javafx.geometry.Bounds;
import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.scene.layout.GridPane;
import javafx.scene.layout.Pane;
import javafx.scene.text.Text;

/**
 * Created by User on 10/8/2016.
 */
public class Table {
    private GridPane grid;
    private GridPane firstNode;
    private final String tableClassName = "tableGrid";
    Table(Pane parent) {
        this.grid = new GridPane();
        this.grid.setMaxSize(390, 410);
        parent.getChildren().add(this.grid);
        this.grid.getStylesheets().add("sample/table.css");
        this.grid.getStyleClass().add(this.tableClassName);
        this.grid.setAlignment(Pos.CENTER);
        this.grid.setHgap(10);
        this.grid.setVgap(10);
        for (int i = 0; i < 4; i++) {
            for (int j = 0; j < 4; j++) {
                GridPane empty = new GridPane();
                if (i == 0 && j == 0) {
                    this.firstNode = empty;
                }
                empty.setAlignment(Pos.CENTER);
                Text text = new Text("");
                empty.add(text, 0, 0);
                empty.setMinSize(90, 90);
                empty.setMaxSize(90, 90);
                empty.setPadding(new Insets(10));
                empty.getStyleClass().add("emptyItem");
                this.grid.add(empty, j, i);
                empty.getLocalToParentTransform();
            }
        }
        this.hide();
    }
    public void show() {
        this.grid.setVisible(true);
        this.grid.toFront();
    }
    public void hide() {
        this.grid.toBack();
        this.grid.setVisible(false);
    }
    public Bounds getBounds() {
        return this.grid.localToScene(this.firstNode.getBoundsInLocal());
    }
}
