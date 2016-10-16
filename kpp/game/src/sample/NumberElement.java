package sample;

import javafx.animation.KeyFrame;
import javafx.animation.KeyValue;
import javafx.animation.Timeline;
import javafx.geometry.Pos;
import javafx.scene.layout.GridPane;
import javafx.scene.layout.Pane;
import javafx.scene.text.Text;
import javafx.util.Duration;

import javax.swing.text.Position;

/**
 * Created by User on 10/16/2016.
 */
public class NumberElement {
    private final Double size = 90.0;
    private final String elementClassName = "numberElement";
    private final String innerTextClassName = "innerText";
    protected GridPane element;
    private Text innerText;
    NumberElement(Pane parent) {
        this.element = new GridPane();
        this.element.setLayoutX(55);
        this.element.setLayoutY(55);
        this.element.setAlignment(Pos.CENTER);
        this.element.getStylesheets().add("sample/numberElement.css");
        this.element.getStyleClass().add(this.elementClassName);
        this.element.setMinSize(this.size, this.size);
        this.element.setMaxSize(this.size, this.size);
        this.innerText = new Text();
        this.innerText.getStyleClass().add(this.innerTextClassName);
        this.element.add(this.innerText, 0, 0);
        parent.getChildren().add(this.element);
        new Timeline(
                new KeyFrame(Duration.millis(300), new KeyValue(this.element.opacityProperty(), 1))
        ).play();
    }
    public void setPosition(Double posX, Double posY) {
        new Timeline(
                new KeyFrame(Duration.millis(300), new KeyValue(this.element.translateXProperty(), posX)),
                new KeyFrame(Duration.millis(300), new KeyValue(this.element.translateYProperty(), posY))
        ).play();
    }
    public void setText(String text) {
        this.innerText.setText(text);
    }
}
