package sample;

import javafx.geometry.Bounds;
import javafx.scene.layout.Pane;

/**
 * Created by User on 10/16/2016.
 */
public class GamePane extends Pane {
    private Pane parentPane;
    private BackendTable backendPane;
    private AbsolutePane numbersPane;
    GamePane(Pane parentPane) {
        super();
        this.parentPane = parentPane;
        parentPane.getChildren().add(this);
        this.setSize(parentPane.getMaxWidth(), parentPane.getMaxHeight());
        this.backendPane = new BackendTable(this);
        this.backendPane.pane.toBack();
        this.numbersPane = new AbsolutePane(this);
        this.numbersPane.toFront();
        NumberElement elem = new NumberElement(this.numbersPane);
        elem.setText("2");

        this.setOnMousePressed(event -> {
            elem.setPosition(elem.element.getTranslateX() + 100, elem.element.getTranslateY());
        });
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
