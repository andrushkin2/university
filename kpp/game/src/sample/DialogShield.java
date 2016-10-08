package sample;

import javafx.geometry.Pos;
import javafx.scene.Parent;
import javafx.scene.layout.FlowPane;
import javafx.scene.layout.Pane;
import javafx.scene.layout.VBox;

/**
 * Created by User on 10/8/2016.
 */
public class DialogShield {
    private VBox pane;
    private Pane parentPane;
    private final String paneClass = "dialogShield";
    DialogShield(Pane parentElement, boolean fillParent) {
        this(parentElement);
        if (fillParent){
            this.fillParent();
        }
    }
    DialogShield(Pane parentElement) {
        parentPane = parentElement;
        this.pane = new VBox();
        this.pane.setSpacing(10);
        this.pane.setAlignment(Pos.CENTER);
        this.pane.getStyleClass().add(this.paneClass);
        this.pane.setAlignment(Pos.CENTER);
        this.setSize(parentElement.getMaxWidth(), parentElement.getMaxHeight());
        parentElement.getChildren().add(this.pane);
    }
    private void setSize(Double width, Double height) {
        this.pane.setMinSize(width, height);
        this.pane.setMaxSize(width, height);
    }
    public void fillParent() {
        this.setSize(this.parentPane.getMaxWidth(), this.parentPane.getMaxWidth());
    }
    public void show() {
        this.pane.setVisible(true);
        this.pane.toFront();
    }
    public void hide() {
        this.pane.setVisible(false);
        this.pane.toBack();
    }
    public boolean isVisible() {
        return this.pane.isVisible();
    }
    public void appendChild(Parent element) {
        this.pane.getChildren().add(element);
    }
}
