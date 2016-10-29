package sample;

import javafx.animation.KeyFrame;
import javafx.animation.KeyValue;
import javafx.animation.Timeline;
import javafx.event.ActionEvent;
import javafx.event.EventHandler;
import javafx.geometry.Pos;
import javafx.scene.layout.GridPane;
import javafx.scene.layout.Pane;
import javafx.scene.text.Text;
import javafx.util.Duration;

/**
 * Created by User on 10/16/2016.
 */
public class NumberElement {
    private final Double size = 90.0;
    private final String elementClassName = "numberElement";
    private final String innerTextClassName = "innerText";
    protected GridPane element;
    private  sample.Position position;
    private Text innerText;
    private int value;
    NumberElement(Pane parent, sample.Position position, int value) {
        this.element = new GridPane();
        this.element.setLayoutX(55);
        this.element.setLayoutY(55);
        this.element.setAlignment(Pos.CENTER);
        this.element.getStylesheets().add("sample/numberElement.css");
        this.element.getStyleClass().add(this.elementClassName);
        this.element.setMinSize(this.size, this.size);
        this.element.setMaxSize(this.size, this.size);
        this.value = value;
        this.innerText = new Text(String.valueOf(this.value));
        this.innerText.getStyleClass().add(this.innerTextClassName);
        this.element.add(this.innerText, 0, 0);
        this.setPosition(position);
        parent.getChildren().add(this.element);
        this.element.setOpacity(0);
        new Timeline(
                new KeyFrame(Duration.millis(300), new KeyValue(this.element.opacityProperty(), 1))
        ).play();
    }
    private Double getTranslatePosition(int value) {
        return value * 100.0;
    }
    public sample.Position getPosition() {
        return this.position;
    }
    public void setPosition(sample.Position pos) {
        this.position = pos;
        this.element.setTranslateX(this.getTranslatePosition(this.position.j));
        this.element.setTranslateY(this.getTranslatePosition(this.position.i));
    }
    public void setPosition(sample.Position pos, boolean useAnimation) {
        if (useAnimation) {
            this.position = pos;
            new Timeline(
                    new KeyFrame(Duration.millis(300), new KeyValue(this.element.translateXProperty(), this.getTranslatePosition(this.position.j))),
                    new KeyFrame(Duration.millis(300), new KeyValue(this.element.translateYProperty(), this.getTranslatePosition(this.position.i)))
            ).play();
        } else {
            this.setPosition(pos);
        }
    }
    public void setPosition(sample.Position pos, EventHandler<ActionEvent> onAnimationEnd) {
        this.position = pos;
        Timeline animation = new Timeline(
            new KeyFrame(Duration.millis(300), new KeyValue(this.element.translateXProperty(), this.getTranslatePosition(this.position.j))),
            new KeyFrame(Duration.millis(300), new KeyValue(this.element.translateYProperty(), this.getTranslatePosition(this.position.i)))
        );
        animation.setOnFinished(onAnimationEnd);
        animation.play();
    }
    public void setValue(int value) {
        this.value = value;
        this.innerText.setText(String.valueOf(this.value));
    }
    public int getValue() {
        return this.value;
    }
}
