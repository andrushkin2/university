package sample;

import javafx.geometry.Pos;
import javafx.scene.layout.Background;
import javafx.scene.layout.Pane;
import javafx.scene.layout.VBox;

/**
 * Created by User on 10/16/2016.
 */
public class AbsolutePane extends Pane {
    private Pane parentPane;
    private final String className = "absolutePane";
    AbsolutePane(Pane parentElement) {
        super();
        this.parentPane = parentElement;
        this.getStyleClass().add(this.className);
        this.setSize(parentElement.getMaxWidth(), parentElement.getMaxHeight());
        parentElement.getChildren().add(this);
        this.setLayoutX(0);
        this.setLayoutY(0);
    }
    private void setSize(Double width, Double height) {
        this.setMinSize(width, height);
        this.setMaxSize(width, height);
    }
    public void show() {
        this.setVisible(true);
        this.toFront();
    }
    public void hide() {
        this.toBack();
        this.setVisible(false);
    }
}
