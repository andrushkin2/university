package sample;

import javafx.collections.ObservableArray;
import javafx.collections.ObservableList;
import javafx.geometry.Pos;
import javafx.scene.Node;
import javafx.scene.layout.Background;
import javafx.scene.layout.Pane;
import javafx.scene.layout.VBox;

import java.util.AbstractCollection;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;

/**
 * Created by User on 10/16/2016.
 */
public class AbsolutePane extends Pane {
    private final String className = "absolutePane";
    AbsolutePane(Pane parentElement) {
        super();
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
    public void removeChild(Node child) {
        this.getChildren().remove(child);
    }
}
