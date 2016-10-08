package sample;

import javafx.geometry.Insets;
import javafx.geometry.Pos;

/**
 * Created by User on 10/8/2016.
 */
public class Button extends javafx.scene.control.Button {
    private final String buttonClassName = "button";
    Button(String text) {
        this.getStylesheets().add("sample/button.css");
        this.getStyleClass().add(this.buttonClassName);
        this.setAlignment(Pos.CENTER);
        this.setText(text);
    }
}
